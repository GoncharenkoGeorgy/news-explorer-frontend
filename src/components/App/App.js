import React from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../../utils/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NewsContext } from '../../contexts/NewsContext';
import * as newsApi from '../../utils/NewsApi'
import * as mainApi from '../../utils/MainApi';
// import * as auth from '../../utils/auth';

const App = () => {

  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const [news, setNews] = React.useState([]);
  const [savedNews, setSavedNews] = React.useState([]);

  const [error, setError] = React.useState('');
  const [isSearch, setIsSearch] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(0);

  const [disabled, setDisabled] = React.useState(false);

  const history = useHistory();
  const location = useLocation();

  function handleNewsSearch(keyword, setErrorMessage) {
    if (!keyword) {
      setErrorMessage('Нужно ввести ключевое слово');
      return;
    }
    setLoading(true);
    setIsSearch(false);
    setCurrentRow(0);
    newsApi
      .getNews(keyword)
      .then((res) => {
        const news = res.articles.map((item) => ({ ...item, keyword }));
        setNews(news);
        localStorage.setItem('news', JSON.stringify(news));
        setIsSearch(true);
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке новостей: ${err}`);
      })
      .finally(() => setLoading(false));
  };

  function handleShowMore() {
    setCurrentRow(currentRow + 1);
  };

  function handleLoginPopup() {
    setIsLoginPopupOpen(true);
  };

  function handleTogglePopup() {
    setIsLoginPopupOpen(!isLoginPopupOpen);
    setIsRegisterPopupOpen(!isRegisterPopupOpen);
    setError('');
  };

  function handleOpenLogin() {
    setIsConfirmPopupOpen(false);
    setIsLoginPopupOpen(true);
    setError('');
  };

  function closeAllPopups() {
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setError('');
  };

  function handleLogin(email, password) {
    setDisabled(true);
    mainApi.authorize(email, escape(password))
      .then((data) => {
        mainApi.checkToken(data)
          .then((res) => setCurrentUser(res.data))
          .catch((err) => setError(err.message));
        setLoggedIn(true);
        setIsLoginPopupOpen(false);
        if (savedNews.length > 0){
        getSavedNews();}
      })
      .catch((err) => setError(err.message))
      .finally(() => setDisabled(false));
  };

  React.useEffect(() => {
    if ((loggedIn === false) && location.pathname === '/saved-news') {
      setIsLoginPopupOpen(true);
    } else if (loggedIn && location.pathname === '/saved-news') {
      history.push('/saved-news')
    } 
  }, [loggedIn, location.pathname, history]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res.data);
          getSavedNews();
        })
        .catch((err) => console.log(err));
    }
  }, []);

  React.useEffect(() => {
    const localStorageNews = JSON.parse(localStorage.getItem('news'));
    if (localStorageNews && localStorageNews.length) {
      setNews(localStorageNews);
      setIsSearch(true);
    }
  }, []);

  function handleRegister(email, password, name) {
    setDisabled(true);
    mainApi.register(email, escape(password), name)
      .then((res) => {
        setIsRegisterPopupOpen(false);
        setIsConfirmPopupOpen(true);
      })
      .catch((err) => setError(err.message))
      .finally(() => setDisabled(false));
  };

  function getSavedNews() {
    mainApi.getSavedNews()
      .then((news) => setSavedNews(news.data))
      .catch(err => console.log(`Ошибка при загрузке сохранённых новостей: ${err.message}`));
  };

  function handleArticleSave(article) {
    if (!loggedIn) return setIsRegisterPopupOpen(true);
    const saved = savedNews.find((i) => i.publishedAt === article.publishedAt && i.title === article.title);
    if (!saved) {
      mainApi.saveArticle(article)
        .then(newArticle => setSavedNews([newArticle, ...savedNews]))
        .catch((err) => console.log(err));
      return;
    }
    handleDeleteArticle(saved);
  };

  function handleDeleteArticle(article) {
    mainApi.deleteArticle(article._id)
      .then(() => setSavedNews(savedNews.filter((item) => item._id !== article._id)))
      .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
  };

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setCurrentUser({});
    history.push('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <NewsContext.Provider value={{ news, savedNews }}>
        <div className='page'>
          <Header
            loggedIn={loggedIn}
            openLogin={handleLoginPopup}
            handleLogout={handleLogout} />
          <Switch>
            <Route exact path='/'>
              <Main
                handleSearch={handleNewsSearch}
                loggedIn={loggedIn}
                isLoading={isLoading}
                onCardClick={handleArticleSave}
                onShowMore={handleShowMore}
                isSearch={isSearch}
                currentRow={currentRow}
                pathname={location.pathname} />
            </Route>
            <ProtectedRoute
              path='/saved-news'
              component={SavedNews}
              loggedIn={loggedIn}
              onCardClick={handleArticleSave} />
          </Switch>
          <Footer />
          <Register
            isOpen={isRegisterPopupOpen}
            onClose={closeAllPopups}
            onChange={handleTogglePopup}
            onRegister={handleRegister}
            error={error} />
          <Login
            isOpen={isLoginPopupOpen}
            onClose={closeAllPopups}
            onChange={handleTogglePopup}
            error={error}
            onLogin={handleLogin}
            disabled={disabled} />
          <InfoTooltip
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onChange={handleOpenLogin}
            disabled={disabled} />
        </div>
      </NewsContext.Provider>
    </CurrentUserContext.Provider >
  );
}

export default App;