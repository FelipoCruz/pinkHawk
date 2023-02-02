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
    // why are we using user.email instead of .id? just curious.
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

  const timesPerDay = () => {
    return Array.from({ length: 6 }, (_, i) => i + 1);
  }

  return (
    <div className='pref-container'>
      <div className='topics-input-container'>
        <h1>Tweet Tags</h1>
        <p>Define topics you want to tweet about.</p>
        <TagsInput
          value={selectedTopics}
          onChange={setSelectedTopics}
          name='tags'
          placeHolder='Enter here tweet tags'
        />
        <em>(Press enter to add new tag)</em>
        <button onClick={setTopics} className='pref-btn'>save topics</button>
      </div>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h1 className='time-label'>Tweet posting preferences</h1>
          <label htmlFor='number'>Times per day</label>
          <select id='number' name='number' className='select-box' onChange={handleChange} value={amountPreference}>
            {timesPerDay().map((times: number) => (
              <option key={times} value={times}>
                {times}
              </option>
            ))}
          </select>
          <label>Select the hours</label>
          <button className='pref-btn'>Save preference</button>
        </form>
      </div>
    </div>
  );
};

export default TopicsInput;
