import { User as FirebaseUser, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { Dispatch, SetStateAction } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../../services/firebaseConfig';
import './Login.css';
import {  saveData } from '../../utils/localstorage';
import { UserInfo } from '../Home/Home';

interface LoginProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setUserData: Dispatch<SetStateAction<UserInfo | null>>;
}

const Login: React.FC<LoginProps> = ({ setIsModalOpen, setUserData }) => {
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user: FirebaseUser = result.user;

        const { displayName, photoURL, email } = user;

        const userInfo = {
          displayName,
          photoURL,
          email,
        };

        
        setUserData(userInfo);
        
        saveData('user-data', userInfo);
        
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
      });
  };

  const handleStayDisconnected = () => {
    setIsModalOpen(false); 
  }

  return (
    <div className="login">
      <div className="login-form">
        <h2>Deseja salvar as informações em nuvem?</h2>
        <div className="social-login">
          <button className="google-button" onClick={handleGoogleLogin}>
            <FcGoogle className="google-icon" />
            Continue com Google
          </button>
        </div>
        <button className="stay-disconnected" onClick={handleStayDisconnected}>
          Não, mantenha as informações no dispositivo local
          </button>
      </div>
    </div>
  );
};

export default Login;
