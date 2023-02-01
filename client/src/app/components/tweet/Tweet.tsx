import { useAppSelector } from '../../hooks/hooks';
import { UserState } from '../../interfaces/user.interface';
import { Tweet } from '../../interfaces/tweet.interface';

type Props = { tweetPassed: Tweet };

const SingleTweetTest = ({ tweetPassed }: Props) => {
  const user: UserState = useAppSelector(({ user }) => user);
  console.log('user in the state ======>', user);

  if (!tweetPassed) return null;

  return (
    <div className='solo-tweet'>
      <div className='user-details'>
        {/* <img src={user.profilePic} alt='profile-pic' /> */}
        <p>{user.twitterName}</p>
        <p>{user.twitterInfo}</p>
      </div>
      <div className='tweet-content'>
        <p>{tweetPassed.text}</p>
      </div>
      {/* <div className='tweet-actions'>
        {tweetPassed.status !== 'queue' && <button onClick={() => handleSelected(user, tweetPassed)}>+</button>}
        <button onClick={() => handleDelete(user, tweetPassed)}>x</button>
      </div> */}
    </div>
  );
};

export default SingleTweetTest;
