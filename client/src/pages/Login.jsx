import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
import { getUserInfo } from "../api/getUserInfo";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import { postLoginToken } from "../api/postLoginToken";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onGoogleSignIn = async (res) => {
    setLoading(true);
    await postLoginToken(res.credential);
    const user = await getUserInfo();
    dispatch(setUser(user));
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Goggle Login</h1>
      {loading && <p>loading...</p>}
      <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="Login" />
    </div>
  );
}
