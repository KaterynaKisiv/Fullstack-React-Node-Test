import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import PATHS from './constants/paths'
import TasksPage from './pages/Tasks'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
        <Route path={PATHS.REGISTER} element={<RegisterPage />} />

        <Route
          path={PATHS.TASKS}
          element={
            <PrivateRoute>
              <TasksPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<p>There's nothing here yet :(</p>} />
      </Routes>
    </Router>
  )
}

export default App
