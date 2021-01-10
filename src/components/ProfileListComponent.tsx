import React, {useState} from "react";
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {List, ListItem, ListItemAvatar, TextField} from "@material-ui/core";
import {AccountCircleOutlined, Edit, MailOutline, Phone} from "@material-ui/icons";
import {GetUserResponse} from "../awsClient/models/profileModels";

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

interface InteractiveListProps{
    userInfo: GetUserResponse | undefined
}

export default function InteractiveList(props: InteractiveListProps) {
    const classes = useStyles();
    const [edit, setEdit] = useState(false);
    console.log(props)
    function onClick() {
        setEdit(!edit)
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={11}>
                    <div className={classes.demo}>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccountCircleOutlined/>
                                        {/*<MailOutline/>*/}
                                        {/*<Phone/>*/}
                                    </Avatar>
                                </ListItemAvatar>
                                {!edit && <ListItemText
                                    primary={props.userInfo?.username || "Username"}
                                />}
                                {edit && <TextField type={"text"} defaultValue={"Single-line item"} autoFocus/>}
                            </ListItem>
                        </List>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        {/*<AccountCircleOutlined/>*/}
                                        {/*<MailOutline/>*/}
                                        <Phone/>
                                    </Avatar>
                                </ListItemAvatar>
                                {!edit && <ListItemText
                                    primary={props.userInfo?.phone || "+91-XXXXXXXXXXX"}
                                    // secondary="Secondary text"
                                />}
                                {edit && <TextField type={"text"} defaultValue={"Single-line item"} autoFocus/>}
                            </ListItem>
                        </List>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        {/*<AccountCircleOutlined/>*/}
                                        <MailOutline/>
                                        {/*<Phone/>*/}
                                    </Avatar>
                                </ListItemAvatar>
                                {!edit && <ListItemText
                                    primary={props.userInfo?.email || "example@example.com"}
                                    // secondary="Secondary text"
                                />}
                                {edit && <TextField type={"text"} defaultValue={"Single-line item"} autoFocus/>}
                            </ListItem>
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
