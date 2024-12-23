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
};

const MenuItem: React.FC<MenuItemProps> = ({ category, onClick }) => {
  const [isCollapsed, setCollapsed] = useState(false);

  function handleCollapse(event: React.MouseEvent) {
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
    () => new Map<Product["id"], CarItem>()
  );

  // Nuevos estados para filtros
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [sortByStock, setSortByStock] = useState(false);

  function handleDecrement(product: Product) {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      const item = newCart.get(product.id);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          newCart.set(product.id, item);
        } else {
          newCart.delete(product.id);
        }
      }

      return newCart;
    });
  }

  function handleIncrement(product: Product) {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      const item = newCart.get(product.id);

      if (!item) {
        newCart.set(product.id, {
          quantity: 1,
          product,
        });
      } else {
        item.quantity += 1;
        newCart.set(product.id, item);
      }

      return newCart;
    });
  }

  // Filtrado con disponibilidad, rango de precios y orden por stock
  const matches = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory = selectedCategory ? product.sublevel_id === selectedCategory.id : true;
      const matchesAvailability = availabilityFilter === null || product.available === availabilityFilter;
      const productPrice = Number(product.price.replace(/[^0-9.-]+/g, "")); // Convertir el precio a número

      const matchesPrice =
        priceRange === null ||
        (productPrice >= priceRange[0] && productPrice <= priceRange[1]);

      return matchesCategory && matchesAvailability && matchesPrice;
    });

    // Ordenar por cantidad de stock si está activado
    if (sortByStock) {
      filtered = filtered.sort((a, b) => a.quantity - b.quantity);
    }

    return filtered;
  }, [selectedCategory, availabilityFilter, priceRange, sortByStock]);

  function handleCategoryClick(category: Category | null) {
    setSelectedCategory(category);
  }

  return (
    <div>
      <Menu
        categories={categoriesData.categories}
        onClick={handleCategoryClick}
      />
      {selectedCategory && <p>Categoría seleccionada: {selectedCategory.name}</p>}

      {/* Controles de filtro */}
      <div>
        <label>
          Disponibilidad:
          <select onChange={(e) => setAvailabilityFilter(e.target.value === "null" ? null : e.target.value === "true")}>
            <option value="null">Todos</option>
            <option value="true">Disponible</option>
            <option value="false">No disponible</option>
          </select>
        </label>

        <label>
          Rango de precios:
          <select onChange={(e) => {
            const value = e.target.value;
            if (value === "null") setPriceRange(null); // Resetear a "Todos"
            else if (value === "0-3000") setPriceRange([0, 3000]);
            else if (value === "3000-8000") setPriceRange([3000, 8000]);
            else if (value === "8000-19000") setPriceRange([8000, 19000]);
            else setPriceRange(null); // Caso para "Todos"
          }}>
            <option value="null">Todos</option>
            <option value="0-3000">$0 - $3000</option>
            <option value="3000-8000">$3000 - $8000</option>
            <option value="8000-19000">$8000 - $19000</option>
          </select>
        </label>

        <label>
          Ordenar por stock:
          <input
            type="checkbox"
            checked={sortByStock}
            onChange={() => setSortByStock(!sortByStock)}
          />
        </label>
      </div>

      {/* Productos filtrados */}
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
              <button onClick={() => handleDecrement(product)}>-</button>
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
