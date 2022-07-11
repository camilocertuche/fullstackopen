import React from "react";

const Filter = ({ name, value, onChange }) => {
  return (
    <div>
      {name}
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;
