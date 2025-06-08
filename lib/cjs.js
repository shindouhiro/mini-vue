'use strict';

function createComponentInstance(vnode, container) {
    const component = {
        vnode
    };
    return component;
}
function setupComponent(instance) {
    //TODO: initProps initSlots 
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const Component = instance.vnode.type;
    const { setup } = Component;
    if (setup) {
        const setupResult = setup();
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
    const subTree = instance.render();
    console.log({ subTree });
    patch(subTree, container);
}
function processElement(vnode, container) {
    const { type, props, children } = vnode;
    const el = document.createElement(type);
    Object.keys(props).forEach(key => {
        el.setAttribute(key, props[key]);
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
