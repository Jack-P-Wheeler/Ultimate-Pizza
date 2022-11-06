import styled from "styled-components";

const ToppingItem = ({name, title, price, selectedToppings, setSelectedToppings}) => {
    
    const isSelected = selectedToppings.find((topping) => topping.name === name)
    const handleCLick = () => {
        if (!isSelected) {
            setSelectedToppings([...selectedToppings, {name, half: "whole"}])
        } else {
            setSelectedToppings(selectedToppings.filter((topping) => topping.name !== name))
        }
    }

    return (
        <Wrapper isSelected={isSelected} onClick={(ev) => handleCLick("whole")}>
            <ToppingName isSelected={isSelected}>{title}</ToppingName>
            <ToppingPrice isSelected={isSelected}>{"$" + price.toFixed(2)}</ToppingPrice>
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

export default ToppingItem