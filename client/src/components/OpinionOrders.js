import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import styled from "styled-components"
import PizzaCard from "./PizzaCard"

const OpinionOrders = () => {
    const { currentUser } = useContext(UserContext)
    const [loaded, setLoaded] = useState(false)
    const [lastOrder, setLastOrder] = useState([])
    const [sortedFavourites, setSortedFavourites] = useState([])
    const { pizzas, setCart } = useContext(UserContext)

    useEffect(() => {
        fetch("/get-opinion-orders/" + currentUser.email)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setLastOrder(data.lastOrder)
                setSortedFavourites(data.scoredOrders)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Wrapper>
            {lastOrder && <LastOrder onClick={(ev) => setCart(lastOrder)}>
                The Usual!
            </LastOrder>}
            {sortedFavourites && <PremadePizzas>
                {pizzas && loaded && sortedFavourites.map((pizza) => {
                    const thisPizza = pizzas.find((pizzaFromDB) => pizzaFromDB.name === pizza.name)
                    return <PizzaCard key={pizza.name} name={pizza.name} toppings={thisPizza.toppings} price={thisPizza.prices}/>
                })}
            </PremadePizzas>}
        </Wrapper>
        
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const LastOrder = styled.button`
    height: 250px;
    width: 250px;
    background: var(--color-tertiary);
    border-radius: 20px;
    padding: 15px;
    box-shadow: 0 5px 10px hsla(0, 100%, 0%, 0.5);
    margin: 10px;
    display: flex;
    border: none;
    justify-content: center;
    align-items: center;
    transition: 100ms all;
    font-size: 30px;
    margin-bottom: 10px;
    color: black;
    font-weight: bold;
    color: white;

    &:hover{
        box-shadow: 5px 10px 10px hsla(0, 100%, 0%, 0.5);
    }
    
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

export default OpinionOrders