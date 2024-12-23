import React, { useMemo, useState } from "react";
import categoriesData from "./data/categories.json";
import { products } from "./data/product.json";

type Category = {
  id: number;
  name: string;
  sublevels?: Category[];
};

type MenuProps = {
  categories: Category[];
  onClick: (category: Category | null) => void;
};

type MenuItemProps = {
  category: Category;
  onClick: (category: Category | null) => void;
};

// Definiendo el tipo de producto para el carrito

type Product = {
  id: string;          
  name: string;         
  quantity: number;     
  price: string;       
  available: boolean;  
  sublevel_id: number;  
};



type CarItem = {
  quantity: number;
  product: Product;
}


const MenuItem: React.FC<MenuItemProps> = ({ category, onClick }) => {
  const [isCollapsed, setCollapsed] = useState(false);

  function handleCollapse(event: React.MouseEvent) {
    // permite que el evento no se propague a diferentes handlers
    // en general va preventdefault pero aqui ahi un 2 handler por ello se usa stopPropagation
    event.stopPropagation();

    if (isCollapsed) {
      onClick(null);
    }
    setCollapsed((isCollapsed) => !isCollapsed);
  }

  return (
    <li>
      <div onClick={() => onClick(category)}>
        <span>{category.name} </span>
        {""}
        {category.sublevels && (
          <button onClick={handleCollapse}>
            {isCollapsed ? "Cerrar" : "Abrir"}
          </button>
        )}
      </div>
      {category.sublevels && isCollapsed && (
        <Menu categories={category.sublevels} onClick={onClick} />
      )}
    </li>
  );
};

const Menu: React.FC<MenuProps> = ({ categories, onClick }) => {
  return (
    <ol>
      {categories.map((category) => (
        <MenuItem key={category.id} category={category} onClick={onClick} />
      ))}
    </ol>
  );
};



function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [cart, setCart] = useState<Map<Product["id"], CarItem>>(
    () => new Map<Product["id"], CarItem>());

  // manejando Handlevents 
  function handleDecrement(product: Product) {
    setCart((prevCart) => {
      const newCart = new Map(prevCart); // Crea una nueva referencia
      const item = newCart.get(product.id);
  
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1; // Decrementa la cantidad
          newCart.set(product.id, item);
        } else {
          newCart.delete(product.id); // Elimina el producto si la cantidad llega a 0
        }
      }
  
      return newCart;
    });
  }
  
  function handleIncrement(product: Product) {
    setCart((prevCart) => {
      const newCart = new Map(prevCart); // Crea una nueva referencia
      const item = newCart.get(product.id);
  
      if (!item) {
        newCart.set(product.id, {
          quantity: 1,
          product,
        });
      } else {
        item.quantity += 1; // Incrementa la cantidad
        newCart.set(product.id, item);
      }
  
      return newCart;
    });
  }
  
  console.log(cart);

  
  // Filtracion de productos
  const matches = useMemo(() => {
    return products.filter((product) => (selectedCategory ? product.sublevel_id === selectedCategory.id : true));
  },[selectedCategory]); // Array de dependencias
  

  function handleCategoryClick(category: Category | null) {
    // console.log('Categoría seleccionada:', category); // Verificar que se selecciona
    setSelectedCategory(category);
  }


  return (
    <div>
      <Menu
        categories={categoriesData.categories}
        onClick={handleCategoryClick}
      />
      {selectedCategory && (
        <p>Categoría seleccionada: {selectedCategory.name}</p>
      )}
      <div>
        {matches.map((product) => (
         <div
         key={product.id}
         style={{
           display: "grid",
           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
           border: "1px solid black",
           margin: "10px",
           padding: "10px",
         }}
       >
         <div style={{ display: "flex", justifyContent: "space-between" }}>
           <span>
             {product.name} ({product.price}) - {product.quantity}
           </span>
         </div>
         <div>
           <button  onClick={() => handleDecrement(product)}>-</button>
           <span>{cart.get(product.id)?.quantity || 0}</span>
           <button onClick={() => handleIncrement(product)}>+</button>
         </div>
       </div>
       
        ))}
      </div>
    </div>
  );
}

export default App;
