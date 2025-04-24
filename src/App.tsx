import './App.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import LoginLayout from "./components/LoginLayout.tsx";
import {SignIn} from "./pages/SignIn.tsx";
import RootLayout from "./components/RootLayout.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {HistoryPage} from "./pages/HistoryPage.tsx";
import {ReviewPage} from "./pages/ReviewPage.tsx";
import {SignUp} from "./pages/SignUp.tsx";
function App() {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <LoginLayout/>,
            children: [
                {index: true, element: <Navigate to="signin" replace/>},
                {path: "signin", element: <SignIn/>},
                {path: "signup", element: <SignUp/>},
            ],
        },
        {
            path: "/app",
            element: <RootLayout />,
            children: [
                { path: "home", element: <HomePage /> },
                { path: "history", element: <HistoryPage /> },
                { path: "review", element: <ReviewPage /> },

            ],
        },
    ]);

  return (
    <>
        <>
            <RouterProvider router={routes}/>
        </>
    </>
  )
}

export default App
