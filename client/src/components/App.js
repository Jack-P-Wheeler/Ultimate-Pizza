import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Home from "./Home";
import Admin from "./AdminPage/Admin";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import AddressEntry from "./AddressEntry";

const App = () => {
  const { user } = useAuth0();
  const {currentUser} = useContext(UserContext)
  return (
    <Router>
      <GlobalStyles/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {currentUser && <Route path="/admin" element={currentUser.isAdmin ? <Admin/> : <Navigate to={"/"}/>}/>}
        <Route path="address" element={<AddressEntry/>}/>
      </Routes>
    </Router>
  );
}

export default App;
