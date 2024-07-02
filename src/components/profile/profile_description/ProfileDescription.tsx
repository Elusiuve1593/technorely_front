import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../redux/redux_hooks";
import { ProfileInterface } from "../../../redux/slices/profile/user/slice";
import { RootState } from "../../../redux/store";
import { ProfileBody } from "./profile_body/ProfileBody";
import { ProfileForm } from "./profile_form/ProfileForm";
import { SelectButton } from "./select_button/SelectButton";
import { schema } from "./yup/yup";

interface ProfileBodyProps {
  id: string | null;
}

export const ProfileDescription = memo(({ id }: ProfileBodyProps) => {
  const profile: ProfileInterface = useAppSelector(
    (state: RootState) => state.profile
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileInterface>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const toggleEditProfile = () => {
    if (!isEditing && profile) {
      reset({
        first_name: profile.first_name,
        last_name: profile.last_name,
        nick_name: profile.nick_name,
        description: profile.description,
        phone_number: profile.phone_number,
        position: profile.position,
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <Box ml={ 1}>
      {isEditing ? (
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
          <ProfileForm
            id={id}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            setIsEditing={setIsEditing}
            toggleEditProfile={toggleEditProfile}
          />
        </Paper>
      ) : (
        <ProfileBody profile={profile} toggleEditProfile={toggleEditProfile} />
      )}
      <Box>
        <SelectButton profile={profile} />
      </Box>
    </Box>
  );
});
