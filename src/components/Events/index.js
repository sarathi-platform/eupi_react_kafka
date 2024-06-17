import React, { useState, useEffect } from 'react';
import './index.scss';
import EventTable from '../EventTable';
import { useSelector } from 'react-redux';
import { fetchChangedEventData } from '../services/event';
import spinner from './../../assets/images/spinner.svg'

const Event = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    all: true,
    PRODUCER_OPEN: true,
    PRODUCER_IN_PROGRESS: true,
    PRODUCER_RETRY: true,
    PRODUCER_SUCCESS: true,
    PRODUCER_FAILED: true,
    CONSUMER_OPEN: true,
    CONSUMER_IN_PROGRESS: true,
    CONSUMER_RETRY: true,
    CONSUMER_SUCCESS: true,
    CONSUMER_FAILED: true,
    ERROR: true,
  });
  const [loader,setLoader] = useState(false);
  
  const [consolidatedData,setConsolatedData] = useState('');

  // const fetchData = useCallback(async () => {
  //   setLoader(true)
  //   const resultAction = await fetchChangedEventData(selectedData);
  //     if (resultAction) {
  //       setEventData(resultAction.data);
  //     } else {
  //       // Handle the error if needed
  //       console.error('Failed to fetch event data:', resultAction.payload || resultAction.error);
  //     }
  //   setLoader(false);
  // }, [dispatch, payloadData]);


  const dropdownLabels = [
    'all',
    'PRODUCER_OPEN',
    'PRODUCER_IN_PROGRESS',
    'PRODUCER_RETRY',
    'PRODUCER_SUCCESS',
    'PRODUCER_FAILED',
    'CONSUMER_OPEN',
    'CONSUMER_IN_PROGRESS',
    'CONSUMER_RETRY',
    'CONSUMER_SUCCESS',
    'CONSUMER_FAILED',
    'ERROR'
  ];

  const selectedData = useSelector((state) => state.selectedData);
  const [empty, setEmpty] = useState(false);

  const handleSelectedItems = async() => {
    if (selectedData.length < 1) {
      console.log('Empty Data');
    } else {
      setLoader(true)
      await fetchChangedEventData(selectedData)
      setLoader(false)
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setSelectedOptions(prevState => {
      const newState = { ...prevState, [name]: checked };

      if (name === 'all') {
        return {
          all: checked,
          PRODUCER_OPEN: checked,
          PRODUCER_IN_PROGRESS: checked,
          PRODUCER_RETRY: checked,
          PRODUCER_SUCCESS: checked,
          PRODUCER_FAILED: checked,
          CONSUMER_OPEN: checked,
          CONSUMER_IN_PROGRESS: checked,
          CONSUMER_RETRY: checked,
          CONSUMER_SUCCESS: checked,
          CONSUMER_FAILED: checked,
          ERROR: checked,
        };
      } else {
        const allSelected = Object.keys(newState).every(
          key => key === 'all' || newState[key]
        );

        return {
          ...newState,
          all: allSelected,
        };
      }
    });

    setShowDetail(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown')) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const currentDate = new Date();
  const threeMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());

  const [date, setDate] = useState({
    startDate: threeMonthsAgo.toISOString().slice(0, 10),
    endDate: currentDate.toISOString().slice(0, 10)
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDate((prev) => ({
      ...prev,
      [name]: value
    }));
    setShowDetail(false);
  };

  const handleDateSubmit = () => {
    const statusMap = {
    PRODUCER_OPEN :"PRODUCER_OPEN",
    PRODUCER_IN_PROGRESS : "PRODUCER_IN_PROGRESS",
    PRODUCER_RETRY :"PRODUCER_RETRY",
    PRODUCER_SUCCESS: "PRODUCER_SUCCESS",
    PRODUCER_FAILED :"PRODUCER_FAILED",
    CONSUMER_OPEN:"CONSUMER_OPEN",
    CONSUMER_IN_PROGRESS:"CONSUMER_IN_PROGRESS",
    CONSUMER_RETRY:"CONSUMER_RETRY",
    CONSUMER_SUCCESS:"CONSUMER_SUCCESS",
    CONSUMER_FAILED:"CONSUMER_FAILED",
    ERROR:"ERROR",
    all: "ALL"
    };

    const statusList = Object.keys(selectedOptions)
      .filter(option => option !== 'all' && selectedOptions[option])
      .map(option => statusMap[option]);

    const data = {
      status: statusList,
      startDate: date.startDate,
      endDate: date.endDate,
    };

    setConsolatedData(data)

    // console.log(consolidatedData)

    setShowDetail(!showDetail);
    setEmpty(true);
  };

  const renderSelectedOptions = () => {
    return Object.keys(selectedOptions)
      .filter(option => selectedOptions[option] && option !== 'all')
      .map(option => (
        <div key={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </div>
      ));
  };

  return (
    <div className='common'>
      <div className={showDetail ? 'common-main' : 'common-main common-sub'}>
        {showDetail &&
        <div className='left-container'>
          <button className={selectedData.length < 1 ?'btn-style alt-style' :'btn-style'} disabled={selectedData.length < 1} onClick={handleSelectedItems}>
            Send Selected Data
          </button>
          {/* {selectedData.length < 1 && showDetail? <div>Please select at least one job</div> : ''} */}
        </div>
}
        <div className='right-container'>
          <div className="dropdown">
            <div>
              <button onClick={toggleDropdown} className="dropdown-button">
                Filter
                {renderSelectedOptions().length > 0 && ` (${renderSelectedOptions().length})`}
              </button>
              <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                {dropdownLabels.map((item,index) => {
                  let changedName = item.replace(/_/g, ' ').toUpperCase();
                  return (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={item}
                        name={item}
                        checked={selectedOptions[item]}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor={item}>{changedName}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className='datepicker-main'>
            <div className='datepicker-side'>
              <label>Start Date</label>
              <input onChange={handleDateChange} name='startDate' type='date' value={date.startDate} className='date-input' />
            </div>
            <div className='datepicker-side'>
              <label>End Date</label>
              <input onChange={handleDateChange} name='endDate' type='date' value={date.endDate} className='date-input' max={currentDate.toISOString().slice(0, 10)} />
            </div>
            <div>
              <button type='button' className='btn-style' onClick={handleDateSubmit}>Select</button>
            </div>
          </div>
        </div>
      </div>
     {loader ? <img src={spinner} alt="loader" className='item-img img-loader' /> : 
      showDetail && <EventTable payloadData={consolidatedData}/>
              }
    </div>
  );
};

export default Event;
