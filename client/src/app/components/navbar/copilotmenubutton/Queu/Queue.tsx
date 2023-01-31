import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import Tweet from '../../../tweet/Tweet';

const Queue = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);
  console.log('user from state', user);
  const tweets = useAppSelector(({ tweets }) => tweets);
  console.log('tweets from state', tweets);


  return (
    <div>
      <ul>
        {tweets.tweets.filter((tweet: any) => tweet.status === 'queue').map((tweet: any) => {
          return <Tweet key={tweet.id} tweet={tweet} />;
        })}
      </ul>
    </div>
  );
};

export default Queue;
