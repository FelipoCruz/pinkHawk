import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPostingTime = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { postingHours: true },
    });
    if (!user) {
      return null;
    }
    const lastQueuedTweet = await prisma.tweet.findMany({
      where: { userId: userId, status: 'queued' },
      orderBy: { postingTimestamp: 'desc' },
      take: 1,
    });
    if (lastQueuedTweet) {
      console.log('lastQueuedTweet: ', lastQueuedTweet);

      const lastTweetInQueue = lastQueuedTweet[0].postingTimestamp;
      const formatDate = new Date(lastTweetInQueue!);

      const hourOfDate = formatDate.getHours();
      console.log('hourOfDate: ', hourOfDate);

      const postingHours = user.postingHours;
      console.log('postingHours: ', postingHours);
      if (postingHours[postingHours.length - 1] === hourOfDate) {
        formatDate.setDate(formatDate.getDate() + 1);
        formatDate.setHours(postingHours[0]);
        formatDate.setSeconds(0);
        return formatDate.toUTCString();
      } else {
        for (let postingHour of postingHours) {
          if (postingHour > hourOfDate) {
            formatDate.setHours(postingHour);
            return formatDate.toUTCString();
          }
        }
      }
    } else {
      const postingHours = user.postingHours;
      const firstPostingHour = Math.min(...postingHours);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(firstPostingHour, 0, 0, 0);
      return tomorrow.toUTCString();
    }
  } catch (error) {
    console.log(
      'Error in getPostingTime @ module utils/posting-time.ts: ',
      error
    );
  }
};
