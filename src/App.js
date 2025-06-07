import { h } from '../lib/esm.js'
export default {
  render() {
    return h("div", "hi," + this.msg)
  },
  setup() {
    return {
      msg: "mini vue"
    }
  }
}
