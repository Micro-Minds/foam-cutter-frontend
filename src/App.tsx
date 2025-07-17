import './App.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";                                                               //routing features
import LoginLayout from "./components/LoginLayout.tsx";
import {SignIn} from "./pages/SignIn.tsx";
import RootLayout from "./components/RootLayout.tsx";
import {HomePage } from "./pages/HomePage"; 
import {LibraryPage} from "./pages/LibraryPage.tsx";
import {AboutPage} from "./pages/AboutPage.tsx";
import {ReviewPage} from "./pages/ReviewPage.tsx";
import {SignUp} from "./pages/SignUp.tsx";

function App() {
    const routes = createBrowserRouter([
        {
            path: "/",                                                                         // when user vists / or base URL
            element: <LoginLayout/>,            
            children: [
                {index: true, element: <Navigate to="signin" replace/>},                      // when user vists / or base URL redirect to /signin
                {path: "signin", element: <SignIn/>},                                         // when user vists /signin or base URL redirect to /signin
                {path: "signup", element: <SignUp/>},
            ],
        },
        {
            path: "/app",                                                                     //when URL starts with /app (after signing in, redirect to /app)
            element: <RootLayout />,                                                          //use RootLayout 
            children: [
                {index: true, element: <Navigate to="home" replace/>},                        //if URL is /app, render HomePage
                { path: "home", element: <HomePage /> },                                      //if URL is /app/home, render HomePage (including navbar and footer)
                { path: "library", element: <LibraryPage /> },  
                { path: "about", element: <AboutPage /> },    
                { path: "review", element: <ReviewPage /> },
            ],
        },
    ]);

  return (
    <>
        <RouterProvider router={routes}/>
    </>
  )
}

export default App

// path means parent URLin childern we re setting the child URL
