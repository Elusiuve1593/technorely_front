import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import { EditButton } from "../../../../common/components/EditButton";
import { textColor } from "../../../../common/styles/styles";

interface CompanyBodyListFormProps {
  id: number | undefined;
  name: string;
  address: string;
  number_of_employees: number;
  description: string;
  service_of_activity: string;
  type: string;
  handleEdit: (id: number | undefined) => void;
}

export const CompanyBodyList = memo(
  ({
    id,
    name,
    address,
    number_of_employees,
    description,
    service_of_activity,
    type,
    handleEdit,
  }: CompanyBodyListFormProps) => {
    return (
      <Box sx={{ textAlign: "left" }}>
        <Typography
          sx={{
            color: "black",
            fontSize: "1.5em",
            fontWeight: "bold",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          {name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Address:
          <Box component="span" sx={textColor} marginLeft="8px">
            {address}
          </Box>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Number of Employees:
          <Box component="span" sx={textColor} marginLeft="8px">
            {number_of_employees}
          </Box>
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
            {description}
          </Box>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Service of Activity:
          <Box component="span" sx={textColor} marginLeft="8px">
            {service_of_activity}
          </Box>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Type:
          <Box component="span" sx={textColor} marginLeft="8px">
            {type}
          </Box>
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
