import styled from "styled-components";
import { BsCircleHalf } from "react-icons/bs";

const ToppingItem = ({name, price, selectedToppings, setSelectedToppings}) => {
    
    const isSelected = selectedToppings.find((topping) => topping.name === name)
    const handleCLick = (location) => {
        if (!isSelected || isSelected.half !== location) {
            setSelectedToppings([...selectedToppings.filter((topping) => topping.name !== name), {name: name, half: location}])
        } else {
            setSelectedToppings(selectedToppings.filter((topping) => topping.name !== name))
        }
    }

    return (
        <Wrapper isSelected={isSelected} onClick={(ev) => handleCLick("whole")}>
            <ToppingName isSelected={isSelected}>{name.split(" ").map(str => str[0].toUpperCase() + str.substring(1, str.length)).join(" ")}</ToppingName>
            
            <HalfSelectors>
            <ToppingPrice isSelected={isSelected}>{"$" + price.toFixed(2)}</ToppingPrice>
            <HalfButton style={{color: (isSelected && isSelected.half === "left") ? "var(--color-tertiary)" : "var(--color-healine)"}}
            onClick={(ev) => {
                    ev.stopPropagation()
                    handleCLick("left")
                }}>
                <BsCircleHalf/>
            </HalfButton>
            <HalfButton style={{color: (isSelected && isSelected.half === "right") ? "var(--color-tertiary)" : "var(--color-healine)"}}
            onClick={(ev) => {
                    ev.stopPropagation()
                    handleCLick("right")
                }}>
                <BsCircleHalf style={{transform: "rotate(180deg)", marginLeft: "5px"}}/>
            </HalfButton>
            </HalfSelectors>
        </Wrapper>
        
    )
}
const Wrapper = styled.button`
    display: flex;
    border: 1px solid var(--color-button);
    color: ${props => props.isSelected ? "var(--color-button-text)" : "var(--color-headline)"};
    padding: 5px;
    margin-bottom: 4px;
    width: 400px;
    height: 30px;
    justify-content: space-between;
    border-radius: 5px;
    background: ${props => props.isSelected ? "var(--color-button)" : "white"};
    &:hover {
        filter: drop-shadow(0 5px 5px hsla(0, 100%, 0%, 0.5));
    }
`
const ToppingName = styled.p`
    margin-right: 10px;
    color: ${props => props.isSelected ? "var(--color-button-text)" : "var(--color-headline)"};
`
const ToppingPrice = styled.p`
    display: inline;
    color: ${props => props.isSelected ? "var(--color-button-text)" : "var(--color-headline)"};
`
const HalfSelectors = styled.div`
`
const HalfButton = styled.button`
    border: none;
    background: none;
`

export default ToppingItem