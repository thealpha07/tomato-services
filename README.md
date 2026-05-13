## Docker and Kubernetes stack Microservices Repo

The monolith is broken into multiple services and linked together. Why? Basically to solve the 'It works on my machine' and also to ease scaling up/down as needed.

#### Structure

The three folders are broken into below services,
```
tomato/ 
	├── api-gateway/ 
	├── food-service/
	├── auth-service/
	├── user-service/
	├── cart-service/
	├── order-service/
	├── payment-service/
	├── frontend/
	├── admin/

```
Ignoring other non-tech files.

The gateway will be acting as the bridge/router between different services. FYI, '-service' are all containers basically built with Node.js while the frontend and admin are Nginx (turns out it is pronounced In-gin-X, I used to call it ni-gi-nix lol).



Each Services will have the similar structure as example
```
food-service/
├── config/
│   └── db.js
├── controllers/
│   └── foodController.js
├── routes/
│   └── foodRoute.js
├── models/
│   └── foodModel.js
├── middleware/
│   └── uploadMiddleware.js
├── uploads/              
├── .env
├── server.js
├── package.json
```
