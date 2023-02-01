import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { saveTopics, updateTimePreference } from "../../../services/api.service";
import { useAppSelector } from "../../hooks/hooks";
import Button from "../button/Button";
import "./topics-input.scss"

const TopicsInput = () => {
  const user = useAppSelector((state) => state.user)
  console.log('user id us :', user)
  const [selectedTopics, setSelectedTopics] = useState([""]);
  const [timePreference, setTimePreference] = useState('')

  const setTopics = () => {
    console.log('selected topics are:', selectedTopics)
    saveTopics(selectedTopics, user.email)
  }
  

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimePreference(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const pref = await updateTimePreference(user.id, timePreference)
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

      <form onSubmit={handleSubmit}>
        <h2 className='time-label'>Choose your preference for posting a tweet:</h2>
        <label htmlFor="number">every</label>
        <select id="number" name="number" className='select-box'  onChange={handleChange} value={timePreference}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <label>hour(s)</label>
        <button className='pref-btn'>Save the preference</button>
      </form>
      
    </div>
  );
};

export default TopicsInput;