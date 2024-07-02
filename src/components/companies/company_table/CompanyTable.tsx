import DeleteIcon from "@mui/icons-material/Delete";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { memo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/redux_hooks";
import { deleteCompanyThunk } from "../../../redux/slices/profile/companies/operations";
import { AppDispatch, RootState } from "../../../redux/store";

interface CompanyTableProps {
  sortBy: string;
  order: string;
  setSortBy: (sortBy: string) => void;
  setOrder: (order: string) => void;
}

export const CompanyTable = memo(
  ({ setOrder, setSortBy, order, sortBy }: CompanyTableProps) => {
    const companies = useAppSelector(
      (state: RootState) => state.companies
    );
    const dispatch = useDispatch<AppDispatch>();

    const handleSort = (newSortBy: string) => {
      const newOrder = sortBy === newSortBy && order === "ASC" ? "DESC" : "ASC";
      setSortBy(newSortBy);
      setOrder(newOrder);
    };

    const deleteHandler = (id: number | undefined) => {
      dispatch(deleteCompanyThunk(id));
    };
    return (
      <TableContainer component={Paper} sx={{borderRadius: 0}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => handleSort("name")}
                style={{ cursor: "pointer" }}
              >
                <Typography variant="body1">
                  Name {sortBy === "name" ? (order === "ASC" ? "↑" : "↓") : ""}
                </Typography>
              </TableCell>
              <TableCell
                onClick={() => handleSort("service_of_activity")}
                style={{ cursor: "pointer" }}
              >
                <Typography variant="body1">
                  Service{" "}
                  {sortBy === "service_of_activity"
                    ? order === "ASC"
                      ? "↑"
                      : "↓"
                    : ""}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">Address</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">Description</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1"></Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!companies.length ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h6" color="text.secondary">
                      No companies available yet
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              companies.map(
                ({ id, name, address, service_of_activity }, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{name}</TableCell>
                    <TableCell>{service_of_activity}</TableCell>
                    <TableCell>{address}</TableCell>
                    <TableCell>
                      <Link to={`/companies/${id}`}>View Details</Link>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => deleteHandler(id)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);
