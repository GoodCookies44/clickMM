//Модули
import React, {useContext} from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
import ResetCountersButton from "../../components/ResetCountersButton/ResetCountersButton";
import {CounterContext} from "../../components/Context/CounterContext";
// Стили
import "./CategoryPage.css";

export default function CategoryPage() {
  const {categoryNames, updateCategoryName} = useContext(CounterContext);

  const handleInputChange = (e) => {
    const {id, value} = e.target;
    updateCategoryName(id, value);
  };

  return (
    <>
      <section className="counter__section FP">
        <ResetCountersButton
          counterIds={[
            "Category_processed",
            "Lines_processed",
            "Category_submit",
            "Category_accepted",
          ]}
          textareaIds={["CategoryName_submit", "CategoryName_accepted"]}
        />
        <div className="counters__container">
          <div className="container__FP">
            Обработано запросов
            <Counter id="Category_processed" />
          </div>
          <div className="container__FP">
            Обработано строк
            <Counter id="Lines_processed" />
          </div>
          <div className="container__FP">
            Внесено предложений
            <Counter id="Category_submit" />
          </div>
          <textarea
            className="notepad__textarea"
            id="CategoryName_submit"
            value={categoryNames.CategoryName_submit}
            onChange={handleInputChange}
          />
          <div className="container__FP" id="category">
            Выполнено предложений
            <Counter id="Category_accepted" />
          </div>
          <textarea
            className="notepad__textarea"
            id="CategoryName_accepted"
            value={categoryNames.CategoryName_accepted}
            onChange={handleInputChange}
          />
        </div>
      </section>
    </>
  );
}
