import { Node } from "./node"

export interface MapElT {
    [key: number]: number
}

export interface NodePropsT {
    feature?: number,
    threshold?: number,
    right?: Node,
    left?: Node,
    value: number | null
}