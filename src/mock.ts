import ForceDirectedEdge from './Edge'
import ForceDirectedNode from './Node'
const knowledgeNodes = [
  {
    knowledgeId: 22512,
    knowledgeName: '可能性的大小',
    graspName: '熟练掌握',
    graspType: 1,
    graspValue: 100,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22861,
    knowledgeName: '有理数大小比较',
    graspName: '熟练掌握',
    graspType: 1,
    graspValue: 100,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22511,
    knowledgeName: '概率的定义',
    graspName: '熟练掌握',
    graspType: 1,
    graspValue: 100,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22501,
    knowledgeName: '方差',
    graspName: '未掌握需重点关注',
    graspType: 4,
    graspValue: 0,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22508,
    knowledgeName: '概率的应用',
    graspName: '熟练掌握',
    graspType: 1,
    graspValue: 100,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22464,
    knowledgeName: '抽样调查的可靠性',
    graspName: '未掌握需重点关注',
    graspType: 4,
    graspValue: 0,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22845,
    knowledgeName: '用计算器计算',
    graspName: '熟练掌握',
    graspType: 1,
    graspValue: 100,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22982,
    knowledgeName: '二次函数的系数与其图象的关系',
    graspName: '未掌握需重点关注',
    graspType: 4,
    graspValue: 0,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22983,
    knowledgeName: '二次函数的图象上点的坐标特征',
    graspName: '未掌握需重点关注',
    graspType: 4,
    graspValue: 0,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22847,
    knowledgeName: '有效数字',
    graspName: '熟练掌握',
    graspType: 1,
    graspValue: 100,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22860,
    knowledgeName: '有理数的乘法法则',
    graspName: '熟练掌握',
    graspType: 1,
    graspValue: 100,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22509,
    knowledgeName: '概率的公式',
    graspName: '熟练掌握',
    graspType: 1,
    graspValue: 100,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22777,
    knowledgeName: '不等式的基本性质',
    graspName: '熟练掌握',
    graspType: 1,
    graspValue: 100,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22530,
    knowledgeName: '算术平均数',
    graspName: '未掌握需重点关注',
    graspType: 4,
    graspValue: 0,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22776,
    knowledgeName: '列不等式',
    graspName: '熟练掌握',
    graspType: 1,
    graspValue: 100,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22467,
    knowledgeName: '总体、个体、样本、样本容量的定义',
    graspName: '未掌握需重点关注',
    graspType: 4,
    graspValue: 0,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22505,
    knowledgeName: '众数',
    graspName: '未掌握需重点关注',
    graspType: 4,
    graspValue: 0,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22532,
    knowledgeName: '加权平均数',
    graspName: '未掌握需重点关注',
    graspType: 4,
    graspValue: 0,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22985,
    knowledgeName: '二次函数解析式的三种形式',
    graspName: '未掌握需重点关注',
    graspType: 4,
    graspValue: 0,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22875,
    knowledgeName: '正数和负数',
    graspName: '熟练掌握',
    graspType: 1,
    graspValue: 100,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22874,
    knowledgeName: '有理数的定义',
    graspName: '熟练掌握',
    graspType: 1,
    graspValue: 100,
    dataType: 1,
    nodeType: 3
  },
  {
    knowledgeId: 22986,
    knowledgeName: '待定系数法求二次函数解析式',
    graspName: '未掌握需重点关注',
    graspType: 4,
    graspValue: 0,
    dataType: 1,
    nodeType: 3
  }
]
const relationLines = [
  {
    sourceNodeId: 22875,
    targetNodeId: 22861,
    relationType: 2,
    relationName: '前置关系'
  },
  {
    sourceNodeId: 22512,
    targetNodeId: 22511,
    relationType: 2,
    relationName: '前置关系'
  },
  {
    sourceNodeId: 22530,
    targetNodeId: 22501,
    relationType: 2,
    relationName: '前置关系'
  },
  {
    sourceNodeId: 22509,
    targetNodeId: 22508,
    relationType: 2,
    relationName: '前置关系'
  },
  {
    sourceNodeId: 22511,
    targetNodeId: 22508,
    relationType: 2,
    relationName: '前置关系'
  },
  {
    sourceNodeId: 22511,
    targetNodeId: 22509,
    relationType: 2,
    relationName: '前置关系'
  },
  {
    sourceNodeId: 22530,
    targetNodeId: 22532,
    relationType: 2,
    relationName: '前置关系'
  },
  {
    sourceNodeId: 22875,
    targetNodeId: 22874,
    relationType: 2,
    relationName: '前置关系'
  },
  {
    sourceNodeId: 22861,
    targetNodeId: 22874,
    relationType: 1,
    relationName: '相关关系'
  },
  {
    sourceNodeId: 22861,
    targetNodeId: 22860,
    relationType: 1,
    relationName: '相关关系'
  },
  {
    sourceNodeId: 22501,
    targetNodeId: 22505,
    relationType: 1,
    relationName: '相关关系'
  },
  {
    sourceNodeId: 22982,
    targetNodeId: 22983,
    relationType: 1,
    relationName: '相关关系'
  },
  {
    sourceNodeId: 22982,
    targetNodeId: 22986,
    relationType: 1,
    relationName: '相关关系'
  },
  {
    sourceNodeId: 22983,
    targetNodeId: 22986,
    relationType: 1,
    relationName: '相关关系'
  },
  {
    sourceNodeId: 22530,
    targetNodeId: 22505,
    relationType: 1,
    relationName: '相关关系'
  },
  {
    sourceNodeId: 22467,
    targetNodeId: 22532,
    relationType: 1,
    relationName: '相关关系'
  },
  {
    sourceNodeId: 22505,
    targetNodeId: 22532,
    relationType: 1,
    relationName: '相关关系'
  },
  {
    sourceNodeId: 22985,
    targetNodeId: 22983,
    relationType: 1,
    relationName: '相关关系'
  },
  {
    sourceNodeId: 22986,
    targetNodeId: 22985,
    relationType: 1,
    relationName: '相关关系'
  }
]

const { nodes, edges } = (() => {
  const nodesMap = new Map<string, ForceDirectedNode>()
  const nodes = knowledgeNodes.map((item, index) => {
    const center = [500, 300]
    const radius = 100
    const angle = (index / knowledgeNodes.length) * Math.PI * 2
    const x = center[0] + radius * Math.cos(angle)
    const y = center[1] + radius * Math.sin(angle)
    const node = new ForceDirectedNode(item.knowledgeId + '', x, y)

    nodesMap.set(node.getId(), node)
    return node
  })

  const edges = relationLines.reduce<ForceDirectedEdge[]>((pre, cur) => {
    const source = nodesMap.get(cur.sourceNodeId + '')
    const target = nodesMap.get(cur.targetNodeId + '')
    if (source && target) {
      pre.push(new ForceDirectedEdge(source, target))
    }
    return pre
  }, [])

  return {
    nodes,
    edges
  }
})()
export { nodes, edges }
