import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import { EditButton } from "../../../../common/components/EditButton";
import { textColor } from "../../../../common/styles/styles";

interface UserBodyListProps {
  id: number | undefined;
  email: string | undefined;
  first_name: string;
  last_name: string;
  nick_name: string;
  phone_number: string;
  position: string;
  image: string | undefined | null;
  handleEdit: (id: number | undefined) => void;
}

export const UserBodyList = memo(
  ({
    id,
    email,
    first_name,
    last_name,
    nick_name,
    phone_number,
    position,
    image,
    handleEdit,
  }: UserBodyListProps) => {
    return (
      <Box
        sx={{
          textAlign: "left",
        }}
      >
        <Avatar
          src={image || ""}
          alt="Profile"
          sx={{ width: 100, height: 100, m: "0 auto" }}
        >
          {!image && <AccountCircleIcon fontSize="medium" />}
        </Avatar>
        <Typography
          sx={{
            color: "black",
            fontSize: "1.7em",
            fontWeight: "bold",
            marginBottom: "8px",
            p: "5px",
            textAlign: "center",
          }}
        >
          {email}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          First name:
          <span style={textColor}> {first_name}</span>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Last name:
          <span style={textColor}> {last_name}</span>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Nickname:
          <span style={textColor}> {nick_name}</span>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Phone number:
          <span style={textColor}> {phone_number}</span>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Position:
          <span style={textColor}> {position}</span>
        </Typography>
        <EditButton
          variantButton={"contained"}
          text={"Edit"}
          callback={() => handleEdit(id)}
        />
      </Box>
    );
  }
);
