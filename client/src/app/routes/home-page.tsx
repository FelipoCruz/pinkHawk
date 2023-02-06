import Header from '../components/header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import gif from '../../images/twitter.gif'
import automation from "../../images/-1x-1.jpg"
const HomePage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/signup')
  }
  
  return (
    <div className='home-page'>
      <Header />
      <h1 className='slogan'>Tweeting made simple</h1>
      <div className="home-container">
        <div className='banner'>
          <h2 className='banner-slogan'>AUTOMATE YOUR TWEETS</h2>
          <h2 className='banner-slogan'>ENGAGE WITH YOUR FOLLOWERS</h2>
          <h2 className='banner-slogan'>EMPOWER AND MONETIZE</h2>
          <h2 className='banner-slogan h1'>FAST & EASY</h2>
          <button onClick={handleClick} className='trial-btn'>Start your free trial</button>
        </div>
        <div className='banner-img-container'>
          <img src={gif} alt='banner' className='banner-img' />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default HomePage;
