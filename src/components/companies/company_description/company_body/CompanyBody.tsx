import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import { EditButton } from "../../../../common/components/EditButton";
import { textColor } from "../../../../common/styles/styles";
import { CompaniesInterface } from "../../../../redux/slices/profile/companies/slice";

interface CompanyBodyProps {
  company: CompaniesInterface | undefined;
  toggleEditCompany: () => void;
}

export const CompanyBody = memo(
  ({ company, toggleEditCompany }: CompanyBodyProps) => {
    return (
      <>
        {company && (
          <>
            <Box textAlign="center">
              <Typography variant="h4" gutterBottom>
                {company.name}
              </Typography>
            </Box>
            <Typography
              variant="h6"
              align="left"
              color="text.secondary"
              gutterBottom
            >
              Address:
              <Box component="span" sx={textColor} marginLeft="8px">
                {company.address}
              </Box>
            </Typography>
            <Typography
              variant="h6"
              align="left"
              color="text.secondary"
              gutterBottom
            >
              Service of Activity:
              <Box component="span" sx={textColor} marginLeft="8px">
                {company.service_of_activity}
              </Box>
            </Typography>
            <Typography
              variant="h6"
              align="left"
              color="text.secondary"
              gutterBottom
            >
              Number of Employees:
              <Box component="span" sx={textColor} marginLeft="8px">
                {company.number_of_employees}
              </Box>
            </Typography>
            <Typography
              variant="h6"
              align="left"
              color="text.secondary"
              gutterBottom
              sx={{ overflowWrap: "break-word" }}
            >
              Description:
              <Box component="span" sx={textColor} marginLeft="8px">
                {company.description}
              </Box>
            </Typography>
            <Typography
              variant="h6"
              align="left"
              color="text.secondary"
              gutterBottom
            >
              Type:
              <Box component="span" sx={textColor} marginLeft="8px">
                {company.type}
              </Box>
            </Typography>
            <Box textAlign="left" sx={{ paddingTop: "5px" }}>
              <EditButton
                variantButton={"contained"}
                text={"Edit"}
                callback={toggleEditCompany}
              />
            </Box>
          </>
        )}
      </>
    );
  }
);
