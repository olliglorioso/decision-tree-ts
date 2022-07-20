import { Node } from "./node"
import { Array2DT } from "./types"
import { bincountWeights, getOneColumn, mode } from "./util"

class DecisionTree {
    maxDepth: number
    minSplit: number
    root: Node | undefined
    classLabelsCount = 0
    samplesCount = 0
    featuresCount = 0

    constructor(maxDepth = 100, minSplit = 2) {
        this.maxDepth = maxDepth
        this.minSplit = minSplit
        this.root = undefined
    }

    #isFinished(depth: number): boolean {
        if (depth >= this.maxDepth || this.classLabelsCount === 1 || this.samplesCount < this.minSplit) {
            return true
        }
        return false
    }

    #buildTree(X: Array2DT, y: Array<number>, depth = 0): Node | undefined {
        ;(this.samplesCount = X.length), (this.featuresCount = X[0].length) // How many samples, how many features
        this.classLabelsCount = [...new Set(y)].length // How many unique labels (classes)

        // If the build will be finished, new node will be returned
        if (this.#isFinished(depth)) {
            const mostCommonLabel = mode(y)
            return new Node({ value: mostCommonLabel })
        }
    }

    #entropy(y: Array<number>): number {
        // Calculate entropy: average level of information within given labels. The amount of different labels affects the entropy, in this situation.
        // The more similar labels, the better the result = entropy.
        const proportions = bincountWeights(y)
        const proportionsSum =
            -1 *
            proportions?.reduce((a, b) => {
                if (b > 0) return a + b * Math.log2(b)
                return a
            }, 0)
        return proportionsSum
    }

    #split(featureSample: Array2DT, thresh: number): [number, number] {
        const leftIdx: Array<number> = []
        const rightIdx: Array<number> = []
        for (const i of featureSample) {
            if (i[0] <= thresh) {
                leftIdx.push(i[0])
                rightIdx.push(i[0])
            }
        }
        return [leftIdx, rightIdx]
    }

    #informationGain(featureSample: Array2DT, y: Array<number>, thresh: number): number {
        const parentEntropy = this.#entropy(y)
        const [leftIdx, rightIdx] = this.#split(featureSample, thresh)
        const leftChildEntropy = 0
        const rightChildEntropy = 0
        // This is the definition of information gain.
        return parentEntropy - leftChildEntropy - rightChildEntropy
    }
    
    #bestSplit(X: Array2DT, y: Array<number>): [number, number] {
        const split = { score: -1, feat: 0, thresh: 0 }
        for (let featIdx = 0; featIdx < X[0].length; featIdx++) {
            const [featureSample, featureSample1d] = getOneColumn(X, featIdx)
            // All different feature values in the column.
            const thresholds = [...new Set(featureSample1d)]
            for (const thresh of thresholds) {
                const score = this.#informationGain(featureSample, y, thresh)
                if (score > split.score) {
                    split.score = score
                    split.feat = featIdx
                    split.thresh = thresh
                }
            }
        }
        return [split.feat, split.thresh]
    }

    // traverse(x: number, node: Node) {}
    // fit(X: Array2DT, y: Array<number>) {
    //     this.root = this.#buildTree(X, y)
    // }
    // predict(X: Array2DT) {}
}

export default DecisionTree
