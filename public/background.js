chrome.sidePanel.setPanelBehavior({openPanelOnActionClick: true});

let isContentScriptReady = {};

// Обработчик сообщений от контентного скрипта
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "contentScriptReady") {
    isContentScriptReady[sender.tab.id] = true;
  } else if (message.type === "toggleImageChecking") {
    const {isEnabled} = message;
    chrome.storage.local.set({isImageCheckEnabled: isEnabled}, () => {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          if (isContentScriptReady[tab.id]) {
            chrome.tabs.sendMessage(tab.id, {type: "imageCheckingStatus", isEnabled});
          }
        });
      });
    });
  } else if (message.type === "toggleSquareImageChecking") {
    const {isEnabled} = message;
    chrome.storage.local.set({isSquareImageCheckEnabled: isEnabled}, () => {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          if (isContentScriptReady[tab.id]) {
            chrome.tabs.sendMessage(tab.id, {type: "squareImageCheckingStatus", isEnabled});
          }
        });
      });
    });
  } else if (message.type === "openLink") {
    handleSelectedText(message.selectedText);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.storage.local.get(["isImageCheckEnabled", "isSquareImageCheckEnabled"], (result) => {
      const isImageCheckEnabled = result.isImageCheckEnabled;
      const isSquareImageCheckEnabled = result.isSquareImageCheckEnabled;
      if (isContentScriptReady[tabId]) {
        chrome.tabs.sendMessage(tabId, {
          type: "imageCheckingStatus",
          isEnabled: isImageCheckEnabled,
        });
        chrome.tabs.sendMessage(tabId, {
          type: "squareImageCheckingStatus",
          isEnabled: isSquareImageCheckEnabled,
        });
      }
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({enableCheckboxFunction: false});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "toggleCheckboxFunction") {
    chrome.storage.sync.set({enableCheckboxFunction: request.isEnabled}, () => {
      sendResponse({status: "success"});
    });
    return true;
  }
});

let contextMenuCreated = false;

// Создаем контекстное меню при установке расширения
chrome.runtime.onInstalled.addListener(function () {
  if (!contextMenuCreated) {
    chrome.contextMenus.create({
      id: "toggleCase",
      title: "Первое слово с заглавной буквы (Alt+Z)",
      contexts: ["selection"],
    });

    chrome.contextMenus.create({
      id: "capitalizeWords",
      title: "Первая буква каждого слова заглавная (Alt+X)",
      contexts: ["selection"],
    });

    chrome.contextMenus.create({
      id: "lowerCase",
      title: "Все слова строчными (Alt+C)",
      contexts: ["selection"],
    });

    chrome.contextMenus.create({
      id: "addQuotes",
      title: "Добавить кавычки (Alt+2)",
      contexts: ["selection"],
    });

    chrome.contextMenus.create({
      id: "downloadAllImages",
      title: "Загрузить изображения",
      contexts: ["page"],
    });

    chrome.contextMenus.create({
      id: "createList",
      title: "Создать список",
      contexts: ["selection"],
    });

    chrome.contextMenus.create({
      id: "openLink",
      title: "Открыть ссылку с ШК или ID",
      contexts: ["selection"],
    });

    contextMenuCreated = true;
  }
});

