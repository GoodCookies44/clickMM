// Модули
import React, {useState} from "react";
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
  const [username] = useState(localStorage.getItem("username") || "");

  return (
    <div className="useful__list">
      <ul>
        <h3>Пароль Wi-fi:</h3>
        <ListItem text="Kaz334SS" />

        <h2>Аккаунты</h2>
        <LinkItem url={"https://admin.kazanexpress.ru/"} title={"Админка"} />
        <LinkItem url={"https://magnit-market.kaiten.ru/space/351107/lists"} title={"Kaiten"} />
        <h4>
          Логин: <ListItem text="moderator.om@kazanexpress.tech" />
        </h4>
        <h4>
          Пароль: <ListItem text="Jd%2eovS" />
        </h4>
        <h3>Аккаунт Отдела модерации</h3>
        <h4>
          Логин: <ListItem text="marketmoderationdepartment@gmail.com" />
        </h4>
        <h4>
          Пароль: <ListItem text="3aNY-Yc5yj" />
        </h4>

        <h2>Рабочие таблицы</h2>
        {username === "Антон" && (
          <div>
            <LinkItem
              url={
                "https://docs.google.com/spreadsheets/d/1KrqTTjbf9aoqXIVOhAvkfebCsrvX_CQo8as16lWYEtU/"
              }
              title={"Анализ классификатора"}
            />
            <LinkItem
              url={
                "https://docs.google.com/spreadsheets/d/1qllK1yzZ07rPpzZ4EZwBO5S7tYJ-d3q8z6I_EcqOnoQ/"
              }
              title={"Отчёт"}
            />
            <LinkItem
              url={
                "https://docs.google.com/document/d/19vJrL2C-nguTUhRlVuJSS_biq97AL5kAvoJdsgEDJes/edit"
              }
              title={"План"}
            />
            <LinkItem
              url={
                "https://docs.google.com/spreadsheets/d/1BjyeoWvFgrwte0OYizJruUgX_h2QL6FGk6Dh2-tN9wY/edit?gid=267250902#gid=267250902"
              }
              title={"Выгрузка товаров с некорректными категориями"}
            />
            <LinkItem
              url={
                "https://docs.google.com/spreadsheets/d/1Q0fU3OcAv7UGQa7wBKfx6vxkBAKWFhsAL6uEjoLPWtE/edit?gid=1459894447#gid=1459894447"
              }
              title={"KPI"}
            />
            <LinkItem
              url={"https://docs.google.com/spreadsheets/d/1cgqFRIaFPr7fl0rr_uJHqIVd-nsG_eQJ/"}
              title={"Тип съёмки по категориям"}
            />
            <LinkItem
              url={
                "https://docs.google.com/spreadsheets/d/1BB7dOuYf5Mi5y_VdQAoQdmJQUSP65lN3vU_jsa2uLhQ/edit?gid=0#gid=0"
              }
              title={"Запросы от КД"}
            />
            <LinkItem
              url={
                "https://docs.google.com/spreadsheets/d/1c2SwGJFlaPcxKGe76yU_u_vPWxYAFF1h3BDwNdlpoOI/edit?pli=1&gid=0#gid=0 "
              }
              title={"Черновик фильтров"}
            />
          </div>
        )}
        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1M9A1F1QkCLCNWXw7Jjb2txhQeuo8W3hzaKyx3yCXuWA/edit#gid=743757286"
          }
          title={"Таблица УМФ"}
        />
        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1P0df-lvT2yneg1QnDeBoJbh2MgcFaEiOUmo-gCPpA90/edit?gid=0#gid=0"
          }
          title={"Таблица массового УМФ от селлеров"}
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
            "https://docs.google.com/document/d/1-oyaG_R9z2Mnb2Y3VYR9zSgvzSYWtO8Ov9n0eIXkPtM/edit"
          }
          title={"Порядок разблокировки при вывозе товара"}
        />
        <LinkItem
          url={
            "https://docs.google.com/document/d/19DsYNyeAxqCHKem9nnnayeLvEWwMX2T8IQHc62b3l1Y/edit"
          }
          title={"Инструкция по работе модератора"}
        />
        <LinkItem
          url={
            "https://docs.google.com/document/d/11ma-uLytSlroAyng0SDuNWz-OY0NGOuE6Zz6Z19ISu4/edit"
          }
          title={"Порядок работы по УМФ"}
        />
        <LinkItem
          url={
            "https://docs.google.com/document/d/1KMH_yEn2eDWPmm5XCwzyLCCkbT764ZDYjEPO1cIRYeg/edit"
          }
          title={"Критерии фотографий УМФ"}
        />
        <LinkItem
          url={"https://business.kazanexpress.ru/manual/photo-moderation-lite/"}
          title={"Критерии фотографий УМФ (KazanExpress Business)"}
        />

        <h2>Формы</h2>
        <LinkItem
          url={
            "https://docs.google.com/forms/d/e/1FAIpQLSeyL4ojEf5p8luNazBbrc6fuJAYZ58Lx1ebxc1uX6rd7zZ28w/viewform"
          }
          title={"Запрос на модерацию фото (УМФ)"}
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
            "https://docs.google.com/spreadsheets/d/1jIcZkk4i02I97jUf80nBhousc1mzWWJ1OtaeUcE3SH8/edit#gid=0"
          }
          title={"График отпусков"}
        />
        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1BB_NBFLc_HbStfT2_sHvdCj9Ti-NYh5Hk89w5uNAnnI/edit?usp=sharing"
          }
          title={"План"}
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
