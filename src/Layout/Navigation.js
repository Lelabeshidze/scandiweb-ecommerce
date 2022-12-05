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
                <NavLink
                  className="Li"
                  key={index}
                  to={`/${category.name === "all" ? "" : category.name}`}
                >
                  {category.name}
                </NavLink>
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

export default withRouter(getData(Navigation, GET_CATEGORIES));



