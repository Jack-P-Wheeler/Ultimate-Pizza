const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const addTopping = async (req, res) => {
    
    const client = new MongoClient(MONGO_URI, options)
    try {
        const {name, price, isSpicy, isVegan, isGlutenFree} = req.body
        await client.connect()
        const db = client.db("Ultimate-Pizza")

        existsAlready = await db.collection("toppings").findOne({name: name.toLowerCase()})
        if (!existsAlready) {
            await db.collection("toppings").insertOne({_id: uuidv4(), name: name.toLowerCase(), price: Number(price), isSpicy, isVegan, isGlutenFree})
        } else {
            res.status(400).json({
                status: 400,
                message: "Topping already exists",
                data: req.body
            })
        }
        res.status(200).json({
            status: 200,
            message: "Topping added"
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Error posting topping" + err.message,
            data: req.body
        })
    } finally {
        await client.close()
    }
    
}

const getTopping = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)
    try {
        const toppingName = req.params.toppingName

        await client.connect()
        const db = client.db("Ultimate-Pizza")

        if (!toppingName) {
            const toppings = await db.collection("toppings").find().toArray()
            res.status(200).json({
                status: 200,
                message: toppings
            })
        } else {
            const reqTopping = await db.collection("toppings").findOne({name: toppingName.toLowerCase()})

        reqTopping
        ? res.status(200).json({
            status: 200,
            message: reqTopping
        })
        : res.status(400).json({
            status: 400,
            message: "Requested topping does not exist"
        })
        }

        
        
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Error retrieving topping" + err.message
        })
    } finally {
        await client.close()
    }
    
}

const newPremadePizza = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)
    try {
        const {name, toppings} = req.body
        await client.connect()
        const db = client.db("Ultimate-Pizza")

        existsAlready = await db.collection("pizzas").findOne({name: name.toLowerCase()})
        if (!existsAlready) {
            await db.collection("pizzas").insertOne({_id: uuidv4(), name: name.toLowerCase(), toppings})
        } else {
            res.status(400).json({
                status: 400,
                message: "Pizza with that name already exists",
                data: req.body
            })
        }
        res.status(200).json({
            status: 200,
            message: "Pizza added"
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Error posting Pizza" + err.message,
            data: req.body
        })
    } finally {
        await client.close()
    }
}

module.exports = {
    addTopping,
    getTopping,
    newPremadePizza,
};  