import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Router from './routes';
import { GlobalStyles } from './styles/global';

const App = () => (
  <>
    <GlobalStyles />
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
  </>
);

export default App;
