// npm modules 
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Home/Home'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import CreateListing from './pages/CreateListing/CreateListing'
import BrowseListings from './pages/BrowseListings/BrowseListings'
import ShowListing from './pages/ShowListing/ShowListing'
import EditListing from './pages/EditListing/EditListing'

// services
import * as authService from './services/authService'

// stylesheets
import './App.css'

// types
import { User } from './types/models'

function App(): JSX.Element {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(authService.getUser())

  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        /> 
        <Route
          path="/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <ProfilePage user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/listings"
          element={
            <ProtectedRoute user={user}>
              <BrowseListings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listings/:id"
          element={
            <ProtectedRoute user={user}>
              <ShowListing loggedInUser={user?.profile.id}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/listings/:id/edit"
          element={
            <ProtectedRoute user={user}>
              <EditListing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listings/create"
          element={
            <ProtectedRoute user={user}>
              <CreateListing profileId={user?.profile.id}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
