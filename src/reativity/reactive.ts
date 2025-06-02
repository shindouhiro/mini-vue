import { track, trigger } from "./effect"

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      //TODO: 收集依赖
      track(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, val) {
      //TODO: 触发依赖
      const res = Reflect.set(target, key, val)
      trigger(target, key)
      return res
    }
  })
}
