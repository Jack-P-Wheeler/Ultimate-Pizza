import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <GlobalStyles/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
