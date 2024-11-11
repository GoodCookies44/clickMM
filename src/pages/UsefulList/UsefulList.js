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
    <section className="useful__list">
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
          <>
            <LinkItem
              url={
                "https://docs.google.com/spreadsheets/d/1KrqTTjbf9aoqXIVOhAvkfebCsrvX_CQo8as16lWYEtU/"
              }
              title={"Анализ классификатора"}
            />
            <LinkItem
              url={
                "https://docs.google.com/spreadsheets/d/12bOTIk_-4dU9P7yBIDIAudOAUMNpi0L7dw09EjLLs1o/"
              }
              title={"План"}
            />
            <LinkItem
              url={
                "https://docs.google.com/spreadsheets/d/1qllK1yzZ07rPpzZ4EZwBO5S7tYJ-d3q8z6I_EcqOnoQ/"
              }
              title={"Отчёт"}
            />
            <LinkItem
              url={
                "https://docs.google.com/spreadsheets/d/1BjyeoWvFgrwte0OYizJruUgX_h2QL6FGk6Dh2-tN9wY/"
              }
              title={"Выгрузка товаров с некорректными категориями"}
            />
            <LinkItem
              url={
                "https://docs.google.com/spreadsheets/d/1Q0fU3OcAv7UGQa7wBKfx6vxkBAKWFhsAL6uEjoLPWtE"
              }
              title={"KPI"}
            />
            <LinkItem
              url={"https://docs.google.com/spreadsheets/d/1cgqFRIaFPr7fl0rr_uJHqIVd-nsG_eQJ/"}
              title={"Тип съёмки по категориям"}
            />
            <LinkItem
              url={
                "https://docs.google.com/spreadsheets/d/1JAqq_eO2PWO-XrqDWB4lUTsxd5auXhh4xNSwD64cOAo/"
              }
              title={"Запросы от Асессора по фильтрам"}
            />
            <LinkItem
              url={
                "https://docs.google.com/spreadsheets/d/1BB7dOuYf5Mi5y_VdQAoQdmJQUSP65lN3vU_jsa2uLhQ/"
              }
              title={"Запросы от КД"}
            />
            <br />
          </>
        )}
        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1M9A1F1QkCLCNWXw7Jjb2txhQeuo8W3hzaKyx3yCXuWA/"
          }
          title={"Таблица УМФ"}
        />
        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1P0df-lvT2yneg1QnDeBoJbh2MgcFaEiOUmo-gCPpA90/"
          }
          title={"Таблица массового УМФ от селлеров"}
        />
        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1WXSpN7R0OgvDLD6EyP9jnjYxXAXpTfdOonEcLpcEbHw/"
          }
          title={"Таблица ОНГ"}
        />
        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1yNYoSKsCGJqHQWjUFoVm9b1hYWXlVOm-ttCngzq9FAM/"
          }
          title={"Таблица с заявками на блюр"}
        />

        <h2>Инструкции</h2>

        {username === "Антон" && (
          <>
            <LinkItem
              url={
                "https://wiki.yandex.ru/drpknowledgebase/moderacija/asessory/asessor-po-katalogu/"
              }
              title={"Wiki Асессора"}
            />
            <h4>
              Логин: <ListItem text="asessor_om@kazanexpress.tech" />
            </h4>
            <h4>
              Пароль: <ListItem text="3lJWtC*r" />
            </h4>

            <LinkItem
              url={"https://seller-manual.mm.ru/product-preparation#product-size-restrictions"}
              title={"Требования для приёмки товара на склад"}
            />

            <br />
          </>
        )}

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
          url={"https://docs.google.com/document/d/1qyYymTghihebFpa_JacU0_25w26hQqcS5M4FCLSt8R4/"}
          title={"Запрещённые к продаже товары"}
        />
        <LinkItem
          url={"https://docs.google.com/document/d/1-oyaG_R9z2Mnb2Y3VYR9zSgvzSYWtO8Ov9n0eIXkPtM/"}
          title={"Порядок разблокировки при вывозе товара"}
        />
        <LinkItem
          url={"https://docs.google.com/document/d/19DsYNyeAxqCHKem9nnnayeLvEWwMX2T8IQHc62b3l1Y/"}
          title={"Инструкция по работе модератора"}
        />
        <LinkItem
          url={"https://docs.google.com/document/d/11ma-uLytSlroAyng0SDuNWz-OY0NGOuE6Zz6Z19ISu4/"}
          title={"Порядок работы по УМФ"}
        />
        <LinkItem
          url={"https://docs.google.com/document/d/1KMH_yEn2eDWPmm5XCwzyLCCkbT764ZDYjEPO1cIRYeg/"}
          title={"Критерии фотографий УМФ"}
        />
        <LinkItem
          url={"https://business.kazanexpress.ru/manual/photo-moderation-lite/"}
          title={"Критерии фотографий УМФ (KazanExpress Business)"}
        />
        <LinkItem
          url={"https://docs.google.com/document/d/1fM5-GB8ZGifjzDWb5S1X8V8Yq_1ReIxfzvXXiNOzzbg/"}
          title={"Инструкция по заполнению шаблона на проверку фото"}
        />

        <h2>Шаблоны</h2>
        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/13C9Ch1TQpnsjVyLi4TpaoDGO1Y87KUxUBbbho3fAknI/"
          }
          title={"Шаблон на модерацию фото (УМФ)"}
        />
        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1JVoG9NpVjs3nXDiWgwdqmWkaEqljrMh1VPmVHXqnNNg/"
          }
          title={"Шаблон на массовую модерацию фото"}
        />

        <h2>Графики</h2>
        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/19uJP8qXDdpxmBf6UGFjSTewYD54Q4YtBCo129JYPfkA/"
          }
          title={"График работы"}
        />
        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1jIcZkk4i02I97jUf80nBhousc1mzWWJ1OtaeUcE3SH8/"
          }
          title={"График отпусков"}
        />
        <LinkItem
          url={
            "https://docs.google.com/spreadsheets/d/1P65IkBz3B1HVULGp2j9tnnqG98QO5vje6-4ab_sY8iI/"
          }
          title={"План"}
        />

        <h2>Прочее</h2>
        <LinkItem
          url={"https://www.devicespecifications.com/ru"}
          title={"Сайт для поиска размеров экрана телефонов"}
        />

        <LinkItem
          url={
            "https://calendar.google.com/calendar/u/0?cid=ZTkwZmEwYjkzNDU1Y2RmZmM3OTc1ODU0ZmZlZjc3NGM5NzRhY2MwYjczNzRjM2UzYjVlN2NmMTVjNzk5ZjdhY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
          }
          title={"Ссылка на календарь с Днями Рождения"}
        />
      </ul>
    </section>
  );
}

LinkItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
