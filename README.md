# Front Developer Challenge

La tienda **"EL BARATÓN"** necesita un e-commerce para expandir sus servicios. Para ello, Don Pepe (propietario de la tienda) ha provisto los siguientes requerimientos:  

## Requerimientos

### 1. Menú de categorías y subniveles anidados
- La tienda debe mostrar categorías conformadas por subniveles. Estos subniveles, a su vez, pueden tener más subniveles anidados.  
- Se debe implementar un menú donde las categorías y subniveles se presenten de forma jerárquica.  
  **Ejemplo:**  
  - Categoría: Licores  
    - Subnivel: Vinos  
      - Subnivel: Vinos tintos  
      - Subnivel: Vinos blancos  

### 2. Asignación de productos a subniveles
- Los productos tienen un identificador principal y un identificador de subnivel, lo que significa que un producto solo debe mostrarse en el subnivel correspondiente.  

### 3. Filtros de productos
- Los productos deben poder filtrarse por:  
  - **Disponibilidad**  
  - **Rango de precios**  
  - **Cantidad de stock**  

### 4. Ordenamiento de productos
- Los productos deben poder ordenarse por:  
  - **Precio**  
  - **Disponibilidad**  
  - **Cantidad de stock**  

### 5. Carrito de compras
- Implementar un carrito de compras donde los usuarios puedan:  
  - Agregar productos  
  - Editar la cantidad de productos  
  - Eliminar productos  
- Los productos deben permanecer en el carrito si el usuario cierra y vuelve a abrir la página. Solo deben borrarse si el usuario realiza la compra.  

### 6. Búsqueda en subniveles finales
- Un **subnivel final** es aquel que no tiene más subniveles.  
- En este caso, debe aparecer un cuadro de texto que permita realizar búsquedas de productos por nombre en dichos subniveles.  

### 7. E-commerce responsive
- El diseño del e-commerce debe ser **totalmente adaptable** a diferentes tamaños de pantalla.  

### 8. Archivos de datos
- Los datos de la tienda se encuentran en dos archivos: `categorias.json` y `productos.json`.  
- Se pueden modificar los datos de estos archivos sin cambiar su estructura.  

---

## Requerimientos adicionales

- Es **indispensable** el uso de **JavaScript**.  
- Puedes escoger cualquier framework basado en JavaScript o Node.js.  
- Incluir un archivo `README` con los pasos necesarios para compilar el proyecto y, opcionalmente, agregar información adicional sobre la resolución de problemas.  
- Manejar el proyecto con **Git** y subirlo a un repositorio en **GitHub**.  

---

