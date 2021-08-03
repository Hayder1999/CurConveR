import React from "react";
import ReactSelect from "react-select";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
        "& .css-26l3qy-menu": {
            width: "150%",
        },
        "& .css-1fhf3k1-control": {
            height: "100%",
        },
        "& :hover": {
            cursor: "pointer",
        }
    },
}))

const Select = (props) => {
    const classes = useStyles();
    const {options, selectedValue, onSelectChange, disabled} = props;
    
    return (
        <ReactSelect data-testid="selectBox" options={options} className={classes.inputSelect} value={selectedValue} onChange={(value) => onSelectChange(value)} 
        isSearchable components={{IndicatorSeparator: () => null}} isDisabled={disabled}/>
    )
}

export default Select;