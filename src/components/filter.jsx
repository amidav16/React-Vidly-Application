import React from "react";

const filter = ({
  items,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

//good for defaulting values and we don't have to clutter our props
filter.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default filter;
