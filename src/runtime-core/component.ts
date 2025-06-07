export function createComponentInstance(vnode, container) {
  const component = {
    vnode
  }
  return component
}

export function setupComponent(instance) {
  //TODO: initProps initSlots 
  setupStatefulComponent(instance)
}
function setupStatefulComponent(instance) {
  const Component = instance.vnode.type
  const { setup } = Component
  if (setup) {
    const setupResult = setup()
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

