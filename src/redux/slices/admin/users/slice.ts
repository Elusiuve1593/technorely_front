import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProfileInterface } from "../../profile/user/slice";

const initialState: ProfileInterface[] = [
  {
    id: 1,
    image: "",
    email: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    nick_name: "",
    description: "",
    position: "",
    roles: [""],
    companies: [
      {
        name: "",
        address: "",
        service_of_activity: "",
        number_of_employees: 0,
        description: "",
        type: "",
      },
    ],
  },
];

const profileByAdminSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchUsers(state, action: PayloadAction<{ users: ProfileInterface[] }>) {
      return (state = action.payload.users);
    },
    updateUser(
      state,
      action: PayloadAction<{ userId: number; user: ProfileInterface }>
    ) {
      return state.map((user) =>
        user.id === action.payload.userId ? action.payload.user : user
      );
    },
  },
});

export const { fetchUsers, updateUser } = profileByAdminSlice.actions;
export default profileByAdminSlice.reducer;
