import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserInfo } from "../api/getUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slice/userSlice";

const AuthLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const initLogin = async () => {
      const user = await getUserInfo();
      dispatch(setUser(user));
      setIsLoading(false);
    };
    initLogin();
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (user) return <Outlet />;
  else return <Navigate to="/" />;
};

export default AuthLayout;
