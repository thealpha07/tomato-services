# Project Learnings & Architectural Decisions

This document tracks the bugs encountered, solutions implemented, and the reasoning behind major architectural choices across the Tomato Services platform.

## 1. Navbar Hash Routing Bug
**Problem**: Clicking on Navbar links (e.g., "Menu", "Mobile App") while on secondary pages like `/cart` or `/myorders` would append the hash locally to the current path (e.g., `/cart#explore-menu`). This caused the page to silently fail instead of navigating to the Home section.
**Solution**: Updated the `href` attributes in `Navbar.jsx` to use absolute root paths (`/#explore-menu`, `/#app-download`, `/#footer`). This forces the React Router to navigate back to the root path before jumping to the designated section hash.

## 2. View Menu Button Retaining Filters
**Problem**: In the Hero section (`Header.jsx`), clicking the "View Menu" button simply scrolled the user down to the `#explore-menu` div. However, if the user had an active search query or a category selected from a previous interaction, the menu would appear filtered or completely empty.
**Solution**: Passed the `setCategory` state setter down from `Home.jsx` to `Header.jsx`. Attached an `onClick` event to the View Menu button that explicitly calls `setCategory("All")` and clears the global `searchQuery` via the `StoreContext`.

## 3. Fuzzy Search Integration
**Problem**: The custom-built search in `FoodDisplay.jsx` used strict `String.includes()` matching. This frustrated users, as minor typos (e.g., "Saldd" instead of "Salad") would result in zero menu items being found.
**Solution**: Replaced the native string matching with **Fuse.js**, a lightweight fuzzy-search library. It algorithmically calculates string proximity (Levenshtein distance), providing built-in typo tolerance while maintaining high performance on the client side.

## 4. Asynchronous Microservice Communication (Order to Cart)
**Problem (Architectural Bottleneck)**: When a Stripe payment is verified by the `order-service`, the user's shopping cart must be emptied. The `order-service` had no reliable way to communicate this to the `cart-service`. If we used a synchronous HTTP call (e.g., `axios.post`), the checkout flow would break if the `cart-service` was temporarily down. It also created tight coupling between the two microservices.
**Solution (Event-Driven Architecture)**: We introduced **Apache Kafka** and Zookeeper into the Kubernetes cluster.
**Reasoning**: This decoupled event-driven model ensures massive resilience. If the `cart-service` crashes during checkout, the `order-service` doesn't care; it simply publishes the event and moves on. Once the `cart-service` reboots, it processes the backlog from Kafka and clears the carts retroactively.

## 5. Split Hosting vs. Monolithic Deployment (Production Architecture)
**Problem**: We needed a way to deploy the application to production so that it is available 24/7 without running the local `kind` cluster on the development machine.
**Solution (Split Hosting)**: We decided on a "Split Hosting" architecture instead of hosting everything in a single massive server.
- **Frontend (Vercel/Netlify)**: The React apps (User Frontend & Admin Panel) will be hosted on serverless CDNs. This is because Vercel excels at serving static React files globally with zero-latency Edge caching, and is completely free.
- **Backend (Cloud Kubernetes)**: The Node.js microservices, MongoDB, and Kafka clusters will be hosted in a Cloud Kubernetes cluster (or PaaS). Traffic from the Vercel frontend is securely routed to the Kubernetes cluster via a public **LoadBalancer** or **Ingress Controller**.
**Reasoning**: Decoupling the frontend hosting from the backend hosting allows each layer to scale independently. It significantly reduces backend server costs (as the backend no longer has to serve heavy JS/CSS/Image bundles) and drastically improves the page-load speeds for end users.
