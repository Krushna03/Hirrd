import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Applayout from './layouts/App-layout'
import LandingPage from './pages/LandingPage'
import Onboarding from './pages/Onboarding'
import JobListing from './pages/JobListing'
import JobPage from './pages/JobPage'
import PostJob from './pages/PostJob'
import SavedJob from './pages/SavedJob'
import MyJobs from './pages/MyJobs'
import { ThemeProvider } from './components/ThemeProvider'
import ProtectedRoute from './components/ProtectedRoute'


const router = createBrowserRouter([
   {
     element: <Applayout />,
     children: [
        {
           path: '/',
           element: <LandingPage />
        },
        {
          path: '/onboarding',
          element: (
            <ProtectedRoute> 
               <Onboarding />
            </ProtectedRoute>
          )
        },
        {
          path: '/jobs',
          element: (
            <ProtectedRoute>  
                <JobListing />
            </ProtectedRoute>
          )
        },
        {
          path: '/jobs/:id',
          element: (
            <ProtectedRoute>
              <JobPage />
            </ProtectedRoute>
          )
        },
        {
          path: '/post-job',
          element: (
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          )
        },
        {
          path: '/saved-jobs',
          element: (
            <ProtectedRoute>
              <SavedJob />
            </ProtectedRoute>
          )
        },
        {
          path: '/my-jobs',
          element: (
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          )
        }
     ]
   }
])

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
