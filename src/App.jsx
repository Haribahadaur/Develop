import { useState, useEffect } from "react";
import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import "./App.css";

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [data, setData] = useState(null);
  useEffect( ()=> {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function init() {
     
      const web3 = new Web3(provider);
      //console.log(web3);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];
      //console.log("Contract Address:", deployedNetwork.address);
      const contract = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork.address
      );
      //console.log(contract);
      setState({ web3: web3, contract: contract });
    }
    provider && init();
  }, []);

  useEffect(() => {
    
      const { contract } = state;
      async function read() {
        const dataValue = await contract.methods.getter().call();
        setData(dataValue);
        // console.log(data);
      }
      contract && read();
  
  }, [state]);

  async function setValue() {
    const { contract } = state;

    const input = document.querySelector("#input");
    await contract.methods
      .setter(input.value)
      .send({ from:
      "0x806406886F4dA58E20d2CFd64A271A3C4aeE98cE" });
    //const dataValue = await contract.methods.getter().call();
    //setData(dataValue);
  }

  return (
    <div className="App">
      <div> This is my data : {data}</div>
      <div>
        <input type="text" id="input"></input>
      </div>
      <div>
        <button onClick={setValue}>Click Here To Change Value</button>
      </div>
    </div>
  );
}

export default App;
