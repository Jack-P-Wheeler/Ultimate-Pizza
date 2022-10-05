import styled from "styled-components"
import { useRef, useEffect, useState } from "react";

const AddressEntry = () => {
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const storeLocation = "83 Mill Street, Russell"
    const [mapsLoaded, setMapsLoaded] = useState(window.google ? true : false)
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
        }
    }, [window.google]);

    const handleAddress = async () => {
        const place = await autoCompleteRef.current.getPlace();
        const refinedAddress = await place.address_components[0].long_name + " " + place.address_components[1].long_name + ", " + place.address_components[2].long_name

        fetch("/get-travel-time/" + refinedAddress + "/" + storeLocation)
        .then(res => res.json())
        .then(data => console.log(data))
    }
    console.log(window.google)
    console.log(mapsLoaded)
    return (
        <Wrapper>
            <Instruction>Enter address :</Instruction>
            <input ref={inputRef} />
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