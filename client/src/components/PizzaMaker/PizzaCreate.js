import { useState, useEffect } from "react";
import styled from "styled-components";
import FailedNotif from "../FailedNotif";
import ToppingItem from "./ToppingItem";

const PizzaCreate = ({update}) => {
    const [toppings, setToppings] = useState([])
    const [selectedToppings, setSelectedToppings] = useState([])
    const [newPizzaName, setNewPizzaName] = useState("")
    const [failed, setFailed] = useState(false)

    useEffect(() => {
        fetch("/get-topping")
            .then((res) => res.json())
            .then((data) => setToppings(data.message))
            .catch((err) => console.log(err.message))
    }, [update])

    const handleNewPizza = (ev, name, toppings) => {
        if (name && toppings) {
            console.log(name, toppings)
            fetch("/admin/post-new-pizza", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "content-Type": "application/json",
                },
                body: JSON.stringify({name: name, toppings: toppings}),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 200){
                        console.log(data)
                        setFailed(false)
                    } else {
                        setFailed(true)
                    }
                })
                .catch((error) => {

                    

                    console.error("error", error);
                });
        }
            
        
        setNewPizzaName("")
        setSelectedToppings([])
        ev.preventDefault()
    }

    return (
        <Wrapper>
            {toppings && toppings.map((topping) => {
                return <ToppingItem key={topping.name} name={topping.name} title={topping.title} price={topping.price} selectedToppings={selectedToppings} setSelectedToppings={setSelectedToppings}/>
            })}
            <PizzaEntryForm onSubmit={(ev) => handleNewPizza(ev, newPizzaName, selectedToppings)}>
                <NewNameInput required value={newPizzaName} onChange={(ev) => setNewPizzaName(ev.target.value)}></NewNameInput>
                <SubmitButton>Submit</SubmitButton>
            </PizzaEntryForm>
            {failed && <FailedNotif/>}
        </Wrapper>
        
    )
}

const Wrapper = styled.div`
    width: 100vw;
`
const PizzaEntryForm = styled.form`
`
const NewNameInput = styled.input`
    font-size: 20px;
    border: 2px solid var(--color-button);
    height: 30px;
`
const SubmitButton = styled.button`
    border-radius: 5px;
    padding: 5px;
    margin-top: 10px;
    color: var(--color-button-text);
    background: var(--color-button);
    border: none;
    display: block;
`

export default PizzaCreate