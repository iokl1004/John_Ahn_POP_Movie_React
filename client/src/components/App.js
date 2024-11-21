import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import MovieDetail from './views/MovieDetail/MovieDetail';
import FavoritePage from './views/FavoritePage/FavoritePage.js';
import ModifyPage from './views/ModifyPage/ModifyPage.js';
import NotFound from './views/commons/NotFound.js';
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
          <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
          
          {/* 회원정보 수정 */}
          <Route exact path="/Modify" component={Auth(ModifyPage, true)} />

          {/* 존재하지 않는 페이지 예외처리 */}
          <Route path="*" component={Auth(NotFound, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
