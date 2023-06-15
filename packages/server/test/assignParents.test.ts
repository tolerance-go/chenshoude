import { ServerContainerNode, ServerNode } from '@chenshoude/render-static-node'
import { describe, expect, test } from 'vitest'
import { assignParents } from '../src/utils/assignParents'

const serverContainerNodeCommon = {
   x: 0,
   y: 0,
   width: 100,
   height: 100,
   effects: [],
   strokes: [],
   constraints: {
      vertical: 'MIN',
      horizontal: 'MIN',
   },
   rotation: 0,
   blendMode: 'PASS_THROUGH',
   absoluteBoundingBox: {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
   },
   absoluteRenderBounds: {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
   },
   absoluteTransform: [
      [1, 0, 0],
      [0, 1, 0],
   ],
   layoutPositioning: 'AUTO',
   isMask: false,
   fills: [],
   strokeAlign: 'INSIDE',
   dashPattern: [],
   strokeWeight: 1,
   layoutMode: 'NONE',
   itemSpacing: 0,
   paddingLeft: 0,
   paddingTop: 0,
   paddingRight: 0,
   paddingBottom: 0,
   counterAxisAlignItems: 'MIN',
   primaryAxisAlignItems: 'MIN',
   cornerRadius: 0,
}

describe('assignParents', () => {
   // 测试单一子节点树形结构的情况
   test('应正确地分配父节点（单一子节点）', async () => {
      const root: ServerNode = {
         id: '1',
         type: 'frame',
         name: 'root',
         parentId: undefined,
         children: [
            {
               id: '2',
               type: 'componentNode',
               name: 'child',
               parentId: '1',
               children: [],
               ...serverContainerNodeCommon,
            },
         ],
         ...serverContainerNodeCommon,
      }

      const expected: ServerNode = {
         id: '1',
         type: 'frame',
         name: 'root',
         parentId: undefined,
         children: [
            {
               id: '2',
               type: 'componentNode',
               name: 'child',
               parentId: '1',
               parent: root,
               children: [],
               ...serverContainerNodeCommon,
            },
         ],
         ...serverContainerNodeCommon,
      }

      expect(assignParents(root)).toEqual(expected)
   })

   // 测试复杂树形结构的情况
   test('应正确地分配父节点（复杂树形结构）', async () => {
      const root: ServerNode = {
         id: '1',
         type: 'frame',
         name: 'root',
         parentId: undefined,
         children: [
            {
               id: '2',
               type: 'componentNode',
               name: 'child1',
               parentId: '1',
               children: [
                  {
                     id: '3',
                     type: 'instanceNode',
                     name: 'grandchild',
                     parentId: '2',
                     children: [],
                     ...serverContainerNodeCommon,
                  },
               ],
               ...serverContainerNodeCommon,
            },
            {
               id: '4',
               type: 'group',
               name: 'child2',
               parentId: '1',
               children: [],
               hasMask: false,
               ...serverContainerNodeCommon,
            },
         ],
         ...serverContainerNodeCommon,
      }

      const expected: ServerNode = {
         id: '1',
         type: 'frame',
         name: 'root',
         parentId: undefined,
         children: [
            {
               id: '2',
               type: 'componentNode',
               name: 'child1',
               parentId: '1',
               parent: root,
               children: [
                  {
                     id: '3',
                     type: 'instanceNode',
                     name: 'grandchild',
                     parentId: '2',
                     parent: root.children[0] as unknown as ServerContainerNode,
                     children: [],
                     ...serverContainerNodeCommon,
                  },
               ],
               ...serverContainerNodeCommon,
            },
            {
               id: '4',
               type: 'group',
               name: 'child2',
               parentId: '1',
               parent: root,
               children: [],
               hasMask: false,
               ...serverContainerNodeCommon,
            },
         ],
         ...serverContainerNodeCommon,
      }

      expect(assignParents(root)).toEqual(expected)
   })
})
