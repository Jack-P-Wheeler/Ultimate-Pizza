import styled from "styled-components";

const PizzaCard = ({name, toppings, price}) => {
    return (
        <Wrapper>
            <PizzaName>{name.split(" ").map(str => str[0].toUpperCase() + str.substring(1, str.length)).join(" ")}</PizzaName>
            {toppings.map(topping => <PizzaTopping key={topping.name}>{topping.name.split(" ").map(str => str[0].toUpperCase() + str.substring(1, str.length)).join(" ")}</PizzaTopping>)}
        </Wrapper>
        
    )    
}

const Wrapper = styled.button`
    height: 250px;
    width: 250px;
    background: linear-gradient(315deg, var(--color-tertiary) 10%, rgba(255,255,255,1) 100%);
    border-radius: 20px;
    padding: 5px;
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
    &:active{
        transform: scale(0.95);
    }
`
const PizzaName = styled.p`
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
    color: black;
    font-weight: bold;
`
const PizzaTopping = styled.p`
    font-size: 24px;
    color: black;
    font-weight: bold
`

export default PizzaCard