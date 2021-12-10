import {useEffect, useState} from 'react';
import cbor from 'cbor';
// import * as wasm from '@emurgo/cardano-serialization-lib-asmjs';

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

  function connectWallet(){
    cardano.enable().then((response) => {
      setWallet(true);
    }).catch(err => {
      alert(err.info)
    });
  }

  function showBalance(string){

  }
  useEffect(() => {
    if(!wallet) return;
    const showWalletData = () => {
      cardano.getBalance().then(showBalance);
      window.cbor = cbor;
      // window.wasm = wasm;
    }
  }, [wallet])
  return (
    <div className="App">
      <header className="App-header">
        {window.cardano && (
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
        {!window.cardano && (
          <p>Carteira não identificada</p>
        )}
      </header>
    </div>
  );
}

export default App;
