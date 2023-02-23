import { PrismaClient } from '@prisma/client';
import { TwitterApi } from 'twitter-api-v2';
const prisma = new PrismaClient();
const key = process.env.API_KEY || '';
const secret = process.env.API_KEY_SECRET || '';

//cronjob for DEMO DAY -- execute every minute
var CronJob = require('cron').CronJob;
function job() {
  try {
    new CronJob(
      '0 */01 * * * *', //seconds, minutes, hours, day of month, month, day of week
      async function () {
        const utcDate = new Date(new Date().toUTCString());
        let tweets = await prisma.tweet.findMany({
          where: { status: 'queued', postingTimestamp: utcDate },
          select: {
            id: true,
            text: true,
            User: {
              select: {
                id: true,
                twitterToken: true,
                twitterSecret: true,
              },
            },
          },
        });

        tweets.forEach(async (tweet) => {
          const user = tweet.User;
          console.log('user is: ', user);

          const { twitterToken, twitterSecret } = user!;
          const realUser = new TwitterApi({
            appKey: key,
            appSecret: secret!,
            accessToken: twitterToken!,
            accessSecret: twitterSecret!,
          });

          await realUser.v2.tweet(tweet.text);

          await prisma.tweet.update({
            where: { id: tweet.id },
            data: { status: 'posted' },
          });
        });
      },
      null,
      true, //with this parameter set to true, no need to call job.start()
      'Europe/Madrid' //timezone!!!!!
    );
  } catch (error) {
    console.log('error in the CronJob. The error is:', error);
  }
}

//execute every day at 12pm UTC
function job1() {
  try {
    new CronJob(
      '0 12 * * * *', //seconds, minutes, hours, day of month, month, day of week
      async function () {
        
        const users = await prisma.user.findMany({
          select: {
            id: true,
            twitterAccountId: true,
            twitterToken: true,
            twitterSecret: true,
            twitterName: true,
          },
        });

        users.forEach(async (user) => {
          const realUser = new TwitterApi({
            appKey: key,
            appSecret: secret!,
            accessToken: user.twitterToken!,
            accessSecret: user.twitterSecret!,
          });

          const followers = await realUser.v2.followers(user?.twitterAccountId!);
          const followersCount = followers.meta.result_count;

          const tweets = await realUser.v2.search({ "tweet.fields": "public_metrics", "query": `from:${user?.twitterName!}` })
          let totalLikes = 0;
          let totalComments = 0;
          for await (const tweet of tweets) {
            const likes = tweet.public_metrics!.like_count;
            const comments = tweet.public_metrics!.reply_count;
            totalComments += comments;
            totalLikes += likes;
          }

          await prisma.growthData.update({
            where: { userId: user.id },
            data: {  
              followers: followersCount,
              likes: totalLikes,
              comments: totalComments,
              date: new Date()
            },

          });
        }),
      },
      null,
      true, //with this parameter set to true, no need to call job.start()
      'UTC' //timezone!!!!!
    );
  } catch (error) {
    console.log('error in the CronJob. The error is:', error);
  }
}

export { job, job1 };
