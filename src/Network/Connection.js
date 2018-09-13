import Identify from '../Helper/Identify';
import  * as Constants from '../Config/Constants';
import Model from '../Model/Model';
import ModelCollection from '../Model/ModelCollection';
//import fetch from 'node-fetch';

class Connection {
    constructor() {

        let current = this;
        this._loading = true;
        this.config = window.SMCONFIGS;
        // this.config = config;
        this._dataGet = null;
        this._dataPost = null;
        this._headers = new Headers({
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            // 'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
            // 'Access-Control-Allow-Credentials': true
        });
        this._init = {cache: 'default', mode: 'cors'};
        this.merchantConfig = Identify.getMerchantConfig();

    }

    setHeader(key, value) {
        this._headers.set(key, value);
    }

    setInitConfig(key, value) {
        this._init[key] = value;
    }

    setHttpMethod(method) {
        this._init['method'] = method;
    }

    setLoading(isLoad) {
        this._loading = isLoad;
    }

    restData() {
        this._dataGet = null;
        this._dataPost = null;
        this._init['body'] = null;
    }

    //param is array
    setGetData(data) {
        this._dataGet = Object.keys(data).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(data[key]);
        }).join('&');
    }

    //param is JSON
    setBodyData(data) {
        this._dataPost = JSON.stringify(data);
    }

    /**
     * param url - api resources/{id}/nested_resources/{nested_id}?refines
     * param obj - object that call to Api.
     **/
    connect(url, obj, method = 'GET') {
        if (!Identify.isOnLine()) {
            Identify.showToastMessage(Identify.__('No connection. Please check your Network!'));
            return false;
        }
        let _fullUrl = this.config.merchant_url;
        if (this.merchantConfig !== null) {
            if (parseInt(this.merchantConfig.storeview.base.use_store) === 1) {
                _fullUrl = this.merchantConfig.storeview.base.base_url || this.config.merchant_url;

            }
        }
        _fullUrl += this.config.api_path;
        _fullUrl += url;

        if (this._dataGet) {
            _fullUrl += "?" + this._dataGet;
            if (sessionStorage.getItem('email') && sessionStorage.getItem('password')) {
                let email = sessionStorage.getItem('email').replace(/['"]+/g, '');
                let password = sessionStorage.getItem('password').replace(/['"]+/g, '');
                _fullUrl += "&email=" + email + "&password=" + password;
            }
        } else {
            if (sessionStorage.getItem('email') && sessionStorage.getItem('password')) {
                let email = sessionStorage.getItem('email').replace(/['"]+/g, '');
                let password = sessionStorage.getItem('password').replace(/['"]+/g, '');
                _fullUrl += "?email=" + email + "&password=" + password;
            }
        }

        let merchantConfig = Identify.getMerchantConfig();
        if (method.toUpperCase() === 'PUT') {
            if (merchantConfig !== null) {
                if (merchantConfig.storeview !== undefined && merchantConfig.storeview.base.is_support_put !== undefined
                    && parseInt(merchantConfig.storeview.base.is_support_put) === 0) {
                    method = 'POST';
                    if (this._dataGet) {
                        _fullUrl += "&is_put=";
                    } else {
                        if (_fullUrl.includes('?'))
                            _fullUrl += "&is_put=1";
                        else
                            _fullUrl += "?is_put=1";
                    }

                }
            }
        }

        if (method.toUpperCase() === 'DELETE') {
            if (merchantConfig !== null) {
                if (merchantConfig.storeview !== undefined && merchantConfig.storeview.base.is_support_delete !== undefined
                    && parseInt(merchantConfig.storeview.base.is_support_delete) === 0) {
                    method = 'POST';
                    if (this._dataGet) {
                        _fullUrl += "&is_delete=1";
                    } else {
                        if (_fullUrl.includes('?'))
                            _fullUrl += "&is_delete=1";
                        else
                            _fullUrl += "?is_delete=1";
                    }

                }
            }
        }

        this._init['headers'] = this._headers;
        this._init['method'] = method;
        this._init['credentials'] = 'same-origin';
        if (this._dataPost) {
            this._init['body'] = this._dataPost;
        }
        if (method === 'GET') {
            this._init['body'] = null;
        }


        let _request = new Request(_fullUrl, this._init);
        fetch(_request)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok');
            })
            .then(function (data) {
                //set data to obj.
                if (obj._mounted || obj instanceof Model || obj instanceof ModelCollection) {
                    obj.setData(data);
                    obj.setLoaded(true);
                }
            }).catch((error) => {
            console.warn(error);
        });
    }

    /**
     * param method - simicart server
     **/
    async connectSimiCartServer(method = 'GET', forceUpdate =false, obj =null) {
        let _fullUrl = this.config.simicart_url + 'bear_token/' + this.config.simicart_authorization + '/pwa/1';
        let _init = {};
        _init['method'] = method;
        //_init['credentials'] = 'omit';
        _init['mode'] = 'cors';
        var _request = new Request(_fullUrl, _init);
        await fetch(_request)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                console.log(response);
                throw new Error('Network response was not ok');
            })
            .then(function (data) {
                Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, Constants.SIMICART_CONFIG, data);
                if (forceUpdate === true && obj !== null) {
                    obj.forceUpdate();
                }
            }).catch((error) => {
                console.warn(error);
            });
    }

    /**
     * Request to url without callback and save data to storeage
     * @param url
     * @param method
     * @param keyStore
     * @returns {Promise.<void>}
     */
    async connectRequestWithoutCallback(url, method = 'GET', keyStore = null) {
        if (!Identify.isOnLine()) {
            Identify.showToastMessage(Identify.__('No connection. Please check your Network!'));
            return false;
        }

        if (keyStore === null) console.log('keyStore is not emplty')
        let _fullUrl = this.config.merchant_url;
        if (this.merchantConfig !== null) {
            if (parseInt(this.merchantConfig.storeview.base.use_store) === 1) {
                _fullUrl = this.merchantConfig.storeview.base.base_url || this.config.merchant_url;
            }
        }
        _fullUrl += this.config.api_path;
        _fullUrl += url;

        if (this._dataGet) {
            _fullUrl += "?" + this._dataGet;
            if (sessionStorage.getItem('email') && sessionStorage.getItem('password')) {
                let email = sessionStorage.getItem('email').replace(/['"]+/g, '');
                let password = sessionStorage.getItem('password').replace(/['"]+/g, '');
                _fullUrl += "&email=" + email + "&password=" + password;
            }
        } else {
            if (sessionStorage.getItem('email') && sessionStorage.getItem('password')) {
                let email = sessionStorage.getItem('email').replace(/['"]+/g, '');
                let password = sessionStorage.getItem('password').replace(/['"]+/g, '');
                _fullUrl += "?email=" + email + "&password=" + password;
            }
        }

        this._init['headers'] = this._headers;
        this._init['method'] = method;
        this._init['credentials'] = 'same-origin';
        if (this._dataPost) {
            this._init['body'] = this._dataPost;
        }
        if (method === 'GET') {
            this._init['body'] = null;
        }
        let _request = new Request(_fullUrl, this._init);
        fetch(_request)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok');
            })
            .then(function (data) {
                if (!data.hasOwnProperty('errors')) {
                    Identify.storeDataToStoreage(Identify.SESSION_STOREAGE, keyStore, data);
                }
            }).catch((error) => {
            console.warn(error);
        });
    }

    async connectRequestAndReturnHtmlContent(_fullUrl, method = 'GET') {
        if (!Identify.isOnLine()) {
            Identify.showToastMessage(Identify.__('No connection. Please check your Network!'));
            return false;
        }

        this._init['headers'] = this._headers;
        this._init['method'] = method;
        this._init['credentials'] = 'same-origin';
        if (this._dataPost) {
            this._init['body'] = this._dataPost;
        }
        if (method === 'GET') {
            this._init['body'] = null;
        }
        let _request = new Request(_fullUrl, this._init);
        fetch(_request)
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Network response was not ok');
            })
            .catch((error) => {
                console.warn(error);
            });
    }
}

const connection = new Connection();
export default connection;
