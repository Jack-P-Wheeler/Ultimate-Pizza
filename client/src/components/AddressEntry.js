import styled from "styled-components"
import { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "./UserContext";
import FailedNotif from "./FailedNotif";

const AddressEntry = () => {
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const storeLocation = "83 Mill Street, Russell"
    const [outOfRange, setOutOfRange] = useState(false)
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const navigate = useNavigate()
    const options = {
        componentRestrictions: { country: "ca" },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["address"]
    };

    useEffect(() => {
        if (window.google) {
            autoCompleteRef.current = new window.google.maps.places.Autocomplete(
                inputRef.current,
                options
            );
            autoCompleteRef.current.addListener("place_changed", handleAddress);
            inputRef.current.focus()
        }
    }, [window.google]);

    const handleAddress = async () => {
        const place = await autoCompleteRef.current.getPlace();
        if (place.geometry && place.geometry.location) {
            const refinedAddress = (place.address_components[0].long_name + " " + place.address_components[1].long_name + ", " + place.address_components[2].long_name)

            fetch("/get-travel-time/" + refinedAddress + "/" + storeLocation)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.data === "In range") {
                        handleAddressUpdate(refinedAddress)
                    } else {
                        setOutOfRange(true)
                    }
                })
        }
    }

    const handleAddressUpdate = (refinedAddress) => {
        fetch("/update-address", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "content-Type": "application/json",
            },
            body: JSON.stringify({userEmail: currentUser.email, userAddress: refinedAddress}),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setCurrentUser({currentUser, address: refinedAddress})
                navigate("/")
            })
            .catch((error) => {
                console.error("error", error);
            });
    }
    return (
        <Wrapper>
            <Instruction>Enter address :</Instruction>
            <input ref={inputRef} />
            {outOfRange && <FailedNotif/>}
        </Wrapper>
    );
}
const Wrapper = styled.div`
`

const Instruction = styled.label`
    font-size: 20px;
    padding-top: 10px;
    color: var(--color-headline);
`

export default AddressEntry