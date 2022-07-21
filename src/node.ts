import { NodePropsT } from "./types"

export class Node {
    feature: number | undefined
    threshold: number | undefined
    right: Node | undefined
    left: Node | undefined
    value: number | null

    constructor({ feature, threshold, right, left, value }: NodePropsT) {
        this.feature = feature
        this.threshold = threshold || 0
        this.right = right
        this.left = left
        this.value = value || null
    }

    isLeaf() {
        return this.value !== null // If node is on the bottom of the tree, value is determined.
    }
}
