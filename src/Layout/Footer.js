import React from 'react'
const $ = window.$
class Footer extends React.Component {
    renderJs(){
        $(function () {
            $(window).scrollTop(0);
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
export default Footer