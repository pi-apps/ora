import {  useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { userState$ } from "../../redux/selectors";
import { Pisdk } from "../../components/pisdk/pisdk.tsx";
import isPiBrowser from "../../components/isPiBrowser/isPiBrowser";
const AutoLogin = async () => {
    const piB = isPiBrowser();
    const loginSuccess = useSelector(userState$);
    const dispatch = useDispatch();

            if (piB && !loginSuccess.currentUser) {
            try {
                const userPi = Pisdk();
                if (userPi) {
                    dispatch(actions.login.loginPiRequest({ piUser: userPi.username, accessToken: userPi.uid }));
                }
            } catch (err) {
                dispatch(actions.login.loginFailure());
            }
        }
        if (loginSuccess.token) {
            localStorage.setItem("token", loginSuccess.token);
        } else {
            localStorage.removeItem("token");
        }
        if (loginSuccess.currentUser) {
            window.location.href = "/";
        }
};
export default AutoLogin;