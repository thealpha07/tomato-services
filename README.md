## Docker and Kubernetes stack Microservices Repo

The monolith is broken into multiple services and linked together. Why? Basically to solve the 'It works on my machine' and also to ease scaling up/down as needed.

#### Structure

The three folders are broken into below services,
```
tomato/ 
	├── api-gateway/  	#port:4000
	├── food-service/ 	#port:4001
	├── user-service/	#port:4003
	├── cart-service/	#port:4005
	├── order-service/	#port:4006
	├── frontend/	  	#port:4002
	├── admin/			#port:4007

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

Unified initially planned Auth and User Service into one. Similarly unified the Orders and Payment Services.
