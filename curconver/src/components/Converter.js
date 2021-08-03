import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "./CustomInput";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        background: "#FEFEFE",
        borderRadius: "20px",
        display: "flex",
        boxShadow:  "0px 2px 5px rgba(28, 105, 220, 0.20)",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        }
    },
    leftContainer: {
        width: "50%",
        background: "#FFFFF",
        padding: "3rem 2rem 3rem 2rem",
        [theme.breakpoints.down("sm")]: {
            width: "auto",
            padding: "1rem",
        }
    },
    rightContainer: {
        width: "50%",
        background: "#F5F7FA",
        padding: "3rem 2rem 3rem 2rem",
        borderRadius: "0 15px 15px 0",
        [theme.breakpoints.down("sm")]: {
            width: "auto",
            borderRadius: "inherit",
            padding: "1rem",
        }
    },
}));
const Converter = (props) => {
    const classes = useStyles();
    const {options, fromCurrency, setFromCurrency, toCurrency, setToCurrency, conversionRate} = props;
    const [fromAmount, setFromAmount] = useState(1);
    const [toAmount, setToAmount] = useState(conversionRate);

    useEffect(() => {
        // Reset input values if the conversion rate has changed
        setFromAmount(1);
        setToAmount(conversionRate);
    }, [conversionRate])
    
    return (
        <div className={classes.root}>
            <div className={classes.leftContainer}>
            <CustomInput label="From" amount={fromAmount} setAmount={setFromAmount} setOtherAmount={setToAmount} options={options} 
            selectedCurrency={fromCurrency} onCurrencyChange={setFromCurrency} otherSelectedCurrency={toCurrency} conversionRate={conversionRate} disabled={true}/>
            </div>
            <div className={classes.rightContainer}>
            <CustomInput label="To" amount={toAmount} setAmount={setToAmount} setOtherAmount={setFromAmount} options={options} 
            selectedCurrency={toCurrency} onCurrencyChange={setToCurrency} otherSelectedCurrency={fromCurrency} conversionRate={conversionRate} disabled={false}/>
            </div>
        </div>
    );
};

export default Converter;