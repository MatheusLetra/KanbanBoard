import React, { useState, useEffect } from 'react'
import KanbanBoard from '../../components/KanbanBoard'
import TaskForm from '../../components/TaskForm'
import { Task } from '../../types/Task'
import Login from '../Login/Login'
import './Home.css'
import { loadData, saveData } from '../../utils/localstorage'
import {
  loadDataFromFirestore,
  updateDataOnFirestore,
} from '../../utils/persistdataonfirestore'

export interface UserInfo {
  displayName: string | null
  photoURL: string | null
  email: string | null
}

const Home: React.FC = () => {
  const initializeTasks = (): Task[] => {
    const savedTasks = loadData('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  }

  const [tasks, setTasks] = useState<Task[]>(initializeTasks)
  const [userData, setUserData] = useState<UserInfo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(true)

  useEffect(() => {
    handleUserInitialization()
  }, [])

  useEffect(() => {
    saveTasksToLocalStorage()
    syncTasksWithFirestore()
  }, [tasks])

  const handleUserInitialization = async () => {
    loadUserInfoFromLocalStorage()
    await loadTasksFromFirestore()
  }

  const loadUserInfoFromLocalStorage = () => {
    const userInfo = loadData('user-data')
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo)
      if (parsedUserInfo.displayName) {
        setUserData(parsedUserInfo)
        setIsModalOpen(false)
      }
    }
  }

  const loadTasksFromFirestore = async () => {
    const userInfo = loadData('user-data')
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo)
      if (parsedUserInfo.displayName) {
        const fetchedTasks = await loadDataFromFirestore()
        setTasks(fetchedTasks)
      }
    }
  }

  const saveTasksToLocalStorage = () => {
    saveData('tasks', tasks)
  }

  const syncTasksWithFirestore = () => {
    updateDataOnFirestore(tasks)
  }

  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleUserLogout = () => {
    saveData('user-data', {})
    saveData('tasks', [])
    setUserData(null)
    setTasks([])
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
          <button className="logout-button" onClick={handleUserLogout}>
            Sair
          </button>
        </div>
      )}
      <h1>Kanban Board</h1>
      <TaskForm addTask={handleAddTask} />
      <KanbanBoard
        tasks={tasks}
        setTasks={setTasks}
        deleteTask={handleDeleteTask}
      />

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={handleCloseModal}>
              &times;
            </button>
            <Login
              setIsModalOpen={setIsModalOpen}
              setUserData={setUserData}
              setTasks={setTasks}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
