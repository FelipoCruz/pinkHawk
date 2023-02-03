import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import Tweet from '../../../tweet/Tweet';
import ITweet from '../../../../interfaces/tweet.interface';
import '../../../tweet/Tweet.scss';
import rejectButton from '../../../../../images/reject.png';
import dayjs from 'dayjs';
import {
  deleteTweetDB,
  getUserTweets,
} from '../../../../../services/api.service';
import './Queue.scss'
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

  const deleteTweet = async (tweetToDelete: ITweet, index: number) => {
    console.log('deleting tweet');
    console.log(tweetToDelete);
    // delete tweet from DB
    deleteTweetDB(user.id, tweetToDelete.id);
    // delete tweet from state
    deleteTweetinState(index);
    // generateTweetServiceClient(user);
  };

  const deleteTweetinState = (index: number) => {
    const items = [...tweets];
    items.splice(index, 1);
    setTweets(items);
  };

  console.log('tweets are: ', tweets);

  return (
    <>
      {tweets?.length ? (
        tweets.map((tweet: ITweet, index) => (
          <li key={tweet.id} className="queue-tweet-li">
            <Tweet key={tweet.id} tweetPassed={tweet} />
            <div className='date-btn-container'>
              <div className="date-container">
                <p className='date-header'>Posting time:</p>
                <p className='date-info'>
                  {dayjs(String(tweet.postingTimestamp)).format(
                    'DD/MM/YY HH:mm'
                  )}
                </p>
              </div>

              <div className='icon-container'>
                <span className="material-symbols-outlined queue-cancel" onClick={() => deleteTweet(tweet, index)}>
                  cancel
                </span>
              </div>
            </div>


            {/* <button
              name="reject-tweet-button"
              onClick={() => deleteTweet(tweet, index)}
            >
              <img
                alt="reject-tweet-button"
                className="icon-button"
                src={rejectButton}
              />
            </button> */}
          </li>
        ))
      ) : (
        <h2>You have no queued tweets yet</h2>
      )}
    </>
  );
};

export default Queue;
