import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Preloader from '../Preloader/Preloader';

const Main = (props) => {

  const { isRegisterPopupOpen, setIsRegisterPopupOpen, isLoginPopupOpen, setIsLoginPopupOpen, isConfirmPopupOpen, setIsConfirmPopupOpen } = props;

  const toggleRegisterForm = () => {
    setIsRegisterPopupOpen(!isRegisterPopupOpen);
  };

  const toggleLoginForm = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  const toggleConfirmForm = () => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
  };

  return (
    <>
      <main className='main'>
        <Header
          togglePage={true}
          isPopupOpen={isLoginPopupOpen}
          toggleForm={toggleLoginForm}
        />
        <SearchForm />
      </main>
      <NewsCardList main={true} />
      <About />
      <Footer />
      <Login
        isPopupOpen={isLoginPopupOpen}
        toggleForm={toggleLoginForm}
        setIsRegisterOpen={setIsRegisterPopupOpen}

      />
      <Register
        isPopupOpen={isRegisterPopupOpen}
        toggleForm={toggleRegisterForm}
        setIsLoginOpen={setIsLoginPopupOpen}

      />
      <PopupWithForm
        isPopupOpen={isConfirmPopupOpen}
        toggleForm={toggleConfirmForm}
        setIsLoginOpen={setIsLoginPopupOpen}
      />
    </>
  );
}

export default Main;