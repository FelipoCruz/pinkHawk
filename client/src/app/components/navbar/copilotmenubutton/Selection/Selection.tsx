import React, { useEffect } from 'react';
import { Tweet as TweetType } from '../../../../../store/slices/tweet.slice';
import Tweet from '../../../tweet/Tweet';
import { getTweets } from '../../../../helpers/mocks';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';

const Selection = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);
  const { tweets } = useAppSelector(({ tweets }) => tweets);
  // const [tweets, setTweets] = React.useState<any>([]);
  console.log('user in state', user);
  console.log('tweets in state', tweets);

  // const handleMoveToQueu = (id: number) => {
  //   console.log('moved to queu', id);
  // };

  // useEffect(() => {
  //   const doGetTweets = async () => {
  //     const result = await getTweets();
  //     setTweets(result);
  //   };
  //   doGetTweets();
  // }, []);

  const fetchSelectionTweets = async () => {
    const response = await getTweets();
    dispatch(selectionTweets(response));
  };

  useEffect(() => {
    fetchSelectionTweets();
  }, []);

  // we first check if there are tweets in the store
  if (!tweets) return null;

  return (
    <div>
      <ul>
        {tweets?.length > 0 && tweets.filter((tweet: TweetType) => tweet.status === 'suggested').map((tweet: TweetType) => {
          return <li><Tweet key={tweet.id} tweetPassed={tweet} /></li>;
        })}
      </ul>
    </div>
  );
};

export default Selection;
