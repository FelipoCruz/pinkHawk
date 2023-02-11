import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import ITweet from '../../interfaces/tweet.interface';
import '../tweet/Tweet.scss';
import { deleteTweetDB, getUserTweets } from '../../../services/api.service';
import './Queue.scss';
import SingleTweetTest2 from '../tweet/Tweet2';
import Spinner from '../spinner/Spinner';

const Queue = () => {
  const user = useAppSelector(({ user }) => user);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    (async () => {
      if (user.id) {
        const queuedTweets = await getUserTweets(user.id, 'queued');
        setTweets(queuedTweets);
        setLoading(false);
      }
    })();
  }, [user]);

  const deleteTweet = async (tweetToDelete: ITweet, index: number) => {
    await deleteTweetDB(user.id, tweetToDelete.id);
    deleteTweetinState(index);
  };

  const deleteTweetinState = (index: number) => {
    const items = [...tweets];
    items.splice(index, 1);
    setTweets(items);
  };

  return (
    <>
      {spinner ? <Spinner /> : <></>}
      <h2>Queued tweets</h2>
      {!loading && tweets.length === 0 ? (
        <div className="header-elements">
          <div className="next-tweet-time">
            <h4 className="no-queue-data">No queued tweets</h4>
          </div>
        </div>
      ) : !loading && tweets.length > 0 ? (
        tweets.map((tweet: ITweet, index) => (
          <li key={tweet.id} className="queue-tweet-li">
            <div className="queue-tweet-wrap">
              <SingleTweetTest2
                tweet={tweet}
                index={index}
                deleteTweet={deleteTweet}
              />
            </div>
          </li>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default Queue;
