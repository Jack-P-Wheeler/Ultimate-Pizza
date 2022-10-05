import styled from "styled-components";
import UserToggle from "./UserToggle";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const {currentUser, loaded} = useContext(UserContext)
    return (
        <Wrapper>
            <Info>
                <Title to="/">Ultimate Pizza</Title>
                <Slogan>The best pizza in town</Slogan>

            </Info>
            
            <Buttons>
                {loaded && currentUser.isAdmin && <AdminLink to="/admin">Admin</AdminLink>} 
                <UserToggle/>
            </Buttons>
            
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    
`
const Info = styled.div`
`
const Title = styled(Link)`
    font-size: 50px;
    text-decoration: none;
`
const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const AdminLink = styled(Link)`
    font-size: 26px;
    margin-right: 20px;
    color: var(--color-button-text);
    height: 50px;
    font-weight: bold;
    background: var(--color-tertiary);
    border: none;
    filter: drop-shadow(0 2px 5px hsla(360, 100%, 0%, 0.5));
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 5px;


    &:hover {
        cursor: pointer;
        transform: scale(1.2);
        filter: drop-shadow(0 4px 5px hsla(360, 100%, 0%, 0.5));
    }
`
const Slogan = styled.p`
    font-size: 24px;
`

export default Header