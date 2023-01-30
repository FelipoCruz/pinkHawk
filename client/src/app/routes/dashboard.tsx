import NavBarUser from "../components/navbar/loginnavbar/LoginNavBar";
import { useAppSelector } from "../hooks/hooks";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user);
  console.log("user in state", user);
  return (
    <div>
      {/* <h1>Dashboard</h1> */}
      <NavBarUser />
      <>
        {/* <h1>Body dashBoard</h1> */}
      </>
    </div>
  );
};

export default Dashboard;
