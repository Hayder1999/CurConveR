import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

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
    const [options, setOptions] = useState(null);

    useEffect(() => {
        const loadAvailableCurrencies = () => {
            axios.get(`/symbols?`)
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
    
    return (
        <div className={ classes.root }>
            <Typography variant="h4" className={ classes.headLine }>
                Get fast updates on <br /> the Currency
            </Typography> 
        </div>
    );
};

export default Currency;