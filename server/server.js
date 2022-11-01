const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const port = 8000

const { getTopping,
        getPizzas,
        getUser,
        newUser, 
        getTravelTime,
        updateAddress,
        sendOrder,
        getOrders,
        getOpinionOrders, } = require("./handlers")

const { addTopping,
        newPremadePizza, } = require("./adminHandlers")





express()
    .use(helmet())
    .use(morgan('tiny'))
    .use(express.json())
    
    //Admin
    .post("/admin/add-topping", addTopping)
    .post("/admin/post-new-pizza", newPremadePizza)

    //Utility functions to get Toppings and Pizzas
    .get("/get-topping/:toppingName?", getTopping)
    .get("/get-pizzas", getPizzas)
    
    //Getting and creating a user during the login process
    .get("/get-user/:userEmail", getUser)
    .post("/new-user", newUser)

    //Address handling for accounts
    .get("/get-travel-time/:origin/:destination", getTravelTime)
    .patch("/update-address", updateAddress)

    //Posting an order from the front-end cart to the server
    .post("/send-order", sendOrder)

    //Getting past orders and the opion orders of an account
    .get("/get-orders/:userEmail", getOrders)
    .get("/get-opinion-orders/:userEmail", getOpinionOrders)




    //Misc. Handlers
    .get("*", (req, res) => {
        res.status(404).json({
            status: 404,
            message: "Page not found"
        })
    })



    .listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })