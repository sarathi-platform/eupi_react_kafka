import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from '../chart';
import './index.scss';
import { fetchStatusData } from '../store/slices/statusSice';
import spinner from './../../assets/images/spinner.svg'

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.status);
  let initialCall = false;
  useEffect(() => {
    if (!initialCall) {
      dispatch(fetchStatusData());
      initialCall = true
    }

    const interval = setInterval(() => {
      dispatch(fetchStatusData());
    }, 3600000);

    return () => clearInterval(interval);
  }, [dispatch]);



  if (error) {
    return <div>{error.message || 'Something is wrong'}</div>;
  }

  console.log('Status Data:', data);
  return (
    <div className='main'>
      {loading ? <div className='spinner-dashboard'><img src={spinner} alt="loader" className='item-img img-loader' /> </div> :

        <div className='status'>
          {data?.data?.length > 0 && <Chart statusData={data.data} />}

        </div>
      }
    </div>
  );
};

export default Dashboard;
