import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CategoryComponent from "./Components/CategoryComponent/CategoryComponent";
import ClothesComponent from "./Components/CategoryComponent/ClothesComponent";
import TechComponent from "./Components/CategoryComponent/TechComponent";
import CategoryProductComponent from "./Components/CategoryComponent/TechComponent";
import { GET_CATEGORIES } from "./GraphQL/dataQueries";
import { getData } from "./GraphQL/getData";

import CategoryPage from "./Pages/CategoryPage";
import { withRouter } from "./Utils/withRouter";

class App extends Component {
  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div>
        <Routes>
          <Route path="/" element={<CategoryPage categoryName="all" />} />
          <Route path="/all" element={<Navigate to="/" />} />
          <Route path="/tech" element={<TechComponent />} />
          <Route path="/clothes" element={<ClothesComponent />} />
        </Routes>
      </div>
    );
  }
}

export default withRouter(getData(App, GET_CATEGORIES));
