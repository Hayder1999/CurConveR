import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Converter from "../components/Converter";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "70%",
        margin: "0 auto",
    },
    headLine: {
        fontWeight: 600,
        marginBottom: theme.spacing(2),
    },
}));

const Currency = () => {
    const classes = useStyles();
    // TODO: use ContextAPI/Redux to pass selected currencies + options to select components faster
    const [options, setOptions] = useState(null);
    const [fromCurrency, setFromCurrency] = useState({ value: "EUR", label: "EUR" });
    const [toCurrency, setToCurrency] = useState({ value: "USD", label: "USD" });
    const [conversionRate, setConversionRate] = useState(1);

    useEffect(() => {
        const loadAvailableCurrencies = () => {
            axios.get(`/symbols`)
                .then((result) => {
                    const currencies = result.data.symbols;
                    const optionsArray = [];
                    Object.keys(currencies).forEach(key => {
                        const option = { value: key, label: key };
                        optionsArray.push(option);
                    });
                    setOptions(optionsArray);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadAvailableCurrencies();
    }, []);

    useEffect(() => {
        const loadConversionRate = () => {
            axios.get(`/latest?&base=${fromCurrency.value}&symbols=${toCurrency.value}`)
                .then((result) => {
                    const rate = Object.values(result.data.rates)[0];
                    setConversionRate(rate);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadConversionRate();
    }, [fromCurrency, toCurrency]);

    return (
        <div className={ classes.root }>
            <Typography variant="h4" className={ classes.headLine }>
                Get fast updates on <br /> the Currency
            </Typography>
            <Converter options={ options } conversionRate={ conversionRate }
                fromCurrency={ fromCurrency } setFromCurrency={ setFromCurrency } toCurrency={ toCurrency } setToCurrency={ setToCurrency } />
        </div>
    );
};

export default Currency;