/**
 * Created by PhpStorm.
 * User: Peter
 * Date: 8/4/18
 * Time: 8:37 PM
 */
import React from 'react'
import './style.css'
import Header from './Header'
class TMooQuiz extends React.Component{

    render(){
        return (
            <div>
                <Header/>
                <div id="tmooquiz-body">
                    <div className="tmooquiz-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
export default TMooQuiz