import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import card1 from '../../images/card1.svg';
import card2 from '../../images/card2.svg';
import card3 from '../../images/card3.svg';
import card4 from '../../images/card4.png';
import card5 from '../../images/card5.png';
import card6 from '../../images/card6.png';

function NewsCardList({ pathname }) {
  return (
    <section className="news-card-list">
      {
        pathname === "/saved-news"
          ?
          <div className="news-card-list__container">
            <NewsCard
              image={card1}
              date="2 августа, 2019"
              title="Национальное достояние – парки"
              text="В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе."
              source="Лента.ру"
              keyword="Природа"
              tooltip="Убрать из сохранённых"
              iconSave={false}
              url="https://lenta.ru"
            />
            <NewsCard
              image={card2}
              date="2 августа, 2019"
              title="Лесные огоньки: история одной фотографии"
              text="Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы."
              source="Медуза"
              keyword="Природа"
              tooltip="Убрать из сохранённых"
              iconSave={false}
              url="https://meduza.io"
            />
            <NewsCard
              image={card3}
              date="2 августа, 2019"
              title="Национальное достояние – парки"
              text="В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе."
              source="Риа"
              keyword="Тайга"
              tooltip="Убрать из сохранённых"
              iconSave={false}
              url="https://ria.ru"
            />
          </div>
          :
          <>
            <h2 className='news-card-list__title'>Результаты поиска</h2>
            <div className="news-card-list__container">

              <NewsCard
                image={card4}
                date="2 августа, 2019"
                title="Национальное достояние – парки"
                text="В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе."
                source="Лента.ру"
                tooltip="Войдите, чтобы сохранять статьи"
                iconSave={true}
                url="https://lenta.ru"
              />
              <NewsCard
                image={card5}
                date="2 августа, 2019"
                title="Лесные огоньки: история одной фотографии"
                text="Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы."
                source="Медуза"
                tooltip="Войдите, чтобы сохранять статьи"
                iconSave={true}
                url="https://meduza.io"
              />
              <NewsCard
                image={card6}
                date="2 августа, 2019"
                title="«Первозданная тайга»: новый фотопроект Игоря Шпиленка"
                text="В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе."
                source="Риа"
                tooltip="Войдите, чтобы сохранять статьи"
                iconSave={true}
                url="https://ria.ru"
              />
            </div>
            <button className='news-card-list__more'>Показать еще</button>

          </>
      }
    </section>
  );
}

export default NewsCardList;