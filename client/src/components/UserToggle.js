import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const UserToggle = () => {
  //conditional for user login and logout
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <Button
      onClick={() =>
        isAuthenticated
          ? logout({ returnTo: window.location.origin })
          : loginWithRedirect()
      }
    >
      {isAuthenticated ? "Logout" : "Login"}
    </Button>
  );
};

const Button = styled.button`
  font-size: 26px;
  margin-right: 20px;
  height: 50px;
  color: var(--color-button-text);
  font-weight: bold;
  background: var(--color-button);
  border: none;
  border-radius: 5px;
  filter: drop-shadow(0 2px 5px hsla(360, 100%, 0%, 0.5));

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    filter: drop-shadow(0 4px 5px hsla(360, 100%, 0%, 0.5));
  }
`;

export default UserToggle;
