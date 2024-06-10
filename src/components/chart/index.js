import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './index.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ statusData }) => {
    const [count, setCount] = useState([]);
    const [label, setLabel] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        if (statusData && statusData.length > 0) {
            const counts = statusData.map((item) => item.count);
            const labels = statusData.map((item) => item.status);

            setCount(counts);
            setLabel(labels);
            setTotalCount(counts.reduce((a, b) => a + b, 0));
        }
    }, [statusData]);

    const data = {
        labels: label,
        datasets: [
            {
                label: 'Count',
                data: count,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 0,
            },
        ],
    };

    const backgroundColors = [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(255, 99, 132, 0.6)'
    ];

    const centerTextPlugin = {
      id: 'centerTextPlugin',
      beforeDraw: function (chart) {
          const { ctx, width, height } = chart;
          ctx.restore();          
          var fontSize = (height / 300).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';
  
          const text = `Count : ${statusData.map((item) => item.count).reduce((a, b) => a + b, 0)}`
          const textX = 350 / 2;
          const textY = (height - 50) / 2 ;
  
          ctx.clearRect(0, 0, width, height);
          ctx.fillText(text, textX, textY);
          ctx.save();
      }
  };
  const options = {
    plugins: {
        legend: {
            position: 'bottom',
            align: 'center',
            labels: {
                fontSize: 12,
                fontColor: 'black'
            }
        },
        centerTextPlugin
    }
};


  

    return (
        <div className='donut-main'>
            <div className='donut-style'>
                <Doughnut data={data} options={options} plugins={[centerTextPlugin]}/>
            </div>

            <div className='informationHolder'>
                <div className='titleHolder'>
                    <h2 className='main-title'>Overall Status</h2>
                </div>
                <div className='main-information'>
                    {statusData.map((data, index) => (
                        <div className='information-container' key={index}>
                            <div className='info-heading'>
                                <span
                                    style={{
                                        backgroundColor: backgroundColors[index],
                                        width: '20px',
                                        height: '20px',
                                        display: 'inline-block',
                                    }}
                                ></span>
                            </div>
                            <div className='info-digit'>
                                <div>{data.status}</div>
                                <div>{data.count} jobs</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Chart;
