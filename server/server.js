const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const { addTopping,
        getTopping,
        newPremadePizza,
        getPizzas,
        getUser,
        newUser, 
        getTravelTime,
        updateAddress,
        sendOrder,
        getOrders,
        getOpinionOrders, } = require("./handlers")
const port = 8000
express()
    .use(helmet())
    .use(morgan('tiny'))
    .use(express.json())
    
    //Admin
    .post("/admin/add-topping", addTopping)
    .post("/admin/post-new-pizza", newPremadePizza)




    .get("/get-topping/:toppingName?", getTopping)
    .get("/get-pizzas", getPizzas)
    .get("/get-user/:userEmail", getUser)
    .post("/new-user", newUser)

    .get("/get-travel-time/:origin/:destination", getTravelTime)
    .patch("/update-address", updateAddress)
    .post("/send-order", sendOrder)
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