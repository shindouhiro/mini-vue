import { emit } from "./componentEmit"
import { initProps } from "./componentProps"
import { publicInstanceProxyHandlers } from "./componentPublicInstance"

export function createComponentInstance(vnode, container) {
  const component = {
    vnode,
    setupState: {},
    el: null,
    emit: () => { }
  }
  component.emit = emit.bind(null, component) as any
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
    const setupResult = setup(instance, { emit: instance.emit })
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

