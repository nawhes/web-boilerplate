const setCookie = (name, value, day) => {
    var date = new Date();
    date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

const getCookie = (name) => {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};

const deleteCookie = (name) => {
    var date = new Date();
    document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
}

export { setCookie, getCookie, deleteCookie };