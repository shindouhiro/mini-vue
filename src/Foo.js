import { h } from '../lib/esm.js'
export default {
  setup(props, { emit }) {
    console.log(props, 'init')
    const handleClick = () => {
      console.log(emit, 'emit')
      emit('add', 1, 2)
    }
    return {
      handleClick
    }
  },
  render() {
    const btn = h("div", { onClick: this.handleClick }, 'Click me')
    return h("div", {}, ["foo" + this.count, btn])
  }
}
