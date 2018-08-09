import React, { Component } from 'react';
import Nav from "./components/Nav";
import Articles from "./pages/Articles";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Articles />
      </div>
    );
  }
};

export default App;
