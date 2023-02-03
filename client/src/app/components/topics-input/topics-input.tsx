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
  // console.log('user in state :', user);
  const [selectedTopics, setSelectedTopics] = useState(user.topics);
  const [timesPreference, setTimesPreference] = useState(user.frequencyTweetPosting || 1);
  const [hoursPreference, setHoursPreference] = useState(user.postingHours);

  const setTopics = async () => {
    // why are we using user.email instead of .id? just curious.
    // TODO: when the user saves topics, the state resets itself
    // perhaps we should use a useEffect to update the state???
    await saveTopics(selectedTopics, user.email);
    dispatch(activeUser(selectedTopics));
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
      setHoursPreference(hoursPreference.filter((hour) => hour !== Number(e.target.value)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const frequencyPrefence = await updateFrequencyPreference(user.id, timesPreference, hoursPreference);
    setTimesPreference(frequencyPrefence.frequencyTweetPosting);
    setHoursPreference(frequencyPrefence.postingHours);

    if (frequencyPrefence && hoursPreference) dispatch(activeUser(frequencyPrefence + hoursPreference));
    else throw new Error('Error updating user preferences');
  };
  // set a maximum tweet posting frequency of 4 times per day
  const timesPerDay = () => {
    return Array.from({ length: 4 }, (_, i) => i + 1);
  };
  // define 24h in a day to be used as options for the user to select
  const hoursADay = () => {
    return Array.from({ length: 24 }, (_, i) => i);
  };

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
          <select id='number' name='number' className='select-box' onChange={handleChangeTimes} defaultValue={user.frequencyTweetPosting}>
            {timesPerDay().map((time: number) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor='hour'>Hours of the day</label>
          {hoursADay().map((hour: number) => (
            <label key={hour} htmlFor={hour.toString()}>
              <input type='checkbox' id={hour.toString()} checked={hoursPreference.includes(hour)} className='select-box-hours' name={hour.toString()} value={hour} onChange={handleChangeHours} />
              {hour < 10 ? `0${hour}:00 h` : `${hour}:00 h`}
            </label>
          ))}
          <button className='pref-btn'>Save preference</button>
        </form>
      </div>
    </div>
  );
};

export default TopicsInput;
