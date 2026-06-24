import { useState } from "react";
import "./App.css";

function App() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 2999,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 4999,
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: 1499,
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      price: 3499,
    },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exist = cart.find(
      (item) => item.id === product.id
    );

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(
      cart.filter((item) => item.id !== id)
    );
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h1>Mini E-Commerce Cart</h1>

      <div className="layout">
        <div className="products">
          <h2>Products</h2>

          {products.map((product) => (
            <div className="card" key={product.id}>
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>

              <button
                onClick={() =>
                  addToCart(product)
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="cart">
          <h2>Cart</h2>

          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  className="cart-item"
                  key={item.id}
                >
                  <div>
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                  </div>

                  <div className="buttons">
                    <button
                      onClick={() =>
                        decreaseQty(item.id)
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(item.id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}

              <h2>Total: ₹{total}</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
