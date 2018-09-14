/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 9/13/18
 * Time: 8:11 PM
 */
import React from 'react'
import Abstract from '../../../Abstract'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List'
import MuiListItem from "../../../../BaseComponent/List/ListItem";
import Folder from '@material-ui/icons/Folder'
import {configColor} from "../../../../Config";
import ListIcon from '@material-ui/icons/List'
import FolderOpen from '@material-ui/icons/FolderSpecial'
const styles = {
    iconMenu : {
        width:27,
        height:27
    }
}
class LeftMenu extends Abstract{

    constructor(props) {
        super(props);
        this.state = {
            open : false
        }
    }


    toggleDrawer = (open) => {
        this.setState({open});
    };

    renderCate = ()=>{
        let obj = this;
        let pathname = window.location.pathname;
        const menu = window.Categories.map((item,key)=>{
            let url = '/danh-muc/'+item.cat_slug+'.html'
            let check_active = pathname.indexOf(url) > -1;
            let icon = check_active ? <FolderOpen style={styles.iconMenu}/> : <Folder style={styles.iconMenu}/>
            return <MuiListItem key={key}
                                icon={icon}
                                title={item.category}
                                divider={false}
                                onClick={()=>obj.pushLink(url)}
                                menuStyle={{
                                    borderLeft : check_active ? '5px solid '+configColor.primary_color : 'none',
                                    color : check_active ? '#fff' : '#b8c7ce'
                                }}
            />
        });
        return menu
    }

    render(){
        return(
            <Drawer open={this.state.open} onClose={()=>this.toggleDrawer(false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={()=>this.toggleDrawer(false)}
                    style={{color:'#b8c7ce'}}
                >
                    <div style={{
                        width:250,
                        marginBottom:20,
                        backgroundColor:'#222d31'
                    }}>
                        <div className="item-more flex">
                            <ListIcon style={styles.iconMenu}/>
                            <div style={{marginLeft:10}}>Chuyên mục</div>
                        </div>
                        <List>{this.renderCate()}</List>
                    </div>
                </div>
            </Drawer>
        )
    }
}
export default LeftMenu