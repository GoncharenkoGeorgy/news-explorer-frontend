import React, { useState } from 'react';
import { Route, Switch, Redirect, useHistory, BrowserRouter } from 'react-router-dom';
import SavedNews from '../SavedNews/SavedNews.js';
import Main from '../Main/Main.js';
import './App.css';

function App() {

  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

  return (
    
      <div className="page">

        <BrowserRouter>
          <Switch>
            <Route exact path='/saved-news'>
              <SavedNews />
            </Route>
                    
            <Route exact path='/'>
              <Main
                isRegisterPopupOpen={isRegisterPopupOpen}
                setIsRegisterPopupOpen={setIsRegisterPopupOpen}
                isLoginPopupOpen={isLoginPopupOpen}
                setIsLoginPopupOpen={setIsLoginPopupOpen}
                isConfirmPopupOpen={isConfirmPopupOpen}
                setIsConfirmPopupOpen={setIsConfirmPopupOpen}
              />
            </Route>
          </Switch>
        </BrowserRouter>        

      </div>
  );
}

export default App;