import React, { Component } from "react";

class TableHeader extends Component {
  //if the path we are getting is the same we are getting in sort column we should reverse the order
  //otherwise make it asc, we can figure this out by cloning the state and comparing it to path
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      //check the existing order and if we already sorted the list make it descending
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      //else make it ascending
      sortColumn.path = path;
      sortColumn.order = "asc;";
    }
    //raise sort event
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    //if the column we are getting is different than sortcolumn return null
    //basically the delete and like function wont get an icon
    if (column.path !== sortColumn.path) return null;
    //if the order is ascending change the icon
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    //if none of the conditions are true then the icon will change to desc
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
