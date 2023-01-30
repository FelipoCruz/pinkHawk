import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const TopicsInput = () => {
  const [selectedTopics, setSelectedTopics] = useState([""]);

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
    </div>
  );
};

export default TopicsInput;