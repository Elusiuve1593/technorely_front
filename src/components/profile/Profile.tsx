import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profileThunk } from "../../redux/slices/profile/user/operations";
import { AppDispatch } from "../../redux/store";
import { Logout } from "../auth/logout/Logout";
import { ProfileDescription } from "./profile_description/ProfileDescription";
import { ProfilePhoto } from "./profile_photo/ProfilePhoto";

export const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (id) {
      dispatch(profileThunk(+id));
    }
  }, [dispatch, id]);
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 6, mt: 3, borderRadius: 0 }}>
        <Box display="flex" flexDirection="column">
          <Box mb={2} ml={2}>
            <Logout />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} width={250}>
              <ProfilePhoto />
            </Grid>
            <Grid item xs={12} md={8}>
              <ProfileDescription id={id} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};