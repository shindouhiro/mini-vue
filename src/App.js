import { h } from '../lib/esm.js'
window.self = null
export default {
  render() {
    window.self = this
    return h("div", { class: 'red' }, [
      h("p", { class: 'blue' }, "我是一个p " + this.msg),
      h("span", { class: 'yellow' }, "我是一个span")
    ])
  },
  setup() {
    return {
      msg: "mini vue"
    }
  }
}
