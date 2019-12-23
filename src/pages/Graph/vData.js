var people = ['马云', '张勇', '王健林', '乔布斯', '库克', '宗庆后', '柳传志']
var relations = ['朋友', '商业合作', '商业来往']
var categories = getCategory()
var nodes = initNodes()
var links = initLinks()

function getCategory () {
  return people.map((i) => {
    return {
      name: i
    }
  })
}
function getImgData (imgSrc, radius, center = {
  x: 0,
  y: 0
}) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const contex = canvas.getContext('2d')
    const img = new Image()
    img.onload = function () {
      canvas.width = img.width
      canvas.height = img.height
      contex.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height) // 在刚刚裁剪的园上画图
      contex.restore() // 还原状态
      resolve(canvas.toDataURL('image/png', 1))
    }
    img.src = imgSrc
  })
}
const img = '/static/img/people/jackMa.jpg'
let imgData = null
getImgData(img, 60, {x: 150, y: 150})
  .then((res) => {
    imgData = res
    nodes = initNodes()
  })

function initNodes () {
  const pointX = 20
  const pointY = 20
  const r = 10
  const unitAngle = 360 / (categories.length)
  return categories.map((node, index) => {
    const symbolSize = Math.random() * 5 + 30
    return {
      isNode: true,
      id: index,
      name: node.name,
      x: pointX + Math.sin(2 * Math.PI / 360 * (unitAngle * index)) * r,
      y: pointY + Math.cos(2 * Math.PI / 360 * (unitAngle * index)) * r,
      value: index,
      category: node.name,
      symbolSize,
      // symbol: `image://${imgData}`,
      itemStyle: {

      },
      label: {
        show: symbolSize >= 15
      }
    }
  })
}
function initNodes1 () {
  const pointX = 20
  const pointY = 20
  const r = 5
  const unitAngle = 360 / (categories.length - 1)
  var arr = categories.map((node, index) => {
    const symbolSize = Math.random() * 5 + 30
    return {
      isNode: true,
      id: index,
      name: node.name,
      x: pointX + Math.sin(2 * Math.PI / 360 * (unitAngle * index)) * r,
      y: pointY + Math.cos(2 * Math.PI / 360 * (unitAngle * index)) * r,
      value: index,
      category: node.name,
      symbolSize,
      // symbol: `image://${imgData}`,
      itemStyle: {

      },
      label: {
        show: symbolSize >= 15
      }
    }
  })
  arr[0].x = pointX
  arr[0].y = pointY
  return arr
}
function initLinks () {
  var links = []
  nodes.map((node, index) => {
    nodes.map((v, k) => {
      if (v.name !== node.name) {
        links.push({
          isLink: true,
          source: node.id,
          target: v.id,
          value: relations[parseInt(Math.random() * relations.length)]
        })
      }
    })
  })
  return links
}
function initLinks1 () {
  var links = []
  var first = nodes[0]
  nodes.map((node, index) => {
    if (node.name !== first.name) {
      links.push({
        isLink: true,
        source: first.id,
        target: node.id,
        value: relations[parseInt(Math.random() * relations.length)]
      })
    }
  })
  return links
}
function setOptions (nodes, links) {
  var option = {
    title: {
      text: '关系图',
      subtext: 'Default layout',
      top: 'bottom',
      left: 'right'
    },
    tooltip: {},
    legend: [{
      // selectedMode: 'single',
      data: categories.map(function (a) {
        return a.name
      })
    }],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: '姓名',
        type: 'graph',
        layout: 'none',
        nodes: nodes,
        links: links,
        categories: categories,
        roam: true,
        focusNodeAdjacency: true,
        itemStyle: {
          normal: {
            borderColor: '#fff',
            borderWidth: 1,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        },
        label: {
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        emphasis: {
          lineStyle: {
            width: 10
          }
        }
      }
    ]
  }
  return option
}
function getOptions1 () {
  var nodes = initNodes()
  var links = initLinks()
  return setOptions(nodes, links)
}
function getOptions2 () {
  var nodes = initNodes1()
  var links = initLinks1()
  return setOptions(nodes, links)
}
export function getGraphOptions (type) {
  switch (type) {
    case '1':
      return getOptions1()
    case '2':
      return getOptions2()
    default:
      return getOptions1()
  }
}
