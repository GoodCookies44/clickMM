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
