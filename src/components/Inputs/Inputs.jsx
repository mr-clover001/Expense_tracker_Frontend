import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Inputs = ({ name, value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <label className="">{label}</label>
      <div className="input-box">
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name} // ✅ FIXED: Add this line
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Inputs;
