import React from 'react';
const $ = window.$;
export default class Message extends React.PureComponent{
  renderJs(){
    $(document).ready(function(){
      $('#close-message').click(function(){
        $('.message-global').hide();
      });
    });
  }
  render(){
    return (
      <div className="message-global" style={{display: 'none'}}>
        <div id="error-message">
        </div>
        <div id="success-message">
        </div>
        <div id="waring-message">
        </div>
        {this.renderJs()}
      </div>
    );
  }
}
