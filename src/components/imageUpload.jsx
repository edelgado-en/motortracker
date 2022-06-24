import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";

const ImageUpload = ({ carId, handleUploadImage, handleRemoveImage }) => {
  return (
    <ImageUploader
      onFileAdded={(img) => handleUploadImage(img, carId)}
      onFileRemoved={(img) => handleRemoveImage(img, carId)}
    />
  );
};

export default ImageUpload;
