export const publicComponentInstance = {
  get(target, key) {
    if (key in setupResult) {
      return target[key]
    }
    if (key === "$el") {
      return instance.vnode.el
    }
  }
}
