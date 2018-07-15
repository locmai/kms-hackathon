import React from 'react'
// import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
// import { AppContainer } from 'react-hot-loader'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import ReduxThunkMiddleware from 'redux-thunk'
import { MainLayout } from './components/layout/main'
import { Home } from './containers/home'
// import AppRoute from './app/index.js'
import mainReducers from './containers'

import { combineReducers } from 'redux'

const Reducers = combineReducers({
  ...mainReducers
})

const store = createStore(
  Reducers,
  applyMiddleware(ReduxThunkMiddleware)
)

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
)

const App = props => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <AppRoute exact={true} path="/" layout={MainLayout} component={Home} />
        {/* <Route path='/verify/:key' component={VerifyEmailByGoogleAuthContainer} /> */}
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default App
