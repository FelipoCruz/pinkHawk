import { stat } from 'fs';
import React, { useEffect, useState } from 'react';
import { getGrowth } from '../../../services/api.service';
import { useAppSelector } from '../../hooks/hooks';
import IGrowth from '../../interfaces/growth.interface';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import './GrowthMenu.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const GrowthMenu = () => {

  const user = useAppSelector(state => state.user);

  const [data, setData] = useState<IGrowth[]>([]);

  useEffect(() => {
    getGrowth(user.id).then((res) => {
      setData(res);
    })
  }, [user]);

  
  const chartData = {
    labels: data
      .map((item) => ({
        ...item,
        date: new Date(item.date),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((item) => {
        return dayjs(item.date).format('DD/MM/YY')
      }),
    datasets: [
      {
        label: "Followers",
        data: data.map((item) => item.followers),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Likes",
        data: data.map((item) => item.likes),
        fill: false,
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
      {
        label: "Comments",
        data: data.map((item) => item.comments),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
    
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  
  return (
    <div>
      <h2 className='growth'>Growth</h2>
      <em>Chart data will be updated every Monday at 9:00am UTC.</em>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>

    </div>
  );
};

export default GrowthMenu;
