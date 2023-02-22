import { stat } from 'fs';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getFollowers } from '../../../services/api.service';
import { useAppSelector } from '../../hooks/hooks';


const GrowthMenu = () => {

  const user = useAppSelector(state => state.user);

  const [followers, setFollowers] = useState(0);
 const [likes, setLikes] = useState(0);
  useEffect(() => {
    if(user.id) {
       getFollowers(user.id).then((data) => {
       setFollowers(data.followersCount);
       setLikes(data.total);
    });
    }
  }, [user]);

  const data = {
    datasets: [
      {
        data: followers,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8e5ea2',
          '#3cba9f',
          '#e8c3b9',
          '#c45850'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8e5ea2',
          '#3cba9f',
          '#e8c3b9',
          '#c45850'
        ]
      }
    ],
  
    // These options are optional
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  return (
    <div>
      <h2>Growth</h2>
      <p>Followers: {followers}</p>
      <p>Total Likes of past 7 days: {likes}</p>
      {/* <Doughnut data={data} /> */}
    </div>
  );
};

export default GrowthMenu;
