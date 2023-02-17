import { stat } from 'fs';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getFollowers } from '../../../services/api.service';
import { useAppSelector } from '../../hooks/hooks';


const GrowthMenu = () => {

  const user = useAppSelector(state => state.user);
  const [followers, setFollowers] = useState<number[]>([]);

  //define a function to get the followers data of the user
  useEffect(() => {
    getFollowers().then((data) => {
      setFollowers(data);
    });
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
      <Doughnut data={data} />
    </div>
  );
};

export default GrowthMenu;
