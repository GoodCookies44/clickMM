// Модули
import React from "react";
// Компоненты
import Counter from "../../components/Counter/Counter";
// Стили
import "./MFPPage.css";

function MFPPage() {
  return (
    <div>
      <section className="counter__section">
        <div className="container__MFP">
          Запросы
          <Counter id="MFP_request" initialValue={0} />
        </div>
        <div className="container__MFP">
          ШК
          <Counter id="MFP_SHK" initialValue={0} />
        </div>
        <div className="container__MFP">
          Принято
          <Counter id="MFP_accepted" initialValue={0} />
        </div>
        <div className="container__MFP">
          Отклонено
          <Counter id="MFP_rejected" initialValue={0} />
        </div>
        <div className="container__MFP">
          На доработку
          <Counter id="MFP_revision" initialValue={0} />
        </div>
      </section>
    </div>
  );
}
export default MFPPage;
