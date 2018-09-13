import React from "react";
import Identify from '../Helper/Identify';
import {Loading} from "../BaseComponent/Loading/index";
import {configColor} from "../Config";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        if(window.location.hostname !== 'localhost'){
            this.setState({ hasError: true });
            console.log(error);
            //console.log(info);
            // You can also log the error to an error reporting service
            let api = 'https://www.simicart.com/appdashboard/rest/v2/bugs';
            let params = {
                type : 'pwa',
                url : window.location.href,
                detail : error.stack
            };
            //console.log(params.detail)
            // this.logErrorToServer(api,'POST', params);
            Identify.showToastMessage(Identify.__('Something went wrong'));
        }

    }

    async logErrorToServer (api, method = 'GET', params = null) {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
            'Authorization' : 'Bearer ' +window.SMCONFIGS.simicart_authorization
            // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            // 'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
            // 'Access-Control-Allow-Credentials': true,
        });
        let init = {cache: 'default', mode: 'cors',headers};
        init['method'] = method;
        if (params) {
            params = JSON.stringify(params);
            init['body'] = params;
        }
        let _request = new Request(api, init);
        fetch(_request)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok');
            })
            .then(function (data) {
                console.log(data);
            }).catch((error) => {
            //alert(error.toString());
            console.error(error);
        });
    }

    render() {
        if (this.state.hasError && window.location.hostname !== 'localhost') {
            // You can render any custom fallback UI
            let loadingStyle = {
                fill: configColor.loading_color,
                marginTop : 50
            };
            let img = window.SMCONFIGS.hasOwnProperty('splash_screen') && window.SMCONFIGS.splash_screen ?
                <img src={window.SMCONFIGS.splash_screen}
                    alt="Splash Screen"
                    style={{width: 325,height: 'auto'}}
                /> : null;
            return (
                <div className="splash-screen" style={{marginTop: '20%',textAlign: 'center'}}>
                    {img}
                    <h3 className="text-center" style={{marginTop : 20}}>Something went wrong.</h3>
                    <Loading style={loadingStyle}/>
                </div>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary