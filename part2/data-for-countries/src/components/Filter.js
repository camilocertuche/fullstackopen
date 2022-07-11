import React from "react";

const Filter = ({ name, onChange }) => {
  return (
    <div>
      {name}
      <input type="text" onChange={onChange} />
    </div>
  );
};

export default Filter;
