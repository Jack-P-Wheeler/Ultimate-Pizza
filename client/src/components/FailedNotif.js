import styled from "styled-components"

const FailedNotif = ({children}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

const Wrapper = styled.p`
    border: 1px solid red;
    background-color: hsla(360, 100%, 72%, 0.55);
    width: fit-content;
    padding: 5px;
    border-radius: 5px;
    margin-top: 5px;
`

export default FailedNotif