import styled from "styled-components";
import { useState, useEffect } from "react";
import NewTopping from "./NewTopping";
import PizzaCreate from "../PizzaMaker/PizzaCreate";

const Admin = () => {
    const [update, setUpdate] = useState(false)
    return (
        <Wrapper>
            <Title>Welcome to the Admin page</Title>
            <Description>Input new toppings and their price. Then use the toppings to create new premade pizzas!</Description>

            <SectionLabel>Add a topping</SectionLabel>
            <NewTopping setUpdate={setUpdate} update={update}/>

            <SectionLabel>Add New Pizzas</SectionLabel>
            <PizzaCreate update={update}/>

            
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    margin: 30px;
`
const Title = styled.p`
    font-size: 30px;
    margin-bottom: 10px;
`
const Description = styled.p`
`
const SectionLabel = styled.p`
    font-size: 24px;
    margin-top: 30px;
`

export default Admin