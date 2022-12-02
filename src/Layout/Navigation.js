import React, { Component } from "react";
import { GET_CATEGORIES } from "../GraphQL/dataQueries";
import { getData } from "../GraphQL/getData";

class Navigation extends Component {
  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div>
        {data?.categories?.map((category, index) => {
          return (
            <nav key={index}>
              <ul>
                <li>{category.name}</li>
              </ul>
            </nav>
          );
        })}
      </div>
    );
  }
}

export default getData(Navigation, GET_CATEGORIES);
