import { h } from '../lib/esm.js'
import Foo from './Foo.js'
window.self = null
export default {

  render() {
    const handleClick = (e) => {
      e.stopPropagation();
      console.log('click')
    }

    const handleBlur = () => {
      console.log('blur')
    }
    window.self = this
    return h("div", { class: 'red' }, [
      h("p", { class: 'blue', onClick: handleClick }, "我是一个p " + this.msg),
      h("input", { class: 'yellow', onChange: handleBlur }, "我是一个span",),
      h(Foo, { count: 10, onAdd: (a, b) => { console.log("sum", a + b) } }, "")

    ])
  },
  setup() {
    return {
      msg: "mini vue"
    }
  }
}
