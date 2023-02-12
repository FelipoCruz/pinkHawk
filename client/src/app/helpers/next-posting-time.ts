import { getMostRecentQueuedTweet } from '../../services/api.service';
import IUser from '../interfaces/user.interface';

export const getNextPostingTime = async (user: IUser) => {
  try {
    const lastQTweet = await getMostRecentQueuedTweet(user.id);
    let postingHours = user.postingHours.slice().sort((a, b) => a - b);

    if (lastQTweet.length === 0) {
      const firstPostingHour = Math.min(...postingHours);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      tomorrow.setHours(firstPostingHour, 0, 0, 0);
      return tomorrow.toUTCString();
    } else {
      const lastTweetInQueue = lastQTweet[0].postingTimestamp;
      let formatDate = new Date(lastTweetInQueue!);
      const QTPostingHour = formatDate.getHours();
      const lastPostingHour = Math.max(...postingHours);

      if (formatDate.getHours() === lastPostingHour) {
        return getNextDayMinimumPostingHour(postingHours, formatDate);
      }

      for (let postingHour of postingHours) {
        if (QTPostingHour < postingHour) {
          formatDate.setHours(postingHour);
          return formatDate.toUTCString();
        }
      }

      // Case where the preferences hours are changed
      return getNextDayMinimumPostingHour(postingHours, formatDate);
    }
  } catch (error) {
    console.log(
      'Error in getNextPostingTime @ module controller/tweet.ts: ',
      error
    );
  }
};

const getNextDayMinimumPostingHour = (
  postingHours: number[],
  formatDate: Date
) => {
  const nextDay = formatDate.getDate() + 1;
  formatDate.setDate(nextDay);
  formatDate.setHours(Math.min(...postingHours), 0, 0, 0);
  return formatDate.toUTCString();
};
