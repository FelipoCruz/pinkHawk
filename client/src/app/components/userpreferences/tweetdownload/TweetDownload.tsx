import React, { useState } from 'react';
import { getUserTweets } from '../../../../services/api.service';
import { useAppSelector } from '../../../hooks/hooks';
import ITweet from '../../../interfaces/tweet.interface';

const TweetDownload = () => {
  const user = useAppSelector(({ user }) => user);
  const [tweets, setTweets] = useState<ITweet[]>([]);

  const fetchTweetsFromServer = async () => {
    const tweetsFromAPI = await getUserTweets(user.id, 'posted');
    setTweets(tweetsFromAPI);

    const csvContent = tweetsFromAPI.map((tweet: any) => {
      return `${tweet.id},${tweet.text},${tweet.createdAt}`;
    }).join('\n');

    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,\uFEFF${csvContent}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${user.firstName}, ${user.email} twitter history.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const downloadData = async () => {
    await fetchTweetsFromServer().then(() => {
      tweets.map((tweet: ITweet) => {
        return `${tweet.id},${tweet.text},${tweet.postingTimestamp}`;
      }).join('\n');
    })
  };

  return (
    <div>
      <button onClick={downloadData}>Download Tweets</button>
    </div>
  );
};

export default TweetDownload;
