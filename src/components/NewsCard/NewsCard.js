import React, { useContext } from 'react';
import { NewsContext } from '../../contexts/NewsContext';
import { useLocation } from 'react-router-dom';
import './NewsCard.css';

function NewsCard(props) {
  const {
    loggedIn, onCardClick, article
  } = props;

  const { keyword, title, description, publishedAt, url, urlToImage, source } = article;

  const { savedNews } = useContext(NewsContext);
  const location = useLocation();

  const isSaved = loggedIn
    && savedNews.some((i) => i.publishedAt === article.publishedAt
      && i.title === article.title);

  const options = {
    month: 'long',
    day: 'numeric',
  };

  const date = new Date(publishedAt);
  const dayAndMonth = date.toLocaleString('ru', options);
  const fullDate = dayAndMonth + ', ' + date.getFullYear();

  const tooltipText =
    (!loggedIn)
      ? 'Войдите, чтобы сохранять статьи'
      : `${isSaved && 'Убрать из сохранённых'}`;

  function handleCardButtonClick() {
    onCardClick(article);
  }

  return (
    <div className="news-card">
      { location.pathname === '/saved-news'
        ? <span className='news-card__tag news-card__tag_position-left'>{keyword}</span>
        : ''}
      {
        (location.pathname === '/' && !isSaved) &&
        <div className='news-card__button-save' onClick={handleCardButtonClick} ></div>
      }
      {
        (location.pathname === '/' && isSaved) &&
        (<div className='news-card__button-save-mark' onClick={handleCardButtonClick} ></div>)
      }
      {
        location.pathname !== '/' &&
        (<div className='news-card__button-remove' onClick={handleCardButtonClick} ></div>)
      }
      { (!loggedIn || (loggedIn && isSaved)) &&
        <span className={`news-card__tooltip`}>{tooltipText}</span>}
      <a href={url} className="news-card__link" target="_blank" rel="noreferrer">
        <img className="news-card__image" src={urlToImage} alt={title} />
        <div className="news-card__container">
          <p className="news-card__date">{fullDate}</p>
          <h1 className="news-card__title">{title}</h1>
          <p className="news-card__text">{description}</p>
          <p className="news-card__source">{location.pathname === '/' ? source.name : source}</p>
        </div>
      </a>
    </div>
  );
}

export default NewsCard;