import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";

import TitleSearch from "./components/TitleSearch";
import TitleDetails from "./components/TitleDetails";

function App() {
  useEffect(() => {
    document.title = "TV Series Info";
  }, []);
  return (
    <div className="app">
      <Router>
        <header className="app__header">
          <Link to="/">
            <h1>TV Series Info</h1>
          </Link>
        </header>
        <main className="app__container">
          <Switch>
            <Route path="/titles/:titleId" component={TitleDetails}></Route>
            <Route path="/" component={TitleSearch}></Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
