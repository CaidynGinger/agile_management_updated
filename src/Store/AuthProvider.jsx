import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState({});

  const navigate = useNavigate()

  if (Auth.accessToken && Auth.login) {
    const options = {
      method: 'GET',
      url: 'http://localhost/php_rest_agile_management/api/getUser.php',
      headers: {
        Authorization: 'Bearer ' + Auth.accessToken
      }
    };
    
    axios.request(options).then(function (response) {
      setAuth(prevState => {
        return {...prevState,
        login: false,
        user: {...response.data.user, 
        roles: JSON.parse(response.data.user.roles) }
        }
      })
      navigate('/')
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <AuthContext.Provider value={{ Auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
