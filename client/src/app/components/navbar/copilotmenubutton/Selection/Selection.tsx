import React, { useEffect } from 'react';
import { Tweet as TweetType } from '../../../../interfaces/tweet.interface';
import TweetTest from '../../../tweet/TweetTest';
// import { getTweets } from '../../../../helpers/mocks';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { getUserTweets } from '../../../../../services/api.tweets';
import '../../../tweet/Tweet.scss';

const Selection = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);
  // const { tweets } = useAppSelector(({ tweets }) => tweets);
  const [tweets, setTweets] = React.useState<any>([]);
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

  // const fetchSelectionTweets = async () => {
  //   const response = await getUserTweets(user.id, '');
  //   dispatch(selectionTweets(response));
  // };
  const fetchSelectionTweets = async () => {
    const getTweets =  await getUserTweets(user.id, 'suggested');
    console.log('file: Selection.tsx:35 ~~> fetchSelectionTweets ~~> getTweets', getTweets)
    setTweets(getTweets);
  };

  useEffect(() => {
    fetchSelectionTweets();
  }, []);

  // we first check if there are tweets in the store
  if (!tweets) return null;

  return (
    <div>
      <ul>
        {tweets?.map((tweet: TweetType) => {
          return <li><TweetTest key={tweet.id} tweetPassed={tweet} /></li>;
        })}
      </ul>
    </div>
  );
};

export default Selection;
