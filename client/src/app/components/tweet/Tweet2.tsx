import { useAppSelector } from '../../hooks/hooks';
import ITweet from '../../interfaces/tweet.interface';
import userIcon from '../../../images/tom.jpg';
import commentIcon from '../../../images/Twitter_Reply.png';
import retweetIcon from '../../../images/repost.png';
import likeHeart from '../../../images/heart.png';
import './Tweet2.scss'
import dayjs from 'dayjs';
import { updateText } from '../../../services/api.service';
import { useEffect, useState } from 'react';
import IUser from '../../interfaces/user.interface';


type Props = {
  tweet: ITweet,
  deleteTweet: (tweet: ITweet, index: number) => void,
  moveTweetQueued?: (tweet: ITweet, index: number, nextPostingDate: string) => void,
  index: number,
  nextPostingDate?: string;
};

const SingleTweetTest2 = ({ tweet, deleteTweet, moveTweetQueued, index, nextPostingDate }: Props) => {
  const user: IUser = useAppSelector(({ user }) => user);

  //edit tweet state logic
  const [newText, setNewText] = useState(tweet.text);
  const [isEditing, setIsEditing] = useState(false);
  //click the btn to show the edit modal
  const handleEdit = () => {
    setIsEditing(true);
  };
 //click save btn to update the tweet
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateText(tweet.id, newText);
    setIsEditing(false);
  };
 //click cancel btn to close the modal
  const handleModal = () => {
    setIsEditing(false);
  }

  if (!tweet) return null;

  //generate random likes, retweets, comments for each tweet
  const generateLikes = () => {
    const likes = Math.round(Math.random() * 10 * 10) / 10 + 1
    return likes;
  };
  const generateRetweets = () => {
    const retweets = Math.floor(Math.random() * 500);
    return retweets;
  };
  const generateComments = () => {
    const comments = Math.floor(Math.random() * 500);
    return comments;
  };


  return (
    <>
      <div className={isEditing ? "tweet-wrap-dark" : 'tweet-wrap'}>
        {isEditing
          ?
          <form onSubmit={handleSubmit}>
            <div className='modal'>
              <div className="span">
                <span className="material-symbols-outlined" onClick={handleModal}>cancel</span>
              </div>
              <textarea className="on-edit-tweet-text"
                value={newText.trim()}
                onChange={(e) => setNewText(e.target.value)}
              />
              <button type="submit" className='save-button'>Save</button>
            </div>
          </form>
          :
          null
        }
        {tweet.status === 'queued'
          ?
          <div className="date-container">
            <p className='date-header'>Posting time:
              <span> {dayjs(String(tweet.postingTimestamp)).format(
                'DD/MM/YY HH:mm'
              )}</span>
            </p>
          </div>
          : null
        }

        <div className='tweet-header'>
          <img src={!user.profilePicture ? userIcon : user.profilePicture} alt="" className="avator" />
          <div className="tweet-header-info">
            <div className="icon-group">
              <span className="material-symbols-outlined" onClick={handleEdit}>edit</span>
              {tweet.status === "suggested" ? <span className="material-symbols-outlined" onClick={() => nextPostingDate && moveTweetQueued && moveTweetQueued(tweet, index, nextPostingDate)}>add_circle</span> : null}
              <span className="material-symbols-outlined" onClick={() => deleteTweet(tweet, index)}>cancel</span>
            </div>
            <p className='user-name'>{user.firstName} {user.lastName} </p>
            <span className='user-screen-name'>@{user.firstName}{user.lastName}</span>
            <p className='tweet-text'>{newText}</p>

            <div className="tweet-info-counts">
              <div className="comments">
                <img height="3" className="tweet-icon" src={commentIcon} alt="" />
                <div className="comment-count">{generateComments()}</div>
              </div>
              <div className='retweets'>
                <img className='tweet-icon' src={retweetIcon} alt='retweetIcon' />
                <div className='retweet-count'>{generateRetweets()}</div>
              </div>
              <div className='likes'>
                <img className='tweet-icon' src={likeHeart} alt='likeHeart' />
                <div className='likes-count'>
                  {generateLikes() + 'k'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  );
};

export default SingleTweetTest2;

