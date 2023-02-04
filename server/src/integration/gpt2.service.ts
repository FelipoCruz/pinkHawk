import { Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
  `
Create a tweet, picking just one following topics, from the array of Topics:
The Tweet must be fun, interesting, and engaging. 
The tweet must explain with details and examples an idea or fact.
Avoid that the tweet sound too generic or vague. 
The tweet must sound unique and personal.
The tweet must be short, just one sentence.
`
const generateTweetAIService = async (topics: []) => {
  // Run first prompt
  try {
    // console.log(`API: ${basePromptPrefix}${topics}`)
    const randomIndex = Math.floor(Math.random() * topics.length);
    console.log('topics are')
    const randomTopic = topics[randomIndex];

    /* const prompt = `Today, I'd like to tweet about ${randomTopic}. Create a tweet that is cool, unique, easy to read, that explains something in detail, with logic, arguments and facts. The tweet must be more than 20 words long and also less than 35 words long. It is really important that the tweet is less than 35 words long.` */
    const prompt = `Give me one and only one specific topic to talk about, related to ${randomTopic}`
    console.log('topic is: ', randomTopic);
    console.log('prompt is: ', prompt )

    // ['text-davinci-003', 'text-curie-001', 'text-babbage-001']
    const models = ['text-davinci-003']
    const randomIndex2 = Math.floor(Math.random() * models.length);
    const model = models[randomIndex2];
    console.log('model is: ', model);

    const baseCompletion = await openai.createCompletion({
      model: model,
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 50,
    });

    const basePromptOutput = baseCompletion.data.choices.pop()?.text;

    console.log('basePromptOutput1 is:', basePromptOutput)

    const prompt2 = `Create a tweet about: ${basePromptOutput} The tweet must be cool, unique and should explain something in detail, with logic, arguments and facts. The tweet must be more than 20 words long and also less than 35 words long. It is really important that the tweet is less than 25 words long.`
    console.log("prompt2 is: ", prompt2)
    const baseCompletion2 = await openai.createCompletion({
      model: model,
      prompt: prompt2,
      temperature: 0.9,
      max_tokens: 300,
    });

    const basePromptOutput2 = baseCompletion2.data.choices.pop();
    console.log('basePromptOutput2', basePromptOutput2)

    return basePromptOutput2;

  } catch (error) {
    console.log('error in generateTweetAIService: ', error)
  }
};

export default generateTweetAIService;