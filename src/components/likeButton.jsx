import React from "react";

const likeButton = ({ liked, onClick }) => {
  let classes = "fa fa-heart-o";
  // We learn that NULL will prevent the rendering of a react element
  //if(classes === "fa fa-heart") return null;
  if (liked) classes = "fa fa-heart";
  return (
    <i
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default likeButton;
