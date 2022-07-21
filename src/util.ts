import { Array2DT, MapElT } from "./types"

export const mode = (arr: Array<number>): number => {
    if (arr.length === 0) return 0
    const mapEl: MapElT = {}
    let maxEl = arr[0]
    let maxCount = 1

    for (let i = 0; i < arr.length; i++) {
        const el = arr[i]
        if (mapEl[el] === null || mapEl[el] === undefined) {
            mapEl[el] = 1
        } else {
            mapEl[el] += 1
        }
        if (mapEl[el] > maxCount) {
            maxEl = el
            maxCount = mapEl[el]
        }
    }
    return maxEl
}

const maxValue = (arr: Array<number>): number => {
    const max = Math.max(...arr)
    return max
}

export const bincount = (arr: Array<number>): Array<number> => {
    if (arr.length === 0) return [0]
    const maxNumber = maxValue(arr)
    const bins: Array<number> = []
    const counts = calculateCounts(arr)
    for (let i = 0; i <= maxNumber; i++) {
        bins.push(counts[i])
    }
    return bins
}

export const calculateCounts = (arr: Array<number>): MapElT => {
    const counts: MapElT = {}
    for (const num of arr) {
        counts[num] = counts[num] ? counts[num] + 1 : 1
    }
    return counts
}

export const bincountWeights = (arr: Array<number>): Array<number> => {
    if (arr.length === 0) return [0]
    const maxNumber = maxValue(arr)
    const bins: Array<number> = []
    const counts = calculateCounts(arr)
    for (let i = 0; i <= maxNumber; i++) {
        // Divide by the length of array instead of calculating the regular bincount.
        bins.push((counts[i] || 0) / arr.length)
    }
    return bins
}

export const shuffle = (array: Array<number>) => {
    let currentIndex = array.length
    let randomIndex = 0
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
}

export const flatten = (arr: Array2DT): Array<number> => {
    const flattened: Array<number> = []
    for (const i of arr) flattened.concat(i[0])
    return flattened
}

export const getOneColumn = (X: Array2DT, featNro: number): [Array2DT, Array<number>] => {
    const featureSample: Array2DT = []
    const featureSample1d: Array<number> = []
    for (let sampleNro = 0; sampleNro < X.length; sampleNro++) {
        featureSample.push([X[sampleNro][featNro]])
        featureSample1d.push(X[sampleNro][featNro])
    }
    return [featureSample, featureSample1d]
}

export const getMultiRow = (X: Array2DT, rowIdxs: Array<number>): Array2DT => {
    const arr: Array2DT = []
    for (const i of rowIdxs) {
        arr.push(X[i])
    }
    return arr
}

export const arraySimilarity = (x: Array<number>, y: Array<number>): [number, number] => {
    if (x.length !== y.length) throw new Error("Lists must have the same length.")
    let howManySame = 0
    for (let i = 0; i < x.length; i++) {
        if (x[i] == y[i]) howManySame++
    }
    return [howManySame / x.length, howManySame]
}
