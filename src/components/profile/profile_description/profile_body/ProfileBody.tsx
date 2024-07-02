import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import { EditButton } from "../../../../common/components/EditButton";
import { textColor } from "../../../../common/styles/styles";
import { ProfileInterface } from "../../../../redux/slices/profile/user/slice";

interface ProfileBodyProps {
  profile: ProfileInterface;
  toggleEditProfile: () => void;
}

export const ProfileBody = memo(
  ({ profile, toggleEditProfile }: ProfileBodyProps) => {
    return (
      <Box textAlign="left" sx={{ padding: 2, mb: 2 }}>
        <Typography variant="h6" color="text.secondary">
          First name: <span style={textColor}>{profile.first_name}</span>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Last name: <span style={textColor}>{profile.last_name}</span>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Nick name: <span style={textColor}>{profile.nick_name}</span>
        </Typography>
        <Typography
          variant="h6"
          align="left"
          gutterBottom
          color="text.secondary"
          sx={{
            wordBreak: "break-word",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          Description:
          <Box component="span" sx={textColor} marginLeft="8px">
            {profile.description}
          </Box>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Phone number: <span style={textColor}>{profile.phone_number}</span>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Position: <span style={textColor}>{profile.position}</span>
        </Typography>

        <EditButton
          variantButton={"outlined"}
          text={"Edit profile"}
          callback={toggleEditProfile}
        />
      </Box>
    );
  }
);
