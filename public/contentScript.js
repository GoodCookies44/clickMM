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

// Обработчик сообщений от фона
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "insertArrow") {
    insertArrow();
  }
});

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

  // Убираем кавычки если они есть
  if (text.startsWith("«") && text.endsWith("»")) {
    // Если текст в кавычках « », заменяем их на обычные кавычки и меняем регистр
    text = text.slice(1, -1).trim();
    text = toggleCase(text);
    text = `"${text}"`;
  } else if (text.startsWith('"') && text.endsWith('"')) {
    // Если текст в обычных кавычках, просто убираем их
    text = text.slice(1, -1).trim();
  } else {
    // Если текст без кавычек, добавляем обычные кавычки и меняем регистр
    text = toggleCase(text);
    text = `"${text}"`;
  }

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

    if (isImageCheckEnabled && aspectRatio === "0.75" && width >= 900 && height >= 1200) {
      boxShadow = "0px 0px 10px .1px rgba(21, 181, 0, 0.9)";
    }

    if (isSquareImageCheckEnabled && aspectRatio === "1.00" && width >= 400 && height >= 400) {
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
    const updateCheckboxes = () => {
      const newStudioFlagCheckboxes = document.querySelectorAll(
        'input[type="checkbox"][name="new_studio_flag"]'
      );

      newStudioFlagCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (event) => {
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

        // Проверяем текущее состояние чекбокса при его появлении
        if (checkbox.checked) {
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
    };

    // Наблюдатель за изменениями в DOM
    const observer = new MutationObserver(updateCheckboxes);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Первоначальный вызов функции для установки слушателей на уже существующие чекбоксы
    updateCheckboxes();
  }
});

// Функция для получения выделенного текста
function getSelectedText() {
  const activeElement = document.activeElement;
  const isGoogleSheets =
    window.location.hostname === "docs.google.com" &&
    window.location.pathname.includes("/spreadsheets");

  // Проверяем, является ли активный элемент частью Google Таблиц
  if (isGoogleSheets) {
    const selectedCell = document.querySelector(".cell-input");
    if (selectedCell) {
      const selectedText = selectedCell.innerText || selectedCell.textContent;
      return selectedText.split(/[, ]/)[0].trim(); // Используем только первую часть текста до запятой или пробела
    }
  }

  // В остальных случаях пытаемся получить выделенный текст
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const selectedText = selection.toString().trim();
    if (selectedText) {
      // Разделяем текст по запятой или пробелу и возвращаем первую часть
      const firstPart = selectedText.split(/[, ]/)[0];
      return firstPart.trim();
    }
  }
  return "";
}

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getSelectedText") {
    const selectedText = getSelectedText();
    if (selectedText) {
      if (selectedText.length > 10) {
        copyToClipboard(selectedText);
      }
      chrome.runtime.sendMessage({action: "sendSelectedText", text: selectedText});
    }
  }
});

// Вставка стрелочек
function insertArrow() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  let selectedText = selection.toString().trim();
  if (!selectedText) return;

  // Если текст содержит " /", заменяем все вхождения " /" на " -> "
  if (selectedText.includes("/")) {
    selectedText = selectedText.replace(/\s*\/\s*/g, " -> ");
  } else {
    // Иначе, применяем логику с заглавными буквами, начиная со второго слова
    let words = selectedText.split(/\s+/);
    selectedText = words
      .map((word, index) => (index === 0 || !/^[A-ZА-Я]/.test(word) ? word : `-> ${word}`))
      .join(" ");
  }

  // Вставляем модифицированный текст
  document.execCommand("insertText", false, selectedText);
}

// Функция для скроллинга до элемента
function scrollToElementById(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({behavior: "smooth", block: "center"});
  }
}

// Обработчик сообщений от background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "scrollToElement") {
    scrollToElementById(request.elementId);
  }
});

// Функция для нажатия кнопки "Сохранить" и отслеживания изменений URL
function saveCard() {
  const urlPattern = /^https:\/\/admin\.kazanexpress\.ru\/kazanexpress\/product\/\d+\/change\//;

  // Проверяем, совпадает ли текущий URL с нужным шаблоном
  if (urlPattern.test(window.location.href)) {
    // Находим кнопку "Сохранить" и нажимаем её
    const saveButton = document.querySelector(
      'input[type="submit"][value="Сохранить"].button-green[name="_save"]'
    );
    if (saveButton) {
      saveButton.click();
    }
  }
}

