import React from 'react';
import './Navigation.css';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

const Navigation = (props) => {

  const { togglePage, toggleForm, isSaved, name, isPopupOpen, handleMenu, isMenuPopupOpen } = props;

  const history = useHistory();
  const localStorage = useLocation();

  const handleToggle = () => {
    handleMenu();
    toggleForm();
  }

  const handleExit = () => {
    history.push('/');
  }

  return (

    <>
      {isPopupOpen ? '' :
        <div onClick={handleMenu} className={`navigation__button ${isMenuPopupOpen ? 'change' : ''}`}>
          <span className={`navigation__button-line ${togglePage
            ? ''
            : 'navigation__button-line_black'} ${isMenuPopupOpen
              ? 'navigation__button-line_esc navigation__button-line_white'
              : ''}`}>
          </span>
          <span className={`navigation__button-line ${togglePage
            ? ''
            : 'navigation__button-line_black'} ${isMenuPopupOpen
              ? 'navigation__button-line_esc navigation__button-line_white'
              : ''}`}>
          </span>
        </div>
      }
      <nav className={isMenuPopupOpen ? 'navigation navigation_visible' : 'navigation'}>
        <div className={isMenuPopupOpen ? 'navigation__container navigation__container_active' : 'navigation__container'}>
          <NavLink to='/' className={`navigation__link ${togglePage
            ? 'navigation__light navigation__link_active navigation__link_active_light-theme'
            : ''} ${isMenuPopupOpen ? 'navigation__light' : ''}`}>Главная</NavLink>
          {togglePage
          ? <NavLink to='/saved-news' className={`${isMenuPopupOpen
            ? 'navigation__link navigation__light'
            : 'navigation__hidden'}`}>Сохраненные статьи</NavLink>
          : <NavLink to='/saved-news' className={`navigation__link ${isMenuPopupOpen
            ? 'navigation__light'
            : 'navigation__link_active'}`}>Сохраненные статьи</NavLink>
          }
          <span className={`navigation__border ${togglePage
            ? 'navigation__light'
            : 'navigation__border_dark'} ${isMenuPopupOpen
              ? 'navigation__border_light'
              : ''}`}
            onClick={isSaved ? handleExit : handleToggle} >
            <span className={`navigation__border-link ${(isMenuPopupOpen || togglePage)
              ? 'navigation__light'
              : ''}`} > {name ? name : 'Авторизоваться'} </span>
            {
              name && !togglePage ?
                <span className='navigation__logout' /> : ''
            }
          </span>
        </div>
      </nav>
    </>

  );
}

export default Navigation;