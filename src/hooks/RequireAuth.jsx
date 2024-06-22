import { Navigate, Outlet, useLocation } from "react-router-dom";
import useFireStoreDoc from "./useFireStoreDoc";

const RequireAuth = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const {document: currentUser, loading: currentUserLoading} = useFireStoreDoc("users", user?.uid);
  const token = localStorage.getItem("token");
  const location = useLocation();

  //if user is not authenticated, redirect to login page
  if(!token) {
      return <Navigate to="/login" state={{ from: location }} replace/>
  }

  if(currentUserLoading) return <div className="page-container">Loading...</div>;

  //if user is authenticated and has allowed role
  if(allowedRoles?.roles?.includes("*") || allowedRoles?.roles?.includes(currentUser?.role)) {
      return <Outlet />
  }

  //if user is authenticated but does not have allowed role
  return <Navigate to="/unauthorized" state={{ from: location }} replace/>
}

export default RequireAuth;