import { NavLink } from "react-router-dom";
import Button from "../components/button/Button";

const UserPreferences = () => {
  
  return (
    <>
      <div className="container">
        <h1>User Preferences</h1>
        <NavLink to="">
          <Button text={'Logout'} type={'btn-inverted'} />
        </NavLink>
      </div>
    </>
  );
};

export default UserPreferences;