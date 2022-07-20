import { NodePropsT } from "./types"

export class Node {
    feature: any | undefined
    threshold: number | undefined
    right: any
    left: any
    value: number

    constructor({ feature, threshold, right, left, value }: NodePropsT) {
        this.feature = feature
        this.threshold = threshold || 0
        this.right = right 
        this.left = left
        this.value = value || 0
    }

    isLeaf() {
        return this.value !== 0
    }
}