// Добавляем обработчик горячих клавиш
chrome.commands.onCommand.addListener(function (command) {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    switch (command) {
      case "toggleCaseCommand":
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleCase"});
        break;
      case "capitalizeWordsCommand":
        chrome.tabs.sendMessage(tabs[0].id, {action: "capitalizeWords"});
        break;
      case "lowerCaseCommand":
        chrome.tabs.sendMessage(tabs[0].id, {action: "lowerCase"});
        break;
      case "addQuotesCommand":
        chrome.tabs.sendMessage(tabs[0].id, {action: "addQuotes"});
        break;
      case "createListCommand":
        chrome.tabs.sendMessage(tabs[0].id, {action: "createList"});
        break;
      case "checkImagesCommand":
        chrome.tabs.sendMessage(tabs[0].id, {action: "checkImages"});
      case "openLinkCommand":
        chrome.tabs.sendMessage(tabs[0].id, {action: "getSelectedText"});
        break;
      case "insertArrowCommand":
        chrome.tabs.sendMessage(tabs[0].id, {action: "insertArrow"});
        break;
      case "scrollToElementCommand":
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "scrollToElement",
          elementId: "select2-id_category-container",
        });
        break;
      case "saveCardCommand":
        chrome.tabs.sendMessage(tabs[0].id, {action: "saveCard"});
        break;
      default:
        break;
    }
  });
});

// Обработчик клика по пунктам контекстного меню
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  const selectedText = info.selectionText;
  switch (info.menuItemId) {
    case "toggleCase":
      sendMessageToTab({action: "toggleCase"});
      break;
    case "lowerCase":
      sendMessageToTab({action: "lowerCase"});
      break;
    case "capitalizeWords":
      sendMessageToTab({action: "capitalizeWords"});
      break;
    case "addQuotes":
      sendMessageToTab({action: "addQuotes"});
      break;
    case "downloadAllImages":
      sendMessageToTab({action: "downloadAllImages"});
      break;
    case "createList":
      sendMessageToTab({action: "createList"});
      break;
    case "openLink":
      sendMessageToTab({action: "getSelectedText"});
      break;
    default:
      break;
  }
});

//Функция открытия ссылки с ШК
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendSelectedText") {
    const selectedText = message.text.trim();
    if (!isNaN(selectedText) && selectedText !== "") {
      if (selectedText.length < 10) {
        // Если выделено меньше 10 цифр, открываем другую ссылку
        const url = `https://admin.kazanexpress.ru/kazanexpress/product/${selectedText}/change/`;
        chrome.tabs.create({url: url, active: false});
      } else {
        // Если выделено 10 или более цифр, открываем основную ссылку
        const url = `https://admin.kazanexpress.ru/kazanexpress/product/?search_field=sku__barcode&search_value=${selectedText}`;
        chrome.tabs.create({url: url, active: false});
      }
    }
  }
});

//Функция скачивания фото и изменнеия их названия
let downloadedImages = new Set();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "downloadImages") {
    const images = request.images;
    const currentDate = new Date();
    const formattedDate =
      currentDate.getDate().toString().padStart(2, "0") +
      "." +
      (currentDate.getMonth() + 1).toString().padStart(2, "0") +
      "_" +
      currentDate.getHours().toString().padStart(2, "0") +
      "." +
      currentDate.getMinutes().toString().padStart(2, "0") +
      "." +
      currentDate.getSeconds().toString().padStart(2, "0");
    const rootFolderPath = formattedDate.replace(/[\/\\<>|?:*]/g, "-") + "/"; // Заменяем недопустимые символы на "-"

    // Создаем корневую папку
    chrome.downloads.download(
      {
        url: "data:text/plain,", // Создаем заглушку для скачивания папки
        filename: rootFolderPath, // Создаем новую папку
        conflictAction: "uniquify", // Уникальное имя папки, если такая уже существует
        saveAs: false, // Не открывать диалоговое окно "Сохранить как"
      },
      function (downloadId) {
        images.forEach(({url, sku}, index) => {
          if (!downloadedImages.has(url)) {
            const folderPath = sku ? rootFolderPath + sku + "/" : rootFolderPath;
            const filename = index + 1 + url.substring(url.lastIndexOf("."));
            chrome.downloads.download({
              url: url,
              filename: folderPath + filename,
              conflictAction: "uniquify",
              saveAs: false,
            });
            downloadedImages.add(url);
          }
        });
      }
    );
  }
});

// Функция для отправки сообщения контентному скрипту текущей вкладки
function sendMessageToTab(message) {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}
