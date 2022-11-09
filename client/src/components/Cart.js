import styled from "styled-components"
import { UserContext } from "./UserContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

const Cart = () => {
    const {currentUser, cart, pizzas, toppings, setCart} = useContext(UserContext)
    const navigate = useNavigate()

    const firstCapital = (origStr) => {
        return origStr.split(" ").map(str => str[0].toUpperCase() + str.substring(1, str.length)).join(" ")
    }

    const customPrice = (toppingsList, pizza) => {
        let customPriceTotal = 0
        toppingsList.forEach((topping) => {
            customPriceTotal += toppings.find(toppingDataItem => toppingDataItem.name === topping.toppingName).price / (topping.selectedHalf === "whole" ? 1 : 2)
        })
        customPriceTotal = {small: customPriceTotal * 0.75 + 10, medium: customPriceTotal * 1 + 13, large: customPriceTotal * 1.25 + 17}[pizza.size]
        return customPriceTotal
    }

    const handleOrder = () => {
        if (!currentUser.address){
            navigate("/address")
        } else {
            console.log("Ordered!")
            fetch("/send-order", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "content-Type": "application/json",
                },
                body: JSON.stringify({accountEmail: currentUser.email, cart, timeStamp: Date.now()}),
            })
                .then((res) => res.json())
                .then((data) => {
                    setCart([])
                })
                .catch((error) => {
                    console.error("error", error);
                });
            
        }
    }

    return (
        <Wrapper>
            <OrderButton onClick={(ev) => handleOrder()}>Order</OrderButton>
            <CartItems>
                {cart.map((item, index) => <CartItem key={item.pizzaName + item.price + index}>
                        <CartItemName>{firstCapital(item.size + " " + item.pizzaName)}</CartItemName>
                        {item.pizzaName !== "Custom Job" && <CartItemPrice>{"$" + (pizzas.find((pizza) => pizza.name === item.pizzaName).prices[item.size]).toFixed(2)}</CartItemPrice>}
                        {item.pizzaName === "Custom Job" && <CartItemPrice>{"$" + customPrice(item.pizzaToppings, item).toFixed(2)}</CartItemPrice>}
                        {item.pizzaName === "Custom Job" && item.pizzaToppings.map(topping =><Topping>{firstCapital(topping.toppingName)}</Topping>)}

                    </CartItem>)}
            </CartItems>
            
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: fit-content;
    width: 100%;
    bottom: 0;
    background: white;
    margin-top: 100px;
    display: flex;
    position: sticky;
    bottom: 0;
`
const CartItems = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 100%;
    overflow: auto;
`
const CartItem = styled.div`
    background: var(--color-tertiary);
    margin-left: 10px;
    padding: 15px;
    border-radius: 10px;
    width: 12vw;
`
const CartItemName = styled.p`
    color: white;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
`
const CartItemPrice = styled.p`
    color: white;
    font-size: 20px;
`
const Topping = styled.p`
    color: white;
`
const OrderButton = styled.button`
    background: var(--color-button);
    color: white;
    border: none;
    font-size: 30px;
    bottom: 0;
    border-radius: 10px;
    font-weight: bold;
    transition: all 30ms;
    &:active{
        transform: scale(0.9);
        box-shadow: inset 0 0 10px hsla(0, 100%, 0%, 0.5);
    }
`

export default Cart