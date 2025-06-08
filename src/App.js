import { h } from '../lib/esm.js'
export default {
  render() {
    return h("div", { class: 'red' }, [
      h("p", { class: 'blue' }, "我是一个p"),
      h("span", { class: 'yellow' }, "我是一个span")
    ])
  },
  setup() {
    return {
      msg: "mini vue"
    }
  }
}
