import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/redux_hooks";
import { uploadImageThunk } from "../../../redux/slices/profile/img/operations";
import { AppDispatch, RootState } from "../../../redux/store";
import { PhotoButtons } from "./photo_buttons/PhotoButtons";
import { PhotoAvatar } from "./photo_avatar/PhotoAvatar";

export const ProfilePhoto = () => {
  const image: string | null | undefined = useAppSelector(
    (state: RootState) => state.profile.image
  );
  const dispatch = useDispatch<AppDispatch>();

  const [isEditingPhoto, setIsEditingPhoto] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const toggleEditProfilePhoto = () => {
    setIsEditingPhoto(!isEditingPhoto);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSavePhoto = async () => {
    if (!selectedFile) {
      toast("Choose a photo, please", {
        icon: <InfoOutlinedIcon />,
        style: {
          background: "#f1ee8e",
        },
      });
    }
    if (selectedFile) {
      await dispatch(uploadImageThunk(selectedFile));
      setIsEditingPhoto(!isEditingPhoto);
    }
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      {isEditingPhoto ? (
        <PhotoButtons
          handleFileChange={handleFileChange}
          handleSavePhoto={handleSavePhoto}
          toggleEditProfilePhoto={toggleEditProfilePhoto}
        />
      ) : (
        <PhotoAvatar
          image={image}
          toggleEditProfilePhoto={toggleEditProfilePhoto}
        />
      )}
    </Box>
  );
};
