import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'

export const AppRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route index path="/create" element={<CreatePage />} />
                <Route path="/links" element={<LinksPage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" exact element={<AuthPage />} />
        </Routes>
    )
}