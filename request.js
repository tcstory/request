/**
 * Created by tcstory on 4/6/16.
 */

function request(opts) {
    "use strict";
    if (typeof opts.method === 'undefined') {
        throw new Error('空的method');
    }
    if (typeof opts.url === 'undefined') {
        throw new Error('空的url');
    }
    var xhr = new XMLHttpRequest();
    xhr.open(opts.method, opts.url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            if (typeof opts.success === 'function') {
                var contentType = xhr.getResponseHeader('Content-Type');
                if (/application\/json/gi.test(contentType)) {
                    var response = JSON.parse(xhr.responseText);
                } else {
                    var response = xhr.responseText;
                }
                opts.success(response, xhr);
            } else {
                if (request.debug) {
                    console.warn('%c[' + opts.method + ']%c' + opts.url + ' %c无请求成功回调函数',
                        'color: green;', 'color:#03A9F4', 'color:black;');
                }
            }
        } else {
            if (typeof opts.error === 'function') {
                opts.error(xhr);
            } else {
                if (request.debug) {
                    console.warn('%c[' + opts.method + ']%c' + opts.url + ' %c无请求失败回调函数',
                        'color: green;', 'color:#03A9F4', 'color:black;');
                }
            }
        }
    };
    if (typeof opts.xhrFields !== 'undefined') {
        Object.keys(opts.xhrFields).forEach(function (item) {
            xhr[item] = opts.xhrFields[item];
        })
    }
    if (typeof opts.timeout === 'number') {
        xhr.timeout = opts.timeout;
        if (typeof opts.timeoutFunc === 'function') {
            xhr.ontimeout = opts.timeoutFunc;
        } else {
            xhr.ontimeout = function () {
                if (request.debug) {
                    console.warn('%c[' + opts.method + ']%c' + opts.url + ' %c无请求超时回调函数',
                        'color: green;', 'color:#03A9F4', 'color:black;');
                }
            }
        }
    } else {
        xhr.timeout = 5000;
        xhr.ontimeout = function () {
            console.warn('%c[' + opts.method + ']%c' + opts.url + ' %c无请求超时回调函数',
                'color: green;', 'color:#03A9F4', 'color:black;');
        }
    }
    switch (opts.method.toLocaleLowerCase()) {
        case 'get':
        case 'delete':
            xhr.send();
            return;
        case 'post':
            if (typeof opts.data !== 'undefined') {
                if (opts.data instanceof FormData) {
                    xhr.send(opts.data);
                } else {
                    if (typeof opts.contentType === 'undefined') {
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.send(JSON.stringify(opts.data));
                    } else {
                        if (opts.contentType === 'application/x-www-form-urlencoded') {
                            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                            var str = '';
                            Object.keys(opts.data).forEach(function (item) {
                                str += item + '=' + opts.data[item] + '&';
                            });
                            str = str.replace(/&$/, '');
                            xhr.send(str);
                        } else if (opts.contentType === 'application/json') {
                            xhr.setRequestHeader('Content-Type', 'application/json');
                            xhr.send(JSON.stringify(opts.data));
                        }
                    }
                }
            } else {
                xhr.send(null);
            }
            return;
    }
}

request.debug = false;

if (typeof module !== 'undefined') {
    module.exports = request;
}
