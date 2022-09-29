const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const { addTopping,
        getTopping, } = require("./handlers")
const port = 8000
express()
    .use(helmet())
    .use(morgan('tiny'))
    .use(express.json())
    
    //Admin Post
    .post("/admin/add-topping", addTopping)




    .get("/get-topping/:toppingName?", getTopping)








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