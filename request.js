/**
 * Created by tcstory on 4/6/16.
 */

function request(opts) {
    "use strict";
    if (typeof opts.method === 'undefined') {
        throw new Error('空的方法');
    }
    if (typeof opts.url === 'undefined') {
        throw new Error('空的url');
    }
    var xhr = new XMLHttpRequest();
    xhr.open(opts.method, opts.url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (typeof opts.success === 'function') {
                opts.success(response, xhr);
            } else {
                console.warn('无请求成功回调函数');
            }
        } else {
            if (typeof opts.error === 'function') {
                opts.error(xhr);
            } else {
                console.warn('无请求错误回调函数');
            }
        }
    };
    if (typeof opts.xhrFields !== 'undefined') {
        Object.keys(opts.xhrFields).forEach(function (item) {
            xhr[item] = opts.xhrFields[item];
        })
    }
    if (typeof opts.timeout !== 'undefined') {
        xhr.timeout = opts.timeout;
        xhr.ontimeout = function () {
            console.warn('请求' + opts.url + '超时');
        }
    } else {
        xhr.timeout = 5000;
        xhr.ontimeout = function () {
            console.warn('请求' + opts.url + '超时');
        }
    }
    if (typeof opts.contentType === 'undefined') {
        opts.contentType = 'application/json';
    }
    xhr.setRequestHeader('Content-Type', opts.contentType);
    switch (opts.method.toLocaleLowerCase()) {
        case 'get':
        case 'delete':
            xhr.send();
            return;
        case 'post':
            if (typeof opts.data !== 'undefined') {
                xhr.send(JSON.stringify(opts.data));
            } else {
                xhr.send(null);
            }
            return;
    }
}


if (typeof module !== 'undefined') {
    module.exports = request;
}
