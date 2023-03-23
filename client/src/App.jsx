
import React, { useState, useEffect } from "react";
import FactoryContract from "./contracts/FundraiserFactory.json";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Routes,Route, NavLink } from "react-router-dom";
import Web3 from "web3";
import NewFundraiser from "./components/NewFundraiser";
import Home from "./components/Home";
import Receipts from "./components/Receipts";
import "./App.css";

const App = () => {
  const [state, setState] = useState({web3: null, accounts: null, contract: null});

  useEffect(() => {
    const init = async() => {
      try {
        // Get network provider and web3 instance.
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545")

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FactoryContract.networks[networkId];
        const instance = new web3.eth.Contract(
          FactoryContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        setState({web3, accounts, contract: instance});

      } catch(error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    init();
  }, []);

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

  const runExample = async () => {
    const { accounts, contract } = state;
  };

  return (
    <div>
 
        <AppBar position="static" color="default" style={{ margin: 0 }}>
          <Toolbar>
           <Typography variant="h6" color="inherit">
             <NavLink className="nav-link" to="/">Home</NavLink>
           </Typography>
           <NavLink className="nav-link" to="/new/">New</NavLink>
          </Toolbar>
       </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new/" element={<NewFundraiser />} />
        <Route path="/receipts" element={<Receipts />} />
      </Routes>


    </div>
  )
}


export default App;
