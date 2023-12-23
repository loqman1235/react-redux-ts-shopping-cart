import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

const App = () => {
  return (
    <main>
      <Navbar />
      <Products />
      <Footer />
      <ToastContainer />
    </main>
  );
};
export default App;
