import React, { useContext } from 'react';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import NotFound from '../NotFound/NotFound';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import { NewsContext } from '../../contexts/NewsContext';

const Main = (props) => {
  const {
    loggedIn,
    handleSearch,
    isSearch,
    onCardClick,
    onShowMore,
    currentRow,
    isLoading,
    pathname
  } = props;

  const { news, savedNews } = useContext(NewsContext);

  const newsToRender = news.slice(0, (currentRow + 1) * 3);

  return (
    <section className='main'>
      <SearchForm handleSearch={handleSearch} isLoading={isLoading} />
      {
        isLoading && (<Preloader />)
      }
      {
        isSearch && <>
          {
            newsToRender.length ? (<>
              <NewsCardList
                newsToRender={newsToRender}
                loggedIn={loggedIn}
                savedNews={savedNews}
                onCardClick={onCardClick}
                currentRow={currentRow}
                pathname={pathname} />
              {
                newsToRender.length !== news.length &&
                <div className='main__overlay-button'>
                  <button onClick={onShowMore} className='main__show'>Показать еще</button>
                </div>
              }
            </>) : <NotFound />
          }
        </>
      }
      <About />
    </section>
  )
}

export default Main;