//Модули
import React, {useContext, useState} from "react";
// Компоненты
import {CounterContext} from "../Context/CounterContext";
// Стили
import "./Notepad.css";

export default function Notepad() {
  const {notepadContent, saveNotepadContent} = useContext(CounterContext);
  const [isEditable, setIsEditable] = useState(notepadContent !== "");
  const [textareaValue, setTextareaValue] = useState(notepadContent);

  const handleButtonClick = () => {
    setIsEditable(true);
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatNumbersWithSpaces(value);
    setTextareaValue(formattedValue);
  };

  const handleBlur = () => {
    saveNotepadContent(textareaValue);
    if (textareaValue.trim() === "") {
      setIsEditable(false);
    }
  };

  const formatNumbersWithSpaces = (text) => {
    return text.replace(/(\d)([,.])(\d)/g, "$1 $2 $3");
  };

  return (
    <>
      {isEditable ? (
        <textarea
          className="notepad__textarea"
          value={textareaValue}
          onChange={handleTextChange}
          onBlur={handleBlur}
        />
      ) : (
        <button className="notepad__button" onClick={handleButtonClick}>
          Блокнот
        </button>
      )}
    </>
  );
}
