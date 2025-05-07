import React from "react";
import { LuUpload, LuUser, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = React.useRef(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };
  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <>
      <div className="flex  items-center mb-6">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        {!image ? (
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-purple-200 relative cursor-pointer">
            <LuUser className="text-4xl text-gray-600" />
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-purple-500 text-white p-1 rounded-full"
              onClick={onChooseFile}
            >
              <LuUpload className="text-sm" />
            </button>
            <input
              type="file"
              ref={inputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        ) : (
          <div className="w-20 h-20 relative">
            <img
              src={previewUrl}
              alt="Profile"
              className="w-full h-full object-cover rounded-full cursor-pointer"
            />
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
              onClick={handleRemoveImage}
            >
              <LuTrash />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePhotoSelector;
