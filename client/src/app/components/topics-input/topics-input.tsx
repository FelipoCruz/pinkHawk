import React, { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import {
  saveTopics,
  updateFrequencyPreference,
} from '../../../services/api.service';
import { activeUser } from '../../../store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import './topics-input.scss';

const TopicsInput = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [selectedTopics, setSelectedTopics] = useState(user.topics);
  const [timesPreference, setTimesPreference] = useState(
    user.frequencyTweetPosting || 1
  );
  const [hoursPreference, setHoursPreference] = useState(user.postingHours);

  const setTopics = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const savingTopics = await saveTopics(selectedTopics, user.id);
    console.log('file: topics-input.tsx:25 ~~> setTopics ~~> savingTopics', savingTopics)
    dispatch(activeUser(savingTopics));
  };

  const handleChangeTimes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimesPreference(Number(e.target.value));
    // reset hours selected on change of frequency preference
    setHoursPreference([]);
  };

  // chenge the state of hoursPreference when the user selects a time to tweet
  // if the user selects more than the defined tweets per day, the last selection is not saved
  const handleChangeHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setHoursPreference((prevState) => {
        if (prevState.length < timesPreference) {
          return [...prevState, Number(e.target.value)];
        } else {
          e.target.checked = false;
          return prevState;
        }
      });
    } else {
      setHoursPreference(
        hoursPreference.filter((hour) => hour !== Number(e.target.value))
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const frequencyPrefence = await updateFrequencyPreference(
      user.id,
      timesPreference,
      hoursPreference
    );
    setTimesPreference(frequencyPrefence.frequencyTweetPosting);
    setHoursPreference(frequencyPrefence.postingHours);

    if (frequencyPrefence && hoursPreference) {
      user.frequencyTweetPosting = frequencyPrefence.frequencyTweetPosting;
      user.postingHours = frequencyPrefence.postingHours;
      dispatch(activeUser(user));
    } else throw new Error('Error updating user preferences');
  };
  // set a maximum tweet posting frequency of 4 times per day
  const timesPerDay = () => {
    return Array.from({ length: 4 }, (_, i) => i + 1);
  };
  // define 24h in a day to be used as desired tweeting hours
  const hoursADay = () => {
    return Array.from({ length: 24 }, (_, i) => i);
  };

  return (
    <div className='pref-container'>
      <div className='topics-input-container'>
        <h1>Tweet Tags</h1>
        <p>Define topics you want to tweet about.</p>
        <form onSubmit={setTopics}>
          <TagsInput
            value={selectedTopics}
            onChange={setSelectedTopics}
            name='tags'
            placeHolder='Enter here tweet tags'
          />
          <em className='prim-color'>(Press enter to add new tag)</em>
          <div>
            <input className='pref-btn' type='submit' value='Save topics' />
          </div>
        </form>
      </div>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h1 className='time-label'>Tweet posting preferences</h1>
          <label htmlFor='number'>Times per day</label>
          <select
            id='number'
            name='number'
            className='select-box'
            onChange={handleChangeTimes}
            defaultValue={user.frequencyTweetPosting}
          >
            {timesPerDay().map((time: number) => (
              <option key={time} value={time} className='select-box-hour'>
                {time}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor='hour'>Hours of the day</label>
          <div className='pref-hours-list'>
            {hoursADay().map((hour: number) => (
              <label
                key={hour}
                htmlFor={hour.toString()}
                className='pref-hours-item'
              >
                <input
                  type='checkbox'
                  id={hour.toString()}
                  checked={hoursPreference.includes(hour)}
                  className='select-box-hours'
                  name={hour.toString()}
                  value={hour}
                  onChange={handleChangeHours}
                />
                <span className='checkmark'></span>
                {hour < 10 ? `0${hour}h00` : `${hour}h00`}
              </label>
            ))}
          </div>
          <button className='pref-btn'>Save preference</button>
        </form>
      </div>
    </div>
  );
};

export default TopicsInput;
