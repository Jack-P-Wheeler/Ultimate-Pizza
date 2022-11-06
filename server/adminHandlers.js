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

        checkExistsOrClose = await db.collection("toppings").findOne({name: name.toLowerCase()})
        if (!checkExistsOrClose) {
            await db.collection("toppings").insertOne({_id: uuidv4(), name: name.toLowerCase(), title: name, price: Number(price), isSpicy, isVegan, isGlutenFree})
            res.status(200).json({
                status: 200,
                message: "Topping added"
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "Topping already exists or is close to a current name",
                data: req.body
            })
        }
        
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

const newPremadePizza = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)
    try {
        const {name, toppings} = req.body
        await client.connect()
        const db = client.db("Ultimate-Pizza")

        existsAlready = await db.collection("pizzas").findOne({name: name.toLowerCase()})
        if (!existsAlready) {
            await db.collection("pizzas").insertOne({_id: uuidv4(), title: name, name: name.toLowerCase(), toppings})
            res.status(200).json({
                status: 200,
                message: "Pizza added"
            })
        } else {
            res.status(400).json({
                status: 400,
                message: "Pizza with that name already exists",
                data: req.body
            })
        }
        
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
    newPremadePizza,
};  