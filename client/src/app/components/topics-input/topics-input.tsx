import React, { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import { saveTopics, updateFrequencyPreference } from '../../../services/api.service';
import { activeUser } from '../../../store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Button from '../button/Button';
import './topics-input.scss';

const TopicsInput = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  console.log('user in state :', user);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [amountPreference, setAmountPreference] = useState(user.frequencyTweetPosting || '');

  const setTopics = () => {
    console.log('selected topics are:', selectedTopics);
    saveTopics(selectedTopics, user.email);
    setSelectedTopics([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAmountPreference(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pref = await updateFrequencyPreference(user.id, amountPreference);
    console.log('what we receive from API on submit topic preferences: ====>', pref);
    setAmountPreference(pref.frequencyTweetPosting);
    dispatch(activeUser(pref));
  };

  return (
    <div className='pref-container'>
      <div className='topics-input-container'>
        <h1>Tweets tags</h1>
        <p>Define the most important topics you want to tweet about:</p>
        <TagsInput
          value={selectedTopics}
          onChange={setSelectedTopics}
          name='tags'
          placeHolder='Enter here tweet tags'
        />
        <em>(Press enter to add new tag)</em>
        <button onClick={setTopics} className='pref-btn'>submit topics</button>
      </div>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h1 className='time-label'>Choose your preference for posting a tweet:</h1>
          <label htmlFor='number'>every</label>
          <select id='number' name='number' className='select-box' onChange={handleChange} value={amountPreference}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
            <option value='12'>12</option>
          </select>
          <label>hour(s)</label>
          <button className='pref-btn'>Save preference</button>
        </form>
      </div>
    </div>
  );
};

export default TopicsInput;
