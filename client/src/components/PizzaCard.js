import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const PizzaCard = ({name, toppings, price}) => {
    const { setCart, cart } = useContext(UserContext)
    const firstCapital = (origStr) => {
        return origStr.split(" ").map(str => str[0].toUpperCase() + str.substring(1, str.length)).join(" ")
    }
    const addToCart = (pizzaName, size) => {
        
        //const currentCart =  localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
        //localStorage.setItem("cart", JSON.stringify([...currentCart, {pizzaName, size}]))
        setCart([...cart, {pizzaName, size}])
    }
    return (
        <Wrapper>
            <PizzaName>{firstCapital(name)}</PizzaName>
            <ToppingList>
                {toppings.map(topping => <PizzaTopping key={topping.name}>{firstCapital(topping.name)}</PizzaTopping>)}
            </ToppingList>
            
            <SizeSelectorList>
                <SizeSelect onClick={(ev) => addToCart(name, "small")}>S</SizeSelect>
                <SizeSelect onClick={(ev) => addToCart(name, "medium")}>M</SizeSelect>
                <SizeSelect onClick={(ev) => addToCart(name, "large")}>L</SizeSelect>
            </SizeSelectorList>
            
        </Wrapper>
        
    )    
}

const Wrapper = styled.div`
    height: 250px;
    width: 250px;
    background: var(--color-tertiary);
    border-radius: 20px;
    padding: 15px;
    box-shadow: 0 5px 10px hsla(0, 100%, 0%, 0.5);
    margin: 10px;
    text-align: left;
    display: flex;
    flex-direction: column;
    border: none;
    transition: 100ms all;

    &:hover{
        box-shadow: 5px 10px 10px hsla(0, 100%, 0%, 0.5);
    }
    
`
const PizzaName = styled.p`
    font-size: 30px;
    margin-bottom: 10px;
    color: black;
    font-weight: bold;
    color: white;
`
const ToppingList = styled.div`
`
const PizzaTopping = styled.p`
    font-size: 20px;
    color: black;
    color: white;
`
const SizeSelectorList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: auto;
    justify-content: space-around;
`
const SizeSelect = styled.button`
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    font-weight: bold;
    background: rgb(247,227,178);

    &:active{
        transform: scale(0.9);
    }
`

export default PizzaCard