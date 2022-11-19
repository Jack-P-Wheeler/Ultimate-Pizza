import styled from "styled-components";
import { useState, useEffect } from "react";
import FailedNotif from "../FailedNotif";

const NewTopping = ({update, setUpdate}) => {
    const initialTopping = {name: "", price: "", isVegan: true, isSpicy: false, isGlutenFree: true}
    const [newToppingObj, setNewToppingObj] = useState(initialTopping)
    const [namingError, setNamingError] = useState(false)

    const handleNewTopping = (topping) => {
        setNamingError(false)
        fetch("/admin/add-topping", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-Type": "application/json",
            },
            body: JSON.stringify(topping),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Topping added"){
                    setUpdate(!update)
                } else {
                    setNamingError(true)
                }
            })
            .catch((error) => {
                console.error("error", error);
            });
        resetForm()
    }

    const resetForm = () => {
        setNewToppingObj(initialTopping)
    }

    return (
        <Wrapper>
            <AddToppingForm onSubmit={(ev) => {
                ev.preventDefault()
                handleNewTopping(newToppingObj)
            }}>
                <ToppingLabel>Name:</ToppingLabel>
                <NewToppingField required value={newToppingObj.name} onChange={(ev) => setNewToppingObj({...newToppingObj, name: ev.target.value})}></NewToppingField>
                <ToppingLabel>Price:</ToppingLabel>
                <NewToppingField required value={newToppingObj.price} onChange={(ev) => setNewToppingObj({...newToppingObj, price: ev.target.value})}></NewToppingField>
                <OptionPair>
                    <ToppingLabelCheck>Vegan?</ToppingLabelCheck>
                    <NewToppingField type="checkbox" checked={newToppingObj.isVegan} onChange={(ev) => setNewToppingObj({...newToppingObj, isVegan: ev.target.checked})}></NewToppingField>
                </OptionPair>
                <OptionPair>
                    <ToppingLabelCheck>Gluten Free?</ToppingLabelCheck>
                    <NewToppingField type="checkbox" checked={newToppingObj.isGlutenFree} onChange={(ev) => setNewToppingObj({...newToppingObj, isGlutenFree: ev.target.checked})}></NewToppingField>
                </OptionPair>
                <OptionPair>
                    <ToppingLabelCheck>Spicy?</ToppingLabelCheck>
                    <NewToppingField type="checkbox" checked={newToppingObj.isSpicy} onChange={(ev) => setNewToppingObj({...newToppingObj, isSpicy: ev.target.checked})}></NewToppingField>
                </OptionPair>
                
                
                <SubmitButton>Submit</SubmitButton>

                {namingError ? <FailedNotif setFailure={setNamingError} message={"Try another name"}/>: null}
            </AddToppingForm>
        </Wrapper>
    )
}

const Wrapper = styled.div`
`
const ToppingLabel = styled.label`
    font-size: 20px;
    padding-top: 10px;
    display: block;
    color: var(--color-headline);
`
const ToppingLabelCheck = styled.label`
    font-size: 20px;
    color: var(--color-headline);
`
const AddToppingForm = styled.form`
    
`
const NewToppingField = styled.input`
    font-size: 20px;
    border: 2px solid var(--color-button);
    height: 30px;
`
const SubmitButton = styled.button`
    border-radius: 5px;
    padding: 5px;
    color: var(--color-button-text);
    background: var(--color-button);
    border: none;
    display: block;
`
const OptionPair = styled.div`
    display: flex;
    align-items: center;
`

export default NewTopping