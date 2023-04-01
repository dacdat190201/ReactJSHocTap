import { Outlet } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';
import Footer from '../../components/common/footer/Footer';
import { Header } from '../../components/common/heading/Header';
import './App.css';

function App() {
  return (
    <div>
      <CartProvider>
        <Header/>
        <Outlet/>
        <Footer/>
      </CartProvider> 
    </div>
  );
}

export default App;
