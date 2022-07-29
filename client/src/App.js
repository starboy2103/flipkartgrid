import { Route,Routes } from "react-router";
import Navbar from "./components/Navbar";
import Nfttray from "./components/NFTtray"
import MintForm from "./components/MintForm"
import TransferForm from "./components/TransferForm"
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<><Navbar/> <Nfttray/></>}></Route>
          <Route exact path="/mint" element={<MintForm/>}></Route>
          <Route exact path="/transfer" element={<TransferForm/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;