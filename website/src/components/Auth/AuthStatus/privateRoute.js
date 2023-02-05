import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthProvider} from "./User";

function PrivateRoute({ children }) {
    const auth = AuthProvider();
    return auth ? children : <Navigate to="/login" />;
  }

  

export default PrivateRoute;
