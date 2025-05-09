import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Search from './pages/Search'
import Favourites from './pages/Favourites'
import SingleGif from './pages/SingleGif'

// homepage
// categories
// search
// single gif
// favourites

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/:category',
        element: <Categories/>
      },
      {
        path: '/search/:query',
        element: <Search/>
      },
      {
        path: '/:type/:slug',
        element: <SingleGif/>
      },
      {
        path: '/favourites',
        element: <Favourites/>
      },
    ]
  }
])

const App = () => {
    return (
      <RouterProvider router={router}/>
    )
}

export default App