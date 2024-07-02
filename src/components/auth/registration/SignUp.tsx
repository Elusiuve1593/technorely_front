import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../../redux/slices/auth/sign-in/operations";
import { signUpThunk } from "../../../redux/slices/auth/sign-up/operations";
import { AppDispatch } from "../../../redux/store";
import { SignUpForm } from "./signUp_form/SignUpForm";
import { schema } from "./yup/yup";

export interface SignUpFormInterface {
  email: string;
  password: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  nick_name: string;
  description: string;
  position: string;
}

export const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [blind, setBlind] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormInterface>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<SignUpFormInterface> = async (data) => {
    const res = await dispatch(signUpThunk(data));
    if (signUpThunk.fulfilled.match(res)) {
      const { email, password } = data;
      const res = await dispatch(loginThunk({ email, password }));

      if (loginThunk.fulfilled.match(res)) {
        navigate("/profile");
      }
    }
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={4.5}>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 0 }}>
          <SignUpForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            onSubmit={onSubmit}
            isValid={isValid}
            blind={blind}
            setBlind={setBlind}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};
