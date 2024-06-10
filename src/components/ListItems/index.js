import React from 'react';
import './index.scss';
import ItemListDetail from '../itemListDetail';

const ListItems = ({ section, setShowData, showData, details, onDetailsChange }) => {
  return (
    <div className="card-widget">
      <div className="items-detail">
        {showData && (
          <ItemListDetail
            itemCards={section}
            details={details}
            onDetailsChange={onDetailsChange}
          />
        )}
      </div>
    </div>
  );
};

export default ListItems;
