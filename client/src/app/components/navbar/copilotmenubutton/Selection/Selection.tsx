import React, { useEffect } from 'react';
// import { getSelectionTweets } from '../../../../../services/api.tweets';
// import { selectionTweets } from '../../../../../store/slices/tweets.slice';
import { getTweets } from '../../../../helpers/mocks';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';

const Selection: React.FC = () => {
  // const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);
  // const tweets = useAppSelector(({ tweets }) => tweets);
  const [tweets, setTweets] = React.useState<any>([]);
  console.log('active user', user);

  useEffect(() => {
    const doGetTweets = async () => {
      const result = await getTweets();
      setTweets(result);
    };
    doGetTweets();
  }, []);

  // const fetchSelectionTweets = async () => {
  //   const response = await getSelectionTweets();
  //   dispatch(selectionTweets(response));
  // }
  // we first check if there are tweets in the store
  if (!tweets) return null;

  return (
    <div>
      <h1>selection of tweets</h1>
      <ul>
        {tweets.map((tweet: any) => {
          return (
            <li key={tweet.id}>
              <p>{tweet.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Selection;