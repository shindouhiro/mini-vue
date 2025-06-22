const publicPropertiesMap = {
  $el: (instance) => instance.vnode.el
}
export const publicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { setupState } = instance
    console.log({ aa: instance })
    if (key in setupState) {
      return setupState[key]
    }
    const active = publicPropertiesMap[key]
    return active && active(instance)
  }
}
