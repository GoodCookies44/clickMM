// Модули
import React from "react";
import PropTypes from "prop-types";
// Стили
import "./Switch.css";

export default function Switch({id, checked, onChange}) {
  return (
    <div className="custom-switch">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}></label>
    </div>
  );
}

Switch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
