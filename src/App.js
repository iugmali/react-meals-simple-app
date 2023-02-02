import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import {useState} from "react";
import Cart from "./components/Cart/Cart";
import {CartContextProvider} from "./store/cart-context";

function App() {
  const [cartIsShown, setCartIsShown] = useState()
  const showCartHandler = () => {
    setCartIsShown(true)
  }
  const hideCartHandler = () => {
    setCartIsShown(false)
  }
  return (
    <CartContextProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
