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

function patch(vnode, container) {
  //去处理组件
  //
  //
  processComponent(vnode, container)
}

function processComponent(vnode, container) {
  const instance = createComponentInstance(vnode, container)
  setupComponent(instance)
  setupRenderEffect(instance, container)
}


function setupRenderEffect(instance, container) {
  const subTree = instance.render()
  console.log({ subTree })
  patch(subTree, container)
}

