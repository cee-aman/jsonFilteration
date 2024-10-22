import logo from './logo.svg';
import './App.css';
import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import MyApp from './myapp';
import Basic from './basic';
import JSONAATA from './jsonatatutorial'

function App() {

  addRxPlugin(RxDBDevModePlugin);

  


  return (
    <div className="App">
    <h1>Ideal way of doing  it</h1>
    <Basic/>

<MyApp/>
    <h1>RXDB </h1>
   
<div>

<h1>JSON AAATAAAAA </h1>
<JSONAATA/>
</div>
    </div>
  );
}

export default App;
