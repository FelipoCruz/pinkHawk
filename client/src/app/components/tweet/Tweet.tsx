import React from 'react';
import { deleteTweet, Tweet } from '../../../store/slices/tweet.slice';
import { activeUser } from '../../../store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getUserById } from '../../../services/api.service';
import { queueTweets } from '../../../store/slices/tweet.slice';
import { UserState } from '../../../store/slices/user.slice';

const SingleTweet: React.FC = ({ tweetPassed }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);

  const handleDelete = async (user: UserState, tweet: Tweet) => {
    try {
      // delete tweet from user, API to be made
      const deleteSingleTweet = await deleteTweetFromUserAPI(user.id, tweet.id);
      console.log('file: tweet.tsx:16 ~~> handleDelete ~~> deleteTweet', deleteTweet)
      // get user with new tweets from DB
      const getUserFromAPI = await getUserById(user.id);
      // update tweet state
      dispatch(deleteTweet(deleteSingleTweet));
      // update user state with fetched user
      dispatch(activeUser(getUserFromAPI));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelected = async (user: UserState, tweet: Tweet) => {
    try {
      // update tweet status in DB, API to be made
      const tweetWithNewStatus = await changeTweetStatusFromUserAPI(user.id, tweet.id, 'queue');
      console.log('file: tweet.tsx:32 ~~> handleSelected ~~> tweetWithNewStatus', tweetWithNewStatus)
      // get user with new tweets from DB
      const getUserFromAPI = await getUserById(user.id);
      // update tweet status in state
      dispatch(queueTweets(tweetWithNewStatus));
      // update user state with fetched user
      dispatch(activeUser(getUserFromAPI));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='solo-tweet'>
      <div className='user-details'>
        <img src={tweetPassed.user.profilePic} alt='profile-pic' />
        <div className='user-info'>
          <h3>{tweetPassed.user.name}</h3>
          <p>{tweetPassed.user.username}</p>
        </div>
      </div>
      <div className='tweet-text'>
        <p>{tweetPassed.text}</p>
      </div>
    </div>
  );
};

export default SingleTweet;
