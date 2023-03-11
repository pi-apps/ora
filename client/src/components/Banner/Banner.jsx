import React from "react";
import S from "./Banner.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors";

function Banner() {
    const navigate = useNavigate();
    const currentUser = useSelector(userState$);

    const handleGetStarted = () => {
        if (currentUser.currentUser) {
            navigate("/post/create/");
        } else {
            navigate("/login");
        }
    };
    return (
        <div className={S.Banner}>
            <div className={S.Container}>
                <div className={S.Top}>
                    <h1 className={S.H1}>Ora | Social Network for Pioneers</h1>
                    <p className={S.Para}>Write - Share - Connection - Earn Pi</p>
                </div>
                <button className={S.Button} onClick={handleGetStarted}>
                    Start
                </button>
            </div>
        </div>
    );
}

export default Banner;
