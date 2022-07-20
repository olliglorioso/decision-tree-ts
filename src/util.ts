import { MapElT } from "./types"

export const mode = (arr: Array<number>): number | null => {
    if (arr.length === 0) return null
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
        bins.push(counts[i]) / arr.length
    }
    return bins
}
