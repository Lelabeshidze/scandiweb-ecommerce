import { useQuery } from "@apollo/client";

export const getAllProducts = (Component, GetProductsByCategory) => (props) => {
  const { data } = useQuery(GetProductsByCategory);

  return <Component {...props} data={data} />;
};
