export const initProps = (instance) => {
  console.log(instance, 'props')
  instance.props = instance.vnode.props || {}
}
