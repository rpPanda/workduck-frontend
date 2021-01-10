import React, {useState} from 'react';
// import actions from '../test-3-action.json'
import {Button, Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginTop: 10,
    },
});

export default function Result() {
    const classes = useStyles();
    const [result, setResult] = useState([]);

    function processAction() {
        const resultTemp: any = [];
        let temp: any = []
        // actions.map((action) => {
        //     temp.push(action)
        //     // console.log(temp)
        //     if (action.message === 'TouchUpMessage') {
        //         resultTemp.push(temp)
        //         temp = []
        //     }
        // })
        setResult(resultTemp)
        // console.log(resultTemp)
    }

    function determineAction(res: any): string{
        console.log(res.length)
        if(res.length>2){
            if(res[0].message === 'KeyEventMessage'){
                return "Text Input"
            }
            else return "Drag"
        }
        else return "Click"
    }

    return (
        <div>
            <Button onClick={processAction}>Click Me</Button>
            {result.map((res: any) => {
                if (res.length > 1) {
                    return (<div>
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Action
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {determineAction(res)}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Position
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {res[0].parameters.x + ', ' + res[0].parameters.y}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>)
                }
            })}

        </div>
    )
}
