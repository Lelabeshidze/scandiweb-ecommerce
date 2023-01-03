import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { GET_CATEGORIES } from "../GraphQL/dataQueries";
import { getData } from "../GraphQL/getData";
import { withRouter } from "../Utils/withRouter";

class Navigation extends Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <NavBar>
          <ul className="navigation">
            {data?.categories?.map((category, index) => {
              return (
                <li key={index}>
                  <NavLink
                    className="Li"
                    to={`/${category.name === "all" ? "" : category.name}`}
                  >
                    {category.name}
                  </NavLink>
                </li>
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
  li {
    list-style-type: none;
    display: inline-block;
    margin: 5px 10px;
  }

  li > a {
    color: #333;
    text-decoration: none;
    display: inline-block;
    position: relative;
  }

  li > a::after {
    content: "";
    display: block;
    margin-top: 15px;
    height: 3px;
    width: 0;
    top: 5px;
    background: transparent;
    transition: all 0.4s;
  }

  li > a:hover::after {
    width: 100%;
    background: #5ece7b;
  }
`;

export default withRouter(getData(Navigation, GET_CATEGORIES));
