import { initProps } from "./componentProps"
import { publicInstanceProxyHandlers } from "./componentPublicInstance"

export function createComponentInstance(vnode, container) {
  const component = {
    vnode,
    setupState: {},
    el: null

  }
  return component
}

export function setupComponent(instance) {
  //TODO: initProps initSlots 
  initProps(instance)
  setupStatefulComponent(instance)
}
function setupStatefulComponent(instance) {
  const Component = instance.vnode.type
  console.log({ instance })
  instance.proxy = new Proxy({ _: instance },
    publicInstanceProxyHandlers
  )

  const { setup } = Component
  if (setup) {
    const setupResult = setup(instance)
    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance: any, setupResult: any) {
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.vnode.type
  console.log({ Component })
  instance.render = Component.render

}

