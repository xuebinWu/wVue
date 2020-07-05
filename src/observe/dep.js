class Dep {
  constructor() {
    this.subs = []
  }

  addDepend() {
    Dep.target.addDep(this)
  }

  addSub(sub) {
    // sub is a Watcher
    this.subs.push(sub)
  }

  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
Dep.target = null
const tagetStack = []

// target is a watcher
function pushTarget(target) {
  if (Dep.target) tagetStack.push(Dep.target)
  Dep.target = target
}

function popTarget() {
  Dep.target = tagetStack.pop()
}