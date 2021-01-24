import React from 'react';
import './ZeroNews.css';

function ZeroNews() {
  return (
    <section className="zero-news">
      <div className="zero-news__container">
        <span className='zero-news__icon'></span>
        <h3 className="zero-news__title">Ничего не найдено</h3>
        <p className="zero-news__paragraph">Вы можете добавить новости на главной странице.</p>
      </div>
    </section>
  );
}

export default ZeroNews;