import React, { useState } from 'react';
import TextToSpeech from './components/TextToSpeech';

const App = () => {
  const [inputData, setInputData] = useState('');

  return (
    <div className='container mx-auto'>
      <input className='border p-2 m-5' type="text" onChange={(e) => setInputData(e.target.value)} />
      <TextToSpeech inputData={inputData} />
    </div>
  );
};

export default App;