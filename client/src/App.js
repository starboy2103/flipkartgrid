import { Route,Routes } from "react-router";
import Navbar from "./components/Navbar";
import Nfttray from "./components/NFTtray"
import MintForm from "./components/MintForm"
import TransferForm from "./components/TransferForm"
import Decay from "./components/Decay";
import Users from "./components/Users";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<><Navbar/> <Nfttray/></>}></Route>
          <Route exact path="/mint" element={<MintForm/>}></Route>
          <Route exact path="/transfer" element={<TransferForm/>}></Route>
          <Route exact path="/decay" element={<Decay/>}></Route>
          <Route exact path="/users" element={<Users/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;