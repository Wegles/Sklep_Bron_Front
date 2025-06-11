import { Routes, Route } from 'react-router-dom';
import PersistLogin from './components/helpers/PersistLogin';
import RequireAuth from './components/helpers/RequireAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/helpers/Layout';
import HomePage from './pages/HomePage';
import MissingPage from './pages/MissingPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import AdminPage from './pages/AdminPage';
import CartPage from './components/Cart/Cart';

const App = () => {
  return (
    <Routes>
     <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />} >
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<MissingPage />} />
          <Route path="unauthorized" element={<UnauthorizedPage/>} />
          <Route element={<RequireAuth allowedRoles={['USER', 'ADMIN']} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
      </Route>
      </Route>
    </Routes>
  );
}

export default App;
