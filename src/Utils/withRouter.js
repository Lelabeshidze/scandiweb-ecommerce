import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withRouter = (Component) => (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  
  return (
    <Component
      {...props}
      location={location}
      params={params}
      navigate={navigate}
    />
  );
};
