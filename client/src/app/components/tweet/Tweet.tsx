import { useAppSelector } from '../../hooks/hooks';
import ITweet from '../../interfaces/tweet.interface';
import userIcon from '../../../images/user.png';
import commentIcon from '../../../images/Twitter_Reply.png';
import retweetIcon from '../../../images/retweetIcon.png';
import likeHeart from '../../../images/likeHeart.png';

type Props = { tweetPassed: ITweet };

const SingleTweetTest = ({ tweetPassed }: Props) => {
  const user = useAppSelector(({ user }) => user);
  // console.log('user in the state ======>', user);

  if (!tweetPassed) return null;

  return (

    <>




      <div className='tweet-wrap'>
        <div className='tweet-header'>
          <img src={!user.profilePic ? userIcon : user.profilePic} alt='user profile pic' className='avator' />
          <div className='tweet-header-info'>
            {user.firstName} {user.lastName} <span>@{user.firstName}{user.lastName}</span><span>
            </span>
            <p>{tweetPassed.text}</p>

            <div className='tweet-info-counts'>

              <div className='comments'>
                <img height='3' className='tweet-icon' src={commentIcon} alt='' />
                <div className='comment-count'>33</div>
              </div>

              <div className='retweets'>
                <img className='tweet-icon' src={retweetIcon} alt='retweetIcon' />
                <div className='retweet-count'>397</div>
              </div>


              <div className='likes'>
                <img className='tweet-icon' src={likeHeart} alt='likeHeart' />
                <div className='likes-count'>
                  2.6k
                </div>
              </div>
            </div>
          </div>

        </div>


      </div>











    </>






  );
};

export default SingleTweetTest;
