import React from 'react';
import Navigation from '../Navigation/Navigation.js';
import './Header.css';

const Header = (props) => {

  const { togglePage, toggleForm, isSaved, name, isPopupOpen } = props;

  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);

  const handleMenu = () => {
    setIsMenuPopupOpen(!isMenuPopupOpen)
  }

  return (

    <header className='header'>
      <div className='header__container'>
      <h2 className={`header__title ${togglePage ? 'header__title_light' : ''} ${isMenuPopupOpen ? 'header__title_light' : ''}`}>NewsExplorer</h2>
        <Navigation
          togglePage={togglePage}
          toggleForm={toggleForm}
          isSaved={isSaved}
          name={name}
          isPopupOpen={isPopupOpen} 
          handleMenu={handleMenu}
          isMenuPopupOpen={isMenuPopupOpen}
        />
      </div>
    </header>
  );
}

export default Header;