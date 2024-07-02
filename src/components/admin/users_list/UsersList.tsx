import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { GoToButton } from "../../../common/components/GoToButton";
import { ButtonStyle, style } from "../../../common/styles/styles";
import { useAppSelector } from "../../../redux/redux_hooks";
import {
  fetchUsersByAdminThunk,
  updateUserThunkByAdmin,
} from "../../../redux/slices/admin/users/operations";
import { ProfileInterface } from "../../../redux/slices/profile/user/slice";
import { AppDispatch, RootState } from "../../../redux/store";
import { schema } from "../../profile/profile_description/yup/yup";
import { UserBodyList } from "./user_body/UserBodyList";
import { UserListForm } from "./user_form/UserListForm";

export const UsersList = () => {
  const users: ProfileInterface[] = useAppSelector(
    (state: RootState) => state.profileByAdmin
  );
  const dispatch = useDispatch<AppDispatch>();
  const [editUserId, setEditUserId] = useState<number | null | undefined>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileInterface>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  useEffect(() => {
    dispatch(fetchUsersByAdminThunk());
  }, [dispatch]);

  const handleEdit = (userId: number | undefined) => {
    if (editUserId === userId) {
      setEditUserId(null);
    }

    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      setEditUserId(userId);
      reset({
        first_name: userToEdit.first_name,
        last_name: userToEdit.last_name,
        nick_name: userToEdit.nick_name,
        description: userToEdit.description,
        phone_number: userToEdit.phone_number,
        position: userToEdit.position,
      });
    }
  };

  const onSubmit: SubmitHandler<ProfileInterface> = async (data) => {
    if (editUserId) {
      try {
        await dispatch(
          updateUserThunkByAdmin({ id: editUserId, user: data })
        ).unwrap();
        await dispatch(fetchUsersByAdminThunk());
      } catch (error) {
        toast.error("Failed to update company: ", { style });
      }
    }
    setEditUserId(null);
    reset();
  };

  const onCancelEdit = () => {
    setEditUserId(null);
    reset();
  };

  return (
    <Box sx={{ padding: "16px", backgroundColor: "#f9f9f9" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
      <GoToButton
          text={"Profile"}
          direction={"/profile"}
          style={ButtonStyle}
        />
      </Box>
      <Grid container spacing={3} mt={3} sx={{ maxWidth: "780px" }}>
        {!users.length ? (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              No users available yet
            </Typography>
          </Grid>
        ) : (
          users.map(
            (
              {
                id,
                email,
                first_name,
                last_name,
                nick_name,
                phone_number,
                position,
                image,
              },
              index
            ) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ minWidth: "390px" }}
                key={index}
              >
                <Paper
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "16px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                  }}
                >
                  {editUserId === id ? (
                    <UserListForm
                      handleSubmit={handleSubmit}
                      onSubmit={onSubmit}
                      register={register}
                      errors={errors}
                      first_name={first_name}
                      last_name={last_name}
                      nick_name={nick_name}
                      phone_number={phone_number}
                      position={position}
                      onCancelEdit={onCancelEdit}
                    />
                  ) : (
                    <UserBodyList
                      id={id}
                      email={email}
                      first_name={first_name}
                      last_name={last_name}
                      nick_name={nick_name}
                      phone_number={phone_number}
                      position={position}
                      image={image}
                      handleEdit={handleEdit}
                    />
                  )}
                </Paper>
              </Grid>
            )
          )
        )}
      </Grid>
    </Box>
  );
};
