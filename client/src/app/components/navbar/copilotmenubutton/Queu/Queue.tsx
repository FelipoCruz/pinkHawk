import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';

const Queue = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);
  console.log('user from state', user);
  const tweet = useAppSelector(({ tweets }) => tweets);
  console.log('tweets from state', tweet);

  return (
    <div>
      <h1>Queue of tweets</h1>
      {/* {tweet.tweets.map((tweet: any) => {
        return (
          <div key={tweet.id}>
            <p>{tweet}</p>
          </div>
        );
      })} */}
    </div>
  );
};

export default Queue;
