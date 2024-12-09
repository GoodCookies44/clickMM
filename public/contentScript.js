// Отправка сообщения о готовности контентного скрипта
chrome.runtime.sendMessage({type: "contentScriptReady"});

// == Функция для изменения контента в зависимости от действия == //
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

//== Функция для изменения регистра слов в выделенном тексте == //
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

// == Функция для изменения регистра первой буквы в 1 слове == //
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

// == Функция для приведения первой буквы каждого слова к заглавной == //
function capitalizeWords(text) {
  const words = text.split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizedWords.join(" ");
}

// == Функция для добавления кавычек в начале и конце выделенного текста == //
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

// == Функция для преобразования выделенного текста в список == //
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

// == Функция для проверки, является ли URL допустимым для изображения == //
function isValidImageUrl(url) {
  if (typeof url !== "string") {
    return false;
  }
  const validExtensions = [".jpg", ".jpeg", ".png"];
  return validExtensions.some((ext) => url.toLowerCase().endsWith(ext));
}

// == Функция для скачивания всех изображений, группируя их по папкам на основе значения атрибута data-sku родительского компонента == //
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

// == Обработчик сообщений от фонового скрипта для скачивания фото == //
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "downloadAllImages") {
    downloadAllImages();
  } else {
    changeContent(request.action);
  }
});

// == Функция для создания элемента, который будет содержать информацию о размере и разрешении изображения == //
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

// == Функция для нахождения наибольшего общего делителя (НОД) == //
function getGCD(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

// == Функция для создания элемента с размерами изображения == //
function createImageSizeElement(img) {
  const imgSize = document.createElement("div");

  // Вычисляем НОД
  const gcd = getGCD(img.naturalWidth, img.naturalHeight);

  // Вычисляем соотношение сторон
  const aspectRatio = `${img.naturalWidth / gcd}:${img.naturalHeight / gcd}`;

  // Выводим размер и соотношение сторон
  imgSize.textContent = `Size: ${img.naturalWidth}x${img.naturalHeight} (${(
    img.naturalWidth / img.naturalHeight
  ).toFixed(2)}, ${aspectRatio})`;
  imgSize.style.display = "block";

  return imgSize;
}

// == Функция для создания круга с цветом
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

// == Функция для обновления содержимого окна с разрешением == //
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

// == Функция для обновления содержимого окна с разрешением и цветом пикселя == //
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

// == Функция для обработки события наведения на элементы с показом разрешения и цвета пикселя == //
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

// == Обработчик события наведения мыши на страницу с показом разрешения и цвета пикселя == //
document.addEventListener("mousemove", handleHover);

// == Функция автоматической проверки фото на соотношение сторон и разрешение == //
let isImageCheckEnabled = false;
let isSquareImageCheckEnabled = false;

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["isImageCheckEnabled", "isSquareImageCheckEnabled"], (result) => {
    isImageCheckEnabled = result.isImageCheckEnabled;
    isSquareImageCheckEnabled = result.isSquareImageCheckEnabled;
    checkImagesOnPage();
  });
});

// == Обработчик сообщений от фонового скрипта для проверки == //
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
    const gcd = getGCD(img.naturalWidth, img.naturalHeight);
    const aspectRatio = (width / height).toFixed(2);
    const aspectRatioGCD = `${width / gcd}:${height / gcd}`;

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

    sizeLabel.textContent = `${width}x${height} (${aspectRatio}, ${aspectRatioGCD})`;
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

// == Функция для автоматической проставки галочек == //
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

// == Функция для получения выделенного текста == //
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

// == Функция коприрования выделенного текста в буфер обмена == //
function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

// == Обработчик сообщений от фонового скрипта копирования == //
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

// == Функция для вставки стрелочек == //
function insertArrow() {
  const selection = window.getSelection();

  // Если нет выделения или выделенный текст пустой
  if (!selection || selection.rangeCount === 0 || !selection.toString().trim()) {
    document.execCommand("insertText", false, " -> ");
    return;
  }

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

  document.execCommand("insertText", false, selectedText);
}

// ==  Обработчик сообщений от фона для вставки стрелочки == //
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "insertArrow") {
    insertArrow();
  }
});

// == Функция для скроллинга до элемента == //
function scrollToElementById(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({behavior: "smooth", block: "center"});
  }
}

// == Обработчик сообщений от фона для скрола до выбора категории == //
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "scrollToElement") {
    scrollToElementById(request.elementId);
  }
});

// == Функция для нажатия кнопки "Сохранить" и отслеживания изменений URL == //
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

// == Обработчик сообщений от фона для нажатия на кнопку "Сохранить" == //
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveCard") {
    saveCard();
  }
});

