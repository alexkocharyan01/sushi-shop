import React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";
import LogoSvg from "../../Helpers/logoSvg";
import {useTranslation} from "react-i18next";
import './Footer.scss'

const Footer = ({absolute}) => {
    const {t} = useTranslation();

    return (
        <div className={'footer ' + (absolute && "footer_absolute")}>
            <div className='footer_text'>
                <CopyrightIcon sx={{color: 'white'}}/>
                <p>2022 {t("footer")} </p>
                <a href="https://interma.am/" target="blank"><LogoSvg/> </a>
            </div>
        </div>
    );
}

export default Footer;
