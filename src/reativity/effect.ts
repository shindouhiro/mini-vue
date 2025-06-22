let activeEffect
let shouldTrack = true
const bucket = new WeakMap()

export class ReactiveEffect {
  private _fn: any
  deps: Set<ReactiveEffect>[] = []
  active = true
  onStop?: () => void
  public scheduler: Function | undefined
  
  constructor(fn, scheduler?: Function) {
    this._fn = fn
    this.scheduler = scheduler
  }

  run() {
    if (!this.active) {
      return this._fn()
    }

    shouldTrack = true
    activeEffect = this

    const result = this._fn()
    shouldTrack = false

    return result
  }

  stop() {
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}

function cleanupEffect(effect: ReactiveEffect) {
  effect.deps.forEach((dep) => {
    dep.delete(effect)
  })
  effect.deps.length = 0
}

export interface ReactiveEffectOptions {
  scheduler?: Function
  onStop?: () => void
}

export function effect(fn: Function, options: ReactiveEffectOptions = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler)
  
  // 将 options 中的属性复制到 _effect
  Object.assign(_effect, options)
  
  _effect.run()

  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect

  return runner
}

export function stop(runner) {
  runner.effect.stop()
}

export function track(target, key) {
  if (!isTracking()) return

  let depsMap = bucket.get(target)
  if (!depsMap) {
    depsMap = new Map()
    bucket.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  trackEffects(dep)
}

export function trackEffects(dep) {
  if (!activeEffect) return
  if (dep.has(activeEffect)) return

  dep.add(activeEffect)
  activeEffect.deps.push(dep)
}

export function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return

  const dep = depsMap.get(key)
  if (!dep) return

  triggerEffects(dep)
}

export function triggerEffects(dep) {
  const effects = Array.from(dep)
  effects.forEach(effect => {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  })
}

function isTracking() {
  return shouldTrack && activeEffect !== undefined
}
