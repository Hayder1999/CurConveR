import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
    return (
        <div className={ classes.root }>
            <Typography variant="h4" className={ classes.headLine }>
                Get fast updates on <br /> the Currency
            </Typography> 
        </div>
    );
};

export default Currency;