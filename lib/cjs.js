'use strict';

const emit = (instance, event, ...arg) => {
    const capitailze = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const handlerKey = (str) => {
        return str ? `on${capitailze(str)}` : '';
    };
    const { props } = instance;
    const handler = props[handlerKey(event)];
    handler && handler(...arg);
};

const initProps = (instance) => {
    console.log(instance, 'props');
    instance.props = instance.vnode.props || {};
};

const publicPropertiesMap = {
    $el: (instance) => instance.vnode.el
};
const publicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        const { setupState, props } = instance;
        console.log({ aa: instance });
        if (key in setupState) {
            return setupState[key];
        }
        const hasOwn = (val, key) => {
            return Object.prototype.hasOwnProperty.call(val, key);
        };
        if (hasOwn(publicPropertiesMap, key)) {
            return publicPropertiesMap[key](instance);
        }
        else if (hasOwn(props, key)) {
            return props[key];
        }
        //   const active = publicPropertiesMap[key]
        //   return active && active(instance)
        // }
    }
};

function createComponentInstance(vnode, container) {
    const component = {
        vnode,
        setupState: {},
        el: null,
        emit: () => { }
    };
    component.emit = emit.bind(null, component);
    return component;
}
function setupComponent(instance) {
    //TODO: initProps initSlots 
    initProps(instance);
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const Component = instance.vnode.type;
    console.log({ instance });
    instance.proxy = new Proxy({ _: instance }, publicInstanceProxyHandlers);
    const { setup } = Component;
    if (setup) {
        const setupResult = setup(instance, { emit: instance.emit });
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.vnode.type;
    console.log({ Component });
    instance.render = Component.render;
}

function createVNode(type, props, children) {
    console.log({
        type,
        props,
        children
    });
    return {
        type,
        props,
        children
    };
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // 先转换vnode
            // component -> vnode
            // 所有逻辑操作都基于vnode做处理
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        }
    };
}
function render(vnode, container) {
    console.log({ vnode, container });
    patch(vnode, container);
}
function isObject(value) {
    return value !== null && typeof value === 'object';
}
function patch(vnode, container) {
    //去处理组件
    //
    //
    const { type } = vnode;
    if (typeof type === 'string') {
        processElement(vnode, container);
    }
    else if (isObject(type))
        processComponent(vnode, container);
}
function processComponent(vnode, container) {
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance, container);
}
function setupRenderEffect(instance, container) {
    const subTree = instance.render.call(instance.proxy);
    console.log({ subTree });
    patch(subTree, container);
    instance.vnode.el = subTree.el;
}
function processElement(vnode, container) {
    const { type, props, children } = vnode;
    vnode.el = type;
    const el = document.createElement(type);
    Object.keys(props).forEach(key => {
        el.setAttribute(key, props[key]);
        if (key.startsWith('on')) {
            const event = key.slice(2).toLowerCase();
            document.addEventListener(event, props[key]);
        }
    });
    if (Array.isArray(children)) {
        children.forEach(child => {
            patch(child, el);
        });
    }
    else {
        el.textContent = children;
    }
    container.appendChild(el);
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;
