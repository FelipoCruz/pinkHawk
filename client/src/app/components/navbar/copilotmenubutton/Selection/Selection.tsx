import { useEffect, useState } from 'react';
import './Selection.scss';
// import '../../../tweet/Tweet.scss';
import { useAppSelector } from '../../../../hooks/hooks';
import SingleTweet from '../../../tweet/Tweet';
import {
  generateTweetServiceClient,
  getSuggestedTweets,
} from '../../../../../services/api.service';
import ITweet from '../../../../interfaces/tweet.interface';
import Spinner from '../../../spinner/Spinner';
// import '../../../tweet/Tweet.scss';
import {
  queueTweetDB,
  getUserTweets,
  deleteTweetDB,
} from '../../../../../services/api.service';
import dayjs from 'dayjs';
import SingleTweetTest2 from '../../../tweet/Tweet2';

const Selection = () => {
  //const { tweets } = useAppSelector(({ tweets }) => tweets);
  const user = useAppSelector(({ user }) => user);
  const [spinner, setSpinner] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [queuedTweets, setQueuedTweets] = useState<ITweet[]>([]);
  const [nextPostingDate, setNextPostingDate] = useState(Date);
  const [lastQueuedTweetDate, setLastQueuedTweetDate] = useState('');

  useEffect(() => {
    (async () => {
      await fetchSuggestedTweets();
      await fetchQueuedTweets();
    })();
  }, [user]);

  useEffect(() => {
    defineNextPostingDate();
  }, [tweets]);

  useEffect(() => {
    if (tweets.length < 1) fetchSuggestedTweets();
  }, []);

  const fetchSuggestedTweets = async () => {
    const fetchedTweets = await getSuggestedTweets(user.id);
    setTweets(fetchedTweets);
  };

  const fetchQueuedTweets = async () => {
    const queuedTweetsV = await getUserTweets(user.id, 'queued');
    setQueuedTweets(queuedTweetsV);
  };

  // console.log('nextPostingDate to UTC is: ', nextPostingDate.)

  const generateTweetsInit = async () => {
    setSpinner(true);
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
   
    tweetToQueue.postingTimestamp = postingDate;
  
    // modify tweet status in the DB
    await queueTweetDB(user.id, tweetToQueue.id, postingDate);
    setLastQueuedTweetDate(postingDate);
    // modify tweet status in state of suggested tweets
    deleteTweetinState(index);
    // add the tweet in state of queued tweets
    addTweetToQueueState(tweetToQueue);
    // generate a new suggested tweet from GPT
    generateTweetServiceClient(user);
  };

  const deleteTweet = async (tweetToDelete: ITweet, index: number) => {
  
    // delete tweet from DB
    const DBdelete = await deleteTweetDB(user.id, tweetToDelete.id);
    console.log('tweet deleted from DB', DBdelete);
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
    console.log('tweet deleted from DB2');
  };

  // this function sets nextPostingDate
  const defineNextPostingDate = () => {
   
    // if there are tweets in queue => the next postingDate will be:
    // nextPostingHour in the sequence, as of the last tweet in the queue [ (lastTweetinQueue => nextPostingHour) ]
    if (queuedTweets.length > 0) {
      const lastTweetInQueue = queuedTweets[queuedTweets.length - 1];
    
      const lastTweetInQueueDate = lastTweetInQueue.postingTimestamp;

      const formatDate = new Date(lastTweetInQueueDate);
      const hourOfDate = formatDate.getHours();

      const postingHours = user.postingHours;
   
      if (postingHours[postingHours.length - 1] === hourOfDate) {
        formatDate.setDate(formatDate.getDate() + 1);
        formatDate.setHours(postingHours[0]);
      
        setNextPostingDate(formatDate.toUTCString());
      } else {
        for (let postingHour of postingHours) {
          if (postingHour > hourOfDate) {
           
            formatDate.setHours(postingHour);
     
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
    
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(firstPostingHour, 0, 0, 0);
    
      setNextPostingDate(tomorrow.toUTCString());
    }
  };

  return (
    <div className="selection-page">
      {spinner ? (
        <Spinner />
      ) : (
        <div className="selection-container">
          <div className="selection-header">
            {tweets?.length === 0 ? (
              <h2 className="selection-header-text">
                No generated tweets yet !
              </h2>
            ) : (
              <div className="next-tweet-time">
                <h2 className="">Next accepted tweet will be posted at: </h2>
                <h1>{dayjs(nextPostingDate).format('DD/MM/YY [at] HH:mm')}</h1>
              </div>
            )}
          </div>

          <div className="tweets-list">
            {tweets?.map((tweet: ITweet, index) => {
              return (
                <div key={tweet.id} className="tweet-li">
                  
                  <SingleTweetTest2 tweet={tweet} moveTweetQueued = {moveTweetQueued} deleteTweet={deleteTweet} index={index} nextPostingDate={nextPostingDate}/>
                </div>
              );
            })}
          </div>
          <button className="generate-btn" onClick={generateTweetsInit}>
            Give Me More Tweets!
          </button>

      
        </div>
      )}
    </div>
  );
};

export default Selection;
