// Отправка сообщения о готовности контентного скрипта
chrome.runtime.sendMessage({type: "contentScriptReady"});

// Функция для изменения контента в зависимости от действия
function changeContent(action) {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    let selectedText = selection.toString();
    if (selectedText.trim() !== "") {
      switch (action) {
        case "createList":
          const listFragment = convertToBulletList(selectedText);
          document.execCommand("insertHTML", false, listFragment);
          break;
        default:
          changeCase(action, selectedText, range);
          break;
      }
    }
  }
}

// Функция для изменения регистра слов в выделенном тексте
function changeCase(type, selectedText, range) {
  switch (type) {
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
    default:
      break;
  }

  document.execCommand("insertText", false, selectedText);
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
  if (text.startsWith("«") && text.endsWith("»")) {
    text = text.slice(1, -1).trim();
  }
  text = toggleCase(text);
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
    // Если список не нумерованный, удаляем "-" или "•" в начале строки
    if (!/^\d/.test(listItem)) {
      listItem = listItem.replace(/^[-–―—·•●*]\s*/, ""); // Удаляем "-" или "•" и пробел после него
    }
    // Если строка начинается с цифры или цифры с символом (например, 1., 1) или 1 ), делаем её элементом нумерованного списка
    if (/^\d+([.)]\s*|\s)/.test(listItem)) {
      listItem = listItem.replace(/^\d+([.)]\s*|\s)/, ""); // Удаляем номер и символы после него
      return `<li>${listItem}</li>`;
    }
    // Если строка не начинается с цифры, делаем её элементом ненумерованного списка
    return `<li>${listItem}</li>`;
  });

  // Создаем список в зависимости от первого символа
  const listType = /^\d+([.)]\s*|\s)/.test(lines[0].trim()) ? "ol" : "ul";
  return `<${listType}>${listItems.join("")}</${listType}>`;
}

// Обработчик сообщений от фонового скрипта
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  changeContent(request.action);
});

// Обработчик сообщений от фонового скрипта
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleCase") {
    changeContent("toggle");
  } else if (request.action === "lowerCase") {
    changeContent("lower");
  } else if (request.action === "capitalizeWords") {
    changeContent("capitalize");
  } else if (request.action === "addQuotes") {
    changeContent("addQuotes");
  } else if (request.action === "createList") {
    changeContent("createList");
  } else if (request.action === "downloadAllImages") {
    downloadAllImages();
  } else if (request.action === "checkImages") {
    checkImagesOnPage();
  }
});

// Функция для проверки, является ли URL допустимым для изображения
function isValidImageUrl(url) {
  if (typeof url !== "string") {
    return false;
  }
  const validExtensions = [".jpg", ".jpeg", ".png"];
  return validExtensions.some((ext) => url.toLowerCase().endsWith(ext));
}

// Функция для скачивания всех изображений, группируя их по папкам на основе значения атрибута data-sku родительского компонента
function downloadAllImages() {
  const images = document.querySelectorAll(
    ".image-table img, .Images a, .js-attachment-list a, a[class^='jss'], a[class^='v']"
  );
  const imagesData = [];

  images.forEach((image) => {
    const imageUrl = image.href || image.src;
    if (isValidImageUrl(imageUrl)) {
      const parentElement = image.closest("[data-sku]");
      const sku = parentElement ? parentElement.getAttribute("data-sku") : undefined;
      imagesData.push({url: imageUrl, sku: sku});
    }
  });

  chrome.runtime.sendMessage({action: "downloadImages", images: imagesData});
}

// Обработчик сообщений от фонового скрипта
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "downloadAllImages") {
    downloadAllImages();
  } else {
    changeContent(request.action);
  }
});

// Функция для создания элемента, который будет содержать информацию о размере и разрешении изображения
function createTooltipElement() {
  const tooltip = document.createElement("div");
  tooltip.style.position = "absolute";
  tooltip.style.background = "rgba(0, 0, 0, 0.7)";
  tooltip.style.color = "#fff";
  tooltip.style.padding = "5px";
  tooltip.style.borderRadius = "5px";
  tooltip.style.zIndex = "9999";
  return tooltip;
}

