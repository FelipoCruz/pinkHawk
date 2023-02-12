import { useEffect, useState } from 'react';
import './Selection.scss';
import { useAppSelector } from '../../hooks/hooks';
import {
  addTweetToQueue,
  generateTweetServiceClient,
} from '../../../services/api.service';
import ITweet from '../../interfaces/tweet.interface';
import Spinner from '../spinner/Spinner';
import { getUserTweets, deleteTweetDB } from '../../../services/api.service';
import SingleTweetTest2 from '../tweet/Tweet2';
import dayjs from 'dayjs';
import { getNextPostingTime } from '../../helpers/next-posting-time';

const Selection = () => {
  const user = useAppSelector(({ user }) => user);
  const [tweets, setTweets] = useState([]);
  const [nextPostingTime, setNextPostingTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    (async () => {
      if (user.postingHours.length > 0) {
        await getNextTweetPostingTime();
      }
      if (user.id) {
        await fetchSuggestedTweets();
      }
      setLoading(false);
    })();
  }, [user]);

  const getNextTweetPostingTime = async () => {
    const nextPostingTimestamp = await getNextPostingTime(user);
    setNextPostingTime(nextPostingTimestamp!);
  };

  const fetchSuggestedTweets = async () => {
    const queuedTweets = await getUserTweets(user.id, 'suggested');
    setTweets(queuedTweets.reverse());
  };

  const generateTweetsInit = async () => {
    setSpinner(true);
    await generateTweetServiceClient(user);
    await generateTweetServiceClient(user);
    await generateTweetServiceClient(user);
    await getNextTweetPostingTime();
    fetchSuggestedTweets();
    setSpinner(false);
  };

  const moveTweetToQueue = async (tweet: ITweet, index: number) => {
    if (user.postingHours.length === 0) {
      alert('Please set your posting hours first');
      return;
    }
    await addTweetToQueue(user.id, tweet.id, nextPostingTime);
    await getNextTweetPostingTime();
    deleteTweetinState(index);
  };

  const deleteTweet = async (tweetToDelete: ITweet, index: number) => {
    const DBdelete = await deleteTweetDB(user.id, tweetToDelete.id);
    deleteTweetinState(index);
  };

  const deleteTweetinState = (index: number) => {
    const items = [...tweets];
    items.splice(index, 1);
    setTweets(items);
    console.log('tweet deleted from Local State');
  };

  return (
    <div className="selection-page">
      <h2>Suggested tweets</h2>
      <div className="header-elements">
        <div className="next-tweet-time">
          {!loading && user.postingHours.length > 0 && tweets.length > 0 ? (
            <>
              <p className="">Next tweet: </p>
              <p className="h2">
                {dayjs(nextPostingTime).format('DD/MM/YY  HH:mm')}
              </p>
            </>
          ) : !loading && tweets.length === 0 ? (
            <h4 className="no-sugg-data">No suggested tweets</h4>
          ) : (
            <></>
          )}
        </div>
        <button className="generate-btn" onClick={generateTweetsInit}>
          {spinner ? <Spinner /> : <>More Tweets!</>}
        </button>
      </div>
      <div className="tweets-list">
        {tweets?.map((tweet: ITweet, index) => {
          return (
            <div key={tweet.id} className="tweet-li">
              <SingleTweetTest2
                tweet={tweet}
                deleteTweet={deleteTweet}
                moveTweetToQueue={moveTweetToQueue}
                index={index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Selection;
