import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Center, ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'

import Home from './pages/home';
import Login from './pages/login';
import PrivateRoute from "./components/PrivateRoute";

import "./App.scss";
import { AuthProvider } from "./context/AuthContext";

import store from './store'
import Users from "./pages/users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Center><h1>This is a sample home page</h1></Center>
      },
      {
        path: "/users",
        element: <PrivateRoute>
          <Users />
        </PrivateRoute>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
]);
function App() {
  return (
    <div className="container">
      <AuthProvider>
        <Provider store={store}>
          <ChakraProvider>

            <RouterProvider router={router} />

          </ChakraProvider>
        </Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
