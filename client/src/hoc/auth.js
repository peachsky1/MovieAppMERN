import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";

//null - anyone
//true - user who logged in
//false - user who is not logged in
const authWrapper = (SpecificComponent, option, adminRoute = null) => {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        // not logged in
        if (!response.payload.isAuth) {
          if (option === true) {
            props.history.push("/login");
          }
          // logged in
        } else {
          // admin page but not an admin user
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);
    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
};

export default authWrapper;
