import React, { useRef } from 'react';
import Webcam from 'react-webcam';

function App() {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log('captured');

    // Make an HTTP POST request to the backend server
    fetch('/api/save-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageSrc }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        alert(data.message);
        // Handle the response from the server
        console.log(data.message);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Webcam Example</h1>
      <Webcam audio={false} ref={webcamRef} mirrored={true} />
      <button onClick={capture}>Capture</button>
    </div>
  );
}

export default App;
