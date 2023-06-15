import { ServerContainerNode, ServerNode } from '@chenshoude/render-static-node'

/**
 * 为每一个节点的 parentId 对应的 parent 找到并且赋值到 parent 字段上返回。
 *
 * @param {ServerNode} root - 可能存在 children 的树的根节点。
 * @returns {ServerNode} 树，其中每个节点的 parent 属性已被设置。
 */
export const assignParents = (root: ServerNode): ServerNode => {
   // 创建一个映射，使我们可以通过 ID 找到节点
   const idToNodeMap: { [key: string]: ServerContainerNode } = {}

   // 创建 ID 到节点的映射
   const createIdToNodeMap = (node: ServerNode) => {
      if (
         node.type === 'frame' ||
         node.type === 'componentNode' ||
         node.type === 'instanceNode' ||
         node.type === 'group'
      ) {
         idToNodeMap[node.id] = node

         for (let child of node.children) {
            createIdToNodeMap(child)
         }
      }
   }

   // 分配 parent 到每个节点
   const assignParents = (node: ServerNode) => {
      if (node.parentId) {
         node.parent = idToNodeMap[node.parentId]
      }
      if ('children' in node && node.children) {
         for (let child of node.children) {
            assignParents(child)
         }
      }
   }

   createIdToNodeMap(root)
   assignParents(root)

   return root
}
