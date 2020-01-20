import React, { Component } from 'react';
import Login_page from './pages/login';
import Signup_page from './pages/signup';
import Mypage_page from './pages/mypage';
import Trailinfo_page from './pages/trailinfo';
import AddTrail_page from './pages/addTrail';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './index.css';
axios.defaults.withCredentials = true;

export default class App extends Component {
  constructor(props) {
    super(props);
    /*login 페이지에 사용되는 state & method */
    this.handleIsloginState = this.handleIsloginState.bind(this);
    /*signup 페이지에 사용되는 state & method */
    /*mypage 페이지에 사용되는 state & method */
    this.handleSelectThemeBtn = this.handleSelectThemeBtn.bind(this);
    this.handleSelectTrail = this.handleSelectTrail.bind(this);

    /*trailinfo 페이지에 사용되는 state & method */
    /*addTrail 페이지에 사용되는 state & method */
    this.state = {
      /*모든 페이지에 사용되는 state */
      isLogin: false,
      location: this.props.location,

      /*login 페이지에 사용되는 state */

      /*signup 페이지에 사용되는 state */

      /*mypage 페이지에 사용되는 state */
      currentTheme: null,
      currentTrail: null,
      filteredTrailList: [],
      /*trailinfo 페이지에 사용되는 state */

      /*addTrail 페이지에 사용되는 state */
    };
  }

  /*login 페이지에 사용되는 method */
  handleIsloginState() {
    this.setState({ isLogin: true });
  }
  /*signup 페이지에 사용되는 method */

  /*mypage 페이지에 사용되는 method */
  // mypage에 theme을 전달하는 함수
  componentDidMount() {
    let URL = 'http://2c815448.ngrok.io/trails';
    axios
      .get(URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            currentTheme: null,
            filteredTrailList: res.data.trails,
          });
        }
      })
      .catch(err => {
        console.log('App.js 에서의 에러 ', err);
      });
  }
  handleSelectThemeBtn(theme) {
    //axio요청 => theme에 따른 요청... state 만들어서 내려줘야함..
    let URL = !theme
      ? 'http://2c815448.ngrok.io/trails'
      : 'http://2c815448.ngrok.io/trails/' + theme;

    axios
      .get(URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          console.log('(App.js) 요청 성공', res.data);
          let resdata = !theme ? res.data.trails : res.data;
          this.setState({
            currentTheme: theme,
            filteredTrailList: resdata,
          });
        }
      })
      .catch(err => {
        console.log('App.js 에서의 에러 ', err);
      });
  }

  handleSelectTrail(trail) {
    console.log('your trail is: ', trail);
    this.setState({
      currentTrail: trail,
    });
  }
  /*trailinfo 페이지에 사용되는 method */

  /*addTrail 페이지에 사용되는 method */

  render() {
    let {
      isLogin,
      location,
      currentTheme,
      currentTrail,
      filteredTrailList,
    } = this.state;
    console.log('ct: ', this.state.currentTrail);

    return (
      <div id="appjs">
        <Route
          exact
          path="/"
          component={() => (
            <Login_page
              handleIsloginState={this.handleIsloginState}
              isLogin={this.state.isLogin}
            />
          )}
        />
        <Switch>
          <Route
            path="/signup"
            component={() => (
              <Signup_page location={location} isLogin={isLogin} />
            )}
          />
          <Route
            path="/trailinfo"
            component={() => (
              <Trailinfo_page>currentTrail={currentTrail}</Trailinfo_page>
            )}
          />
          <Route
            path="/main"
            component={() => (
              <Mypage_page
                location={location}
                isLogin={isLogin}
                currentTheme={currentTheme}
                handleSelectThemeBtn={this.handleSelectThemeBtn}
                handleSelectTrail={this.handleSelectTrail}
                filteredTrailList={filteredTrailList}
              />
            )}
          />
          <Route
            path="/addtrail"
            component={() => (
              <AddTrail_page
                location={location}
                isLogin={isLogin}
                currentTheme={currentTheme}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
