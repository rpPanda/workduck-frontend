import React, {useState} from "react";
import {Backdrop, Button, createStyles, Grid, TextField, Theme} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-material-ui-carousel'
import {useFormFields} from "../libs/hooksLib";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 750,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

function MediaCard(props: any) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <img alt={"Bigfoot"} className={classes.media} src={'data:image/jpeg;base64,' + props.image.image}/>
                {/*<CardMedia*/}
                {/*    className={classes.media}*/}
                {/*    image={'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg'}*/}
                {/*    title="Contemplative Reptile"*/}
                {/*/>*/}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.image.action.toUpperCase()}
                    </Typography>
                    <Typography style={{overflowWrap: "break-word"}} variant="h6" color="textSecondary">
                        {props.image.params.x &&
                        <div>
                            <b>Co-ordinates : </b>({props.image.params.x}, {props.image.params.y}) <br/>
                            <b>Timestamp : </b> {props.image.params.timestamp} <br/>
                        </div>
                        }
                        {props.image.params.start &&
                        <div>
                            <b>Start Co-ordinates
                                : </b>({props.image.params.start.x}, {props.image.params.start.y}) <br/>
                            <b>End Co-ordinates : </b>({props.image.params.end.x}, {props.image.params.end.y}) <br/>
                            <b>Swipe Duration
                                : </b> {(props.image.params.end.timestamp - props.image.params.start.timestamp) / 1000} ms <br/>
                            <b>Timestamp : </b> {props.image.params.end.timestamp} <br/>
                        </div>
                        }
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/*<CardActions>*/}
            {/*    <Button size="small" color="primary">*/}
            {/*        Share*/}
            {/*    </Button>*/}
            {/*    <Button size="small" color="primary">*/}
            {/*        Learn More*/}
            {/*    </Button>*/}
            {/*</CardActions>*/}
        </Card>
    );
}

function Example(props: any) {
    return (
        <Carousel index={props.images.length - 1} autoPlay={false} navButtonsAlwaysVisible={true} animation={"slide"}>
            {
                props.images.map((item: any) => <MediaCard image={item}/>)
            }
        </Carousel>
    )
}

export function WebsocketTest(props: any) {
    const history = useHistory();
    const classes = useStyles();
    const {farmerInit} = props
    const [fields, handleFieldChange] = useFormFields({})
    const [open, setOpen] = useState(false)
    // const [imgList, setImgList] = useState<any>([])

    function handleClick() {
        farmerInit.mount({
            timeout: 10000,
            endpoint: 'XYZ',
            elementId: 'container1',
            dimensions: {x: 600, y: 1000},
            deviceResolution: {x: 1080, y: 1920},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            logCallback: function (state: any, message: any) {
            }
        })
        // farmerInit.toggleKeyboardListener(false)
    }

    function handleStop() {
        setOpen(true)
        farmerInit.perform({action: 'StopRec', parameters: {timestamp: Date.now()}})
    }

    // function handleSend() {
    //     farmerInit.sendText(fields.inputText)
    // }

    function handleRepeat() {
        farmerInit.perform({action: 'Repeat', parameters: {id: props.match.params.id}})
    }

    function previosPage(){
        history.push('/')
    }
    function handleClose() {
        setOpen(false)
    }

    return (
        <div id="terminal" style={{padding: 20}}>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                {/*<Example images={imgList}/>*/}
            </Backdrop>
            <Grid container justify={"space-between"}>
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h5" component="h2">{props.match.params.id}</Typography>
                </Grid>
                <Grid item xs={9}>
                    <div id="container1">
                    </div>
                </Grid>
                <Grid container spacing={4} justify={"center"} item xs={3} alignItems={"center"}
                      alignContent={"center"}>
                    <Grid item xs={3}>
                        <Button variant={"contained"} color={"primary"} onClick={handleClick}>Start</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant={"contained"} color={"primary"} onClick={handleStop}>Stop</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant={"contained"} color={"primary"} onClick={handleRepeat}>Run</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant={"contained"} color={"primary"} onClick={previosPage}>Back</Button>
                    </Grid>
                    <Grid item xs={12}>
                        {/*<TextField variant={"outlined"} label={"Text Input"} id={"inputText"} value={fields.inputText}*/}
                        {/*           onChange={handleFieldChange}/>*/}
                        {/*<Button variant={"contained"} color={"primary"} onClick={handleSend}*/}
                        {/*        style={{margin: 10}}>Send</Button>*/}
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*    <Example images={imgList}/>*/}
                    {/*</Grid>*/}
                </Grid>
            </Grid>
        </div>
    )
}
