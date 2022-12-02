import { useQuery } from "@apollo/client";

export const getProductById = (Component, product) => (props) => {
  const productId = props.params.productId;
  const { data } = useQuery(product, { variables: { productId } });
  return <Component {...props} data={data} productId={productId} />;
};