// Функция для создания элемента с размерами изображения
function createImageSizeElement(img) {
  const imgSize = document.createElement("div");
  imgSize.textContent = `Size: ${img.naturalWidth}x${img.naturalHeight} (${(
    img.naturalWidth / img.naturalHeight
  ).toFixed(2)})`;
  imgSize.style.display = "block";
  return imgSize;
}

// Функция для создания круга с цветом
function createColorCircle(color) {
  const circle = document.createElement("div");
  circle.style.width = "20px";
  circle.style.height = "20px";
  circle.style.borderRadius = "50%";
  circle.style.backgroundColor = color;
  circle.style.marginBottom = "5px";
  return circle;
}

// Создаем одно окно для отображения разрешения изображения
const tooltip = createTooltipElement();

// Функция для обновления содержимого окна с разрешением
async function updateTooltipContent(tooltip, imgSrc, event) {
  const img = new Image();
  img.src = imgSrc;
  await img.decode(); // Дожидаемся загрузки изображения

  const imgSize = createImageSizeElement(img);
  const offsetX = 15;
  tooltip.style.left = `${event.pageX + offsetX}px`;
  tooltip.style.top = `${event.pageY}px`;

  tooltip.innerHTML = "";
  tooltip.appendChild(imgSize);

  if (!tooltip.parentNode) {
    document.body.appendChild(tooltip);
  }
}

// Функция для обновления содержимого окна с разрешением и цветом пикселя
async function updateTooltipColor(tooltip, imgSrc, event) {
  const img = new Image();
  img.src = imgSrc;
  await img.decode(); // Дожидаемся загрузки изображения

  const imgSize = createImageSizeElement(img);
  const offsetX = 15;
  tooltip.style.left = `${event.pageX + offsetX}px`;
  tooltip.style.top = `${event.pageY}px`;

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

  const colorData = ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data;
  const colorHex =
    "#" +
    ((1 << 24) + (colorData[0] << 16) + (colorData[1] << 8) + colorData[2]).toString(16).slice(1);

  const colorContainer1 = document.createElement("div");
  colorContainer1.style.display = "flex";
  colorContainer1.style.flexdirection = "row";
  colorContainer1.style.alignitems = "center";
  const colorCircle1 = createColorCircle("#efefef");
  const colorText1 = document.createElement("span");
  colorText1.textContent = "#efefef";
  colorContainer1.appendChild(colorCircle1);
  colorContainer1.appendChild(colorText1);

  const colorContainer2 = document.createElement("div");
  colorContainer2.style.display = "flex";
  colorContainer2.style.flexdirection = "row";
  colorContainer2.style.alignitems = "center";
  const colorCircle2 = createColorCircle(colorHex);
  const colorText2 = document.createElement("span");
  colorText2.textContent = colorHex;
  colorContainer2.appendChild(colorCircle2);
  colorContainer2.appendChild(colorText2);

  tooltip.innerHTML = "";
  tooltip.appendChild(imgSize);
  tooltip.appendChild(colorContainer1);
  tooltip.appendChild(colorContainer2);

  if (!tooltip.parentNode) {
    document.body.appendChild(tooltip);
  }
}

// Функция для обработки события наведения на элементы с показом разрешения и цвета пикселя
function handleHover(event) {
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
    // Проверяем, находимся ли мы на нужной странице
    if (window.location.href.startsWith("https://admin.kazanexpress.ru/")) {
      updateTooltipContent(tooltip, imgSrc, event);
    } else {
      updateTooltipColor(tooltip, imgSrc, event);
    }
  } else {
    if (tooltip.parentNode) {
      document.body.removeChild(tooltip);
    }
  }
}

