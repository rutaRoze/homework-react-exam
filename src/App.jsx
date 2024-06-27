import './App.css';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './components/errorpage/ErrorPage.jsx';
import NavBar from './components/NavBar.jsx';
import HomePage from './components/homepage/HomePage.jsx';
import LoginPage from './components/loginpage/LoginPage.jsx';
import { AuthProvider } from './components/authentication/AuthContext.jsx';
import RegistrationPage from './components/registrationpage/RegistrationPage.jsx';
import CategoryPage from './components/categorypage/CategoryPage.jsx';
import BookPage from './components/bookmanagepage/BookPage.jsx';
import BookDetailsPage from './components/bookdetailspage/BookDatailsPage.jsx';
import BookUpdate from './components/bookmanagepage/BookUpdate.jsx';
import UserBookPage from './components/userbookpage/UserBookPage.jsx';

function App() {
  return (
    <>
      <NavBar />
      <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/details/:id" element={<BookDetailsPage />} />
        <Route path="/update/:id" element={<BookUpdate />} />
        <Route path="/booksforusers" element={<UserBookPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
