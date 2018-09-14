/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 9/13/18
 * Time: 8:52 PM
 */
import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import {configColor} from "../../Config";
import PropTypes from 'prop-types';

class MuiListItem extends Component {
    render() {
        let {title,icon,divider,menuStyle,iconStyle,titleStyle} = this.props;
        return (
            <div>
                <ListItem button style={menuStyle} onClick={this.props.onClick}>
                    <div className="list-item-content">
                        <div className="item-icon" style={iconStyle}>
                            {icon}
                        </div>
                        <div className="item-title" style={titleStyle}>
                            {title}
                        </div>
                    </div>
                </ListItem>
                {divider && (
                    <Divider style={{backgroundColor:configColor.menu_line_color}}/>
                )}
            </div>

        )
    }
}
MuiListItem.defaultProps = {
    title : '',
    icon : '',
    divider : true,
    menuStyle : {},
    titleStyle : {},
    iconStyle : {},
    onClick : function () {}
}
MuiListItem.propsTypes = {
    title: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.string,
    ]),
    icon: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.string,
    ]),
    divider: PropTypes.bool,
    menuStyle : PropTypes.object,
    titleStyle : PropTypes.object,
    iconStyle : PropTypes.object,
    onClick : PropTypes.func
}
export default MuiListItem;