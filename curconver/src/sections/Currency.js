import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Converter from "../components/Converter";
import Select from "../components/Select";
import Linegraph from "../components/Linegraph";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "70%",
        margin: "0 auto",
    },
    headLine: {
        fontWeight: 600,
        marginBottom: theme.spacing(2),
    },
    chartBackground: {
        backgroundColor: "#FFFFFF",
        borderRadius: "10px",
        width: "100%",
        margin: "7rem auto",
    },
    chartContainer: {
        padding: "3rem",
        height: "55vh",
        marginBottom: "3rem",
    },
    chartHeader: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: "2rem",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        }
    },
    chartTitle: {
        textAlign: "center",
        marginBottom: "0.5rem",
        fontWeight: 600,
    },
    chartDate: {
        textAlign: "center",
        marginBottom: "0.5rem",
        color: "#7C828A",
    },
    selectGroup: {
        display: "flex",
        justifyContent: "space-around",
        width: "50%",
        [theme.breakpoints.down("sm")]: {
            justifyContent: "space-between",
            width: "100%",
        }
    }
}));

const Currency = () => {
    const classes = useStyles();
    // TODO: use ContextAPI/Redux to pass selected currencies + options to select components faster
    const [options, setOptions] = useState(null);
    const [fromCurrency, setFromCurrency] = useState({ value: "EUR", label: "EUR" });
    const [toCurrency, setToCurrency] = useState({ value: "USD", label: "USD" });
    const [conversionRate, setConversionRate] = useState(1);
    const [chartData, setChartData] = useState([]);

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

        const loadCurrencyHistory = () => {
            // Creates the dates for the multiple HTTP requests
            let dates = [];
            for (let index = 0; index < 7; index++) {
                let date = new Date();
                const earlierDate = date.getDate() - 7 + index;
                date.setDate(earlierDate)
                const dateString = date.toLocaleDateString('en-ZA').replace(/\//g, '-');
                dates.push(dateString);
            }
            // Save all the requests in an array
            const requests = [];
            dates.forEach(date => {
                const request = axios.get(`/${date}?&base=${fromCurrency.value}&symbols=${toCurrency.value}`);
                requests.push(request)
            });

            // Save all the results in the data array and update the chart state
            let data = [];
            axios.all(requests)
            .then(axios.spread((...responses) => {
                for (let index = 0; index < responses.length; index++) {
                    const rate = Object.values(responses[index].data.rates)[0];
                    const date = dates[index];
                    data.push({date: date, rate: rate});
                    console.log(responses);
                }
                setChartData(data);
            }))
            .catch(error => console.log(error));
        }

        loadConversionRate();
        loadCurrencyHistory();
    }, [fromCurrency, toCurrency]);

    return (
        <div className={ classes.root }>
            <Typography variant="h4" className={ classes.headLine }>
                Get fast updates on <br /> the Currency
            </Typography>
            <Converter options={ options } conversionRate={ conversionRate }
                fromCurrency={ fromCurrency } setFromCurrency={ setFromCurrency } toCurrency={ toCurrency } setToCurrency={ setToCurrency } />
                <div className={ classes.chartBackground }>
                <div className={ classes.chartContainer }>
                    <div className={ classes.chartHeader }>
                        <Typography variant="body1">Currency analytics</Typography>
                        <div className={ classes.selectGroup }>
                            <Select options={ options } selectedValue={ fromCurrency } onSelectChange={ setFromCurrency } disabled={true}/>
                            <Select options={ options } selectedValue={ toCurrency } onSelectChange={ setToCurrency } disabled={false}/>
                        </div>
                    </div>
                    <Typography className={ classes.chartTitle } variant="body1">Today : 1 {fromCurrency.value} = {conversionRate} {toCurrency.value}</Typography>
                    <Linegraph chartData={chartData}/>
                </div>
            </div>
        </div>
    );
};

export default Currency;