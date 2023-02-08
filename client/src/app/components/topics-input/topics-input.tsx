import React, { useEffect, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import {
  getAuthUrl,
  getUserById,
  saveTopics,
  updateFrequencyPreference,
} from '../../../services/api.service';
import { activeUser } from '../../../store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import IUser from '../../interfaces/user.interface';
import './topics-input.scss';

const TopicsInput = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [selectedTopics, setSelectedTopics] = useState(user.topics);
  const [timesPreference, setTimesPreference] = useState(
    user.frequencyTweetPosting || 1
  );
  const [hoursPreference, setHoursPreference] = useState(user.postingHours);

  // useEffect(() => {
  //   const refresh = async () => {
  //     console.log('isLoggedIn in Preferences', user.isLoggedIn);
  //     if (!user.isLoggedIn) {
  //       let storedString = localStorage.getItem('user');
  //       if (storedString) {
  //         const storedUser: IUser = JSON.parse(storedString).userData;
  //         console.log('storedUser', storedUser);

  //         if (storedUser) {
  //           const user: IUser = await getUserById(storedUser.id);
  //           setSelectedTopics(user.topics);
  //           setTimesPreference(user.frequencyTweetPosting);
  //           setHoursPreference(user.postingHours);
  //           console.log(user);

  //           dispatch(activeUser(user));
  //           console.log('isLoggedIn after refresh', user.isLoggedIn);
  //         }
  //       }
  //     }
  //   };
  //   refresh();
  // }, []);

  useEffect(() => {
    (async () => {
      if (user.isLoggedIn) {
        setSelectedTopics(user.topics);
        setTimesPreference(user.frequencyTweetPosting);
        setHoursPreference(user.postingHours);
      }
    })();
  }, [user]);

  const setTopics = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const savingTopics = await saveTopics(selectedTopics, user.id);
    if (savingTopics) {
      dispatch(activeUser(savingTopics));
      alert('Topics saved successfully');
    } else throw new Error('Error saving topics');
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

    if (frequencyPrefence) {
      dispatch(activeUser(frequencyPrefence));
      alert('User preferences updated successfully');
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
            <em className="prim-color">(Press enter to add new tag)</em>
          </div>
          <form onSubmit={setTopics}>
            <TagsInput
              value={selectedTopics}
              onChange={setSelectedTopics}
              name="tags"
              placeHolder="Enter here tweet tags"
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
            <div className="tmpd">
              <label htmlFor="number">Times per day:</label>
              <select
                id="number"
                name="number"
                className="select-box"
                onChange={handleChangeTimes}
                defaultValue={user.frequencyTweetPosting}
              >
                {timesPerDay().map((time: number) => (
                  <option key={time} value={time} className="select-box-hour">
                    {time}
                  </option>
                ))}
              </select>
            </div>
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
