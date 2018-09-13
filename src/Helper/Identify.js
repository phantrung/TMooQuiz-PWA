import md5 from 'js-md5';
import * as Constants from '../Config/Constants';
// import {simicartPlugins} from '../Config';

const $ = window.$;

class Identify {
    static SESSION_STOREAGE = 1;
    static LOCAL_STOREAGE = 2;

    static makeid() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return md5(text + Date.now());
    }

    static __(text) {
        let simicart_config = this.getAppDashboardConfigs();
        let config = null;
        if (simicart_config !== null) {
            config = simicart_config['app-configs'][0] || null;
        }
        let merchant_config = this.getMerchantConfig();
        if ((config !== null && config.language) && (merchant_config && merchant_config.storeview.hasOwnProperty('base')
                && merchant_config.storeview.base.hasOwnProperty('locale_identifier'))) {
            let languageCode = merchant_config.storeview.base.locale_identifier;
            if (config.language.hasOwnProperty(languageCode)) {
                let language = config.language;
                let laguageWithCode = language[languageCode];
                if (laguageWithCode.hasOwnProperty(text)) {
                    return laguageWithCode[text];
                }
            }
        }
        return text;
    }



    static getCustomerData() {
        if (this.isLogin()) {
            return this.getDataFromStoreage(this.SESSION_STOREAGE, 'customer_data');
        }
        return false;
    }

    static validateEmail(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
    };

    static isLogin() {
        if (sessionStorage.getItem('email')) {
            return true;
        }
        return false;
    }

    static logout() {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('cache_email');
        sessionStorage.removeItem('cache_password');
        sessionStorage.removeItem('customer_data');
        this.showMenuAccount();
        this.clearQuote();
    }

    static login(email, password, name = null) {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
        sessionStorage.setItem('customer', name);
        sessionStorage.removeItem('cache_email');
        sessionStorage.removeItem('cache_password');
        this.showMenuAccount();
    }


    static cacheLogin(email, password) {
        sessionStorage.setItem('cache_email', email);
        sessionStorage.setItem('cache_password', password);
    }



    static storeDataToStoreage(type, key, data) {
        if (typeof(Storage) !== "undefined") {
            if (!key)
                return;
            //process data
            let pathConfig = key.split('/');
            let rootConfig = key;
            if (pathConfig.length === 1) {
                rootConfig = pathConfig[0];
            }
            //save to storegae
            data = JSON.stringify(data);
            if (type === this.SESSION_STOREAGE) {
                sessionStorage.setItem(rootConfig, data);
                return;
            }

            if (type === this.LOCAL_STOREAGE) {
                localStorage.setItem(rootConfig, data);
                return;
            }
        }
        console.log('This Browser dont supported storeage');
    }


    static getDataFromStoreage(type, key) {
        if (typeof(Storage) !== "undefined") {
            //process data
            let value = "";
            let data = '';
            if (type === this.SESSION_STOREAGE) {
                value = sessionStorage.getItem(key);
            }

            if (type === this.LOCAL_STOREAGE) {
                value = localStorage.getItem(key);
            }

            try {
                data = JSON.parse(value) || null;
            } catch (err) {
                data = value;
            }
            return data
        }
        console.log('This Browser dont supported storeage');
    }

    static showToastMessage(message, oneTime = false) {
        let stack = [];
        if (!oneTime) {
            $('#error-message').text(message);
            $('.message-global').show();
            setTimeout(function () {
                $('#error-message').text("");
                $('.message-global').hide();
            }, Constants.MESSAGE_DURATION);
        } else {
            let messageStack = this.getDataFromStoreage(this.SESSION_STOREAGE, 'MESSAGE_STACK');

            if (messageStack !== null) {
                messageStack = [...messageStack];
                stack = messageStack;
                let check = messageStack.filter((item) => {
                    return item.toLowerCase().localeCompare(message.toLowerCase()) !== -1;
                });
                if (check.length === 0) {
                    $('#error-message').text(message);
                    $('.message-global').show();
                    setTimeout(function () {
                        $('#error-message').text("");
                        $('.message-global').hide();
                    }, Constants.MESSAGE_DURATION);
                    stack.push(message);
                    this.storeDataToStoreage(this.SESSION_STOREAGE, 'MESSAGE_STACK', stack);

                }
            } else {
                $('#error-message').text(message);
                $('.message-global').show();
                setTimeout(function () {
                    $('#error-message').text("");
                    $('.message-global').hide();
                }, Constants.MESSAGE_DURATION);
                stack.push(message);
                this.storeDataToStoreage(this.SESSION_STOREAGE, 'MESSAGE_STACK', stack);
            }

        }

    }

    static detectPlatforms() {
        if (navigator.userAgent.match(/iPad|iPhone|iPod/)) {
            return 1;
        } else if (navigator.userAgent.match(/Android/)) {
            return 2;
        } else {
            return 3;
        }
    }

    static isOnLine() {
        let isOnline = true;
        window.addEventListener('load', function () {
            function updateOnlineStatus() {
                if (!navigator.onLine) {
                    isOnline = false;
                }
            }

            window.addEventListener('online', updateOnlineStatus);
            window.addEventListener('offline', updateOnlineStatus);
        });
        return isOnline;
    }

    static updateQueryStringParam = (key, value) => {
        let urlQueryString = document.location.search,
            newParam = key + '=' + value,
            params = '?' + newParam;

        // If the "search" string exists, then build params from it
        if (urlQueryString) {
            let keyRegex = new RegExp('([\?&])' + key + '[^&]*');

            // If param exists already, update it
            if (urlQueryString.match(keyRegex) !== null) {
                params = urlQueryString.replace(keyRegex, "$1" + newParam);
            } else { // Otherwise, add it to end of query string
                params = urlQueryString + '&' + newParam;
            }
        }
        return params;
    }

    /**
     * Scroll to special view and show this on middle screen
     * @param querySelector
     * @param duration
     */
    static smoothScrollToView = (querySelector, duration = 350) => {
        let offsetTop = querySelector.offset().top;
        let elementHeight = querySelector.height();
        let windowHeight = $(window).height();
        let offset = offsetTop;

        if (elementHeight < windowHeight) {
            offset = offsetTop - ((windowHeight / 2) - (elementHeight / 2));
        }

        $('html, body').animate({
            scrollTop: offset
        }, duration);
    }



    static capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static isVirtualCart = (quoteItems = []) => {
        let cartLength = quoteItems.length;
        let virtualItems = quoteItems.filter(item => {
            return item.is_virtual === true || parseInt(item.is_virtual) === 1;
        });
        return cartLength === virtualItems.length;
    }

    static getCardFormatByType(type) {

        let cardTypes = this.getCards();
        let findCard = cardTypes.filter(item => {
            return item.type === type;
        });
        if (findCard.length === 0) {
            return false;
        }

        return findCard[0];
    }

    static getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let location = {};
                location['lat'] = position.coords.latitude;
                location['long'] = position.coords.longitude;
                this.storeDataToStoreage(this.SESSION_STOREAGE, 'currentLocation', location);
                return location;
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
            return null;
        }
        return null;
    }

    static convertHTMLEntity(text){
        const span = document.createElement('span');

        return text
            .replace(/&[#A-Za-z0-9]+;/gi, (entity,position,text)=> {
                span.innerHTML = entity;
                return span.innerText;
            });
    }

    static showLoading() {
        $(document).ready(function () {
            // if(currentClass.props && currentClass.props.type){
            //     $('#app-loading-more').css({display:'flex'});
            // }else{
            $('#app-loading').css({display: 'flex'});
            // }

        });
    }

    static showMoreLoading() {
        let currentClass = this;
        $(document).ready(function () {
            $('#app-loading-more').css({display: 'flex'});
        });
    }

    static hideLoading() {
        $(document).ready(function () {
            $('#app-loading').css({display: 'none'});
            $('#app-loading-more').css({display: 'none'});
        });
    }

    static hideMoreLoading() {
        $(document).ready(function () {
            $('#app-loading-more').css({display: 'none'});
        });
    }
}

export default Identify;
