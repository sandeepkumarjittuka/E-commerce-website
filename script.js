
const products = [
    {
      name: "Running Shoes",
      price: 49.99,
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRzF1LkBosaE01hZgzoslgDUFhjclFUHwmZC7jwioaRSTzGnlJmVszlyDmBA6MaaBhrr4A88Lf5jevxB4Nq0TuFm0HyeqnEZB4gPhbbEKCKUP7zzFoRb2Nm"

    },
    {
      name: "Bluetooth Headphones",
      price: 89.99,
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR9PAbbZ7J5V5J-BmX9fPgnTImp4n2QHa7tfikfjPCQL6z5RZD9svNjPZTnwoLwKyhR1kjAVxZ45jFxAKgaUC4HFPzCcQlc408oTnmA-S3ZMI1Ld_QHaF0upw"
    },
    {
      name: "Smart Watch",
      price: 129.99,
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGg_apXXi3Cu2ju4lBtNyWgKUzwjtBMHGdohv0M9tg7kPSA_OzKEUzeY-_5AIl8B0Imvub5Dkh8YMuAGh7RzSoOIvcRPWcEq0MbFy1XG-aLonVWaCWhWsZ"
    },
    {
      name: "Sports Jacket",
      price: 69.99,
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSsmszvTzvlgPPJJ40Nz_HKXKn-3AagYYdKJeZYrJ4wWx8NbxioDW2b1h-H81JRo_Zr2_k8ukIYYyU4StmojYrHtubm688zxoaXw8q4w29t1Yq45Gghqi12"
    }
  ];
  
  // Global cart array
  let cart = [];
  
  const container = document.getElementById("product-container");
  const searchInput = document.getElementById("searchInput");
  
  // Function to update the cart
  function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
  
    cartItems.innerHTML = ""; // Clear cart items
    let total = 0;
  
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)} 
        <button class="remove-btn" data-index="${index}">❌</button>
        <button class="decrease-qty" data-index="${index}">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="increase-qty" data-index="${index}">+</button>
      `;
      cartItems.appendChild(li);
      total += item.price * item.quantity; // Multiply by quantity
    });
  
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  
    // Handle removal of items
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        cart.splice(index, 1); // Remove the product
        updateCart(); // Re-render the cart
      });
    });
  
    // Handle quantity decrease
    const decreaseButtons = document.querySelectorAll(".decrease-qty");
    decreaseButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (cart[index].quantity > 1) {
          cart[index].quantity--; // Decrease quantity
        } else {
          cart.splice(index, 1); // Remove item if quantity is 1
        }
        updateCart(); // Re-render cart
      });
    });
  
    // Handle quantity increase
    const increaseButtons = document.querySelectorAll(".increase-qty");
    increaseButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        cart[index].quantity++; // Increase quantity
        updateCart(); // Re-render cart
      });
    });
  }
  
  
  
  // Function to display products
  function displayProducts(filteredProducts) {
    container.innerHTML = ""; // Clear previous results
  
    filteredProducts.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
  
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="info">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <button class="add-to-cart">Add to Cart</button>
          <button class="view-details">View Details</button>
        </div>
      `;
  
      // Add event listener for "Add to Cart"
      const addToCartButton = card.querySelector(".add-to-cart");
addToCartButton.addEventListener("click", () => {
  // Check if the product already exists in the cart
  const existingProduct = cart.find(p => p.name === product.name);
  
  if (existingProduct) {
    // If the product is already in the cart, increase the quantity
    existingProduct.quantity++;
  } else {
    // If it's a new product, set the quantity to 1 and add it to the cart
    product.quantity = 1;
    cart.push(product);
  }

  // Update the cart display
  updateCart(); // Recalculate cart and total
});

  
      // Add event listener for "View Details"
      const viewDetailsButton = card.querySelector(".view-details");
      viewDetailsButton.addEventListener("click", () => {
        showProductDetailPopup(product);  // Open the popup
      });
  
      container.appendChild(card);
    });
  }
  
  // Initial display
  displayProducts(products);
  
  // Search filter
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(keyword)
    );
    displayProducts(filtered);
  });

  function showProductDetailPopup(product) {
    // Create the popup
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
      <div class="popup-content">
        <span class="popup-close">&times;</span>
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}" class="popup-image">
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. (Add your actual descriptions here)</p>
      </div>
    `;
    
    document.body.appendChild(popup);
  
    // Close the popup when the "X" is clicked
    const closeButton = popup.querySelector(".popup-close");
    closeButton.addEventListener("click", () => {
      document.body.removeChild(popup);  // Remove the popup
    });
  }
  
  