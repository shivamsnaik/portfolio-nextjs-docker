import React, { useState, useEffect } from 'react';
import styles from "../styles/Card.module.scss";

const Card = ({children}) => {

    return(
        <div style={{flex: 1, alignItems: "center", textAlign: "center", margin:"50px", paddingTop:"20px", paddingBottom: "20px", borderColor:"grey", borderStyle: "solid", borderRadius: "5px"}}>
            {children}
        </div>
    );
};

export default Card;