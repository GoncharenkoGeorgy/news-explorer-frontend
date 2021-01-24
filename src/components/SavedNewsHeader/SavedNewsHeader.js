import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NewsContext } from '../../contexts/NewsContext';
import './SavedNewsHeader.css';

const SavedNewsHeader = ({ loggedIn }) => {

  const currentUser = React.useContext(CurrentUserContext);
  const { savedNews } = React.useContext(NewsContext);

  const keywords = loggedIn ? savedNews.map(item => item.keyword) : [];

  const numberOfArticles = (num) => {
    if (num % 10 === 1) {
      return "сохраненная статья";
    }
    if (num % 10 > 1 && num % 10 < 5) {
      return "сохранённых статьи";
    } else {
      return "сохранённых статей";
    }
  };

  const endingOfArticles = (array) => {
    if (array.length % 10 === 4) {
      return '-му'
    }
    else if (array.length % 10 > 4 && array.length % 10 < 8) { return '-м' }
    else { return '-и' }
  }

  const declineOfArticles = (array) => {
    if (array.length % 10 === 4) {
      return ' другому'
    } else { return ' другим' }
  }

  const keywordsSorted = [...new Set(keywords)]
    .map(value => {
      const item = {};
      item.keyword = value;
      item.quantity = keywords.filter(str => str === value).length;
      return item;
    })
    .sort((a, b) => b.quantity - a.quantity)
    .map(item => item.keyword);

  const keywordsToRender = keywordsSorted.length <= 3
    ? keywordsSorted.join(', ')
    : `${keywordsSorted
      .slice(0, 3)
      .join(', ')} и ${keywordsSorted
        .slice(3)
        .length}${endingOfArticles(keywordsSorted)}${declineOfArticles(keywordsSorted)}`;

  return (
    <div className='saved-news'>
      <p className='saved-news__info'>Сохраненные статьи</p>
      <h1 className='saved-news__title'>{currentUser.name}, у вас {savedNews.length} {numberOfArticles(savedNews.length)}</h1>
      <span className='saved-news__keywords'>По ключевым словам:
        <span className='saved-news__tag'> {keywordsToRender}</span>
      </span>
    </div>
  )
}

export default SavedNewsHeader;