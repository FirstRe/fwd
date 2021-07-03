import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Questions from "./pages/Questions";

function App() {
  return (
    <Router>
      <Route path="/" exact render={(props) => <Questions />} />
      
    </Router>
  );
}

export default App;
