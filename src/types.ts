import { Node } from "./node"

export type MapElT = {
    [key: number]: number
}

export type NodePropsT = {
    feature?: number
    threshold?: number
    right?: Node
    left?: Node
    value: number | null
}

export type Array2DT = Array<Array<number>>
