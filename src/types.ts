import { Node } from "./node"

export type MapElT = {
    [key: number]: number
}

export type NodePropsT = {
    feature?: number
    threshold?: number
    right?: Node
    left?: Node
    value?: number
}

export type Array2DT = Array<Array<number>>

export type TrainAndTestT = {
    trainValues: Array2DT
    trainLabels: Array<number>
    testValues: Array2DT
    testLabels: Array<number>
}
