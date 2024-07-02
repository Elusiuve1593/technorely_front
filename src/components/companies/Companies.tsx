import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GoToButton } from "../../common/components/GoToButton";
import { fetchCompaniesThunk } from "../../redux/slices/profile/companies/operations";
import { AppDispatch } from "../../redux/store";
import { CompanyModal } from "./company_modal/CompanyModal";
import { CompanyTable } from "./company_table/CompanyTable";
import { ButtonStyle } from "../../common/styles/styles";

export const Companies = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [sortBy, setSortBy] = useState<string>("name");
  const [order, setOrder] = useState<string>("ASC");

  const handleCompanyCreated = () => {
    dispatch(fetchCompaniesThunk({ sortBy, order }));
  };

  useEffect(() => {
    dispatch(fetchCompaniesThunk({ sortBy, order }));
  }, [dispatch, sortBy, order]);
  return (
    <Box sx={{ padding: 3 }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <CompanyModal onCompanyCreated={handleCompanyCreated} />
        </Grid>
        <GoToButton
          text={"Profile"}
          direction={"/profile"}
          style={ButtonStyle}
        />
        <Grid item xs={12}>
          <CompanyTable
            sortBy={sortBy}
            order={order}
            setSortBy={setSortBy}
            setOrder={setOrder}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
