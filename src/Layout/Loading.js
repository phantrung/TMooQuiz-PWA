import React from 'react';
import LoadingComponent  from '../BaseComponent/Loading';
const $ = window.$;
class Loading extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props && this.props.type) {
            return (
                <div className="app-loading-more" 
                     id="app-loading-more" 
                     style={{
                         display:'none',
                         marginBottom: '52px',
                         marginTop: '-30px'
                     }}>
                    <LoadingComponent/>
                </div>
            );
        }
        return (
            <div className="app-loading" style={{display:'none'}} id="app-loading">
                <LoadingComponent/>
            </div>
        );
    }
}

export default Loading;