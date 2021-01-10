import React from 'react';
import './NewsCard.css';

function NewsCard(props) {
  const { image, date, title, text, source, keyword, tooltip, iconSave, url } = props;
  const [isSavedMark, setIsSavedMark] = React.useState(false);

  function handleSavedMark() {
    isSavedMark ? setIsSavedMark(false) : setIsSavedMark(true)
  }

  return (
    <div className="news-card">
      {
        iconSave ?
          <button type="button" className={`${isSavedMark ? "news-card__button-save-mark" : "news-card__button-save"}`} onClick={handleSavedMark} />
          :
          <button type="button" className="news-card__button-remove" />
      }
      <div className="news-card__tooltip" >{tooltip}</div>
      {keyword && <div className="news-card__keyword">{keyword}</div>}
      <a href={url} className="news-card__link" target="_blank" rel="noreferrer">
        <img className="news-card__image" src={image} alt={title} />
        <div className="news-card__info">
          <p className="news-card__date">{date}</p>
          <h1 className="news-card__title">{title}</h1>
          <p className="news-card__text">{text}</p>
          <p className="news-card__source">{source}</p>
        </div>
      </a>

    </div>
  );
}

export default NewsCard;