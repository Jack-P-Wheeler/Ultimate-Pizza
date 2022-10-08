import styled from "styled-components"
import { UserContext } from "./UserContext"
import { useContext } from "react"

const Cart = ({pizzas, toppings}) => {
    const {cart} = useContext(UserContext)

    const firstCapital = (origStr) => {
        return origStr.split(" ").map(str => str[0].toUpperCase() + str.substring(1, str.length)).join(" ")
    }

    const customPrice = (toppingsList) => {
        console.log(toppingsList)
        return "Not done yet"
    }

    return (
        <Wrapper>
            <CartItems>
                {cart.map((item, index) => <CartItem key={item.pizzaName + item.price + index}>
                        <CartItemName>{firstCapital(item.size + " " + item.pizzaName)}</CartItemName>
                        {item.pizzaName !== "Custom Job" && <CartItemPrice>{"$" + (pizzas.find((pizza) => pizza.name === item.pizzaName).prices[item.size]).toFixed(2)}</CartItemPrice>}
                        {item.pizzaName === "Custom Job" && <CartItemPrice>{"$" + customPrice(item.pizzaToppings)}</CartItemPrice>}
                    </CartItem>)}
            </CartItems>
            
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 10vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    background: white;
    overflow: auto;
`
const CartItems = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 100%;
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

export default Cart