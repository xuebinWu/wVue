wVue.prototype.mount = function() {
  this.render = this.createRenderFn()
  this.mountComponent()
}

wVue.prototype.mountComponent = function() {
  let mount = function() {
    console.log('execute mount fn')
    this.update(this.render())
  }
  new Watcher(this, mount)
}

wVue.prototype.createRenderFn = function() {
  // let ast = getVNode(this.$el)
  let ast = parseToAst(this.$el, this)
  return function render() {
    let _vnodeT = combineData(ast, this.$data)
    return _vnodeT
  }
}

wVue.prototype.update = function(vnode) {
  const realDom = parseVNode(vnode, this)
  console.log('realDom')
  console.log(realDom)
  this._parent.replaceChild(realDom, document.querySelector('#app'))
}