const publicPropertiesMap = {
  $el: (instance) => instance.vnode.el
}
export const publicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { setupState, props } = instance
    console.log({ aa: instance })
    if (key in setupState) {
      return setupState[key]
    }
    const hasOwn = (val, key) => {
      return Object.prototype.hasOwnProperty.call(val, key)
    }
    if (hasOwn(publicPropertiesMap, key)) {
      return publicPropertiesMap[key](instance)
    } else if (hasOwn(props, key)) {
      return props[key]
    }
    //   const active = publicPropertiesMap[key]
    //   return active && active(instance)
    // }
  }
}
