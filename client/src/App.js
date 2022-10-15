import "./App.css";
import { React, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Banner,
  ListSelector,
  PlaylistCards,
  Statusbar,
  DeleteListModal,
  DeleteSongModal,
  EditSongModal,
} from "./components";
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
const App = () => {
  return (
    <Router>
      <Banner />
      <Route exact component={DeleteListModal} />
      <Route exact component={DeleteSongModal} />
      <Route exact component={EditSongModal} />
      <Switch>
        <Route path="/" exact component={ListSelector} />
        <Route path="/playlist/:id" exact component={PlaylistCards} />
      </Switch>
      <Statusbar />
    </Router>
  );
};

export default App;
