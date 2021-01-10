import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import {Divider, Tooltip} from "@material-ui/core";
import {AccountCircleOutlined} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';

export default function MainListItems() {
    const history = useHistory();
    const handleProfileClick = () => {
        history.push("/profile");
    }
    const handleHomeClick = () => {
        history.push("/home");
    }

    return (
        <div>
            <ListItem button onClick={handleProfileClick}>
                <Tooltip title={"Account"}>
                    <ListItemIcon>
                        <AccountCircleOutlined/>
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Account"/>
            </ListItem>
            <Divider/>
            <ListItem button onClick={handleHomeClick}>
                <Tooltip title={"Home"}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Home"/>
            </ListItem>
            <ListItem button>
                <Tooltip title={"Dashboard"}>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Dashboard"/>
            </ListItem>
            <ListItem button>
                <Tooltip title={"Customers"}>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Customers"/>
            </ListItem>
            <ListItem button>
                <Tooltip title={"Reports"}>
                    <ListItemIcon>
                        <BarChartIcon/>
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Reports"/>
            </ListItem>
            <ListItem button>
                <Tooltip title={"Integrations"}>
                    <ListItemIcon>
                        <LayersIcon/>
                    </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Integrations"/>
            </ListItem>
        </div>
    )
}