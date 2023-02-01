import React, { useEffect, useState } from 'react';
import './Selection.scss';
import { getSuggestedTweets } from '../../../../../services/getsuggestedtweets.service';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import SingleTweet from '../../../tweet/Tweet';
import { generateTweetServiceClient } from '../../../../../services/api.service';
import acceptButton from '../../../../../images/check.png';
import rejectButton from '../../../../../images/reject.png';
import ITweet from '../../../../interfaces/tweet.interface';
import { queueTweetDB } from '../../../../../services/tweet-queue-db.service';
import { deleteTweetDB } from '../../../../../services/tweet-delete-db.service';
import Button from '../../../button/Button';
import Spinner from '../../../spinner/Spinner';

const Selection = () => {
  //const { tweets } = useAppSelector(({ tweets }) => tweets);
  const user = useAppSelector(({ user }) => user);
  const [spinner, setSpinner] = useState(false);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetchSuggestedTweets();
  }, []);

  useEffect(() => {
    console.log(tweets.length);
  }, [tweets]);

  const fetchSuggestedTweets = async () => {
    const fetchedTweets = await getSuggestedTweets(user.id);
    setTweets(fetchedTweets);
  };

  console.log('Suggested Tweets are: ', tweets);

  const generateTweetsInit = async () => {
    setSpinner(true);
    console.log('starting to generate tweets');
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    await new Promise((resolve) => setTimeout(resolve, 14000));
    fetchSuggestedTweets();
    setSpinner(false);
  };

  const moveTweetQueued = async (tweetToQueue: ITweet, index: number) => {
    console.log('moving tweet to queued');
    console.log(tweetToQueue);
    // modify tweet status in the DB
    queueTweetDB(user.id, tweetToQueue.id);
    // modify tweet status in the State
    deleteTweetinState(index);
    // generateTweetServiceClient(user);
  };

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

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <div>
          <ul>
            {tweets.map((tweet: ITweet, index) => {
              return (
                <li key={tweet.id} className="tweet-li">
                  <button
                    name="accept-tweet-button"
                    onClick={() => moveTweetQueued(tweet, index)}
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
