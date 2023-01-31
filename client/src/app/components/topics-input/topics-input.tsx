import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { saveTopics } from "../../../services/api.service";
import { useAppSelector } from "../../hooks/hooks";
import Button from "../button/Button";

const TopicsInput = () => {
  const user = useAppSelector((state) => state.user)
  console.log('user id us :', user)
  const [selectedTopics, setSelectedTopics] = useState([""]);

  const setTopics = () => {
    console.log('selected topics are:', selectedTopics)
    saveTopics(selectedTopics, user.email)
  }




  return (
    <div className='topics-input-container'>
      <h1>It´s time to define what you want to tweet about.</h1>
      <h2>Write 20 tags, that define the most important topics you want to tweet about:</h2>
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <TagsInput
        value={selectedTopics}
        onChange={setSelectedTopics}
        name="fruits"
        placeHolder="enter here the topics you want to tweet about"
      />
      <em>press enter or comma to add new tag</em>
      <button onClick={setTopics}>submit topics</button>
    </div>
  );
};

export default TopicsInput;