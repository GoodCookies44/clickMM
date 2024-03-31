// Функция для изменения регистра слов в выделенном тексте
function changeCase(type) {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    let selectedText = selection.toString();
    if (selectedText.trim() !== "") {
      switch (type) {
        case "toggle":
          selectedText = toggleCase(selectedText);
          break;
        case "lower":
          selectedText = selectedText.toLowerCase();
          break;
        case "capitalize":
          selectedText = capitalizeWords(selectedText);
          break;
        case "addQuotes":
          selectedText = addQuotes(selectedText);
          break;
        default:
          break;
      }

      document.execCommand("insertText", false, selectedText);
    }
  }
}

// Функция для изменения регистра слов
function toggleCase(text) {
  const words = text.split(" ");
  const toggledWords = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else {
      return word.toLowerCase();
    }
  });
  return toggledWords.join(" ");
}

// Функция для приведения первой буквы каждого слова к заглавной
function capitalizeWords(text) {
  const words = text.split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizedWords.join(" ");
}

// Функция для добавления кавычек в начале и конце выделенного текста
function addQuotes(text) {
  text = text.trim();
  text = `"${text}"`;
  return text;
}

// Функция для преобразования выделенного текста в список
function convertToBulletList(text) {
  const lines = text
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== ""); // Убираем пустые строки
  const listItems = lines.map((line) => {
    let listItem = line.trim();
    // Если строка начинается с цифры, делаем её элементом нумерованного списка
    if (/^\d/.test(listItem)) {
      listItem = listItem.replace(/^\d+\.\s*/, ""); // Удаляем номер и пробел после него
      return `<li>${listItem}</li>`;
    } else if (/^-/.test(listItem)) {
      // Если строка начинается с "-", и список не нумерованный
      listItem = listItem.replace(/^-+\s*/, ""); // Удаляем "-" и пробел после него
    }
    // Если строка не начинается с цифры и не содержит "-", делаем её элементом не нумерованного списка
    return `<li>${listItem}</li>`;
  });
  // Создаем список в зависимости от первого символа
  const listType = /^\d/.test(lines[0]) ? "ol" : "ul";
  return `<${listType}>${listItems.join("")}</${listType}>`;
}

// Функция для обработки сообщений от фонового скрипта
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (
    request.action === "toggleCase" ||
    request.action === "lowerCase" ||
    request.action === "capitalizeWords" ||
    request.action === "addQuotes" ||
    request.action === "createList"
  ) {
    changeContent(request.action);
  } else if (request.action === "downloadAllImages") {
    downloadAllImages();
  }
});

// Функция для изменения контента в зависимости от действия
function changeContent(action) {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    let selectedText = selection.toString();
    if (selectedText.trim() !== "") {
      switch (action) {
        case "toggleCase":
          selectedText = toggleCase(selectedText);
          break;
        case "lowerCase":
          selectedText = selectedText.toLowerCase();
          break;
        case "capitalizeWords":
          selectedText = capitalizeWords(selectedText);
          break;
        case "addQuotes":
          selectedText = addQuotes(selectedText);
          break;
        case "createList":
          selectedText = convertToBulletList(selectedText);
          break;
        default:
          break;
      }
      // Заменяем содержимое выделения на преобразованный текст
      range.deleteContents();
      const fragment = range.createContextualFragment(selectedText);
      range.insertNode(fragment);
    }
  }
}

//Функция скачивания фото
function isValidImageUrl(url) {
  // Проверяем расширение файла для изображений
  const validExtensions = [".jpg", ".jpeg", ".png"];
  return validExtensions.some((ext) => url.toLowerCase().endsWith(ext));
}

function downloadAllImages() {
  const imageContainers = document.querySelectorAll(".image-table[data-sku]:not(.first-row)");

  imageContainers.forEach((container) => {
    const sku = container.getAttribute("data-sku");
    const images = container.querySelectorAll("img");
    const uniqueImages = new Set();

    images.forEach((image) => {
      const imageUrl = image.src;
      if (isValidImageUrl(imageUrl)) {
        uniqueImages.add(imageUrl);
      }
    });

    const folderPath = generateFolderPath(sku);

    chrome.runtime.sendMessage({
      action: "downloadImages",
      images: Array.from(uniqueImages),
      folderPath: folderPath,
    });
  });
}

function generateFolderPath(sku) {
  if (!sku) return null;

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
  const folderPath = formattedDate.replace(/[\/\\<>|?:*]/g, "-") + "/" + sku + "/"; // Заменяем недопустимые символы на "-"

  return folderPath;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "downloadAllImages") {
    downloadAllImages();
  }
});

// Функция для создания элемента, который будет содержать информацию о размере и разрешении изображения
function createTooltipElement() {
  const tooltip = document.createElement("div");
  tooltip.style.position = "fixed";
  tooltip.style.background = "rgba(0, 0, 0, 0.7)";
  tooltip.style.color = "#fff";
  tooltip.style.padding = "5px";
  tooltip.style.borderRadius = "5px";
  tooltip.style.zIndex = "9999";
  return tooltip;
}

// Функция для обновления содержимого окна с разрешением
async function updateTooltipContent(tooltip, imgSrc, event) {
  const img = new Image();
  img.src = imgSrc;
  await img.decode(); // Дожидаемся загрузки изображения

  tooltip.textContent = `Size: ${img.naturalWidth}x${img.naturalHeight}`;
  tooltip.style.position = "absolute";
  tooltip.style.top = `${event.pageY}px`;

  // Устанавливаем left так, чтобы всплывающее окно было справа от курсора
  const offsetX = 15;
  tooltip.style.left = `${event.pageX + offsetX}px`;

  if (!tooltip.parentNode) {
    document.body.appendChild(tooltip);
  }
}

// Функция для обработки события наведения на элементы
function handleHoverWithAlt(event) {
  if (!event.altKey) {
    if (tooltip.parentNode) {
      document.body.removeChild(tooltip);
    }
    return;
  }

  const elementsMouseIsOver = document.elementsFromPoint(event.clientX, event.clientY);

  const imgElement = elementsMouseIsOver.find((element) => element.tagName === "IMG");

  if (imgElement) {
    const imgSrc = imgElement.src;
    updateTooltipContent(tooltip, imgSrc, event);
  } else {
    if (tooltip.parentNode) {
      document.body.removeChild(tooltip);
    }
  }
}

// Создаем одно окно для отображения разрешения изображения
const tooltip = createTooltipElement();

// Добавляем обработчик события наведения мыши на страницу
document.addEventListener("mousemove", handleHoverWithAlt);
