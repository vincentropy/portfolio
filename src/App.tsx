import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { loadIndex, Page } from './api';
import './App.css';
import { LoadingMarkdown } from './components/LoadingMarkdown';

function App() {
  const initialData: Page[] = [];
  const [indexData, setIndexData] = useState(initialData);

  useEffect(() => {
    async function populate() {
      const data = await loadIndex();
      setIndexData(data);
    }
    populate();
  }, []);
  console.log(indexData);
  
  return (
    <div className="App">
      {indexData.map((item, index) => (<LoadingMarkdown name={item.filename} key={index}/>))}
    </div>
  );
}

export default App;
