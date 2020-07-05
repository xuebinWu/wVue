// import {popTarget, pushTarget} from './dep'
class Watcher {
  constructor(vm, expOrfn, cb) {
    this.vm = vm
    this.expOrfn = expOrfn
    this.cb = cb
    this.deps = []
    this.getter = typeof expOrfn === 'function' ? expOrfn : parsePath(expOrfn)
    this.value = this.get()
    console.log('this.value', this.value)
  }

  get() {
    pushTarget(this)
    const vm = this.vm
    this.getter.call(vm, vm)
    popTarget()
  }

  addDep(dep) {
    dep.addSub(this)
  }

  update() {
    // console.log('need update')
    this.get()
  }
}