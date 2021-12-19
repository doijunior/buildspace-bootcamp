import {useEffect, useState} from 'react';
import cbor from 'cbor';

// import { Address } from '@emurgo/cardano-serialization-lib-browser'
import { Address } from '@emurgo/cardano-serialization-lib-asmjs';
import './App.css';

function hexToBytes(hex) {
  for(var bytes = [], i = 0; i < hex.length; i += 2)
    bytes.push(parseInt(hex.substr(i, 2), 16));
  return bytes;
}

function App() {
  const [wallet, setWallet] = useState(false);
  const [balance, setBalance] = useState(0);
  const [network, setNetwork] = useState(null);
  const [address, setAddress] = useState("");
  const [cardano, setCardano] = useState(window.cardano);

  const networks = [ 'testnet', 'mainnet'];

  setTimeout(() => {
    setCardano(window.cardano)
  })
  function connectWallet(){
    cardano.enable().then((response) => {
      setWallet(true);
    }).catch(err => {
      alert(err.info)
    });
  }


  useEffect(() => {
    if(cardano) {
      cardano.isEnabled().then((enabled) => {
        if(enabled) {
          setWallet(true);
        }
      })
    }
  })

  useEffect(() => {
    if(!wallet) return;
    const showWalletData = () => {
      function showAddress(addresses){
        setAddress(addresses[0])
      }

      function showBalance(string){
        const balance = cbor.decode(string);
        setBalance(balance/1_000_000);
      }
    
      function showNetwork(networkId){
        setNetwork(networks[networkId]);
      }
    
      cardano.getBalance().then(showBalance);
      cardano.getNetworkId().then(showNetwork);
      cardano.getUsedAddresses().then(showAddress);

      // cardano.getNetworkId().then(showAddress);
    }
    showWalletData();
    cardano.onNetworkChange(()=> {showWalletData()})
  }, [wallet, address, cardano, network])
  return (
    <div className="App">
      <header className="App-header">
        {cardano && (
          <div>
            {wallet && (
              <div>
                <p>
                  Veja o saldo da sua carteira.
                </p>
                <p>
                  Saldo: {balance}
                </p>
                <p>
                  Rede: {network}
                </p>
                <p>
                  Endereço: {address}
                </p>
              </div>
            )}
            {!wallet && (
              <button onClick={connectWallet}>Conecte sua carteira</button>

            )}

          </div>
        )}
        {!cardano && (
          <p>Carteira não identificada</p>
        )}
      </header>
    </div>
  );
}

export default App;
