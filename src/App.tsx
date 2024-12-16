import MainLayout from "./layout/MainLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <MainLayout></MainLayout>
      <ToastContainer />
    </div>
  );
}

export default App;
