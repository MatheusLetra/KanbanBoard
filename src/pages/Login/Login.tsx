import React from 'react';
import { FcGoogle } from 'react-icons/fc';

import './Login.css'

const Login: React.FC = () => {
  return (
    <div className="login">
      <div className="login-form">
        <h2>Deseja salvar as informações em nuvem?</h2>
        <div className="social-login">
          <button className="google-button">
            <FcGoogle className="google-icon" />
            Continue com Google
          </button>
        </div>
        <button className="stay-disconnected">Não, mantenha as informações no dispositivo local</button>
      </div>
    </div>
  );
};

export default Login;
