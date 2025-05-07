import React from "react";
import { getInitials } from "../../utlis/helper";

// Using destructuring and defaultProps for better default handling
const CharAvatar = ({
  fullName = "",
  width = "w-12",
  height = "h-12",
  style,
}) => {
  return (
    <div
      className={`${width} ${height} rounded-full bg-gray-200 flex items-center justify-center text-gray-900 font-medium bg-gray-100`}
      style={style}
    >
      {getInitials(fullName)}
    </div>
  );
};

CharAvatar.defaultProps = {
  fullName: "",
  width: "w-12",
  height: "h-12",
};

export default CharAvatar;
