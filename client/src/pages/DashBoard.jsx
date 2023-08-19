import { useSelector } from "react-redux";

export default function DashBoard() {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <h1>DashBoard</h1>
      <p>Welcome - {`${user.firstName} ${user.lastName}`}</p>
      <p>user: {JSON.stringify(user)}</p>
    </div>
  );
}
