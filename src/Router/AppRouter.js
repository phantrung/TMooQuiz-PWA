/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/4/18
 * Time: 8:29 PM
 */
import React from 'react';
import {
    BrowserRouter as Router
} from 'react-router-dom'
import {Switch, Route} from 'react-router';
import Layout from '../Layout/'
import {router} from "./RouterConfig";
import Base from '../App/Abstract';
import {LazyRoute} from "../BaseComponent/Async/index";
import Identify from "../Helper/Identify";

class AppRouter extends Base{
    render(){
        return (
            <Router basename={"/"}>
                <Layout>
                    <Switch>
                        <LazyRoute exact {...router.home}/>
                    </Switch>
                </Layout>
            </Router>
        )
    }
}
export default AppRouter