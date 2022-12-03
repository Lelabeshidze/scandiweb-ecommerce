import React, { Component } from "react";
import { Link } from "react-router-dom";
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
              return (
                <Link
                  className="Li"
                  key={index}
                  to={`/products/categories/${category.name}?page=1`}
                >
                  {category.name}
                </Link>
              );
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
    .Li {
      padding-left: 20px;
      text-transform: uppercase;
    }
  }
`;

export default getData(Navigation, GET_CATEGORIES);
