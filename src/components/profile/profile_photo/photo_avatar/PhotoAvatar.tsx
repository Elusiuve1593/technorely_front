import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { memo } from "react";
import { EditButton } from "../../../../common/components/EditButton";

interface AvatarProps {
  image: string | null | undefined;
  toggleEditProfilePhoto: () => void;
}

export const PhotoAvatar = memo(
  ({ image, toggleEditProfilePhoto }: AvatarProps) => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ marginRight: "9px" }}
      >
        <Avatar
          src={image || ""}
          alt="Profile Photo"
          sx={{ width: 200, height: 200 }}
        />
        <EditButton
          sizeButton={"small"}
          variantButton={"contained"}
          text={"Edit photo"}
          callback={toggleEditProfilePhoto}
          icon={<EditIcon />}
        />
      </Box>
    );
  }
);
