chrome.sidePanel.setPanelBehavior({openPanelOnActionClick: true});

// Создаем контекстное меню
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "toggleCase",
    title: "Первое слово с заглавной буквы",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "lowerCase",
    title: "Все слова строчными",
    contexts: ["selection"],
  });
});

// Обработчик клика по пунктам контекстного меню
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  const selectedText = info.selectionText;
  switch (info.menuItemId) {
    case "toggleCase":
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleCase"});
      });
      break;
    case "lowerCase":
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "lowerCase"});
      });
      break;
    default:
      break;
  }
});

// Обработчик сообщений от контентного скрипта
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleCase") {
    // Ваш код для изменения регистра текста на переключенный
  } else if (request.action === "lowerCase") {
    // Ваш код для изменения регистра текста на строчный
  }
});
