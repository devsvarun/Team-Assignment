import '../App.css';
import { AuthProvider } from '../AuthContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './Signup';
import Login from './Login'
import Table from './Table'
import ForgotPassword from './ForgotPassword';
import PrivateRoute from '../PrivateRoute';
function App() {
  return (
    <AuthProvider>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<PrivateRoute/>}>
            <Route path ="/table" element={<Table />} />
          </Route>
          
          
        </Routes>
      </Router>
        
    </div>
    </AuthProvider>
  );
}

export default App;
