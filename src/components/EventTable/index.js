import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './index.scss';
import ListItems from '../ListItems';
import { useSelector, useDispatch } from 'react-redux';
import { addSelectedData, removeSelectedData, clearSelectedData } from '../store/slices/selectedData';
import { fetchEventData } from '../store/slices/eventSlice';
import { fetchChangedEventData, fetchEventJobData } from '../services/event';
import moment from 'moment-timezone';
import spinner from './../../assets/images/spinner.svg'

const EventTable = ({ payloadData }) => {

  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [failedData, setFailedData] = useState([]);
  const [showData, setShowData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [details, setDetails] = useState({});
  const [isAllSelected, setIsAllSelected] = useState(false);
  const selectedData = useSelector((state) => state.selectedData);
  const dispatch = useDispatch();
  const [loader,setLoader] = useState(true)
  let initialCall = false;

  const fetchData = useCallback(async () => {
      const resultAction = await fetchEventJobData(payloadData);
      if (resultAction) {
        setData(resultAction.data);
        setSortedData(resultAction.data);
        const initialDetails = resultAction.data.reduce((acc, item) => {
          acc[item.eventId] = { payload: item.payload, metadata: item.eventMetadata };
          return acc;
        }, {});
        setDetails(initialDetails);
        dispatch(clearSelectedData())
      } else {
        console.error('Failed to fetch event data:', resultAction.payload || resultAction.error);
      }
      setLoader(false);
  }, [payloadData]);

  useEffect(() => {
    if(!initialCall){
      fetchData();
      initialCall = true
    }
  }, [fetchData]);

  const handleSort = (columnName) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortBy(columnName);
  };

  // Perform sorting based on current sort column and order
  useEffect(() => {
    if (sortBy) {
      const sorted = [...data].sort((a, b) => {
        const dateA = new Date(a.modifiedDate);
        const dateB = new Date(b.modifiedDate);
        if (sortOrder === 'asc') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
      setSortedData(sorted);
    }
  }, [data, sortBy, sortOrder]);

  const handleRowClick = (index) => {
    setShowData(showData === index ? null : index);
  };

  const handleCheckboxChange = (e, id) => {
    e.stopPropagation();
  
    const selectedRow = data.find((row) => row.eventId === id);
    const selectedDataItem = {
      id: selectedRow.eventId,
      created_by: JSON.stringify(selectedRow.createdBy),
      created_date: moment(selectedRow.createdDate).tz('Asia/Kolkata').format('ddd MMM DD HH:mm:ss [GMT]Z YYYY'),
      event_name: selectedRow.eventName,
      topic_name: selectedRow.topicName,
      client_id: selectedRow.clientId,
      mobile_no: selectedRow.mobileNumber,
      modified_date: moment(selectedRow.modifiedDate).tz('Asia/Kolkata').format('ddd MMM DD HH:mm:ss [GMT]Z YYYY'),
      payload: details[selectedRow.eventId].payload,
      metadata: details[selectedRow.eventId].metadata,
    };
  
    if (e.target.checked) {
      dispatch(addSelectedData(selectedDataItem));
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, id]);
    } else {
      dispatch(removeSelectedData(selectedDataItem));
      setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((rowId) => rowId !== id));
    }
  };
  

  const handleButtonClick = async (e, id) => {
    e.stopPropagation();
    setLoader(true)

    const selectedData = data.filter((row) => row.eventId.includes(id)).map((row) => ({
      id: row.eventId,
      created_by: row.createdBy,
      created_date: moment(row.createdDate).tz('Asia/Kolkata').format('ddd MMM DD HH:mm:ss [GMT]Z YYYY'),
      event_name: row.eventName,
      topic_name: row.topicName,
      client_id: row.clientId,
      mobile_no: row.mobileNumber,
      modified_date: moment(row.modifiedDate).tz('Asia/Kolkata').format('ddd MMM DD HH:mm:ss [GMT]Z YYYY'),
      payload: details[row.eventId].payload,
      metadata: details[row.eventId].metadata,
    }));
    await fetchChangedEventData(selectedData);
    fetchData();
    setLoader(false)
  };

  const handleHeaderCheckboxChange = (e) => {
    setIsAllSelected(e.target.checked);
    if (e.target.checked) {
      const allData = data.map((row) => ({
        id: row.eventId,
        created_by: row.created_by,
        created_date: row.created_date,
        event_name: row.eventName,
        topic_name: row.topic_name,
        client_id: row.clientId,
        metadata: row.metadata,
        mobile_no: row.mobileNumber,
        modified_date: row.modifiedDate,
        payload: details[row.eventId].payload,
        metadata: details[row.eventId].metadata,
      }));
      setSelectedRows(data.map((item) => item.eventId));
      allData.forEach((item) => dispatch(addSelectedData(item)));
    } else {
      setSelectedRows([]);
      dispatch(clearSelectedData());
    }
  };


  const handleDetailsChange = (id, name, value) => {
    setDetails((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        [id]: {
          ...prevDetails[id],
          [name]: value,
        },
      };
      const updatedSelectedData = data.filter((row) => row.eventId.includes(id)).map((row) => ({
        id: row.eventId,
        created_by: row.created_by,
        created_date: row.created_date,
        event_name: row.eventName,
        topic_name: row.topic_name,
        client_id: row.clientId,
        metadata: row.metadata,
        mobile_no: row.mobileNumber,
        modified_date: row.modifiedDate,
        payload: updatedDetails[row.eventId].payload,
        metadata: updatedDetails[row.eventId].metadata,
      }));
      if (selectedRows.includes(id)) {
        dispatch(addSelectedData(updatedSelectedData[0]));
      }
      return updatedDetails;
    });
  };

  return (
    <>
      {loader ? (
        <div className='spinner-events'>
          <img src={spinner} alt="loader" className='item-img img-loader' />
        </div>
      ) : (
        <div className={sortedData.length > 0 ? 'failed-cards' : 'failed-cards data-empty'}>
          {sortedData.length <= 0 ? <div>No Data</div> :
            <div className="table-main">
              <table className="data-table">
                <thead>
                  <tr>
                    <th colSpan='1'>
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleHeaderCheckboxChange} />
                    </th>
                    <th colSpan='2'>
                      Job Id</th>
                    <th colSpan='2'>
                      Mobile No</th>
                    <th colSpan='3'>
                      Client Id</th>
                    <th colSpan='2' onClick={() => handleSort('modifiedDate')} style={{ cursor: 'pointer' }}>
                      Modified Date {<span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                    </th>
                    <th colSpan='3'>Event Topic</th>
                    <th colSpan='2'></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr onClick={() => handleRowClick(index)}>
                        <td colSpan='1' onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item.eventId)}
                            onChange={(e) => handleCheckboxChange(e, item.eventId)}
                          />
                        </td>
                        <td colSpan='2'>{item.eventId}</td>
                        <td colSpan='2'>{item.mobileNumber}</td>
                        <td colSpan='3'>{item.clientId}</td>
                        <td colSpan='2'>{new Date(item.modifiedDate).toLocaleString()}</td>
                        <td colSpan='3'>{item.eventName.replace(/_/g, ' ')}</td>
                        <td colSpan='2'>
                          {item.status === 'CONSUMER_FAILED' &&
                           <button className='btn-style' onClick={(e) => handleButtonClick(e, item.eventId)}>
                            Retry
                          </button>
                          }
                        </td>
                      </tr>
                      {showData === index && (
                        <tr className='table-style'>
                          <td colSpan="15">
                            <ListItems
                              section={item}
                              showData={true}
                              setShowData={() => setShowData(null)}
                              details={details[item.eventId]}
                              onDetailsChange={(name, value) => handleDetailsChange(item.eventId, name, value)}
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      )}
    </>
  );
};

export default EventTable;
