import { useQuery } from "@apollo/client";

export const getAllProducts = (Component, GetProductsByCategory) => (props) => {
  const categoryName = props.params?.categoryName;

  const { data } = useQuery(GetProductsByCategory, {
    variables: { categoryName },
  });

  return <Component {...props} data={data} categoryName={categoryName} />;
};