// Обработчик сообщений от background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveCard") {
    saveCard();
  }
});

//Проверка карточек в категории
// Функция для извлечения данных из таблицы
function getCurrentCategoryCards() {
  const rows = document.querySelectorAll("tr"); // Каждая строка таблицы
  return Array.from(rows)
    .map((row) => {
      const id = row.querySelector(".field-id a")?.textContent.trim();
      const name = row.querySelector(".field-wrapped_title")?.textContent.trim();
      const imageSrc = row.querySelector(".field-product_image img")?.src;
      const category = row.querySelector(".field-wrapped_category")?.textContent.trim();

      return {id, name, imageSrc, category, row};
    })
    .filter((card) => card.id); // Фильтруем строки без ID
}

// Функция для передачи данных на вкладку CardChecker
function sendDataToCardChecker(cards) {
  chrome.runtime.sendMessage({action: "checkCards", cards}, (nonMatchingCards) => {
    // После получения карточек, которые не подошли, проверяем их изображения
    checkCardsImagesAgainstReference(nonMatchingCards);
  });
}

// Функция для проверки изображений с использованием Canvas API
function compareImages(imageSrc1, imageSrc2) {
  return new Promise((resolve, reject) => {
    const img1 = new Image();
    const img2 = new Image();

    img1.crossOrigin = "Anonymous"; // Нужно для работы с изображениями с других доменов
    img2.crossOrigin = "Anonymous";

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    img1.src = imageSrc1;
    img2.src = imageSrc2;

    img1.onload = () => {
      img2.onload = () => {
        // Устанавливаем размер для Canvas
        canvas.width = Math.min(img1.width, img2.width);
        canvas.height = Math.min(img1.height, img2.height);

        // Рисуем первое изображение на Canvas
        context.drawImage(img1, 0, 0, canvas.width, canvas.height);
        const imgData1 = context.getImageData(0, 0, canvas.width, canvas.height).data;

        // Очищаем Canvas и рисуем второе изображение
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img2, 0, 0, canvas.width, canvas.height);
        const imgData2 = context.getImageData(0, 0, canvas.width, canvas.height).data;

        // Сравниваем пиксели двух изображений
        let diff = 0;
        for (let i = 0; i < imgData1.length; i++) {
          diff += Math.abs(imgData1[i] - imgData2[i]);
        }

        // Возвращаем результат сравнения (чем ниже diff, тем ближе изображения)
        resolve(diff);
      };

      img2.onerror = reject;
    };

    img1.onerror = reject;
  });
}

// Функция для проверки карточек по изображениям с эталонными
async function checkCardsImagesAgainstReference(nonMatchingCards) {
  const referenceCards = JSON.parse(localStorage.getItem("referenceCards")) || [];

  for (let card of nonMatchingCards) {
    for (let reference of referenceCards) {
      const diff = await compareImages(card.imageSrc, reference.imageSrc);

      // Пороговое значение для отличия изображений (можно настроить)
      if (diff > 10000) {
        highlightRow(card.id); // Подсвечиваем карточку, если изображения сильно отличаются
      }
    }
  }
}

// Подсветка строки таблицы
function highlightRow(cardId) {
  const row = document.querySelector(`input[value="${cardId}"]`).closest("tr");
  row.style.backgroundColor = "yellow"; // Можно изменить цвет подсветки
}

// Функция для добавления чекбоксов и возможности выбора эталонных карточек
function addSwitchesForReferenceSelection() {
  const cards = getCurrentCategoryCards();

  cards.forEach((card) => {
    // Добавляем чекбокс для каждой строки в начало
    if (!card.row.querySelector(".reference-checkbox")) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "reference-checkbox";

      const td = document.createElement("td");
      td.appendChild(checkbox);

      // Вставляем новый элемент перед первым элементом строки
      card.row.insertBefore(td, card.row.firstChild);
    }
  });

  // Добавляем кнопку для отправки данных на вкладку CardChecker
  if (!document.querySelector("#check-cards-btn")) {
    const button = document.createElement("button");
    button.textContent = "Проверить карточки";
    button.id = "check-cards-btn";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.zIndex = "1000";

    document.body.appendChild(button);

    // Обработчик клика по кнопке для проверки карточек
    button.addEventListener("click", () => {
      const selectedCards = cards.filter(
        (card) => card.row.querySelector(".reference-checkbox").checked
      );

      sendDataToCardChecker(selectedCards);
    });
  }
}

// Инициализация
addSwitchesForReferenceSelection();
