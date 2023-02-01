import React, { useEffect, useState } from 'react';
import './Selection.scss';
import { getSuggestedTweets } from '../../../../../services/getsuggestedtweets.service';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import SingleTweet from '../../../tweet/Tweet';
import { generateTweetServiceClient } from '../../../../../services/api.service';
import acceptButton from '../../../../../images/check.png';
import rejectButton from '../../../../../images/reject.png';
import { Tweet } from '../../../../interfaces/tweet.interface';
import { queueTweetDB } from '../../../../../services/tweet-queue-db.service';
import { deleteTweetDB } from '../../../../../services/tweet-delete-db.service';


const Selection = () => {
  //const { tweets } = useAppSelector(({ tweets }) => tweets);
  const user = useAppSelector(({ user }) => user);
  const [sTweets, setSTweets] = useState([])

  useEffect(() => {
    fetchSuggestedTweets();

  }, []);

  useEffect(() => {
    console.log(sTweets.length);
  }, [sTweets]);

  const fetchSuggestedTweets = async () => {
    const fetchedTweets = await getSuggestedTweets(user.id);
    setSTweets(fetchedTweets);

  };

  console.log('Suggested Tweets are: ', sTweets);

  const generateTweetsInit = async () => {
    console.log('starting to generate tweets')
    await generateTweetServiceClient(user);
    await generateTweetServiceClient(user);
    await generateTweetServiceClient(user);
    await generateTweetServiceClient(user);
    await generateTweetServiceClient(user);
  };

  const moveTweetQueued = async (tweetToQueue: Tweet, index: number) => {
    console.log('moving tweet to queued')
    console.log(tweetToQueue);
    // modify tweet status in the DB
    queueTweetDB(user.id, tweetToQueue.id)
    // modify tweet status in the State
    deleteTweetinState(index)
    // generateTweetServiceClient(user);
  };

  const deleteTweet = async (tweetToDelete: Tweet, index: number) => {
    console.log('deleting tweet')
    console.log(tweetToDelete);
    // delete tweet from DB
    deleteTweetDB(user.id, tweetToDelete.id);
    // delete tweet from state
    deleteTweetinState(index)
    // generateTweetServiceClient(user);
  };

  const deleteTweetinState = (index: number) => {
    const items = [...sTweets];
    items.splice(index, 1);
    setSTweets(items);
  };



  return (
    <>
      <div>
        <h1>hi</h1>
        <button onClick={generateTweetsInit}> GENERATE TWEETS INITIAL </button>
        <br />
        <br />
        {/* <button onClick={generateTweet}> GENERATE TWEETS 2ND </button> */}
        <br />
        <br />
        {/* <SingleTweet tweetPassed={sTweets[0]} /> */}
        <ul>
          {sTweets.map((tweet: Tweet, index) => {
            return (

              <li key={tweet.id} className="tweet-li">
                <button name="accept-tweet-button" onClick={() => moveTweetQueued(tweet, index)}>
                  <img alt="accept-tweet-button-img" className="icon-button" src={acceptButton} />
                </button>
                <SingleTweet tweetPassed={tweet} />
                <button name="reject-tweet-button" onClick={() => deleteTweet(tweet, index)}>
                  <img alt="reject-tweet-button" className="icon-button" src={rejectButton} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Selection;
