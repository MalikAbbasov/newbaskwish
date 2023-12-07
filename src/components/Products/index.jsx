import React, { useEffect, useState } from "react";
import "./product.scss";
function Products() {
  const [product, setProduct] = useState([]);
  const [basket, setBasket] = useState(
    localStorage.getItem("basket")
      ? JSON.parse(localStorage.getItem("basket"))
      : []
  );


  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);



  const removeBasket = (id) => {
    setBasket(basket.filter((x) => x.id !== id));
  };


  const [wishlist, setWishlist] = useState(    localStorage.getItem("wishlist")
  ? JSON.parse(localStorage.getItem("wishlist"))
  : [])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);


  const addWishlist = (x) => {
    setWishlist([...wishlist, x])
}

const removeWishlist = (id) => {
    setWishlist(wishlist.filter((x) => x.id !== id))
}

  const removeAsideBasket = () => {
    document.querySelector(".basket").classList.toggle("active");
  };

  const removeAsideWish = () => {
    document.querySelector(".wishlist").classList.toggle("active");
  };

  function addBasket(item) {
    let elementIndex = basket.findIndex((x) => x.id === item.id);
    console.log(elementIndex);
    if (elementIndex !== -1) {
      const newBasket = [...basket];
      newBasket[elementIndex].count++;
      setBasket(newBasket);
    } else {
      setBasket([...basket, { ...item, count: 1 }]);
    }
  }

  function setCountValue(isAdd, item) {
    let elementIndex = basket.findIndex((x) => x.id === item.id);
    const newBasket = [...basket];

    if (isAdd) {
      newBasket[elementIndex].count++;
      setBasket(newBasket);
    } else {
      if (newBasket[elementIndex].count > 0) {
        newBasket[elementIndex].count--;
        setBasket(newBasket);
      }
    }
  }

  function setCounPrice(isAdd, item) {
    let elementIndex = basket.findIndex((x) => x.id === item.id);
    const newBasket = [...basket];

    if (isAdd) {
      newBasket[elementIndex].price+=item.price;
      setBasket(newBasket);
    } else {
      if (newBasket[elementIndex].count > 0) {
        newBasket[elementIndex].price-=item.price;
        setBasket(newBasket);
      }
    }
  }

  return (
    <div>
      <div id="product_page">
        <div className="container">
          <div className="text">
            <h1>FEATURED PRODUCT</h1>
            <p>Bring called seed first of third give itself now ment</p>
          </div>
          <div className="basket">
            <i onClick={removeAsideBasket} class="fa-solid fa-xmark"></i>

            <div className="basket_card card">
              {basket.map((x) => (
                <ul key={x.id}>
                  <img src={x.image} alt="" />
                  <li className="category">{x.category}</li>
                  <li>{x.price}$</li>
                  <li>{x.count}</li>
                  <button
                    className="btn add"
                    onClick={() => {
                        setCountValue(true, x)
                        setCounPrice(true,x)
                    }}
                  >
                    +
                  </button>
                  <button
                    className="btn del"
                    onClick={() => {
                        setCountValue(false, x)
                        setCounPrice(false,x)
                    }
                }
                  >
                    -
                  </button>
                  <button onClick={() => removeBasket(x.id)}>
                    remove basket
                  </button>
                </ul>
              ))}
            </div>


          </div>

          <div className="wishlist">
            <i onClick={removeAsideWish} className="fa-solid fa-xmark"></i>

            <div className="wishlist_card card">
              {wishlist.map((x) => (
                <ul key={x.id}>
                  <img src={x.image} alt="" />
                  <li className="category">{x.category}</li>
                  <li>{x.price}$</li>
                  <i onClick={() => removeWishlist(x.id)} className="fa-solid fa-thumbs-up removewish">
                  <i className="fa-solid fa-thumbs-down"></i>
                  </i>
                  
                </ul>
              ))}
            </div>


          </div>

          <div className="products">
            {product.map((x) => (
              <ul key={x.id}>
                <img src={x.image} alt="" />
                <li className="category">{x.category}</li>
                <li>{x.price}$</li>
                <div className="buttons">
                  <i class="fa-solid fa-user"></i>
                  <i
                    onClick={() => addBasket(x)}
                    class="fa-solid fa-cart-shopping"
                  ></i>
                  <i onClick={() => addWishlist(x)} class="fa-solid fa-heart"></i>
                </div>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
