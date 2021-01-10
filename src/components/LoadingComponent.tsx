import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {CircleLoader} from "react-spinners";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

interface LoadingProps {
    isLoading: boolean
}

export default function Loading(props: LoadingProps) {
    const {isLoading} = props
    const classes = useStyles();
    return (

        <Backdrop className={classes.backdrop} open={isLoading}>
            <CircleLoader size={150} color={"white"}/>
        </Backdrop>

    );
}