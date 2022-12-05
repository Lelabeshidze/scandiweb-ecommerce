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
    return (
      <div>
        <div>
          <img src={data?.product?.gallery[0]} alt="" />
        </div>
        <div>
          <h3>{data?.product?.name}</h3>
          <p>{data?.product?.description}</p>
          {data?.product?.attributes.map((attribute, index) => {
            const { name, type, items } = attribute;
            return (
              <div key={index}>
                <h3>{name}</h3>
                <div>
                    {items.map((item)=> {
                        return <div key={item.id}>{item.displayValue}</div>
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(getProductById(SingleProductComponent, GET_PRODUCT));
