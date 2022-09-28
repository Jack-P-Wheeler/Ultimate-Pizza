import styled from "styled-components";

const Header = () => {
    return (
        <Wrapper>
            <Title>Ultimate Pizza</Title>
            <Slogan>The best pizza in town</Slogan>
        </Wrapper>
    )
}

const Wrapper = styled.div`
`
const Title = styled.p`
    font-size: 50px;
`
const Slogan = styled.p`
    font-size: 24px;
`

export default Header