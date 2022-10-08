const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const request = require('request-promise');

require("dotenv").config();
const { MONGO_URI, GOOGLE_API_KEY } = process.env
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

const getPizzas = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)
    try {
        await client.connect()
        const db = client.db("Ultimate-Pizza")
        const pizzas = await db.collection("pizzas").find().toArray()
        const toppings = await db.collection("toppings").find().toArray()
        const storeInfo = await db.collection("store-info").findOne({_id: "prices"})
        console.log(storeInfo)
        const newPizzas = pizzas.map((pizza) => {
            let price = 0
            pizza.toppings.forEach((topping) => {
                const isHalf = topping.half === "whole" ? 1 : 2
                price += toppings.find(toppingInList => toppingInList.name === topping.name).price / isHalf
            })
            return {name: pizza.name, toppings: pizza.toppings, prices: {small: price * 0.75 + 10, medium: price * 1 + 13, large: price * 1.25 + 17}}
        })
        res.status(200).json({
            status: 200,
            message: newPizzas
        })        
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Error retrieving pizzas " + err.message
        })
    } finally {
        await client.close()
    }   
}

const getUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const userEmail = req.params.userEmail;

    try {
        await client.connect();
        const db = client.db("Ultimate-Pizza");
        const data = await db.collection("users").findOne({ email: userEmail });

        res.status(200).json({
            status: 200,
            result: data,
            message: "cart found",
        });
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
};

const newUser = async (req, res) => {
    const newUser = req.body;
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("Ultimate-Pizza");
        const data = await db.collection("users").insertOne(newUser);

        res.status(200).json({
            status: 200,
            message: "New user added",
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            data: req.body,
            message: "Error adding new user",
        });
        console.log(error);
    } finally {
        client.close();
    }
};

const getTravelTime = async(req, res) => {
    const {origin, destination} = req.params
    try {
        const travelTime = await request("https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&key=" + GOOGLE_API_KEY)
        res.status(200).json({
            status: 200,
            data: JSON.parse(travelTime).routes[0].legs[0].duration.value,
            message: "Found travel time"
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            data: req,
            message: "Failed to find time between store and address."

        })
    }
}

module.exports = {
    addTopping,
    getTopping,
    newPremadePizza,
    getPizzas,
    getUser,
    newUser,
    getTravelTime,
};  