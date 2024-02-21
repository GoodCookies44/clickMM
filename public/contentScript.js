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

// Функция для обработки события наведения на изображение
function handleImageHover(event) {
  const img = event.target;
  const tooltip = createTooltipElement();
  tooltip.textContent = `Size: ${img.naturalWidth}x${img.naturalHeight}`;
  tooltip.style.position = "absolute";
  tooltip.style.top = `${event.pageY}px`;

  // Устанавливаем left так, чтобы всплывающее окно было справа от курсора
  const offsetX = 15; // Можете изменить значение смещения по вашему усмотрению
  tooltip.style.left = `${event.pageX + offsetX}px`;

  document.body.appendChild(tooltip);

  // Обработчик для скрытия информации при перемещении курсора с изображения
  const mouseMoveHandler = (event) => {
    tooltip.style.top = `${event.pageY}px`;
    tooltip.style.left = `${event.pageX + offsetX}px`;
  };

  // Обработчик для скрытия информации при уходе курсора с изображения
  const mouseOutHandler = () => {
    document.body.removeChild(tooltip);
    img.removeEventListener("mousemove", mouseMoveHandler);
    img.removeEventListener("mouseout", mouseOutHandler);
  };

  img.addEventListener("mousemove", mouseMoveHandler);
  img.addEventListener("mouseout", mouseOutHandler);
}

// Обработчик события для проверки нажатия клавиши Alt при движении мыши над изображением
function handleMouseMove(event) {
  if (event.altKey) {
    handleImageHover(event);
  }
}

// Находим все изображения на странице и добавляем обработчик события наведения на них
const images = document.getElementsByTagName("img");
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("mousemove", handleMouseMove);
}

//Функция изменения регистра
let selectedText = ""; // Переменная для хранения выделенного текста

// Функция для обработки нажатия комбинации клавиш
function handleKeyPress(event) {
  // Проверяем, нажата ли клавиша Alt
  if (event.altKey) {
    // Если нажата клавиша "a"
    if (event.key === "a") {
      // Получаем выделенный текст на странице
      selectedText = window.getSelection().toString();

      // Если есть выделенный текст
      if (selectedText) {
        // Меняем регистр слов
        selectedText = toggleCase(selectedText);

        // Заменяем выделенный текст на измененный
        document.execCommand("insertText", false, selectedText);
      }
    }
    // Если нажата клавиша "s"
    else if (event.key === "s") {
      // Получаем выделенный текст на странице
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        // Получаем текст из выделения
        const selectedText = selection.toString();
        // Разделяем текст на слова
        const words = selectedText.split(" ");
        // Изменяем регистр первой буквы каждого слова
        const capitalizedWords = words.map((word) => capitalizeFirstLetter(word));
        // Обновляем выделение текста с изменённым регистром
        document.execCommand("insertText", false, capitalizedWords.join(" "));
      }
    }
  }
}

// Добавляем слушателя событий для обработки нажатия клавиш
document.addEventListener("keydown", handleKeyPress);

// Функция для изменения регистра слов
function toggleCase(text) {
  // Разделяем текст на массив слов
  const words = text.split(" ");

  // Меняем регистр каждого слова
  const toggledWords = words.map((word, index) => {
    // Если это первое слово, делаем первую букву заглавной
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else {
      return word.toLowerCase(); // Делаем остальные слова строчными
    }
  });

  // Соединяем массив слов обратно в строку
  return toggledWords.join(" ");
}

// Функция для изменения регистра первой буквы слова на заглавную
function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
