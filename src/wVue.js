class wVue {
  constructor (options) {
    let vm = this
    vm.$el = document.querySelector(options.el)
    vm._parent = vm.$el.parentNode
    vm.$options = options
    vm.$data = vm.$options.data
    vm._self = vm

    new Observe(vm.$data)

    initProxy(vm, vm.$data)

    vm.$watcher = function(expOrfn, cb) {
      return new Watcher(vm, expOrfn, cb)
    }

    initLifeCycle(vm)
    callHook(vm, 'created')
    // new Compiler(vm.$options.el, vm)
    this.mount()
    callHook(vm, 'mounted')
  }


}
function initLifeCycle(vm) {
  const LIFECYCLE_HOOKS = [
    'created',
    'mounted'
  ]
  LIFECYCLE_HOOKS.forEach(hook => {
    vm.$options[hook] = vm.$options[hook] || function() {}
  })
}

function callHook(vm, hook) {
  let handlers = vm.$options[hook]
  handlers && handlers.call(vm)
}