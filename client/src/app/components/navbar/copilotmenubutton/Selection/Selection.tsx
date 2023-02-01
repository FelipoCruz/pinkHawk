import React, { useEffect, useState } from 'react';
import './Selection.scss';
import { getSuggestedTweets } from '../../../../../services/getsuggestedtweets.service';
import { selectionTweets } from '../../../../../store/slices/tweet.slice';
import { Tweet as TweetType } from '../../../../../store/slices/tweet.slice';
import Tweet from '../../../tweet/Tweet';
import { getTweets } from '../../../../helpers/mocks';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import SingleTweet from '../../../tweet/Tweet';
import { generateTweetServiceClient } from '../../../../../services/api.service';
import acceptButton from '../../../../../images/check.png';
import rejectButton from '../../../../../images/reject.png';


const Selection = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);
  const { tweets } = useAppSelector(({ tweets }) => tweets);
  // const [tweets, setTweets] = React.useState<any>([]);
  const [sTweets, setSTweets] = useState([])

  useEffect(() => {
    // fetch tweets with status suggested
    fetchSuggestedTweets();
  }, []);

  const fetchSuggestedTweets = async () => {
    const fetchedTweets = await getSuggestedTweets(3);
    setSTweets(fetchedTweets);
  };

  console.log('Suggested Tweets are: ', sTweets);

  const generateTweetsInit = async () => {
    console.log('starting to generate tweets')
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
    generateTweetServiceClient(user);
  };

  const deleteTweet = async () => {
    console.log('deleting tweet')

  };

  const moveTweetQueued = async () => {
    console.log('moving tweet to queued')

  };




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

  const fetchSelectionTweets = async () => {
    const response = await getTweets();
    dispatch(selectionTweets(response));
  };

  useEffect(() => {
    fetchSelectionTweets();
  }, []);

  // we first check if there are tweets in the store
  if (!tweets) return null;

  return (
    <>
      <div>
        <button onClick={generateTweetsInit}> GENERATE TWEETS INITIAL </button>
        <br />
        <br />
        {/* <button onClick={generateTweet}> GENERATE TWEETS 2ND </button> */}
        <br />
        <br />
        {/* <SingleTweet tweetPassed={sTweets[0]} /> */}
        <ul>
          {sTweets.map((tweet: any) => {
            return (
              <li key={tweet.id} className="tweet-li">
                <button name="accept-tweet-button" onClick={moveTweetQueued}>
                  <img alt="accept-tweet-button-img" className="icon-button" src={acceptButton} />
                </button>
                <SingleTweet tweetPassed={tweet} />
                <button name="reject-tweet-button" onClick={deleteTweet}>
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
