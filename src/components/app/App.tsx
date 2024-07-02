import pulse from "../../common/preloader/Pulse.gif";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "../../App.css";
import { useAppSelector } from "../../redux/redux_hooks";
import { RootState } from "../../redux/store";
import { CompaniesList } from "../admin/companies_list/CompaniesList";
import { UsersList } from "../admin/users_list/UsersList";
import { Login } from "../auth/login/Login";
import { SignUp } from "../auth/registration/SignUp";
import { Companies } from "../companies/Companies";
import { CompanyDescription } from "../companies/company_description/CompanyDescription";
import { NotFoundPage } from "../not_found_page/NotFoundPage";
import { Profile } from "../profile/Profile";
import { PrivateRoute } from "../routs/PrivateRoute";
import { Img, PreloaderContainer } from "../../common/styles/styles";

function App() {
  const isAuthenticated: boolean = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isLoading: boolean = useSelector(
    (state: RootState) => state.preloader.isLoading
  );

  return (
    <div>
      {isLoading && (
        <PreloaderContainer>
          <Img src={pulse} alt="Loading..." />
        </PreloaderContainer>
      )}

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/companies/*" element={<Companies />} />
          <Route path="/companies/:id" element={<CompanyDescription />} />
          <Route path="/companies-list/*" element={<CompaniesList />} />
          <Route path="/users-list/*" element={<UsersList />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
