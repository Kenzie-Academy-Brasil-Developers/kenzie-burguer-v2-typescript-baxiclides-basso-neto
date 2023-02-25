import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import UserProvider from './providers/UserContext';
import Router from './routes';
import { GlobalStyles } from './styles/global';

const App = () => (
  <>
    <GlobalStyles />
    <UserProvider>
    <Router />
    <ToastContainer
      position='top-center'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
    </UserProvider>
  </>
);

export default App;