// Обработчик события наведения мыши на страницу с показом разрешения и цвета пикселя
document.addEventListener("mousemove", handleHover);

// Функция автоматической проверки фото на соотношение сторон и разрешение
let isImageCheckEnabled = false;
let isSquareImageCheckEnabled = false;

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["isImageCheckEnabled", "isSquareImageCheckEnabled"], (result) => {
    isImageCheckEnabled = result.isImageCheckEnabled;
    isSquareImageCheckEnabled = result.isSquareImageCheckEnabled;
    checkImagesOnPage();
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "imageCheckingStatus") {
    isImageCheckEnabled = message.isEnabled;
    checkImagesOnPage();
  } else if (message.type === "squareImageCheckingStatus") {
    isSquareImageCheckEnabled = message.isEnabled;
    checkImagesOnPage();
  }
});

function checkImagesOnPage() {
  const currentUrl = window.location.href;
  if (!currentUrl.startsWith("https://admin.kazanexpress.ru/kazanexpress/product/")) {
    return;
  }

  const images = document.querySelectorAll(".image-table .image-table-item img");

  images.forEach((img) => {
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    const aspectRatio = (width / height).toFixed(2);

    let boxShadow = "0px 0px 10px .1px rgba(209, 10, 10, 0.9)";

    if (
      isImageCheckEnabled &&
      aspectRatio === "0.75" &&
      width >= 900 &&
      width <= 3750 &&
      height >= 1200 &&
      height <= 5000
    ) {
      boxShadow = "0px 0px 10px .1px rgba(21, 181, 0, 0.9)";
    }

    if (isSquareImageCheckEnabled && aspectRatio === "1.00" && width >= 500 && height >= 500) {
      boxShadow = "0px 0px 10px .1px rgba(21, 181, 0, 0.9)";
    }

    img.style.boxShadow = boxShadow;

    let sizeLabel = img.parentElement.querySelector(".size-label");
    if (!sizeLabel) {
      sizeLabel = document.createElement("div");
      sizeLabel.className = "size-label";
      sizeLabel.style.position = "absolute";
      sizeLabel.style.bottom = "5px";
      sizeLabel.style.left = "5px";
      sizeLabel.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      sizeLabel.style.color = "white";
      sizeLabel.style.padding = "2px 2px";
      sizeLabel.style.pointerEvents = "none";
      img.parentElement.style.position = "relative";
      img.parentElement.appendChild(sizeLabel);
    }
    sizeLabel.textContent = `${width}x${height} (${aspectRatio})`;
  });

  // Удаление теней и разрешений, если оба переключателя выключены
  if (!isImageCheckEnabled && !isSquareImageCheckEnabled) {
    images.forEach((img) => {
      img.style.boxShadow = "";
      const sizeLabel = img.parentElement.querySelector(".size-label");
      if (sizeLabel) {
        img.parentElement.removeChild(sizeLabel);
      }
    });
  }
}

//Функция для автоматической проставки галочек
chrome.storage.sync.get(["enableCheckboxFunction"], (result) => {
  if (
    result.enableCheckboxFunction &&
    window.location.href.startsWith("https://admin.kazanexpress.ru/kazanexpress/product/")
  ) {
    const newStudioFlagCheckbox = document.querySelector(
      'input[type="checkbox"][name="new_studio_flag"]'
    );

    if (newStudioFlagCheckbox) {
      newStudioFlagCheckbox.addEventListener("change", (event) => {
        if (event.target.checked) {
          const hasStudioPhotoCheckbox = document.querySelector(
            'input[type="checkbox"][name="has_studio_photo"]'
          );
          const hasVerticalPhotoCheckbox = document.querySelector(
            'input[type="checkbox"][name="has_vertical_photo"]'
          );

          if (hasStudioPhotoCheckbox) hasStudioPhotoCheckbox.checked = true;
          if (hasVerticalPhotoCheckbox) hasVerticalPhotoCheckbox.checked = true;
        }
      });
    }
  }
});
