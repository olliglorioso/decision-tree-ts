import { NodePropsT } from "./types"

export class Node {
    feature: any | undefined
    threshold: number | undefined
    right: Node | undefined
    left: Node | undefined
    value: number | null

    constructor({ feature, threshold, right, left, value }: NodePropsT) {
        this.feature = feature || null
        this.threshold = threshold || 0
        this.right = right || undefined
        this.left = left || undefined
        this.value = value || null
    }

    isLeaf() {
        return this.value !== 0
    }
}
