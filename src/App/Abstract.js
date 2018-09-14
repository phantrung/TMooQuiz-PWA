import {Component} from 'react';
import PropTypes from 'prop-types'
const $ = window.$;
class Base extends Component{
    constructor(props, context) {
        super(props);
        this._mounted = true;
        let isPhone = window.innerWidth < 768 ;
        this.state = {isPhone}
    }

    // async MixpanelTrack(){
    //     // SimiMixpanel.track();
    //     import(/* webpackChunkName: "Mixpanel"*/'../components/plugins/mixpanel').then(Mixpanel => {
    //         Mixpanel.default.track();
    //     })
    // }

    setLoaded(loaded) {
        this.setState({loaded: loaded})
    }

    setData(data) {
        this.setState({data: data})
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    shouldComponentUpdate(nextProps,nextState){
        return this.shallowCompare(this,nextProps,nextState);
    }

    shallowEqual(objA, objB) {
        if (objA === objB) {
            return false;
        }

        if (typeof objA !== 'object' || objA === null ||
            typeof objB !== 'object' || objB === null) {
            return false;
        }

        let keysA = Object.keys(objA);
        let keysB = Object.keys(objB);

        if (keysA.length !== keysB.length) {
            return false;
        }

        // Test for A's keys different from B.
        let bHasOwnProperty = hasOwnProperty.bind(objB);
        let length = keysA.length;
        for (let i = 0; i < length; i++) {
            if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
                return false;
            }
        }

        return true;
    }

    shallowCompare(instance, nextProps, nextState) {
        return (
            !this.shallowEqual(instance.props, nextProps) ||
            !this.shallowEqual(instance.state, nextState)
        );
    }

    pushLink = (link)=>{
        let browserHistory = this.context.router.history;
        browserHistory.push(link);
    }

    replaceLink = (link) => {
        let browserHistory = this.context.router.history;
        browserHistory.replace(link)
    }
}
Base.contextTypes = {
    router: PropTypes.object
};
export default Base