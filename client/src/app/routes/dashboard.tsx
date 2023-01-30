import NavBarUser from "../components/navbar/loginnavbar/LoginNavBar";
import { useAppSelector } from "../hooks/hooks";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user);
  console.log("user in state", user);
  return (
    <div>
      <NavBarUser />
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
