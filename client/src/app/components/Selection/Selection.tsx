import { useEffect, useState } from 'react';
import './Selection.scss';
import { useAppSelector } from '../../hooks/hooks';
import {
  addTweetToQueue,
  generateTweetServiceClient,
  getNextPostingTime,
} from '../../../services/api.service';
import ITweet from '../../interfaces/tweet.interface';
import Spinner from '../spinner/Spinner';
import { getUserTweets, deleteTweetDB } from '../../../services/api.service';
import SingleTweetTest2 from '../tweet/Tweet2';
import dayjs from 'dayjs';

const Selection = () => {
  const user = useAppSelector(({ user }) => user);
  const [tweets, setTweets] = useState([]);
  const [nextPostingTime, setNextPostingTime] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      await getNextTweetPostingTime();
      await fetchSuggestedTweets();
      setLoading(false);
    })();
  }, [user]);

  const getNextTweetPostingTime = async () => {
    const nextPostingTimestamp = await getNextPostingTime(user.id);
    setNextPostingTime(nextPostingTimestamp);
  };

  const fetchSuggestedTweets = async () => {
    setLoading(true);
    const queuedTweets = await getUserTweets(user.id, 'suggested');
    setTweets(queuedTweets);
    setLoading(false);
  };

  const generateTweetsInit = async () => {
    setLoading(true);
    generateTweetServiceClient(user);
    await new Promise((resolve) => setTimeout(resolve, 7000));
    fetchSuggestedTweets();
    setLoading(false);
  };

  const moveTweetToQueue = async (tweet: ITweet, index: number) => {
    await addTweetToQueue(user.id, tweet.id);
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
    console.log('tweet deleted from DB2');
  };

  // if (loading) {
  //   return <div><Spinner /></div>;
  // }

  // if (tweets.length < 1) {
  //   return <>
  //     <h3 className="selection-header-text">
  //       No generated tweets yet !
  //     </h3>
  //     <button className="generate-btn" onClick={generateTweetsInit}>
  //       Give Me More Tweets!
  //     </button>
  //   </>;
  // }


  return (
    <div className="selection-page">
      <h2>Suggested tweets</h2>
      {/* {spinner ? (
        <Spinner />
      ) : (
        <div className="selection-container">
          <div className="selection-header">
            {tweets?.length === 0 ? (
              <>
                <h3 className="selection-header-text">
                  No generated tweets yet !
                </h3>
                <button className="generate-btn" onClick={generateTweetsInit}>
                  Give Me More Tweets!
                </button>
              </>
            ) : (
              <div className="header-elements">
                <div className="next-tweet-time">
                  <p className="">Next tweet: </p>
                  <p className="h2">
                    {dayjs(new Date(nextPostingTime)).format('DD/MM/YY  HH:mm')}
                  </p>
                </div>
                <button className="generate-btn" onClick={generateTweetsInit}>
                  Give Me More Tweets!
                </button>
              </div>
            )}
          </div> */}
      <div className="header-elements">
        <div className="next-tweet-time">
          <p className="">Next tweet: </p>
          <p className="h2">
            {dayjs(new Date(nextPostingTime)).format('DD/MM/YY  HH:mm')}
          </p>
        </div>
        {loading ? 
        <Spinner />         
        : <></>}
        
        <button className="generate-btn" onClick={generateTweetsInit}>
          Give Me More Tweets!
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
              // nextPostingDate={nextPostingDate}
              />
            </div>
          );
        })}
      </div>
    </div>
  )
}
// </div>
// );
// };

export default Selection;
