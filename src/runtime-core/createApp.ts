import { createComponentInstance, setupComponent } from "./component"
import { createVNode } from "./vnode.js"

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // 先转换vnode
      // component -> vnode
      // 所有逻辑操作都基于vnode做处理
      const vnode = createVNode(rootComponent)
      render(vnode, rootContainer)
    }
  }
}
function render(vnode, container) {
  console.log({ vnode, container })
  patch(vnode, container)
}

function isObject(value) {
  return value !== null && typeof value === 'object';
}
function patch(vnode, container) {
  //去处理组件
  //
  //
  const { type } = vnode
  if (typeof type === 'string') {
    processElement(vnode, container)
  } else if (isObject(type))
    processComponent(vnode, container)
}

function processComponent(vnode, container) {
  const instance = createComponentInstance(vnode, container)
  setupComponent(instance)
  setupRenderEffect(instance, container)
}


function setupRenderEffect(instance, container) {
  const subTree = instance.render.call(instance.proxy)
  console.log({ subTree })
  patch(subTree, container)
  instance.vnode.el = subTree.el
}

function processElement(vnode: any, container: any) {
  const { type, props, children } = vnode
  vnode.el = type
  const el = document.createElement(type)
  Object.keys(props).forEach(key => {
    el.setAttribute(key, props[key])
  })
  if (Array.isArray(children)) {
    children.forEach(child => {
      patch(child, el)
    })
  } else {
    el.textContent = children
  }
  container.appendChild(el)
}

