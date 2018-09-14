/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/4/18
 * Time: 9:29 PM
 */
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Abstract from '../../Abstract'
import LeftMenu from './Component/LeftMenu'
const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends Abstract{

    toggleMenu =()=>{
        this.Menu.toggleDrawer(true);
    }

    renderAppBar = ()=>{
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton}
                                    onClick={()=>this.toggleMenu()}
                                    color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title"
                                    onClick={()=>this.pushLink('/')}
                                    color="inherit"
                                    className={classes.flex}>
                            <div className="logo">
                                <span className="glyphicon glyphicon-edit"><b>TMoo</b>Quiz</span>
                            </div>
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    render(){
        return(
            <div className="tmooquiz-header">
                {this.renderAppBar()}
                <LeftMenu ref={menu => this.Menu = menu}/>
            </div>
        )
    }
}
export default withStyles(styles)(Header)