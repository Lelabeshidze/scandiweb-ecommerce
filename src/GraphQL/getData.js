import { useQuery } from "@apollo/client";
export const getData = (Component, query) => (props) => {
  const { data } = useQuery(query);
  return <Component {...props} data={data} />;
};
