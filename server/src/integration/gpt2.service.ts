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

Topics:
`
const generateTweetAIService = async (topics: []) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${topics}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${topics}`,
    temperature: 0.7,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();
  return basePromptOutput;

  // res.status(200).json({ output: basePromptOutput });
};

export default generateTweetAIService;