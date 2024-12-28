import { useState } from 'react';
import './App.css';
import { LC, NC, SC, UC } from './data/PassChar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  let [uppercase, setUppercase] = useState(false)
  let [lowercase, setLowercase] = useState(false)
  let [number, setNumber] = useState(false)
  let [symbol, setSymbol] = useState(false)
  let [passLen, setPasslen] = useState(10)
  let [fpass, setFpass]=useState('')
  
  let createPassword = () => {
    let finalPass = '';
    let charSet = '';
    if (uppercase || lowercase || number || symbol) {
      if (uppercase) charSet += UC;
      if (lowercase) charSet += LC;
      if (number) charSet += NC;
      if (symbol) charSet += SC;
  
      for (let i = 0; i < passLen; i++) {
        finalPass += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
  
      setFpass(finalPass);
      toast.success("Password generated successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      toast.error("Please select at least one checkbox", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  
  let copyPass = () => {
    if (fpass) {
      navigator.clipboard.writeText(fpass);
      toast.success("Password copied to clipboard!", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      toast.warning("No password to copy!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  
  return (
    <div className="container">
      <div className="passwordBox">
        <h2>Password Generator</h2>
        <div className="passwordBoxin">
          <input type="text" value={fpass} placeholder="Your password" readOnly />
          <button onClick={copyPass}>Copy</button>
        </div>

        <div className="passLength">
          <label>Password Length</label>
          <input type="number" value={passLen} min={8} max={20} onChange={(event) => setPasslen(event.target.value)} />
        </div>

        <div className="passOptions">
          <label>
            <input type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} />
            Include uppercase letters
          </label>
          <label>
            <input type="checkbox" checked={lowercase} onChange={() => setLowercase(!lowercase)} />
            Include lowercase letters
          </label>
          <label>
            <input type="checkbox" checked={number} onChange={() => setNumber(!number)} />
            Include numbers
          </label>
          <label>
            <input type="checkbox" checked={symbol} onChange={() => setSymbol(!symbol)} />
            Include symbols
          </label>
        </div>

        <button className="generateButton" onClick={createPassword}>
          Generate Password</button>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
