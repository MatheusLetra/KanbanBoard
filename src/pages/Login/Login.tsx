import {
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import React, { Dispatch, SetStateAction } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { auth } from '../../services/firebase-config'
import './Login.css'
import { Task } from '../../types/Task'
import { loadDataFromFirestore } from '../../utils/firestore-functions'
import { loadData, saveData } from '../../utils/localstorage'
import { UserInfo } from '../Home/Home'

interface LoginProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  setUserData: Dispatch<SetStateAction<UserInfo | null>>
  setTasks: Dispatch<SetStateAction<Task[]>>
}

const Login: React.FC<LoginProps> = ({
  setIsModalOpen,
  setUserData,
  setTasks,
}) => {
  async function loadUserData() {
    const userInfo = loadData('user-data')
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo)
      if (parsedUserInfo.displayName) {
        let response = await loadDataFromFirestore()
        setTasks(response)
      }
    }
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)
      const user: FirebaseUser = result.user
      const { displayName, photoURL, email } = user

      const userInfo = {
        displayName,
        photoURL,
        email,
      }

      setUserData(userInfo)
      saveData('user-data', userInfo)
      setIsModalOpen(false)
      loadUserData()
    } catch (error) {
      console.error('Google Login Error:', error)
    }
  }

  const handleStayDisconnected = () => {
    setIsModalOpen(false)
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
  )
}

export default Login
