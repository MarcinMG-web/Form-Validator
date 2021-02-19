import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import { Heder } from './components/Heder';
import { Form } from './components/Form';

function App() {
  return (
    <div className='App'>
      <Heder />
      <Form />
    </div>
  );
}

export default App;
