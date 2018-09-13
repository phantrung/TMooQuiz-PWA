import React from 'react'
// import Tapita from './Tapita'
import TMooQuiz from './TMooQuiz';
class App extends React.Component {
    render(){
        return (
            <TMooQuiz children={this.props.children}/>
        )
    }
}
export default App