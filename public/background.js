chrome.sidePanel.setPanelBehavior({openPanelOnActionClick: true});
// Создаем контекстное меню
chrome.runtime.onInstalled.addListener(function () {
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
