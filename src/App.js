import './css/App.css';
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { Fragment, useEffect } from 'react';
import Layout from './component/Layout/Layout'
import { getDetails, getAvailBeds, getFilledBeds } from './redux/actions/details'
import Counter from './component/header/Counter'
import BedCards from './component/BedCards/BedCards'
import PlasmaCard from './component/PlasmaCard/PlasmaCard'
import Footer from './component/Footer/Footer'
const App = () => {
  useEffect(() => {
    store.dispatch(getDetails())
    store.dispatch(getAvailBeds())
    store.dispatch(getFilledBeds())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Layout />
          <Counter />
          <h2>Bed Details In Each Hospital</h2>
          <div id="#bedDetails" className="bedCards">
            <BedCards />
          </div>
          <hr />
          <PlasmaCard />
          <footer>
            <Footer />
          </footer>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
