import React, { useState, useEffect } from 'react';

const TextToSpeech = (props) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState(null);
  const synth = window.speechSynthesis;
  const text = props.inputData;

  useEffect(() => {
    // Get available voices and select the one you want to use
    const voices = synth.getVoices();
    const selectedVoice = voices.find(v => v.name === 'Microsoft Zira Desktop - English (United States)');
    setVoice(selectedVoice);
  }, []);

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice; // Set the selected voice
    synth.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    synth.cancel();
    setIsSpeaking(false);
  };


  const downloadSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    synth.speak(utterance);
  
    // Wait for the speech to finish before creating the blob
    utterance.onend = () => {
      // Create a blob object from the speech
      const blob = new Blob([new Uint8Array(new TextEncoder().encode(utterance.audioContent))], { type: 'audio/mp3' });
  
      // Create a download link for the user to save the file
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'speech.mp3';
      link.click();
    }
  }
  

  return (
    <div>
      <p>{text}</p>
      {isSpeaking ? (
        <button className='border px-5 py-1 bg-red-500 rounded font-semibold' onClick={stopSpeaking}>Stop</button>
      ) : (
        <div>
          <button className='border px-5 py-1 bg-green-500 rounded font-semibold' onClick={speakText}>Speak</button>
          <button className='border px-5 py-1 bg-blue-500 rounded font-semibold' onClick={downloadSpeech}>Download</button>
        </div>
      )}
    </div>
  );
}

export default TextToSpeech;
