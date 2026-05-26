# Architecture Diagram

```mermaid
graph TD
    %% Clients
    Client_Frontend[Frontend App (React/Vite)]
    Client_Admin[Admin App (React/Vite)]

    %% Gateway
    Gateway[API Gateway :4000]

    %% Backend Services
    FoodService[Food Service :4001]
    UserService[User Service :4003]
    CartService[Cart Service :4005]
    OrderService[Order Service :4006]
    LegacyMonolith[Legacy Monolith :4002]

    %% Databases
    DB_Food[(MongoDB: food-db)]
    DB_User[(MongoDB: user-db)]
    DB_Cart[(MongoDB: cart-db)]
    DB_Order[(MongoDB: order-db)]

    %% External
    Stripe[Stripe API]

    %% Connections
    Client_Frontend -->|HTTP/REST| Gateway
    Client_Admin -->|HTTP/REST| Gateway

    Gateway -->|/api/food & /images| FoodService
    Gateway -->|/api/user| UserService
    Gateway -->|/api/cart| CartService
    Gateway -->|/api/order| OrderService
    Gateway -->|/api (catch-all)| LegacyMonolith

    FoodService --> DB_Food
    UserService --> DB_User
    CartService --> DB_Cart
    OrderService --> DB_Order

    OrderService --> Stripe
```
