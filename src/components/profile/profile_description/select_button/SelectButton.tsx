import Box from "@mui/material/Box";
import { memo } from "react";
import { GoToButton } from "../../../../common/components/GoToButton";
import { ProfileInterface } from "../../../../redux/slices/profile/user/slice";
import { ButtonStyle } from "../../../../common/styles/styles";

interface SelectButtonProps {
  profile: ProfileInterface;
}

export const SelectButton = memo(({ profile }: SelectButtonProps) => {
  const isAdmin: boolean | undefined = profile.roles?.includes("admin");
  return (
    <>
      {isAdmin ? (
        <Box display="flex" justifyContent="space-around">
          <GoToButton text={"Companies list"} direction={"/companies-list"} />
          <GoToButton text={"Users list"} direction={"/users-list"} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <GoToButton
            text={"Companies"}
            direction={"/companies"}
            style={ButtonStyle}
          />
        </Box>
      )}
    </>
  );
});
