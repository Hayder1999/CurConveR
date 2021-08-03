import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";
import Select from "./Select";

const useStyles = makeStyles((theme) => ({
    input: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    inputLabel: {
        fontSize: theme.spacing(3),
        fontWeight: 700,
        marginBottom: theme.spacing(2),
        width: "80%",
    },
    inputNumber: {
        width: "60%",
        background: "#FFFFFF",
        border: "none",
        fontSize: theme.spacing(4),
        fontWeight: 500,
        padding: theme.spacing(1.5),
        outline: "none",
        [theme.breakpoints.down("md")]: {
            fontSize: theme.spacing(2)
        }
    },
    inputSelect: {
        width: "40%",
        color: "#323232",
        outline: "none",
        "& .css-yk16xz-control": {
            height: "100%",
            border: "none",
            background: "#F5F7FA",
            color: "#323232",
            outline: "none",

        },
        "& .css-1pahdxg-control": {
            height: "100%",
            border: "none",
            background: "#F5F7FA",
            color: "#323232",
            outline: "none",

        },
    },
    inputGroup: {
        display: "flex",
        width: "80%",
        height: "10vh",
        boxShadow: "2px -2px 2px rgba(220, 227, 238, 0.3),-2px 2px 2px rgba(220, 227, 238, 1)",
        marginBottom: theme.spacing(2),
    },
    switch: {
        width: "80%",
        color: "#1C69DC",
        fontWeight: 600,
        marginTop: theme.spacing(2)
    },
    conversionRate: {
        width: "80%",
        color: "#323232C",
        fontWeight: 600,
        marginTop: theme.spacing(2)
    },
    validationText: {
        width: "80%",
        color: "#DC3C1C"
    }
}));

const CustomInput = (props) => {
    const classes = useStyles();
    const { label, options, selectedCurrency, onCurrencyChange, otherSelectedCurrency, amount, setAmount, 
        setOtherAmount, conversionRate, disabled } = props;
    const [active, setActive] = useState(false);
    const [valid, setValid] = useState(true);
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };
    useEffect(() => {
        const calculate = () => {
            /* 
            Only numbers/decimal point can be inserted.
            The only possible invalid cases for
            calculating the currency is when
            A.the input is empty
            B.the input only contains a decimal point
            C.the input only contains a minus symbol
            D.the input contains B followed with C or vice versa
            */
            const unformatted = amount.toString().replace(/,/g, '');
            if (isNaN(unformatted) || unformatted === "") {
                setValid(false);

            }
            else {
                setValid(true);
                /* Only change the amount of another component if you are active
                   Otherwise infinite loop of state updating
                */
                if (active) {
                    const value = parseFloat(unformatted);
                    label === "From" ? setOtherAmount(value * conversionRate) :
                        setOtherAmount(value / conversionRate);
                }
            }
        };
        calculate();
    }, [amount, label, active, conversionRate, setOtherAmount]);

    return (
        <div className={ classes.input }>
            <label data-testid="inputLabel" className={ classes.inputLabel }>{ label }</label>
            <div className={ classes.inputGroup }>
                <NumberFormat data-testid="inputNumberField" className={ classes.inputNumber } value={ amount } decimalScale={ 2 }
                    onChange={ handleAmountChange } thousandSeparator={ true } autoComplete={ "off" } onFocus={ () => setActive(true) } onBlur={ () => setActive(false) } />
                <Select options={ options } selectedValue={ selectedCurrency } onSelectChange={ onCurrencyChange } disabled={ disabled } />
            </div>
            {valid ? null : <div className={ classes.validationText }>Please enter a number</div> }
            {/* Improve readability of currency variables */}
            {label === "From" ? <Typography variant="caption" className={ classes.switch }>View analytics below</Typography>
                : <Typography variant="caption" className={ classes.conversionRate }>1 { otherSelectedCurrency.value } = { conversionRate } { selectedCurrency.value }</Typography> }

        </div>
    );
};
export default CustomInput;