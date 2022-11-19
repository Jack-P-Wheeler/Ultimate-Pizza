import styled from "styled-components"
import { FiX } from "react-icons/fi";

const FailedNotif = ({message, setFailure}) => {
    return (
        <Wrapper>
            <Message>{message}</Message>
            <CloseButton onClick={() => setFailure(false)}><FiX/></CloseButton>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid red;
    background-color: hsla(360, 100%, 72%, 0.55);
    width: fit-content;
    padding: 5px;
    border-radius: 5px;
    margin-top: 5px;
`
const Message = styled.p`

`
const CloseButton = styled.button`
    font-size: 100%;
    border: none;
    background: none;
    padding: 0;
    line-height: 0;
    
    &:hover{
        scale:1.1;
    }
`

export default FailedNotif