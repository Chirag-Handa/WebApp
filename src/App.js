import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Department} from './Department';
import {Student} from './Student';
import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        Student Web Application
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/department">
              Department
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/student">
              Student
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/department' element={<Department/>}/>
        <Route path='/student' element={<Student/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;