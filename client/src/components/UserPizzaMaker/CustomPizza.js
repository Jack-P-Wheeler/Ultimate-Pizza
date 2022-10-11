import { useState } from "react"
import styled from "styled-components"
import { useContext } from "react"
import { UserContext } from "../UserContext"
import { useAuth0 } from "@auth0/auth0-react";

const CustomPizza = ({toppings}) => {
    const smallPizza = require("./pizza halves/pizza halves-small.png")
    const mediumPizza = require("./pizza halves/pizza halves-medium.png")
    const largePizza = require("./pizza halves/pizza halves-large.png")

    const { setCart, cart, currentUser } = useContext(UserContext)
    const { loginWithRedirect } = useAuth0()

    const pizzaHalves = {small: smallPizza, medium: mediumPizza, large: largePizza}
    const [size, selectSize] = useState(undefined)
    const [pizzaToppings, setPizzaToppings] = useState([])
    const [selectedHalf, setSelectedHalf] = useState("whole")

    const addTopping = (toppingName) => {
        if (!pizzaIncludesTopping(toppingName) && pizzaToppings.length < 7)
        setPizzaToppings([...pizzaToppings, {toppingName, selectedHalf}])
    }

    const removeTopping = (toppingName) => {
        setPizzaToppings(pizzaToppings.filter(topping => topping.toppingName !== toppingName))
    }

    const pizzaIncludesTopping = (toppingName) => {
        return pizzaToppings.some(toppingObj => toppingObj.toppingName === toppingName)
    }

    const handleSubmit = () => {
        if (pizzaToppings.length){
            setCart([...cart, {pizzaName: "Custom Job", size, pizzaToppings}])
            setPizzaToppings([])
        }

        if (!currentUser) {
            loginWithRedirect()
        }
    }

    return (
        <Wrapper>
            {!size && <SizeSelect>
                <Pizza onClick={(ev) => selectSize("small")}>
                    <img src={smallPizza} alt="Small pizza half"/>
                    <img src={smallPizza} style={{rotate: "180deg"}} alt="Small pizza half"/>
                </Pizza>
                
                <Pizza onClick={(ev) => selectSize("medium")}>
                    <img src={mediumPizza} alt="Small pizza half"/>
                    <img src={mediumPizza} style={{rotate: "180deg"}} alt="Small pizza half"/>
                </Pizza>
                
                <Pizza onClick={(ev) => selectSize("large")}>
                    <img src={largePizza} alt="Small pizza half"/>
                    <img src={largePizza} style={{rotate: "180deg"}} alt="Small pizza half"/>
                </Pizza>
                
            </SizeSelect>}

            {size && <AssemblePizza>

                <SelectedPizza>
                    <SelectedPizzaHalf onClick={(ev) => {selectedHalf === "left" ? setSelectedHalf("whole") : setSelectedHalf("left")}} selected={selectedHalf !== "right" }>
                        <img src={pizzaHalves[size]} style={{ width: "clamp(100px, 6vw, 200px"}} alt="Small pizza half"/>
                    </SelectedPizzaHalf>
                    <SelectedPizzaHalf style={{rotate: "180deg"}} selected={selectedHalf !== "left"} onClick={(ev) => {selectedHalf === "right" ? setSelectedHalf("whole") : setSelectedHalf("right")}}>
                        <img src={pizzaHalves[size]} style={{width: "clamp(100px, 6vw, 200px"}} alt="Small pizza half"/>
                    </SelectedPizzaHalf>
                    <SelectedToppingList>

                        {pizzaToppings.map((selectedTopping) => {
                            return  <SelectedTopping key={selectedTopping.toppingName} onClick={(ev) => removeTopping(selectedTopping.toppingName)}>
                                        {selectedTopping.toppingName.split(" ").map(str => str[0].toUpperCase() + str.substring(1, str.length)).join(" ")}
                                    </SelectedTopping>
                        })}

                        
                        
                    </SelectedToppingList>
                    <SubmitPizzaButton onClick={(ev) => handleSubmit()}>Submit</SubmitPizzaButton>
                </SelectedPizza>
                    <ToppingList>
                        {toppings && toppings.map((topping) => {
                            return  <ToppingOption picked={pizzaIncludesTopping(topping.name)} disabled={pizzaIncludesTopping(topping.name)} key={topping.name} onClick={(ev) => {
                                addTopping(topping.name)
                                setSelectedHalf("whole")
                                }}>
                                        {topping.name.split(" ").map(str => str[0].toUpperCase() + str.substring(1, str.length)).join(" ")}
                                    </ToppingOption>
                        })}
                        
                    </ToppingList>
                    

            </AssemblePizza>}

        </Wrapper>
    )
}

const Wrapper = styled.div`
`
const SizeSelect = styled.div`
`
const Pizza = styled.button`
    display: flex;
    flex-direction: row;
    width: 200px;
    border: none;
    background: none;
`
const AssemblePizza = styled.div`
    width: 30vw;
    height: fit-content;
    border: 3px solid black;
    border-radius: 20px;
    margin: 10px;
    display: flex;
    flex-direction: row;
    padding: 10px;
    justify-content: space-between;
    @media (max-width: 768px) {
        width: 90vw;
    }
`
const SelectedPizzaHalf = styled.button`
    border: none;
    background: none;
    padding: 0;
    filter: ${(props => !props.selected ?  "grayscale(100)" : "grayscale(0)")};
`
const SelectedPizza = styled.div`
    position: relative;
`
const ToppingList = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`
const SelectedToppingList = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`

const SelectedTopping = styled.button`
    background: none;
    border: none;
    width: fit-content;
    font-size: 24px;
    color: black;
    font-weight: bold;
`
const SubmitPizzaButton = styled.button`
    background: var(--color-button);
    color: white;
    border: none;
    height: 50px;
    font-size: 30px;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 15px;
    font-weight: bold;
    transition: all 30ms;
    &:active{
        transform: scale(0.9);
        box-shadow: inset 0 0 10px hsla(0, 100%, 0%, 0.5);
    }
`

const ToppingOption = styled.button`
    background: none;
    border: none;
    width: fit-content;
    font-size: 24px;
    color: black;
    font-weight: bold;
    color: ${(props) => props.picked ? "gray" : "black"}

`
export default CustomPizza