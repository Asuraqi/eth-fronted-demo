import './App.css';
import { Button, Typography, Stack } from '@material-ui/core';
import Web3 from "web3";
import { ethers } from 'ethers';
import abi from './NAT.json';

function App() {
  
  const connectEthByWeb3 = () => {
    const web3 = new Web3('http://localhost:8545');    
    console.log(web3.eth.getAccounts())
  }

  const connectEthByEthers = () => {
    const url = "http://127.0.0.1:8545";
    const provider = new ethers.providers.JsonRpcProvider(url);
    console.log(provider);
  }

  const connectWalletByWeb3 = () => {
    const web3 = new Web3(Web3.givenProvider);
    window.ethereum.enable();
    console.log(web3);
    console.log(web3.eth.getAccounts());
  }

  const connectWalletByEthers = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    const signer = provider.getSigner();
    console.log(provider);
    console.log(signer._address);
    window.ethereum.enable();

  }

  const createAccountByWeb3 = () => {
    const web3 = new Web3('http://localhost:8545');
    const account = web3.eth.accounts.create();
    console.log(account);
    const signature = web3.eth.accounts.sign('Some data', account.privateKey);
    console.log(signature);
  }

  const createAccountByEthers = async () => {
    const signer =  ethers.Wallet.createRandom();
    console.log(signer)
    const url = "http://127.0.0.1:8545";
    const provider = new ethers.providers.JsonRpcProvider(url);
    const signer2 = provider.getSigner();
    console.log(signer2)
    const signature = await signer.signMessage('Some data');
    console.log(signature);
  }

  const transferByWeb3 = () => {
    const web3 = new Web3(Web3.givenProvider);
    let value= web3.utils.toWei('1', 'ether')
    var message = {from: '0xD5AdB9019Cbe14878844C9b678e83c1B70Ee305C', to:'0x17d53789b73a3531d257d3B0F9AFeD5e754a22fE', value:value};
    web3.eth.sendTransaction(message, (err, res) => {
        var output = "";
        if (!err) {
            output += res;
        } else {
            output = "Error"+err;
        }
    console.log('转账:',output)
    })
  }

  const transferByEthers = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    const signer = provider.getSigner();
    const tx = signer.sendTransaction({
      to: "treaser.eth",
      value: ethers.utils.parseEther("1.0")
    });
    console.log(tx);
  }
  
  const invokeByWeb3 = () => {
    const web3 = new Web3(Web3.givenProvider);
    console.log(web3);
    const contractInstance = new web3.eth.Contract(abi, '0x4983380AdC2fb15295B775FcB7C55043130ED97C', {
        from: '0xD5AdB9019Cbe14878844C9b678e83c1B70Ee305C',
        gasPrice: 300000000,
    });
    console.log(contractInstance.methods);
    contractInstance.methods.totalSupply().call().then(console.log);
    contractInstance.methods.symbol().call().then(console.log);
    contractInstance.methods.transferFrom('0xD5AdB9019Cbe14878844C9b678e83c1B70Ee305C','0x17d53789b73a3531d257d3B0F9AFeD5e754a22fE',1).send().then(console.log);
  }
  const invokeByEthers = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var contractInstance = new ethers.Contract('0x4983380AdC2fb15295B775FcB7C55043130ED97C', abi, provider);
    contractInstance.totalSupply().then(console.log);
    contractInstance.symbol().then(console.log);
    
    const signer = provider.getSigner();
    contractInstance = new ethers.Contract('0x4983380AdC2fb15295B775FcB7C55043130ED97C', abi, signer);
    contractInstance.transferFrom('0xD5AdB9019Cbe14878844C9b678e83c1B70Ee305C','0x17d53789b73a3531d257d3B0F9AFeD5e754a22fE',1);
    console.log(contractInstance);
  }
  const utilsByWeb3 = () => {
    const web3 = new Web3(Web3.givenProvider);
    console.log(web3);
    console.log(web3.utils.sha3('hello world'));
    console.log(web3.utils.keccak256('hello world'));
  }

  const utilsByEthers = () => {

    console.log(ethers.utils.id('hello world'));
    console.log(ethers.utils.keccak256('0x4242'));
  }

  return (
    <div className="App">
      <Typography variant="h1">web3.js与ethers.js演示demo</Typography>
      <header className="App-header">
        <div className="App-content">
            <Typography variant="h2">web3.js测试</Typography>
            <Stack spacing={5} direction="column" style={{marginTop:50}}>
              <Button variant="outlined" className="App-button" onClick={connectEthByWeb3}>连接以太坊</Button>
              <Button variant="outlined" className="App-button" onClick={connectWalletByWeb3}>连接metamask</Button>
              <Button variant="outlined" className="App-button" onClick={createAccountByWeb3}>创建账户及签名</Button>
              <Button variant="outlined" className="App-button" onClick={transferByWeb3}>转账</Button>
              <Button variant="outlined" className="App-button" onClick={invokeByWeb3}>与合约交互</Button>
              <Button variant="outlined" className="App-button" onClick={utilsByWeb3}>工具类方法</Button>
            </Stack>
        </div>
        <div className="App-content">
            <Typography variant="h2" >ethers.js测试</Typography>
            <Stack spacing={5} direction="column" style={{marginTop:50}}>
              <Button variant="outlined" className="App-button" onClick={connectEthByEthers}>连接以太坊</Button>
              <Button variant="outlined" className="App-button" onClick={connectWalletByEthers}>连接metamask</Button>
              <Button variant="outlined" className="App-button" onClick={createAccountByEthers}>创建账户及签名</Button>
              <Button variant="outlined" className="App-button" onClick={transferByEthers}>转账</Button>
              <Button variant="outlined" className="App-button" onClick={invokeByEthers}>与合约交互</Button>
              <Button variant="outlined" className="App-button" onClick={utilsByEthers}>工具类方法</Button>
            </Stack>
        </div>
      </header>
    </div>
  );
}

export default App;
