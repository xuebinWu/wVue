class Compiler {
  constructor(el, vm) {
    // vm.$el = document.querySelector(el)
    // this.parse(vm.$el)
  }
}
// html dom => ast
function parseToAst(node, vm) {
  let nodeType = node.nodeType
  let _vnode = null
  if (nodeType === 1) {
    let tag = node.nodeName
    let attrs = node.attributes
    let attrObjs = {
      attrs: {},
      directives: {}
    }
    let _value = undefined
    for (let i =0; i < attrs.length; i++) {
      if (attrs[i].nodeName.includes('v-')) {
        _value = vm[attrs[i].nodeValue]
        attrObjs['directives'][attrs[i].nodeName] = attrs[i].nodeValue
      } else {
        attrObjs['attrs'][attrs[i].nodeName] = attrs[i].nodeValue
      }
    }
    _vnode = new VNode(tag, attrObjs, _value, nodeType)
    //
    let childNodes = node.childNodes
    for (let i = 0; i < childNodes.length; i++) {
      _vnode.appendChild(parseToAst(childNodes[i], vm))
    }
  } else if (nodeType === 3) {
    _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType)
  }

  return _vnode
}


let reg = /\{\{(.*)\}\}/g

function combineData(vnode, data) {
  let _tag = vnode.tag
  let _data = vnode.data
  let _value = vnode.value
  let _type = vnode.type
  let _childNodes = vnode.childNodes

  let _vnode = null
  if (_type === 1) {
    _vnode = new VNode(_tag, _data, _value, _type)
    _childNodes.forEach(node => { _vnode.appendChild(combineData(node, data)) })
  } else if (_type === 3) {
    _value = _value.replace(reg, function (_, g) {
      return parsePath(data, g.trim())
    })
    _vnode = new VNode(_tag, _data, _value, _type)
  }

  return _vnode
}

function parseVNode(vnode, vm) {
  let type = vnode.type
  let _domNode = null

  if (type === 3) {
    _domNode = document.createTextNode(vnode.value)
  } else if (type === 1) {
    _domNode = document.createElement(vnode.tag)

    let attrs = vnode.data['attrs']
    Object.keys(attrs).forEach(attr => {
      let attrName = attr
      let attribute = attrs[attr]
      _domNode.setAttribute(attrName, attribute)
    })
    if (vnode.tag === 'input' && vnode.value) {
      vnode.value && (_domNode.value = vnode.value)
      _domNode.addEventListener('input', e => {
        let newVal = e.target.value
        let expr = vnode.data.directives['v-model']
        if (expr) {
          vnode.value = newVal
          vm[expr] = newVal
        }
      })
    }

    let childNodes = vnode.childNodes
    childNodes.forEach(node => {
      _domNode.appendChild(parseVNode(node, vm))
    })
  }
  return _domNode
}