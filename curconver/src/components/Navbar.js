import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
    },
    appBar: {
        background: "transparent",
        boxShadow: "none",
    },
    toolBar: {
        width: "70%",
        margin: "0 auto",
    },
    logo: {
        color: "#1C69DC",
        fontWeight: 900,
        marginRight: "auto",
    },
    navLink: {
        marginLeft: theme.spacing(5),
        fontWeight: 500,
    },
}))

const Navbar = () => {
    const classes = useStyles();
    // TODO: Add navlinks when new sections are made
    const navLinks = [];
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                <Typography variant="h5" className={classes.logo}>
                    CurConveR
                </Typography>
                <Hidden smDown>
                {navLinks.length !== 0 ? navLinks.map(navLink => (
                    <Typography variant="body1" className={classes.navLink}>
                        {navLink}
                    </Typography>
                )) : null}
                </Hidden>
                </Toolbar>
            </AppBar>
        </div>

    )
}

export default Navbar;