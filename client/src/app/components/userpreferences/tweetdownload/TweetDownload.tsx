import React, { useState } from 'react';
import { getUserTweets } from '../../../../services/api.service';
import { useAppSelector } from '../../../hooks/hooks';

const TweetDownload = () => {
  const [tweets, setTweets] = useState([]);
  const user = useAppSelector(({ user }) => user);

  const fetchTweetsFromServer = async () => {
    const tweetsFromAPI = await getUserTweets(user.id, 'posted');
    setTweets(tweetsFromAPI);

    const csvContent = tweetsFromAPI.map((tweet: any) => {
      return `${tweet.id},${tweet.text},${tweet.createdAt}`;
    }).join('');

    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,\uFEFF${csvContent}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'tweets.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const downloadTweets = () => {
    fetchTweetsFromServer().then(() => {
      const tweetData = tweets.map((tweet: any) => {
        return `${tweet.id},${tweet.text},${tweet.createdAt}`;
      }).join('\n');

      const blob = new Blob([tweetData], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'tweets.txt';
      link.click();
    })
  };

  return (
    <div>
      <button onClick={fetchTweetsFromServer}>Fetch Tweets</button>
      <button onClick={downloadTweets}>Download Tweets</button>
      {tweets && (
        tweets.map((tweet: any) => {
          return (
            <div key={tweet.id}>
              {tweet.text}: {tweet.createdAt}
            </div>
          );
        }))}
    </div>
  );
};

export default TweetDownload;
