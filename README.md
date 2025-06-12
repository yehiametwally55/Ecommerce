
# Full-Stack eCommerce Platform

A feature-rich, modern eCommerce web application built from the ground up, featuring a dynamic Angular frontend and a robust NodeJS backend API powered by Express and MongoDB.

## Project Summary

This project is a comprehensive full-stack solution designed to simulate a real-world online shopping experience. Users can browse a dynamic product catalog, manage their shopping cart, and navigate a complete browsing and purchasing workflow. The backend provides a powerful RESTful API to manage products, users, carts, and orders, with a focus on efficiency and scalability.

This application was developed as a major personal project to showcase skills in modern frontend frameworks, backend API development, and database management.

## Key Features
### Login Page
![Screenshot 2025-06-02 173055](https://github.com/user-attachments/assets/5fc99463-0b4e-4f87-b67a-5c836e97ae16)
### Home Page
![Screenshot 2025-06-02 171729](https://github.com/user-attachments/assets/8a830d3c-fee9-47ff-98ca-3278edf00e4b)
### Products
![Screenshot 2025-06-02 171757](https://github.com/user-attachments/assets/f63bd688-0b78-42dc-92a7-8215fc9563ef)
### (pagination) Show More products
![Screenshot 2025-06-02 171809](https://github.com/user-attachments/assets/77507f69-65b8-4dec-bc60-42b1bf6812b5)
### Orders page
![Screenshot 2025-06-02 171929](https://github.com/user-attachments/assets/cadd2de9-9d4c-407c-bd72-b1c402a3556a)
### Cart Page
![Screenshot 2025-06-02 171900](https://github.com/user-attachments/assets/dd003395-b361-4ab1-b10e-a47beebe3cbe)
### Frontend (Angular)

* **Dynamic Product Catalog:** Browse products fetched from the backend, complete with images, descriptions, pricing, and ratings.
* **Client-Side Search:** Instantly filter the product list on the current page.
* **"Show More" / "Show Less" Functionality:** Efficiently browse large sets of products without overwhelming the user.
* **Product Details Page:** View detailed information for each product by navigating to a dedicated route.
* **Shopping Cart:**
    * Add products to the cart.
    * Update item quantities.
    * Remove individual items.
    * Clear the entire cart.
* **User Authentication:** Secure routes and functionality based on user login status.
* **Responsive Design:** A clean and modern UI that works seamlessly on desktop and mobile devices.

### Backend (NodeJS / Express)

* **RESTful API:** A well-structured API for managing all application resources.
* **MongoDB Integration:** Uses Mongoose for elegant object data modeling and interaction with a MongoDB database.
* **Advanced API Features:** Includes backend-driven pagination, searching, filtering, and sorting for product queries.
* **User & Cart Management:** Handles user authentication, cart creation, and modifications securely.
* **Centralized Error Handling:** A global error handler provides consistent and informative error responses.
* **Environment Management:** Configuration managed for development and production environments.

## Technology Stack

* **Frontend:** Angular, TypeScript, HTML5, CSS3/SCSS, Bootstrap
* **Backend:** NodeJS, Express.js
* **Database:** MongoDB (with Mongoose)
* **Authentication:** JWT (JSON Web Tokens)
* **API Testing:** Postman (or your preferred tool)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js and npm must be installed on your machine.
* Angular CLI (`@angular/cli`) must be installed globally (`npm install -g @angular/cli`).
* A running instance of MongoDB is required.

### Installation & Launch

1.  **Clone the Repository**
    ```sh
    git clone (https://github.com/yehiametwally55/Ecommerce.git)
    ```

2.  **Setup the Backend**
    ```sh
    # Navigate to the backend folder
    cd path/to/e-commerce-Backend

    # Install dependencies
    npm install

    # Create a .env file and add your configuration (MONGO_URI, JWT_SECRET, PORT, etc.)

    # Start the backend server
    npm start
    ```

3.  **Setup the Frontend**
    ```sh
    # Navigate to the frontend folder
    cd path/to/Ecommerce

    # Install dependencies
    npm install

    # Launch the Angular development server
    ng serve
    ```

4.  **View the Application**

    Open your browser and navigate to `http://localhost:4200`. The Angular application should now be running and communicating with your local backend API.
