chrome.sidePanel.setPanelBehavior({openPanelOnActionClick: true});
// Создаем контекстное меню
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "toggleCase",
    title: "Первое слово с заглавной буквы",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "capitalizeWords",
    title: "Первая буква каждого слова заглавная",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "lowerCase",
    title: "Все слова строчными",
    contexts: ["selection"],
  });
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
    default:
      break;
  }
});

// Функция для отправки сообщения контентному скрипту текущей вкладки
function sendMessageToTab(message) {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}
