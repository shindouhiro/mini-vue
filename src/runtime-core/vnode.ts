export function createVNode(type, props?, children?) {
  console.log({
    type,
    props,
    children
  })
  return {
    type,
    props,
    children
  }
}
