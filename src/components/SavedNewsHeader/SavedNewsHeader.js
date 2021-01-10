import React from 'react';
import './SavedNewsHeader.css';

const SavedNewsHeader = () => {

  return (
    <section className='news'>
      <p className='news__info'>Сохраненные статьи</p>
      <h1 className='news__title'>Георгий, у вас 3 сохранённых статьи</h1>
      <span className='news__keywords'>По ключевым словам: <span className='news__tag'>Природа и Тайга</span>
      </span>
    </section>
  )
}

export default SavedNewsHeader;