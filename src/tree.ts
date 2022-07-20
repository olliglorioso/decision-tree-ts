import { Node } from "./node"
import { Array2DT } from "./types"
import { bincountWeights, getMultiRow, getOneColumn, mode, shuffle } from "./util"

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

    #split(featureSample: Array2DT, thresh: number, y: Array<number>): [Array<number>, Array<number>, Array<number>, Array<number>] {
        const leftIdxs: Array<number> = [], rightIdxs: Array<number> = [], leftLabels: Array<number> = [], rightLabels: Array<number> = []
        for (let i = 0; i < featureSample.length; i++) {
            if (featureSample[i][0] <= thresh) {
                leftIdxs.push(i)
                leftLabels.push(y[i])
            } else {
                rightIdxs.push(i)
                leftLabels.push(y[i])
            }
        }
        return [leftIdxs, rightIdxs, leftLabels, rightLabels]
    }

    #informationGain(featureSample: Array2DT, y: Array<number>, thresh: number): number {
        const parentEntropy = this.#entropy(y)
        const [leftIdxs, rightIdxs, leftLabels, rightLabels] = this.#split(featureSample, thresh, y)
        const n = y.length
        if (leftIdxs.length === 0 || rightIdxs.length === 0) return 0

        const leftChildEntropy = (leftIdxs.length / n) * this.#entropy(leftLabels)
        const rightChildEntropy = (rightIdxs.length / n) * this.#entropy(rightLabels)
        // This is the definition of information gain.
        return parentEntropy - leftChildEntropy - rightChildEntropy
    }
    
    #bestSplit(X: Array2DT, y: Array<number>, features: Array<number>): [number, number] {
        const split = { score: -1, feat: 0, thresh: 0 }
        for (const featIdx of features) {
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

    #buildTree(X: Array2DT, y: Array<number>, depth = 0): Node | undefined {
        ;(this.samplesCount = X.length), (this.featuresCount = X[0].length) // How many samples, how many features
        this.classLabelsCount = [...new Set(y)].length // How many unique labels (classes)

        // If the build will be finished, new node will be returned
        if (this.#isFinished(depth)) {
            const mostCommonLabel = mode(y)
            return new Node({ value: mostCommonLabel })
        }
        let arr = [...Array(this.featuresCount).keys()]
        shuffle(arr)
        const [bestFeature, bestTreshold] = this.#bestSplit(X, y, arr)
        const [bestFeatureColumn, _bestFeatureColumn1d] = getOneColumn(X, bestFeature)
        const [leftIdxs, rightIdxs, leftLabels, rightLabels] = this.#split(bestFeatureColumn, bestTreshold, y)

        const leftRows = getMultiRow(X, leftIdxs)
        const rightRows = getMultiRow(X, rightIdxs)

        const left = this.#buildTree(leftRows, leftLabels, depth + 1)
        const right = this.#buildTree(rightRows, rightLabels, depth + 1)

        return new Node({ feature: bestFeature, threshold: bestTreshold, left, right })
    }

    #traverse(x: Array<number>, node: any): any {
        if (node.isLeaf()) {
            return node.value
        }
        if (x[node.feature] <= (node.threshold || 0)) return this.#traverse(x, node.left)
        return this.#traverse(x, node.right)
        
    }
    fit(X: Array2DT, y: Array<number>) {
        this.root = this.#buildTree(X, y)
    }
    predict(X: Array2DT) {
        const predictions = X.map((x) => this.#traverse(x, this.root))
    }
}

export default DecisionTree
