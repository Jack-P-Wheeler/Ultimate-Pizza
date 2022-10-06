import { useState } from "react"
import styled from "styled-components"

const CustomPizza = () => {
    const smallPizza = require("./pizza halves/pizza halves-small.png")
    const mediumPizza = require("./pizza halves/pizza halves-medium.png")
    const largePizza = require("./pizza halves/pizza halves-large.png")

    const pizzaHalves = {small: smallPizza, medium: mediumPizza, large: largePizza}

    const [size, selectSize] = useState(undefined)
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
                    <SelectedPizzaHalf>
                        <img src={pizzaHalves[size]} style={{ width: "5vw"}} alt="Small pizza half"/>
                    </SelectedPizzaHalf>
                    <SelectedPizzaHalf style={{rotate: "180deg"}}>
                        <img src={pizzaHalves[size]} style={{width: "5vw"}} alt="Small pizza half"/>
                    </SelectedPizzaHalf>
                </SelectedPizza>
                    <ToppingList>

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
    flex-direction: column;
    width: 200px;
    border: none;
    background: none;
`
const AssemblePizza = styled.div`
    width: 50vw;
    height: 30vw;
    border: 3px solid black;
    border-radius: 20px;
    margin: 10px;
`
const SelectedPizzaHalf = styled.button`
    border: none;
    background: none;
    padding: 0;
`
const SelectedPizza = styled.div`
`
const ToppingList = styled.div`
`
const SelectedTopping = styled.p`
`

export default CustomPizza