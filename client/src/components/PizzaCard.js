import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const PizzaCard = ({name, toppings, price}) => {
    const { setCart, cart, currentUser } = useContext(UserContext)
    const { loginWithRedirect } = useAuth0()

    const firstCapital = (origStr) => {
        return origStr.split(" ").map(str => str[0].toUpperCase() + str.substring(1, str.length)).join(" ")
    }
    const addToCart = (pizzaName, size) => {
        if (currentUser) {
            setCart([...cart, {pizzaName, size}])
        } else {
            loginWithRedirect()
        }
    }
    return (
        <Wrapper>
            <PizzaName>{firstCapital(name)}</PizzaName>
            <ToppingList>
                {toppings.map(topping => <PizzaTopping key={topping.name}>{firstCapital(topping.name)}</PizzaTopping>)}
            </ToppingList>
            
            <SizeSelectorList>
                <SizeSelect onClick={(ev) => addToCart(name, "Small")}>S</SizeSelect>
                <SizeSelect onClick={(ev) => addToCart(name, "Medium")}>M</SizeSelect>
                <SizeSelect onClick={(ev) => addToCart(name, "Large")}>L</SizeSelect>
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
        box-shadow: 0 10px 10px hsla(0, 100%, 0%, 0.5);
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