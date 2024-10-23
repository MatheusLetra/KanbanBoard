import React, { useState, useEffect } from 'react'
import KanbanBoard from '../../components/KanbanBoard'
import TaskForm from '../../components/TaskForm'
import { Task } from '../../types/Task'
import Login from '../Login/Login'
import './Home.css'
import { loadData, saveData } from '../../utils/localstorage'

export interface UserInfo {
  displayName: string | null
  photoURL: string | null
  email: string | null
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = loadData('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const [userData, setUserData] = useState<UserInfo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(true)

  useEffect(() => {
    const userInfo = loadData('user-data')
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo)
      setUserData(parsedUserInfo)

      if (parsedUserInfo.displayName) {
        setIsModalOpen(false)
      }
    }
  }, [])

  useEffect(() => {
    saveData('tasks', tasks)
  }, [tasks])

  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleLogout = () => {
    saveData('user-data', {})
    setUserData(null)
    setIsModalOpen(true)
  }

  return (
    <div className="home">
      {userData && userData.photoURL && (
        <div className="user-info">
          <img
            src={userData.photoURL || ''}
            alt={`${userData.displayName} Profile`}
            className="user-photo"
          />
          <h3>{userData.displayName}</h3>
          <button className="logout-button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      )}
      <h1>Kanban Board</h1>
      <TaskForm addTask={addTask} />
      <KanbanBoard tasks={tasks} setTasks={setTasks} deleteTask={deleteTask} />

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              &times;
            </button>
            <Login setIsModalOpen={setIsModalOpen} setUserData={setUserData} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
