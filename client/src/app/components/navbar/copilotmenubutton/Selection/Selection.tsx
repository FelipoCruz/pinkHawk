import React, { useEffect, useState } from 'react';
import './Selection.scss';
import '../../../tweet/Tweet.scss';
import { useAppSelector } from '../../../../hooks/hooks';
import SingleTweet from '../../../tweet/Tweet';
import {
  deleteTweetDB,
  generateTweetServiceClient,
  getSuggestedTweets,
  getUserTweets,
  queueTweetDB,
} from '../../../../../services/api.service';
import acceptButton from '../../../../../images/check.png';
import rejectButton from '../../../../../images/reject.png';
import ITweet from '../../../../interfaces/tweet.interface';
import Button from '../../../button/Button';
import Spinner from '../../../spinner/Spinner';
import '../../../tweet/Tweet.scss';
import dayjs from 'dayjs';

const Selection = () => {
  //const { tweets } = useAppSelector(({ tweets }) => tweets);
  const user = useAppSelector(({ user }) => user);
  const [spinner, setSpinner] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [queuedTweets, setQueuedTweets] = useState<ITweet[]>([]);
  const [nextPostingDate, setNextPostingDate] = useState(Date);
  const [lastQueuedTweetDate, setLastQueuedTweetDate] = useState('');

  console.log(user);
  console.log('Suggested Tweets are: ', tweets);
  console.log('Queued Tweets are: ', queuedTweets);
  console.log('queuedTweets length is: ', queuedTweets.length);
  console.log('nextPostingDate is: ', nextPostingDate);
  console.log('nextPostingDate typeof: ', typeof nextPostingDate);
  console.log('lastQueuedTweets is: ', lastQueuedTweetDate);

  useEffect(() => {
    fetchSuggestedTweets();
    fetchQueuedTweets();
  }, []);

  useEffect(() => {
    defineNextPostingDate();
  }, [tweets]);

  useEffect(() => {
    console.log(tweets.length);
    if (tweets.length < 1) fetchSuggestedTweets();
  }, []);

  const fetchSuggestedTweets = async () => {
    const fetchedTweets = await getSuggestedTweets(user.id);
    setTweets(fetchedTweets);
  };

  const fetchQueuedTweets = async () => {
    const queuedTweetsV = await getUserTweets(user.id, 'queued');
    console.log('queued tweets are: ', queuedTweets);
    setQueuedTweets(queuedTweetsV);
  };

  // console.log('nextPostingDate to UTC is: ', nextPostingDate.)

  const generateTweetsInit = async () => {
    setSpinner(true);
    console.log('starting to generate tweets');
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    await new Promise((resolve) => setTimeout(resolve, 7000));
    fetchSuggestedTweets();
    setSpinner(false);
  };

  const moveTweetQueued = async (
    tweetToQueue: ITweet,
    index: number,
    postingDate: string
  ) => {
    console.log('moving tweet to queued');
    tweetToQueue.postingTimestamp = postingDate;
    console.log(tweetToQueue);
    console.log('posting date: ' + postingDate);
    // modify tweet status in the DB
    queueTweetDB(user.id, tweetToQueue.id);
    // modify tweet status in the State
    deleteTweetinState(index);
    queueTweetDB(user.id, tweetToQueue.id, postingDate);
    setLastQueuedTweetDate(postingDate);
    // modify tweet status in state of suggested tweets
    deleteTweetinState(index);
    // add the tweet in state of queued tweets
    addTweetToQueueState(tweetToQueue);
    // generate a new suggested tweet from GPT
    generateTweetServiceClient(user);
  };

  const deleteTweet = async (tweetToDelete: ITweet, index: number) => {
    console.log('deleting tweet');
    console.log(tweetToDelete);
    // delete tweet from DB
    deleteTweetDB(user.id, tweetToDelete.id);
    // delete tweet from state
    deleteTweetinState(index);
    generateTweetServiceClient(user);
  };

  const addTweetToQueueState = (tweet: ITweet) => {
    setQueuedTweets([...queuedTweets, tweet]);
  };

  const deleteTweetinState = (index: number) => {
    const items = [...tweets];
    items.splice(index, 1);
    setTweets(items);
  };

  // this function sets nextPostingDate
  const defineNextPostingDate = () => {
    console.log('hi');
    // if there are tweets in queue => the next postingDate will be:
    // nextPostingHour in the sequence, as of the last tweet in the queue [ (lastTweetinQueue => nextPostingHour) ]
    if (queuedTweets.length > 0) {
      const lastTweetInQueue = queuedTweets[queuedTweets.length - 1];
      console.log('lastTweetInQueue is: ', lastTweetInQueue);
      const lastTweetInQueueDate = lastTweetInQueue.postingTimestamp;
      console.log('lastTweetInQueueDate', lastTweetInQueueDate);
      const formatDate = new Date(lastTweetInQueueDate);
      const hourOfDate = formatDate.getHours();
      console.log('hour of Date is; ', hourOfDate);
      const postingHours = user.postingHours;
      console.log('posting hours are: ', postingHours);
      if (postingHours[postingHours.length - 1] === hourOfDate) {
        formatDate.setDate(formatDate.getDate() + 1);
        formatDate.setHours(postingHours[0]);
        console.log('formatDate 1 is: ', formatDate);
        setNextPostingDate(formatDate.toUTCString());
      } else {
        for (let postingHour of postingHours) {
          if (postingHour > hourOfDate) {
            console.log(' curr postingHour is', postingHour);
            formatDate.setHours(postingHour);
            console.log('formatDate 2 is: ', formatDate);
            setNextPostingDate(formatDate.toUTCString());
            break;
          }
        }
      }
      //setNextPostingDate(lastTweetInQueueDate);
    }

    // if there are no tweets in queue => the next postingDate will be: tomorrow at firstPostingHour.
    if (queuedTweets.length === 0) {
      const postingHours = user.postingHours;
      const firstPostingHour = Math.min(...postingHours);
      console.log('firstPostingHour is: ', firstPostingHour);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(firstPostingHour, 0, 0, 0);
      console.log('tomorrow first posting hour is: ', tomorrow);
      setNextPostingDate(tomorrow.toUTCString());
    }
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <div>
          <h2>next accepted tweet will go to queue and will be posted at: </h2>
          <h2>{dayjs(nextPostingDate).format('DD/MM/YY [at] HH:mm')}</h2>
          <ul>
            {tweets.map((tweet: ITweet, index) => {
              return (
                <li key={tweet.id} className="tweet-li">
                  <button
                    name="accept-tweet-button"
                    onClick={() =>
                      moveTweetQueued(tweet, index, nextPostingDate)
                    }
                  >
                    <img
                      alt="accept-tweet-button-img"
                      className="icon-button"
                      src={acceptButton}
                    />
                  </button>
                  <SingleTweet tweetPassed={tweet} />
                  <button
                    name="reject-tweet-button"
                    onClick={() => deleteTweet(tweet, index)}
                  >
                    <img
                      alt="reject-tweet-button"
                      className="icon-button"
                      src={rejectButton}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          <button onClick={generateTweetsInit}>
            {' '}
            <Button text={'More Tweets!'}></Button>{' '}
          </button>
        </div>
      )}
    </>
  );
};

export default Selection;
