import { useEffect, useState } from "react";
import { createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);


const UserProvider = ({ children }) => {
  const { user } = useAuth0();
  const [loaded, setLoaded] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)

  useEffect(() => {
    if (user) {
      fetch(`/get-user/` + user.email)
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setCurrentUser(data.result);
            setLoaded(true);
          } else {
            googleUserHandle(data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const googleUserHandle = (data) => {
    fetch("/new-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ ...user, info: [], isAdmin: false }),
    })
      .then(() => {
        setLoaded(true);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loaded}}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
