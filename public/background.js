chrome.sidePanel.setPanelBehavior({openPanelOnActionClick: true});

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
    default:
      break;
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
            const folderPath = rootFolderPath + sku + "/";
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

// Функция для отправки сообщения контентному скрипту текущей вкладки
function sendMessageToTab(message) {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}
