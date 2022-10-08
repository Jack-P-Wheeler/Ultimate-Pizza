import { useEffect, useState } from "react";
import styled from "styled-components";
import PizzaCard from "./PizzaCard";
import CustomPizza from "./UserPizzaMaker/CustomPizza";
import Cart from "./Cart";

const Home = () => {
    const [pizzas, setPizzas] = useState(false)
    const [toppings, setToppings] = useState([])

    useEffect(() => {
        fetch("/get-pizzas")
        .then(res => res.json())
        .then(data => setPizzas(data.message))
        .catch(err => console.log(err))

        fetch("/get-topping")
        .then(res => res.json())
        .then(data => setToppings(data.message))
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
            <CustomPizza toppings={toppings} />
            {pizzas && <Cart pizzas={pizzas} toppings={toppings}/>}
            
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