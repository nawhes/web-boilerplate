// https://stackoverflow.com/a/8649003

export default function(search) {
    const result = {};
    if (search.length > 1) {
        if (search[0] === '?')
            search = search.substring(1);
        const firstStep = `{ "${search.replace(/&/g, '","').replace(/=/g, '":"')}" }`;
        const secondStep = JSON.parse(firstStep, reviver);
        Object.assign(result, secondStep);
    }
    return result;
}

function reviver(key, value) {
    return key === "" ? value:decodeURIComponent(value)
}