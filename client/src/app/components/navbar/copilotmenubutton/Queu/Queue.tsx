import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import Tweet from '../../../tweet/Tweet';
import { Tweet as TweetType } from '../../../../../store/slices/tweet.slice';

const Queue = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);
  console.log('user from state', user);
  const { tweets } = useAppSelector(({ tweets }) => tweets);
  console.log('tweets from state', tweets);

  return (
    <ul>
      {tweets?.length > 0 &&
        tweets
          .filter((tweet: TweetType) => tweet.status === 'queued')
          .map((tweet: TweetType) => {
            return (
              <li>
                <Tweet key={tweet.id} tweetPassed={tweet} />
              </li>
            );
          })}
    </ul>
  );
};

export default Queue;