// == Проверка карточек в категории == //
if (window.location.href.startsWith("https://admin.kazanexpress.ru/kazanexpress/product/")) {
  chrome.storage.local.get("words", (result) => {
    const words = result.words;
    const includeWords = words.includeWords;
    const excludeWords = words.excludeWords;

    if (includeWords || excludeWords) {
      postData();
      checkTitles(includeWords, excludeWords);
    }
  });

  function postData() {
    const rows = document.querySelectorAll("#result_list tr");
    const products = [];

    rows.forEach((row) => {
      const titleElement = row.querySelector(".field-wrapped_title");
      const title = titleElement ? titleElement.innerText : "";
      if (title) {
        const idElement = row.querySelector(".field-id a");
        const id = idElement ? idElement.innerText : "";
        products.push({title, id, row});
      }
    });

    window.productList = products;
  }

  function checkTitles(includeWords, excludeWords) {
    const includeArray = includeWords
      .split(",")
      .map((word) => word.trim())
      .filter(Boolean);
    const excludeArray = excludeWords
      .split(",")
      .map((word) => word.trim())
      .filter(Boolean);

    const options = {
      threshold: 0.3,
      keys: ["title"],
      useExtendedSearch: true,
      includeMatches: true,
      findAllMatches: true,
      includeHighlights: true,
    };
    const fuse = new Fuse(window.productList, options);

    const groupedRows = {
      noIncludeExclude: [],
      noMatchIncludeExclude: [],
      matchIncludeExclude: [],
      matchIncludeNoExclude: [],
      UppercaseWord: [],
      remainingRows: [],
    };

    window.productList.forEach((product) => {
      const title = product.title;
      const id = product.id;

      const hasIncludeWords = includeArray.some((word) => {
        const result = fuse.search(word);
        return result.some((res) => res.item.title === title && res.item.id === id);
      });

      const hasExcludeWords = excludeArray.some((word) => {
        const result = fuse.search(word);
        return result.some((res) => res.item.title === title && res.item.id === id);
      });

      // Проверяем, есть ли изображение с alt="True"
      const isInStock = product.row.querySelector(".field-is_in_stock img[alt='True']") !== null;

      // Проверяем на наличие заглавных букв, исключая цифры, только если товар в наличии
      const hasUppercaseWords =
        isInStock &&
        title
          .replace(/[^A-Za-zА-Яа-яЁё\s]|[0-9]/g, "")
          .split(" ")
          .some((word) => word.length > 2 && /^[A-ZА-ЯЁ]+$/.test(word));

      if (hasUppercaseWords) {
        product.row.style.boxShadow = "inset 0px 0px 5px 2px rgba(244, 0, 255, 0.4)";
        groupedRows.UppercaseWord.push(product.row);
      } else if (!hasIncludeWords && hasExcludeWords) {
        const checkbox = product.row.querySelector("input[name='_selected_action']");
        if (checkbox) {
          checkbox.checked = true;
        }
        product.row.style.boxShadow = "inset 0px 0px 5px 2px rgba(255, 0, 0, 0.4)";
        groupedRows.noIncludeExclude.push(product.row);
      } else if (!hasIncludeWords && !hasExcludeWords) {
        product.row.style.boxShadow = "inset 0px 0px 5px 2px rgba(0, 221, 255, 0.4)";
        groupedRows.noMatchIncludeExclude.push(product.row);
      } else if (hasIncludeWords && hasExcludeWords) {
        product.row.style.boxShadow = "inset 0px 0px 5px 2px rgba(255, 255, 0, 0.4)";
        groupedRows.matchIncludeExclude.push(product.row);
      } else if (hasIncludeWords && !hasExcludeWords) {
        product.row.style.boxShadow = "inset 0px 0px 5px 2px rgba(0, 255, 0, 0.4)";
        groupedRows.matchIncludeNoExclude.push(product.row);
      } else {
        groupedRows.remainingRows.push(product.row);
      }
    });

    const tableBody = document.querySelector("#result_list tbody");
    if (!tableBody) {
      console.log("Ошибка: элемент tbody не найден");
      return;
    }
    tableBody.innerHTML = "";

    groupedRows.noIncludeExclude.forEach((row) => tableBody.appendChild(row));
    groupedRows.matchIncludeExclude.forEach((row) => tableBody.appendChild(row));
    groupedRows.noMatchIncludeExclude.forEach((row) => tableBody.appendChild(row));
    groupedRows.UppercaseWord.forEach((row) => tableBody.appendChild(row));
    groupedRows.matchIncludeNoExclude.forEach((row) => tableBody.appendChild(row));
    groupedRows.remainingRows.forEach((row) => tableBody.appendChild(row));
  }

  postData();

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "CHECK_TITLES") {
      checkTitles(message.includeWords, message.excludeWords);
    }
  });
}

