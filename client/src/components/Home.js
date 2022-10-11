import { useEffect, useState } from "react";
import styled from "styled-components";
import PizzaCard from "./PizzaCard";
import CustomPizza from "./UserPizzaMaker/CustomPizza";
import Cart from "./Cart";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import OpinionOrders from "./OpinionOrders";

const Home = () => {
    const { pizzas, toppings, currentUser } = useContext(UserContext)
    const user = useAuth0()
    return (
        <Wrapper>
            {user.isAuthenticated && currentUser && <OpinionOrders/>}
            
            <PageDescription>Try our house Pizzas!</PageDescription>
            <PremadePizzas>
                {pizzas && pizzas.map((pizza) => {
                    return <PizzaCard key={pizza.name} name={pizza.name} toppings={pizza.toppings} price={pizza.prices}/>
                })}
            </PremadePizzas>
            <PageDescription>Make your own Pizza!</PageDescription>
            <CustomPizza toppings={toppings} />
            {user.isAuthenticated && <Cart/>}
            
        </Wrapper>
    )
}
const Wrapper = styled.div`
    height: 120vh;
    margin-left: 50px;
`
const PageDescription = styled.p`
    font-size: 30px;
    margin-bottom: 30px;
    font-weight: bold;
`
const PremadePizzas = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 30px;
`

export default Home