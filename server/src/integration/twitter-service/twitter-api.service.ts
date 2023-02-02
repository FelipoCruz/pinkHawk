import { PrismaClient } from '@prisma/client';
import { TwitterApi } from "twitter-api-v2";
const prisma = new PrismaClient();
const key = process.env.API_KEY || '';
const secret = process.env.API_KEY_SECRET || '';


//cronjob for DEMO DAY -- execute every minute
var CronJob = require('cron').CronJob;
function job() {
  new CronJob(
    '0 */01 * * * *', //seconds, minutes, hours, day of month, month, day of week
    async function () {
      let nowDate = new Date().toISOString().split('T')[0]; //xxxx-xx-xx
      let nowHour = new Date().getHours(); // number from 0-23
      let nowMinutes = new Date().getMinutes();
      let tweets = await prisma.tweet.findMany({ where: { status: "queued"} })
      
      tweets.forEach(async tweet => {
        const {postingTimestamp} = tweet;
        if(postingTimestamp && postingTimestamp!.getUTCHours() === nowHour && postingTimestamp!.getUTCMinutes() === nowMinutes) {
          const userId = tweet.userId;
          console.log(userId);
          
          const user = await prisma.user.findUnique({where:{ id: userId}})
          const { twitterToken, twitterSecret } = user!;
          const realUser = new TwitterApi({
                appKey: key,
                appSecret: secret!,
                accessToken: twitterToken!,
                accessSecret: twitterSecret!
              })
          await realUser.v2.tweet(tweet.text)
          await prisma.tweet.update({ where: { id: tweet.id }, data: { status: "posted" } })
        }
      })
    },
    null,
    true, //with this parameter set to true, no need to call job.start()
    'Europe/Madrid' //timezone!!!!!
  )
}

export default job



// //Real cronjob -- execute every hour from 0-23 hours

// // var CronJob = require('cron').CronJob;
// // var job = new CronJob(
// //   '0 0-23 * * * *', //seconds, minutes, hours, day of month, month, day of week
// //   async function () {
// //     let nowDate = new Date().toISOString().split('T')[0]; //xxxx-xx-xx
// //     let nowHour = new Date().getHours(); // number from 0-23
// //     let tweets = await prisma.tweet.findMany({ where: { status: "queued"} })
// //     tweets.forEach(async tweet => {
// //       const {postingTimestamp} = tweet;
// //      if(postingTimestamp && postingTimestamp.getHours() === nowHour && postingTimestamp.toISOString().split('T')[0] === nowDate) {
// //         const userId = tweet.userId;
// //         const user = await prisma.user.findUnique({where:{ id: userId}})
// //         const { twitterToken, twitterSecret } = user!;
// //         const realUser = new TwitterApi({
// //               appKey: key,
// //               appSecret: secret!,
// //               accessToken: twitterToken!,
// //               accessSecret: twitterSecret!
// //             })
// //         await realUser.v2.tweet(tweet)
// //       }
// //     })
// //   },
// //   null,
// //   true, //with this parameter set to true, no need to call job.start()
// //   'Europe/Madrid' //timezone!!!!!
// // );


