import React, { Component } from "react";
import styled from "styled-components";
import { GET_CATEGORIES } from "../GraphQL/dataQueries";
import { getData } from "../GraphQL/getData";

class Navigation extends Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <NavBar>
          <ul className="navigation">
            {data?.categories?.map((category, index) => {
              return <li key={index}>{category.name}</li>;
            })}
          </ul>
        </NavBar>
      </div>
    );
  }
}

const NavBar = styled.nav`
  .navigation {
    display: flex;
    text-decoration: none;
    list-style: none;
    justify-content: space-between;
    li{
        margin-left:10px;
    }
  }
`;

export default getData(Navigation, GET_CATEGORIES);
