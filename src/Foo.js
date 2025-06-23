import { h } from '../lib/esm.js'
export default {
  setup(props) {
    console.log(props, 'init')
  },
  render() {
    return h("div", {}, "foo" + this.count)
  }
}
