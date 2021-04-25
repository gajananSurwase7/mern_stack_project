import logo from './logo.svg';
import './App.css';
import CustomerForm from "./CustomerForm/CustomerForm";
import CustomerTable from "./CustomerTable/CustomerTable";
import { BrowserRouter as Router, Route, IndexRoute } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <CustomerForm /> */}
      {/* <CustomerTable/> */}
      <Router>
        <Route path={"/"} component={CustomerTable} exact/>
        <Route path={"/customerform"} component={CustomerForm} />

      </Router>
    </div>
  );
}

export default App;
