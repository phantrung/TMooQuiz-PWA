import React from 'react'
import PropTypes from 'prop-types'
import Identify from "../Helper/Identify";
const $ = window.$
class Footer extends React.Component {
    state = {
        isPhone : window.innerWidth < 768
    }
    renderJs(){
        let obj = this;
        $(function () {
            $(window).scrollTop(0);
            $(window).resize(function () {
                let width = $(this).width();
                let isPhone = width < 768;
                if(obj.state.isPhone !== isPhone){
                    let history = obj.context.router.history;
                    let {location} = history;
                    location.state = Identify.makeid();
                    history.replace(location)
                }

            })
        })
    }

    render(){
        return (
            <div id="livesite-footer">
                {this.renderJs()}
            </div>
        )
    }
}
Footer.contextTypes = {
    router: PropTypes.object
};
export default Footer