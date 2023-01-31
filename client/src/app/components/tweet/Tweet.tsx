import React from 'react';
import { deleteTweet, TweetState } from '../../../store/slices/tweet.slice';
import { activeUser } from '../../../store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getUserById } from '../../../services/api.service';
import { queueTweets } from '../../../store/slices/tweet.slice';
import { UserState } from '../../../store/slices/user.slice';

const Tweet: React.FC = ({ tweet }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);

  const handleDelete = async (user: UserState, tweet: TweetState) => {
    try {
      // delete tweet from user, API to be made
      const deleteSingleTweet = await deleteTweetFromUserAPI(user.id, tweet.id);
      console.log('file: tweet.tsx:16 ~~> handleDelete ~~> deleteTweet', deleteTweet)
      // get user with new tweets from DB
      const getUserFromAPI = await getUserById(user.id);
      // update tweet state
      dispatch(deleteTweet(deleteTweet));
      // update user state with fetched user
      dispatch(activeUser(getUserFromAPI));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelected = async (user, tweet) => {
    try {
      // update tweet status in DB, API to be made
      const tweetWithNewStatus = await changeTweetStatusFromUserAPI(user, (tweet.id.status = 'queue'));
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
  }

  return (
    <div>

    </div>
  );
};

export default Tweet;
