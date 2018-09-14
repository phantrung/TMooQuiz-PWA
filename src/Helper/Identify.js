import md5 from 'js-md5';
import * as Constants from '../Config/Constants';

const $ = window.$;

class Identify {
    static SESSION_STOREAGE = 1;
    static LOCAL_STOREAGE = 2;

    //main functions

    static makeid() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return md5(text + Date.now());
    }

    //storage handling

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
        console.log('This browser does not support local storage');
    }

    //config control

    static detectPlatforms() {
        if (navigator.userAgent.match(/iPad|iPhone|iPod/)) {
            return 1;
        } else if (navigator.userAgent.match(/Android/)) {
            return 2;
        } else {
            return 3;
        }
    }

    //string handling

    static validateEmail(email) {
        return /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,4})+$/.test(email);
    };

    static capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //loading

    static showLoading() {
        $(document).ready(function () {
            $('#app-loading').css({display: 'flex'});
        });
    }

    static hideLoading() {
        $(document).ready(function () {
            $('#app-loading').css({display: 'none'});
            $('#app-loading-more').css({display: 'none'});
        });
    }

    //toast message

    static showToastMessage(message, oneTime = 1000) {
        $('#error-message').text(message);
        $('.message-global').show();
        setTimeout(function () {
            $('#error-message').text("");
            $('.message-global').hide();
        }, oneTime);
    }

    //others

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


    static smoothScrollToView = (querySelector, duration = 350) => {
        if(querySelector && querySelector.offset() instanceof Object){
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

    }
}

export default Identify;
