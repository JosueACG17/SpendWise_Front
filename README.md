# Control de Ingresos y Egresos

## Problemática

Muchas personas tienen dificultades para llevar un control adecuado de sus finanzas personales. La falta de herramientas accesibles y fáciles de usar provoca que los usuarios pierdan el seguimiento de sus ingresos y egresos, lo que puede llevar a una mala gestión del dinero.

## Propósito

Desarrollar una aplicación web para ayudar a las personas a llevar un mejor control acerca de sus ingresos y egresos. Queremos que cualquier usuario se pueda registrar y organizar sus gastos de manera fácil y rápida, sin necesidad de tener conocimientos sobre finanzas ni vincular cuentas bancarias.

## Objetivos

1. Permitir a los usuarios registrar sus ingresos y egresos con categorías.
2. Mostrar un historial de transacciones con fechas y montos.
3. Generar gráficas simples para visualizar los gastos.
4. Crear una interfaz fácil de usar y accesible desde cualquier dispositivo.
5. Permitir la exportación de datos en formato PDF.
6. Implementar filtros para buscar transacciones por categoría, fecha o monto.
7. Exportación de datos: jsPDF para generar archivos PDF.

## Integrantes

- **Josue Antonio Chan Gutierrez** (Líder) - FULLSTACK
- **Carlos Josué Oviedo Cisneros** - FULLSTACK
- **Josias Efrain Kumul Quetzal** – FULLSTACK
- **Bolon Cifuentes Miguel Angel** – FULLSTACK

## Tecnologías y Librerías

### Front-end (Interfaz de Usuario)
- **Vue 3**: Framework progresivo para una experiencia de usuario dinámica y eficiente.
- **Tailwind CSS**: Para el diseño de una interfaz moderna y adaptable a cualquier pantalla.
- **Pinia**: Gestión de estado para optimizar el manejo de datos en la aplicación.
- **Vue Router**: Para la navegación y gestión de rutas dentro de la aplicación.
- **VeeValidate + Yup**: Para la validación de formularios y aseguramiento de datos correctos.
- **Axios**: Para manejar las solicitudes HTTP y la comunicación con la API.
- **SweetAlert2**: Para mostrar alertas y notificaciones interactivas.
- **Chart.js**: Para generar gráficos dinámicos de ingresos y egresos.
- **jsPDF**: Para la exportación de reportes en formato PDF.

## Cómo Correr el Proyecto

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/JosueACG17/SpendWise_Front.git
   ```

2. Instala las dependencias del frontend:
   ```bash
   cd SpendWise_Front
   npm install
   ```

3. Ejecuta el frontend en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Accede a la aplicación desde tu navegador en `http://localhost:5173/` o el puerto donde Vue esté corriendo.

SpendWise_Front
