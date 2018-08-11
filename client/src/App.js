import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Articles from "./pages/Articles";
import Favorites from "./pages/Favorites";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Articles} />
            <Route exact path="/favorites" component={Favorites} />
          </Switch>
        </div>
      </Router>
    );
  }
};

export default App;
