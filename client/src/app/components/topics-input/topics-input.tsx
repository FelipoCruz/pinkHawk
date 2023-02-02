import React, { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import { saveTopics, updateTimeFrequencyPreference } from '../../../services/api.service';
import { activeUser } from '../../../store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Button from '../button/Button';
import './topics-input.scss';

const TopicsInput = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  console.log('user in state :', user);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [timesPreference, setTimesPreference] = useState(user.frequencyTweetPosting || 1);
  const [hoursPreference, setHoursPreference] = useState(user.postingHours || []);
  console.log('hoursPreference :', hoursPreference);

  const setTopics = () => {
    console.log('selected topics are:', selectedTopics);
    // why are we using user.email instead of .id? just curious.
    saveTopics(selectedTopics, user.email);
    setSelectedTopics([]);
  };

  const handleChangeTimes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimesPreference(Number(e.target.value));
  };

  const handleChangeHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e.target.value :', e.target.value);
    console.log('e.target.checked :', e.target.checked);
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
    const timesPreferences = await updateTimeFrequencyPreference(user.id, timesPreference);
    console.log('what we receive from API on submit topic preferences: ====>', timesPreferences);
    setTimesPreference(timesPreferences.frequencyTweetPosting);
    // const hourPreferences = await updateHourFrequencyPreference(user.id, hoursPreference);
    setHoursPreference(timesPreferences.postingHours);
    // if (timesPreferences && hoursPreference) dispatch(activeUser(timesPreferences, hoursPreference));
    dispatch(activeUser(timesPreferences));
  };

  const timesPerDay = () => {
    return Array.from({ length: 4 }, (_, i) => i + 1);
  };

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
          {hoursADay().map((hour: number) => (
            <label key={hour} htmlFor={hour.toString()}>
              <input type='checkbox' id={hour.toString()} name={hour.toString()} value={hour} onChange={handleChangeHours} />
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
