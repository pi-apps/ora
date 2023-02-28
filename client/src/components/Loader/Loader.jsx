import React, { useLayoutEffect } from "react";
import S from "./Loader.module.css";
import { useTranslation } from "react-i18next";
export const Loader = () => {
    const { t, i18n } = useTranslation();
    useLayoutEffect(() => {
        window.document.documentElement.scrollTo(0, 0);
        window.document.documentElement.style.overflow = "hidden";

        return () => {
            window.document.documentElement.style.overflow = "unset";
        };
    }, []);

    return (
        <div className={S.ContainerLoader}>
            <div className={S.Loader}></div>;
            <p
            style={{
                position: "absolute",
                top: "58%",
                 left: "53%",
                 transform: "translate(-50%, -50%)",
                 fontWeight: "bold",
                 color: "white"
            }}
            
            
            >{t("loading")}</p>
            
        </div>
    );
};

export const HomeLoader = () => {
 

    return (
        <div className={S.ContainerHomeLoader}>
            <div className={S.HomeLoader}></div>
      </div>
    );
};
