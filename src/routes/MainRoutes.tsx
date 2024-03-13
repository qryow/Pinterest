import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AddPage from '../pages/AddPage'
import OnePinPage from '../pages/OnePinPage'
import ProfilePage from '../pages/ProfilePage'
import OneDescPage from '../pages/OneDescPage'
import OneSectionPage from '../pages/OneSectionPage'
import NotFoundPage from '../pages/NotFoundPage'
import WelcomePage from '../pages/WelcomePage'

const MainRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<WelcomePage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/*' element={<NotFoundPage />} />
      <Route path='/create' element={<AddPage />} />
      <Route path='/pin/:id' element={<OnePinPage />} />
      <Route path='/user/:username/' element={<ProfilePage />} />
      <Route path='/user/:username/created' element={<ProfilePage />} />
      <Route path='/user/:username/saved' element={<ProfilePage />} />
      <Route path='/user/:username/:id/' element={<OneDescPage />} />
      <Route path='/user/:username/:id/:sectionId/' element={<OneSectionPage />} />
    </Routes>
  )
}

export default MainRoutes