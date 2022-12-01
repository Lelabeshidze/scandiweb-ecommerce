import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "./Pages/CategoryPage";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CategoryPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
