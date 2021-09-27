const options = {
    currentStateKey: 0,
    renderCount: 0,
    states: [],
    root: null,
    rootComponent: null,
}

function renderElement(node) {
    if (typeof node === "string") {
        return document.createTextNode(node);
    }
    if (node instanceof HTMLElement) {
        return node;
    }
    if (typeof node === 'function') {
        return node();
        // console.log(node);
    }
    const el = document.createElement(node.type);
    for (const prop in node.props) {
        if (prop === 'className')
            el.className += node.props[prop];
        else
            el.setAttribute(prop, node.props[prop]);
    }
    node.children.map(renderElement).forEach((element) => {
        if (!(element instanceof HTMLElement)) {
            console.log(element);
            // element = createElement(element.type);
        }
        el.appendChild(element);
    });
    return el;
}


function _render() {
    const { root, rootComponent } = options;
    if (!root || !rootComponent)
        return;
    root.removeChild(root.firstChild);
    root.appendChild(renderElement(rootComponent));
    options.currentStateKey = 0;
    options.renderCount++;
}

function render(newVdom, container) {
    options.root = container;
    options.rootComponent = newVdom;
    _render();
}

function createElement(type, props = {}, ...children) {
    if (typeof type === "function") {
        return type.apply(null, [props, ...children]);
    }
    return { type, props, children };
}

function useState(initState) {
    const { currentStateKey, states } = options;
    if (states.length === currentStateKey)
        states.push(initState);

    const state = options.states[currentStateKey];
    const setState = (newState) => {
        states[currentStateKey] = newState;
        _render();
    }
    options.currentStateKey += 1;
    return [state, setState];
}

export default { render, createElement, renderElement, useState }