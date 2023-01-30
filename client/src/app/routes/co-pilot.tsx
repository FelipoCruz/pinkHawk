import { generateTweetServiceClient } from "../../services/api.service";
import { useAppSelector } from "../hooks/hooks";
import { useState } from "react";

const CoPilot = () => {

  const user = useAppSelector((state) => state.user)
  console.log('user id us :', user)

  const [tweet, setTweet] = useState('');
  

  const generateTweet = async () => {
    console.log('starting to generate tweet')
    const newTweet = await generateTweetServiceClient(user);
    console.log(newTweet.text)
    setTweet(newTweet.text);



    
  }
  
  return (
    <>
      <div className="container">
        <h1>Co Pilot</h1>
        <br />
        <br />
        <button onClick={generateTweet}> CLICK TO GENERATE TWEET </button>
        <br />
        <br />
        <h2>{tweet}</h2>
        
      </div>

    </>
  );
};

export default CoPilot;