// Модули
import React from "react";
import PropTypes from "prop-types";
// Компоненты
import ListItem from "../../components/ListItem/ListItem";
// Стили
import "./UsefulList.css";

function LinkItem({url, title}) {
  return (
    <li>
      <h3>
        <a href={url} target="_blank" rel="nofollow noopenner noreferrer">
          {title}
        </a>
      </h3>
    </li>
  );
}

export default function UsefulList() {
  return (
    <div className="useful__list">
      <ul>
        <h3>Пароль Wi-fi:</h3>
        <ListItem text="Kaz334SS" />

        <h2>Аккаунты</h2>
        <LinkItem url={"https://admin.kazanexpress.ru/"} title={"Админка"} />

        <LinkItem
          url={
            "https://trello.com/b/OMWvPtZB/%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81-%D0%BC%D0%BE%D0%B4%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D1%8F"
          }
          title={"Trelo"}
        />
        <h4>
          Логин: <ListItem text="marketmoderationdepartment@gmail.com" />
        </h4>
        <h4>
          Пароль: <ListItem text="3aNY-Yc5yj" />
        </h4>

        <LinkItem url={"https://magnit-market.kaiten.ru/space/349342/lists"} title={"Kaiten"} />
        <h4>
          Логин: <ListItem text="moderator.om@kazanexpress.tech" />
        </h4>
        <h4>
          Пароль: <ListItem text="Jd%2eovS" />
        </h4>

        <h2>Инструкции</h2>

        <LinkItem
          url={"https://wiki.yandex.ru/drpknowledgebase/moderacija/moderator/"}
          title={"Wiki"}
        />
        <h4>
          Логин: <ListItem text="moderator.om@kazanexpress.tech" />
        </h4>
        <h4>
          Пароль: <ListItem text="Jd%2eovS" />
        </h4>

        <LinkItem
          url={
            "https://business.kazanexpress.ru/manual/2.seller-requirements/#_2-2-%D0%B7%D0%B0%D0%BF%D1%80%D0%B5%D1%89%D0%B5%D0%BD%D0%BD%D1%8B%D0%B8-%D0%BA-%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B6%D0%B5-%D1%82%D0%BE%D0%B2%D0%B0%D1%80"
          }
          title={"Запрещённые к продаже товары (KazanExpress Business)"}
        />

        <LinkItem
          url={
            "https://docs.google.com/document/d/1qyYymTghihebFpa_JacU0_25w26hQqcS5M4FCLSt8R4/edit"
          }
          title={"Запрещённые к продаже товары"}
        />

        <LinkItem
          url={
            "https://docs.google.com/document/d/19DsYNyeAxqCHKem9nnnayeLvEWwMX2T8IQHc62b3l1Y/edit"
          }
          title={"Инструкция по работе модератора"}
        />

        <LinkItem
          url={
            "https://docs.google.com/document/d/15BJUl0IZugXHFFU-hYjVe9UK4B7pHV_qFKX9SjHtID8/edit#heading=h.agkb70ksq255"
          }
          title={"Порядок работы по МФП"}
        />

        <LinkItem
          url={
            "https://business.kazanexpress.ru/manual/photo-moderation/#_1-%D0%BC%D0%B0%D0%BB%D0%BE-%D1%84%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B8"
          }
          title={"Критерии фотографий МФП"}
        />

        <LinkItem
          url={
            "https://docs.google.com/document/d/11ma-uLytSlroAyng0SDuNWz-OY0NGOuE6Zz6Z19ISu4/edit"
          }
          title={"Порядок работы по УМФ"}
        />
        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1_usX24awN6NWMahyTMsOgVJ__WXc8M3f5sb0py_uX_Y/edit#gid=0"
          }
          title={"Категории для УМФ"}
        />
        <LinkItem
          url={
            "https://docs.google.com/document/d/1KMH_yEn2eDWPmm5XCwzyLCCkbT764ZDYjEPO1cIRYeg/edit"
          }
          title={"Критерии фотографий УМФ"}
        />

        <h2>Графики</h2>

        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/19uJP8qXDdpxmBf6UGFjSTewYD54Q4YtBCo129JYPfkA/edit?usp=sharing"
          }
          title={"График работы"}
        />

        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1BB_NBFLc_HbStfT2_sHvdCj9Ti-NYh5Hk89w5uNAnnI/edit?usp=sharing"
          }
          title={"План"}
        />

        <h2>Рабочие таблицы</h2>

        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1IaH1z6zcInuMo6WTle3bwZ6GfFccrarMGetF9kdS1Do/edit#gid=47083152"
          }
          title={"Таблица МФП №1"}
        />

        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1rt8qTbC8is9wvlWgtq69fvuhW07bpjqf3Cz8H2gY3lw/edit#gid=652114021"
          }
          title={"Таблица МФП №2"}
        />

        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1IeFHrpChv_TB4YwrbKnIG_tag8nT0fqLMwtOC9PPtp0/edit#gid=1369042334"
          }
          title={"Таблица УМФ №1"}
        />

        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1KRjHA9SgUtzb-UtTvsQrld5Kl_svVym3aT5ZHsciqaw/edit#gid=1142747448"
          }
          title={"Таблица УМФ №2"}
        />

        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1WXSpN7R0OgvDLD6EyP9jnjYxXAXpTfdOonEcLpcEbHw/edit#gid=957078154"
          }
          title={"Таблица ОНГ"}
        />

        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1yNYoSKsCGJqHQWjUFoVm9b1hYWXlVOm-ttCngzq9FAM/edit#gid=60749704"
          }
          title={"Таблица с заявками на блюр"}
        />

        <h2>Формы</h2>

        <LinkItem
          url={
            "https://docs.google.com/forms/d/e/1FAIpQLSfmzJaK1KObwJQ930Bq7ehJtclW1QfNdVYeI2T_aRSZzT4Qbg/viewform"
          }
          title={"Запрос на модерацию фото (МФП №1)"}
        />

        <LinkItem
          url={
            "https://docs.google.com/forms/d/e/1FAIpQLSe_0msnpS70TuZG0cqN5HKx4Q4yaFmcbTS3CkyXOt3fL9qLWg/viewform"
          }
          title={"Запрос на модерацию фото (МФП №2)"}
        />

        <h2>Прочее</h2>

        <LinkItem
          url={"https://www.devicespecifications.com/ru"}
          title={"Сайт для поиска размеров экрана телефонов"}
        />
      </ul>
    </div>
  );
}

LinkItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
