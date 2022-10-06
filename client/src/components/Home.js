import { useEffect, useState } from "react";
import styled from "styled-components";
import PizzaCard from "./PizzaCard";
import CustomPizza from "./UserPizzaMaker/CustomPizza";

const Home = () => {
    const [pizzas, setPizzas] = useState([])

    useEffect(() => {
        fetch("/get-pizzas")
        .then(res => res.json())
        .then(data => setPizzas(data.message))
        .catch(err => console.log(err))
    }, [])
    return (
        <Wrapper>
            <PageDescription>Try our house Pizzas!</PageDescription>
            <PremadePizzas>
                {pizzas && pizzas.map((pizza) => {
                    return <PizzaCard key={pizza.name} name={pizza.name} toppings={pizza.toppings} price={pizza.prices}/>
                })}
            </PremadePizzas>
            <PageDescription>Make your own Pizza!</PageDescription>
            <CustomPizza/>
            
        </Wrapper>
    )
}
const Wrapper = styled.div`
`
const PageDescription = styled.p`
    font-size: 26px;
    margin-bottom: 30px;
`
const PremadePizzas = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 30px;
`

export default Home