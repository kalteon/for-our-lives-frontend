import React, { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    const initializeGapi = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: 'process.env.GOOGLE_CLIENT_ID', // Google OAuth 클라이언트 ID
        }).then(() => {
          console.log('GAPI initialized');
        });
      });
    };

    // GAPI script 로드 및 초기화
    const loadGapiScript = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = initializeGapi;
      document.body.appendChild(script);
    };

    loadGapiScript();
  }, []);

  const handleLogin = async () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    const googleUser = await auth2.signIn();
    const idToken = googleUser.getAuthResponse().id_token;
    
    // idToken을 서버로 전송하여 JWT 토큰을 받음
    const response = await axios.post('http://localhost:8080/api/auth/google', { token: idToken });
    const jwtToken = response.data.jwtToken;
    console.log('JWT Token:', jwtToken);
  };

  return (
    <div className="App">
      <h1>Google OAuth 2.0 with React</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default App;
