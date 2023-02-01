import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import Tweet from '../../../tweet/Tweet';
import ITweet from '../../../../interfaces/tweet.interface';
import { getUserTweets } from '../../../../../services/api.tweets';

const Queue = () => {
  const user = useAppSelector(({ user }) => user);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    (async () => {
      const queuedTweets = await getUserTweets(user.id, 'queued');
      console.log('queued tweets are: ', queuedTweets);
      setTweets(queuedTweets);
    })();
  }, []);

  return (
    <>
      {tweets?.length ? (
        tweets.map((tweet: ITweet) => (
          <Tweet key={tweet.id} tweetPassed={tweet} />
        ))
      ) : (
        <h2>You have no queued tweets yet</h2>
      )}
    </>
  );
};

export default Queue;
