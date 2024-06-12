import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './index.scss';
import ListItems from '../ListItems';
import { useSelector, useDispatch } from 'react-redux';
import { addSelectedData, removeSelectedData, clearSelectedData } from '../store/slices/selectedData';
import { fetchEventData } from '../store/slices/eventSlice';
import { fetchChangedEventData, fetchEventJobData } from '../services/event';
import moment from 'moment-timezone';
import spinner from './../../assets/images/spinner.svg'

const EventTable = ({payloadData}) => {

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
    if (!initialCall) {
    const resultAction = await fetchEventJobData(payloadData);
    if (resultAction) {
      setData(resultAction.data);
      setSortedData(resultAction.data); 
      const initialDetails = resultAction.data.reduce((acc, item) => {
        acc[item.eventId] = { payload: item.payload, metadata: item.eventMetadata };
        return acc;
      }, {});
      setDetails(initialDetails);
    } else {
      console.error('Failed to fetch event data:', resultAction.payload || resultAction.error);
    }
    setLoader(false);
    initialCall = true;
  }
  }, [payloadData]);

  useEffect(() => {
    fetchData();
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
    
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );

    const selectedData = data.filter((row) => row.eventId === id).map((row) => ({
      id: row.eventId,
      created_by: JSON.stringify(row.createdBy),
      created_date: moment(row.createdDate).tz('Asia/Kolkata').format('ddd MMM DD HH:mm:ss [GMT]Z YYYY'),
      event_name: row.eventName,
      topic_name: row.topicName,
      client_id: row.clientId,
      mobile_no: row.mobileNumber,
      modified_date: moment(row.modifiedDate).tz('Asia/Kolkata').format('ddd MMM DD HH:mm:ss [GMT]Z YYYY'),
      payload: details[row.eventId].payload,
      metadata: details[row.eventId].metadata,
    }));

    if (e.target.checked) {
      dispatch(addSelectedData(selectedData[0]));
    } else {
      dispatch(removeSelectedData(selectedData[0]));
    }
  };

   const handleButtonClick = async(e, id) => {
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
        <div className='failed-cards'>
          <div className="table-main">
            <table className="data-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Job Id</th>
                  <th>Mobile No</th>
                  <th>Client Id</th>
                  <th onClick={() => handleSort('modifiedDate')} style={{ cursor: 'pointer' }}>
                    Modified Date {<span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                  </th>
                  <th>Event Topic</th>
                  <th>Retry</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item, index) => (
                  <React.Fragment key={index}>
                     <tr onClick={() => handleRowClick(index)}>
                      <td onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.eventId)}
                          onChange={(e) => handleCheckboxChange(e, item.eventId)}
                        />
                      </td>
                      <td>{item.eventId}</td>
                      <td>{item.mobileNumber}</td>
                      <td>{item.clientId}</td>
                      <td>{new Date(item.modifiedDate).toLocaleString()}</td>
                      <td>{item.eventName}</td>
                      <td>
                        <button className='btn-style' onClick={(e) => handleButtonClick(e, item.eventId)}>
                          Retry
                        </button>
                      </td>
                    </tr>
                    {showData === index && (
                      <tr className='table-style'>
                        <td colSpan="7">
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
        </div>
      )}
    </>
  );
};

export default EventTable;
