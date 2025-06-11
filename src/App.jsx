import { Routes, Route } from 'react-router-dom';
import PersistLogin from './components/helpers/PersistLogin';
import RequireAuth from './components/helpers/RequireAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/helpers/Layout';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Routes>
     <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
            <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
              <Route path="admin" element={<div>Admin Page</div>} />
          </Route>
      </Route>
      </Route>
    </Routes>
  );
}

export default App;
