import { useState } from 'react';
import { CartProvider } from './store/CartContext';
import { Header } from './components/Header';
import { ProductPanel } from './components/ProductPanel';
import { CartPanel } from './components/CartPanel';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Header onToggleCart={() => setIsCartOpen((prev) => !prev)} />
      <ProductPanel />
      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </CartProvider>
  );
}

export default App;
