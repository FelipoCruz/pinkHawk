import Header from '../components/header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import gif from '../../images/arrow-up-up.gif';
import userIcon from '../../images/person.jpeg';
import commentIcon from '../../images/Twitter_Reply.png';
import retweetIcon from '../../images/repost.png';
import likeHeart from '../../images/heart.png';
import CountUp from 'react-countup';


const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  };


  return (
    <div className="home-page">
      <Header />
      <h1 className="slogan">Tweeting made simple</h1>
      <div className="home-container">
        <div className="banner">
          <div className="banner-icon-slogan">
            <span className="material-symbols-outlined home-icon">
              app_shortcut
            </span>
            <h2 className="banner-slogan">AUTOMATE YOUR TWEETS</h2>
          </div>
          <div className="banner-icon-slogan">
            <span className="material-symbols-outlined home-icon">
              bar_chart
            </span>
            <h2 className="banner-slogan">ENGAGE WITH YOUR FOLLOWERS</h2>
          </div>
          <div className="banner-icon-slogan">
            <span className="material-symbols-outlined home-icon">
              monitoring
            </span>
            <h2 className="banner-slogan">EMPOWER AND MONETIZE</h2>
          </div>

          <h2 className="banner-slogan h1">FAST & EASY</h2>
          {/* <button onClick={handleClick} className="trial-btn">
            Start your free trial
          </button> */}
        </div>

        <div className="tweet-counter-container">
          <div className="counter-container">
            <img src={gif} alt="" className='up-icon' />
            <h2>Followers</h2>
            <CountUp end={10000} duration={20}/>
          </div>

          <div className='tweet-wrap-homepage'>
            <div className='tweet-header'>
              <img src={userIcon} alt="" className="avator" />
              <div className="tweet-header-info">
                <p className='user-name'>Maxwell Blaze</p>
                <span className='user-screen-name'>@MaxwellBlaze</span>
                <p className='tweet-text'>Everything turns so easy with @PinkHawk!<br/> Highly recommended if you want to post on twitter with automation tool and to manage your followers easily!</p>

                <div className="tweet-info-counts">
                  <div className="comments">
                    <img height="3" className="tweet-icon" src={commentIcon} alt="" />
                    <div className="comment-count">1435</div>
                  </div>
                  <div className='retweets'>
                    <img className='tweet-icon' src={retweetIcon} alt='retweetIcon' />
                    <div className='retweet-count'>586</div>
                  </div>
                  <div className='likes'>
                    <img className='tweet-icon' src={likeHeart} alt='likeHeart' />
                    <div className='likes-count'>
                      2.3k
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default HomePage;
