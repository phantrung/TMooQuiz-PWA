import React from 'react'
import Footer from './Footer'
import Message from './Message'
import Error from './Error'
import App from '../App/index';
import Loading from './Loading'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {configColor} from "../Config";

const theme = createMuiTheme({
    palette: {
        type: 'light', // Switching the dark mode on is a single property value change.
        primary: {
            main : configColor.primary_color
        },
        test : {
            main : '#000'
        }
    },
    typography : {
        fontFamily : "Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif"
    },
});
class Layout extends React.Component {
    render(){
        return (
            <Error>
                <MuiThemeProvider theme={theme}>
                    <div className={``} style={{minHeight : window.innerHeight}}>
                        <App children={this.props.children}/>
                        <Footer />
                        <Loading/>
                        <Message/>
                    </div>
                </MuiThemeProvider>
            </Error>
        )
    }
}
export default Layout;