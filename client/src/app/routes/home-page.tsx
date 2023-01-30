import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="container">Home Page</div>
      <Outlet />
    </>
  );
};

export default HomePage;
