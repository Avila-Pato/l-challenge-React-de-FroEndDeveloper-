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
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>
              {product.name} ({product.price}){" "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
