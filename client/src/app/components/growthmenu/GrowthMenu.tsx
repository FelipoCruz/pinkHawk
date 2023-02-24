import { stat } from 'fs';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getGrowth } from '../../../services/api.service';
import { useAppSelector } from '../../hooks/hooks';
import IGrowth from '../../interfaces/growth.interface';
import Chart from "chart.js/auto";

const GrowthMenu = () => {

  const user = useAppSelector(state => state.user);

  const [data, setData] = useState<IGrowth[]>([]);

  useEffect(() => {
   getGrowth(user.id).then((res) => {
    setData(res);
   })
  }, [user]);
  useEffect(() => {
    // Create chart after data has been updated
    if (data.length) {
      const ctx = document.getElementById("myChart") as HTMLCanvasElement;
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: 
          data
          .map((item) => ({
            ...item,
            date: new Date(item.date),
          }))
          .sort((a,b) => a.date.getTime() - b.date.getTime())
          .map((item) => item.date),
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
        },
      });
      return () => myChart.destroy();
    }
  }, [data]);
 
  return (
    <div>
      <h2>Growth</h2>
      <canvas id="myChart" width="300" height="150"></canvas>
      {/* <Doughnut data={data} /> */}
    </div>
  );
};

export default GrowthMenu;
