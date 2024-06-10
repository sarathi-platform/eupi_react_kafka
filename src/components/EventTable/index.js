import React, { useEffect, useState } from 'react';
import './index.scss';
import ListItems from '../ListItems';
import { useSelector, useDispatch } from 'react-redux';
import { addSelectedData, removeSelectedData, clearSelectedData } from '../store/slices/selectedData';

const EventTable = () => {
  const data = [{
    "clientId": "fb94a59e-a537-43a5-9c61-fb2daa3cc339",
    "requestId": "84CCED026506B2AF3A47E6CA3AA58E86",
    "mobileNumber": "9999999996",
    "status": "PRODUCER_SUCCESS",
    "result": {
        "eventId": "ES-05062410002643",
        "message": null,
        "status": "PRODUCER_SUCCESS"
    },
    "eventName": "ADD_SECTION_PROGRESS_FOR_DIDI_EVENT",
    "eventMetadata": {
        "eventId": '111111122',
        "eventDependency": 'ws',
        "data": null,
        "depends_on": []
    },
    "payload": "{\"didiId\":5740,\"localTaskId\":\"2f24462c3d0144eea3c34ee6548dbc0d|1715582627984\",\"sectionId\":1,\"sectionStatus\":\"COMPLETED\",\"surveyId\":1}",
    "modifiedDate": "2024-06-05T07:00:04.283+00:00",
    "eventId": "AA-05062410002643"
},
{
  "clientId": "fb94a59e-a537-43a5-9c61-fb2daa3cc339",
  "requestId": "84CCED026506B2AF3A47E6CA3AA58E86",
  "mobileNumber": "9999999996",
  "status": "PRODUCER_SUCCESS",
  "result": {
      "eventId": "ES-05062410002643",
      "message": null,
      "status": "PRODUCER_SUCCESS"
  },
  "eventName": "ADD_SECTION_PROGRESS_FOR_DIDI_EVENT",
  "eventMetadata": {
      "eventId": null,
      "eventDependency": null,
      "data": null,
      "depends_on": []
  },
  "payload": "{\"didiId\":5740,\"localTaskId\":\"2f24462c3d0144eea3c34ee6548dbc0d|1715582627984\",\"sectionId\":1,\"sectionStatus\":\"COMPLETED\",\"surveyId\":1}",
  "modifiedDate": "2024-06-05T07:00:04.283+00:00",
  "eventId": "BB-05062410002643"
},
{
  "clientId": "fb94a59e-a537-43a5-9c61-fb2daa3cc339",
  "requestId": "84CCED026506B2AF3A47E6CA3AA58E86",
  "mobileNumber": "9999999996",
  "status": "PRODUCER_SUCCESS",
  "result": {
      "eventId": "ES-05062410002643",
      "message": null,
      "status": "PRODUCER_SUCCESS"
  },
  "eventName": "ADD_SECTION_PROGRESS_FOR_DIDI_EVENT",
  "eventMetadata": {
      "eventId": null,
      "eventDependency": null,
      "data": null,
      "depends_on": []
  },
  "payload": "{\"didiId\":5740,\"localTaskId\":\"2f24462c3d0144eea3c34ee6548dbc0d|1715582627984\",\"sectionId\":1,\"sectionStatus\":\"COMPLETED\",\"surveyId\":1}",
  "modifiedDate": "2024-06-05T07:00:04.283+00:00",
  "eventId": "CC-05062410002643"
},
{
  "clientId": "fb94a59e-a537-43a5-9c61-fb2daa3cc339",
  "requestId": "84CCED026506B2AF3A47E6CA3AA58E86",
  "mobileNumber": "9999999996",
  "status": "PRODUCER_SUCCESS",
  "result": {
      "eventId": "ES-05062410002643",
      "message": null,
      "status": "PRODUCER_SUCCESS"
  },
  "eventName": "ADD_SECTION_PROGRESS_FOR_DIDI_EVENT",
  "eventMetadata": {
      "eventId": null,
      "eventDependency": null,
      "data": null,
      "depends_on": []
  },
  "payload": "{\"didiId\":5740,\"localTaskId\":\"2f24462c3d0144eea3c34ee6548dbc0d|1715582627984\",\"sectionId\":1,\"sectionStatus\":\"COMPLETED\",\"surveyId\":1}",
  "modifiedDate": "2024-06-05T07:00:04.283+00:00",
  "eventId": "DD-05062410002643"
}, {
  "clientId": "fb94a59e-a537-43a5-9c61-fb2daa3cc339",
  "requestId": "84CCED026506B2AF3A47E6CA3AA58E86",
  "mobileNumber": "9999999996",
  "status": "PRODUCER_SUCCESS",
  "result": {
      "eventId": "ES-05062410002643",
      "message": null,
      "status": "PRODUCER_SUCCESS"
  },
  "eventName": "ADD_SECTION_PROGRESS_FOR_DIDI_EVENT",
  "eventMetadata": {
      "eventId": null,
      "eventDependency": null,
      "data": null,
      "depends_on": []
  },
  "payload": "{\"didiId\":5740,\"localTaskId\":\"2f24462c3d0144eea3c34ee6548dbc0d|1715582627984\",\"sectionId\":1,\"sectionStatus\":\"COMPLETED\",\"surveyId\":1}",
  "modifiedDate": "2024-06-05T07:00:04.283+00:00",
  "eventId": "EE-05062410002643"
},
  // {
  //   "_id": "FF-19022410000011",
  //   "requestId": "CCD5C0DB6DB8222E9421A51450A99834",
  //   "modified_date": "2024-02-19T11:18:41.885+0000",
  //   "event_topic": "ADD_SECTION_PROGRESS_FOR_DIDI_EVENT",
  //   "mobile_no": "9999999996",
  //   "elient_id": "fe23fdec-d6f2-4d6f-9378-42ac2906d22b",
  //   "payload": "{\"ableBodiedFlag\":\"\",\"address\":\"56\",\"cohortId\":4519,\"cohortName\":\"BaikunthPura Tola\",\"comment\":\"\",\"guardianName\":\"Ashok kumar\",\"id\":0,\"localModifiedDate\":1708341176063,\"name\":\"Sikha Kumarif\",\"rankingEdit\":true,\"result\":\"POOR\",\"score\":0.0,\"shgFlag\":\"\",\"type\":\"WEALTH_RANKING\",\"villageId\":83391}",
  //   "status": "PRODUCER_FAILED",
  //   "result": "{\"eventId\":\"ES-19022410000011\",\"message\":\"Topic cannot be null.\",\"status\":\"PRODUCER_FAILED\"}",
  //   "metadata": "{\"depends_on\":[\"ac39f878-c84d-4c47-932b-b65bfda90415\"],\"mission\":\"Selection\",\"parentEntity\":{\"didiName\":\"Sikha Kumarif\",\"dadaName\":\"Ashok kumar\",\"didiAddress\":\"56\",\"tolaName\":\"BaikunthPura Tola\"},\"request_payload_size\":293}",
  //   "_class": "com.eupi.core.mongo.model.Events"
  // }
  ]

  const [failedData, setFailedData] = useState([]);
  const [showData, setShowData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [details, setDetails] = useState({});
  const [isAllSelected, setIsAllSelected] = useState(false);
  const selectedData = useSelector((state) => state.selectedData);
  const dispatch = useDispatch();

  useEffect(() => {
    setFailedData(data);
    const initialDetails = data.reduce((acc, item) => {
      acc[item.eventId] = { payload: item.payload, metadata: item.eventMetadata };
      return acc;
    }, {});
    setDetails(initialDetails);
  }, []);

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

    if (e.target.checked) {
      dispatch(addSelectedData(selectedData[0]));
    } else {
      dispatch(removeSelectedData(selectedData[0]));
    }
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

  const handleButtonClick = (e, id) => {
    e.stopPropagation();
    const selectedData = data.filter((row) => row.eventId.includes(id)).map((row) => ({
      id: row.eventId,
      payload: details[row.eventId].payload,
      metadata: details[row.eventId].metadata,
    }));
    console.log(selectedData);
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
    <div className='failed-cards'>
      <div className="table-main">
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleHeaderCheckboxChange}
                />
              </th>
              <th>Id</th>
              <th>Mobile No</th>
              <th>Client Id</th>
              <th>Modified Date</th>
              <th>Event Topic</th>
              <th>Retry</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
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
  );
};

export default EventTable;
