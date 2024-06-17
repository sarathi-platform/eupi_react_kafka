import React from 'react';
import './index.scss';
import ReactJson from 'react-json-view';

const ItemListDetail = ({ itemCards, details, onDetailsChange }) => {
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    onDetailsChange(name, value);
  };

  const handleJsonChange = ({ updated_src }, name) => {
    const updatedValue = JSON.stringify(updated_src, null, 2); // Pretty print JSON
    onDetailsChange(name, updatedValue);
  };

  // const handleSubmit = () => {
  //   console.log('Updated Payload:', details.payload);
  //   console.log('Updated Metadata:', details.metadata);
  // };

  return (
    <div className="details">
      <div className="text-style">
        <h4>Payload:</h4>
        <ReactJson
          className="custom-json-view"
          src={JSON.parse(details.payload)}
          onEdit={(edit) => handleJsonChange(edit, 'payload')}
          onAdd={(add) => handleJsonChange(add, 'payload')}
          // onDelete={(del) => handleJsonChange(del, 'payload')}
          displayDataTypes={false}
        />
      </div>
      <div className="text-style">
        <h4>Metadata:</h4>
        <ReactJson
          className="custom-json-view"
          src={JSON.parse(details.metadata)} // No need to parse, it's already a JSON object
          onEdit={(edit) => handleJsonChange(edit, 'metadata')}
          onAdd={(add) => handleJsonChange(add, 'metadata')}
          // onDelete={(del) => handleJsonChange(del, 'metadata')}
          displayDataTypes={false}
        />
      </div>
      {/* <button className="btn-style" onClick={handleSubmit}>Submit</button> */}
    </div>
  );
};

export default ItemListDetail;
