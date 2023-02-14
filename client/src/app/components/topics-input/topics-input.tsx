import { log } from 'console';
import React, { useEffect, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import {
  getAuthUrl,
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
  const [hoursPreference, setHoursPreference] = useState(user.postingHours);

  useEffect(() => {
    (async () => {
      if (user.isLoggedIn) {
        setSelectedTopics(user.topics);
        setHoursPreference(user.postingHours);
      }
    })();
  }, [user]);

  const setTopics = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedTopics.length === 0) {
      alert(
        'Please select at least one topic! Press comma or enter to add new topic.'
      );
      return;
    } else {
      const savingTopics = await saveTopics(selectedTopics, user.id);
      if (savingTopics) {
        dispatch(activeUser(savingTopics));
        alert('Topics saved successfully!');
      } else throw new Error('Error saving topics');
    }
  };

  // change the state of hoursPreference when the user selects a time to tweet
  // if the user selects more than 4 tweets per day, the last selection is not saved
  const handleChangeHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setHoursPreference((prevState: any) => {
        if (prevState.length < 4) {
          return [...prevState, Number(e.target.value)];
        } else {
          e.target.checked = false;
          return prevState;
        }
      });
    } else {
      setHoursPreference(
        hoursPreference.filter((hour: any) => hour !== Number(e.target.value))
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const frequencyPrefence = await updateFrequencyPreference(
      user.id,
      hoursPreference.length,
      hoursPreference
    );

    setHoursPreference(frequencyPrefence.postingHours);

    if (frequencyPrefence) {
      dispatch(activeUser(frequencyPrefence));
      alert('User preferences updated successfully');
    } else throw new Error('Error updating user preferences');
  };

  // define 24h in a day to be used as desired tweeting hours
  const hoursADay = () => {
    return Array.from({ length: 24 }, (_, i) => i);
  };

  const handleClick = async () => {
    try {
      const res = await getAuthUrl(user.id);
      window.location.href = res.url;
    } catch (error) {
      console.log('error in handleClick in fetAuthUul', error);
    }
  };

  return (
    <div className="pref-container">
      <div className="pref-top">
        <div className="connection-to-twitter">
          {/* <div className="card-title">
            <h3>Connection to Twitter</h3>
            {user.twitterToken !== null ? 'Connected!' : 'Not connected'}
          </div> */}
          <div className="card-title">
            <h3>Twitter Connection</h3>
          </div>
          {!user.twitterToken ? (
            <>
              <em className="prim-color">{'Not connected'}</em>
              <div className="btn-container">
                <button onClick={handleClick} className="connect-btn">
                  Connect
                </button>
              </div>
            </>
          ) : (
            <em className="prim-color">{'Connected!'}</em>
          )}
        </div>
        <div className="topics-input-container">
          <div className="card-title">
            <h3>Tweet Tags</h3>
            <em className="prim-color">
              (Press enter or comma to add new tag)
            </em>
          </div>
          <form onSubmit={setTopics}>
            <TagsInput
              value={selectedTopics}
              onChange={setSelectedTopics}
              name="tags"
              placeHolder="Enter here tweet tags"
              separators={[',', 'Enter']}
            />
            <div>
              <input className="pref-btn" type="submit" value="Save topics" />
            </div>
          </form>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="time-top card-title">
            <h3 className="time-label">Posting preferences</h3>
            <em className="prim-color">
              Please select publication time. Pick at least 1, up to 4.
            </em>
          </div>
          <p className="hour-title">Hours of the day:</p>
          <div className="pref-hours-list">
            {hoursADay().map((hour: number) => (
              <label
                key={hour}
                htmlFor={hour.toString()}
                className="pref-hours-item"
              >
                <input
                  type="checkbox"
                  id={hour.toString()}
                  checked={hoursPreference.includes(hour)}
                  className="select-box-hours"
                  name={hour.toString()}
                  value={hour}
                  onChange={handleChangeHours}
                />
                <span className="checkmark"></span>
                {hour < 10 ? `0${hour}:00` : `${hour}:00`}
              </label>
            ))}
          </div>
          <button className="pref-btn">Save preference</button>
        </form>
      </div>
    </div>
  );
};

export default TopicsInput;
