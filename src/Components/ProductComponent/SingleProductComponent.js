import React, { Component } from "react";
import { GET_PRODUCT } from "../../GraphQL/dataQueries";
import { getProductById } from "../../GraphQL/getProduct";
import { withRouter } from "../../Utils/withRouter";
import ProductItem from "../ProductItem/ProductItem";

class SingleProductComponent extends Component {
  render() {
    const { params } = this.props;
    const { data } = this.props;
    console.log(params);
    console.log(data, "product");
    return <div>
        <div>
            <img src={data?.product?.gallery[0]} alt="" />
        </div>
    </div>;
  }
}

export default withRouter(getProductById(SingleProductComponent, GET_PRODUCT));
