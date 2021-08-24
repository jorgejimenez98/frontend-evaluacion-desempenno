import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CustomizedSnackbars from './containers/utils/SnackBar';
import ScrollToTop from './containers/utils/ScrollToTop';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/screens/LoginScreen'));
const Page403 = React.lazy(() => import('./views/screens/Page403'));


class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading}>
            <CustomizedSnackbars />
            <ScrollToTop />
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/403" name="Page 403" render={props => <Page403 {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