// == Функция для получения данных категорий == //
async function fetchCategoriesFromPage(page) {
  const url = `https://admin.kazanexpress.ru/kazanexpress/category/?active__exact=1&p=${page}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const rows = doc.querySelectorAll("#result_list tbody tr");

      const activeCategories = [];

      rows.forEach((row) => {
        const titleElement = row.querySelector(".field-title a");
        const idElement = row.querySelector(".field-id");
        const categoryElement = row.querySelector(".field-parent");
        const activeElement = row.querySelector(".field-active img");
        const markingElement = row.querySelector(".field-is_adult img");

        const title = titleElement ? titleElement.innerText : "";
        const id = idElement ? idElement.innerText : "";
        const category = categoryElement ? categoryElement.innerText : "";
        const active = activeElement ? activeElement.alt === "True" : false;
        const marking = markingElement ? markingElement.alt === "True" : false;

        if (active) {
          activeCategories.push({
            id,
            category,
            title,
            active,
            marking,
          });
        }
      });

      return activeCategories;
    } else {
      console.error("Ошибка запроса:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Ошибка при запросе категорий:", error);
    return [];
  }
}

// == Функция для получения общего количества страниц == //
async function fetchTotalPages() {
  const url = "https://admin.kazanexpress.ru/kazanexpress/category/?active__exact=1&p=1"; // Первая страница

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      const paginatorEndElement = doc.querySelector(".paginator .end");
      const totalPages = paginatorEndElement ? parseInt(paginatorEndElement.innerText, 10) : 1;

      return totalPages;
    } else {
      console.error("Ошибка запроса:", response.status);
      return 1;
    }
  } catch (error) {
    console.error("Ошибка при получении количества страниц:", error);
    return 1;
  }
}

// == Функция для создания Excel-файла и его скачивания == //
function exportToExcel(categories) {
  const filteredCategories = categories.map(({id, category, title, marking}) => ({
    id,
    category,
    title,
    marking,
  }));

  const worksheet = XLSX.utils.json_to_sheet([]);

  XLSX.utils.sheet_add_aoa(worksheet, [
    ["ID", "Родительские категории", "Конечная категория", "Требуется маркировка"],
  ]);

  XLSX.utils.sheet_add_json(worksheet, filteredCategories, {origin: "A2", skipHeader: true});
  worksheet["!cols"] = [{wch: 9}, {wch: 115}, {wch: 60}, {wch: 20}];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Категории");
  XLSX.writeFile(workbook, "Выгрузка категорий.xlsx");
}

// == Основная функция для прохода по всем страницам == //
async function fetchAllActiveCategories() {
  const totalPages = await fetchTotalPages();
  const allActiveCategories = [];

  for (let page = 1; page <= totalPages; page++) {
    console.log(`Получаем данные со страницы ${page} из ${totalPages}`);
    const categoriesFromPage = await fetchCategoriesFromPage(page);
    allActiveCategories.push(...categoriesFromPage);
  }

  exportToExcel(allActiveCategories);
}

// == Обработчик сообщений от background.js == //
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "FETCH_CATEGORIES") {
    fetchAllActiveCategories();
  }
});

// == Функция проверки тексовых полей на стоп-слова == //
let isTextCheckEnabled = false;

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["isTextCheckEnabled"], (result) => {
    const isTextCheckEnabled = result.isTextCheckEnabled;
    if (isTextCheckEnabled) {
      checkForStopWords();
    } else {
      removeStopWordHighlights();
    }
  });
});

// == Обработчик сообщений от фона для проверки на стоп-слова == //
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "textCheckingStatus") {
    const isTextCheckEnabled = message.isEnabled;
    if (isTextCheckEnabled) {
      checkForStopWords();
    } else {
      removeStopWordHighlights();
    }
  }
});

// == Стоп-слова == //
const stopWords = [
  "sale",
  "распродажа",
  "новинка",
  "аналог",
  "заказ",
  "хит",
  "копия",
  "оригинал",
  "премиум",
  "premium",
  "реплика",
  "уценка",
  "уценен",
  "скидки",
  "акция",
  "ростест",
  "глушилка",
  "дешевый",
  "бесплатно",
  "выгодно",
  "купить",
  "покупай",
  "тренд",
  "secondhand",
  "секонд-хенд",
  "б/у",
];

// == Настройки Fuse.js == //
const fuseOptions = {
  threshold: 0.6,
  useExtendedSearch: true,
  includeMatches: true,
  findAllMatches: true,
  includeHighlights: true,
  includeScore: true,
};

const fuse = new Fuse(stopWords, fuseOptions);

// == Функция для поиска стоп-слов и добавления стилей == //
function checkForStopWords() {
  const url = window.location.href;

  if (url.startsWith("https://admin.kazanexpress.ru/kazanexpress/product/")) {
    const textFields = [...document.querySelectorAll('input[type="text"], textarea, .ql-editor')];

    textFields.forEach((field) => {
      let text = "";

      if (field.tagName === "TEXTAREA") {
        text = field.value;
      } else if (field.classList.contains("ql-editor")) {
        text = field.innerText || field.textContent;
      } else if (field.tagName === "INPUT" && field.type === "text") {
        text = field.value;
      }

      if (text.trim() === "") {
        return;
      }

      checkWordsInText(text, field);
    });
  } else if (url.startsWith("https://admin.kazanexpress.ru/product-moderation/")) {
    const textFields = [
      ...document.querySelectorAll(
        'input[type="text"][name*="new_value"], textarea[name*="new_value"], .ql-editor, input.text-list-item'
      ),
    ];

    textFields.forEach((field) => {
      let text = "";

      if (field.tagName === "TEXTAREA") {
        text = field.value;
      } else if (field.classList.contains("ql-editor")) {
        text = field.innerText || field.textContent;
      } else if (field.tagName === "INPUT" && field.type === "text") {
        text = field.value;
      }

      if (text.trim() === "") {
        return;
      }

      checkWordsInText(text, field);
    });
  } else if (url.startsWith("https://admin.kazanexpress.ru/moderation/bid/")) {
    const textFields = [...document.querySelectorAll('input[type="text"], textarea, .ql-editor')];

    textFields.forEach((field) => {
      let text = "";

      if (field.tagName === "TEXTAREA") {
        text = field.value;
      } else if (field.classList.contains("ql-editor")) {
        text = field.innerText || field.textContent;
      } else if (field.tagName === "INPUT" && field.type === "text") {
        text = field.value;
      }

      if (text.trim() === "") {
        return;
      }

      checkWordsInText(text, field);
    });
  } else {
    console.log("Страница не соответствует условию URL.");
  }
}

function checkWordsInText(text, field) {
  const cleanText = text
    .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 2);

  let foundStopWords = [];
  let foundCapsLockWords = [];

  // Проверяем каждое слово на наличие стоп-слов и капслока
  cleanText.forEach((word) => {
    const result = fuse.search(word);
    if (result.length > 0) {
      result.forEach((match) => {
        const stopWordPattern = new RegExp(`${match.item}`, "i"); // Проверяем наличие стоп-слова
        if (stopWordPattern.test(word)) {
          foundStopWords.push(word);
        }
      });
    }
  });

  // Проверка на капс
  const capsLockPattern = /[A-ZА-Я]{3,}/;
  const words = text.split(/\s+/); // Разделяем текст на слова для проверки капс-слов без очистки символов

  words.forEach((word) => {
    if (capsLockPattern.test(word)) {
      foundCapsLockWords.push(word);
    }
  });

  if (foundStopWords.length > 0 || foundCapsLockWords.length > 0) {
    field.style.boxShadow = "inset 0px 0px 5px 2px rgba(255, 0, 0, 0.4)";

    const stopWordSpan = document.createElement("span");
    stopWordSpan.style.color = "red";
    stopWordSpan.style.fontWeight = "bold";
    stopWordSpan.style.marginLeft = "10px";
    stopWordSpan.style.display = "block";

    if (foundStopWords.length > 0) {
      const stopWordsDiv = document.createElement("div");
      stopWordsDiv.textContent = `Стоп-слова: ${foundStopWords.join(", ")}`;
      stopWordSpan.appendChild(stopWordsDiv);
    }

    if (foundCapsLockWords.length > 0) {
      const capsLockWordsDiv = document.createElement("div");
      capsLockWordsDiv.textContent = `Слова капсом: ${foundCapsLockWords.join(", ")}`;
      stopWordSpan.appendChild(capsLockWordsDiv);
    }

    if (!field.nextSibling || field.nextSibling.tagName !== "SPAN") {
      field.parentNode.insertBefore(stopWordSpan, field.nextSibling);
    }
  }
}

// == Удаление подсветки и span для всех текстовых полей == //
function removeStopWordHighlights() {
  const highlightedFields = document.querySelectorAll('input[type="text"], textarea, .ql-editor');

  highlightedFields.forEach((field) => {
    field.style.boxShadow = "";
    if (field.nextSibling && field.nextSibling.tagName === "SPAN") {
      field.parentNode.removeChild(field.nextSibling);
    }
  });
}

// == Функция для увеличения ширины поля заголовка == //
if (
  window.location.href.startsWith("https://admin.kazanexpress.ru/kazanexpress/product/") &&
  window.location.href.includes("/change/")
) {
  const inputElement = document.getElementById("id_title");

  if (inputElement) {
    inputElement.style.width = "50vw";
    console.log("Поменял размер");
  } else {
    console.log("Элемент с id 'id_title' не найден");
  }
}
