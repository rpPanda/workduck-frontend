import React, {useState} from "react";
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {List, ListItem, ListItemAvatar, TextField} from "@material-ui/core";
import {Edit, Phone} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxWidth: 752,
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }),
);

function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

export default function InteractiveList() {
    const classes = useStyles();
    const [edit, setEdit] = useState(false);

    function onClick() {
        setEdit(!edit)
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={11}>
                    <div className={classes.demo}>
                        <List>
                            {generate(
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            {/*<AccountCircleOutlined/>*/}
                                            {/*<MailOutline/>*/}
                                            <Phone/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    {!edit && <ListItemText
                                        primary="Single-line item"
                                        // secondary="Secondary text"
                                    />}
                                    {edit && <TextField type={"text"} defaultValue={"Single-line item"} autoFocus/>}
                                </ListItem>
                            )}
                        </List>
                    </div>
                </Grid>
                <Grid item md={1}>
                    <IconButton onClick={onClick} edge="end" aria-label="edit">
                        <Edit/>
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
}