import { Node } from "./node"
import { bincountWeights, mode } from "./util"

class DecisionTree {
    maxDepth: number
    minSplit: number
    root: Node | undefined
    classLabelsCount: number = 0
    samplesCount: number = 0
    featuresCount: number = 0

    constructor(maxDepth: number = 100, minSplit: number = 2) {
        this.maxDepth = maxDepth
        this.minSplit = minSplit
        this.root = undefined
    }

    #isFinished(depth: number): boolean {
        if (depth >= this.maxDepth ||
            this.classLabelsCount === 1 ||
            this.samplesCount < this.minSplit) 
        {
            return true
        }
        return false
    }

    #buildTree(X: Array<Array<number>>, y: Array<number>, depth: number = 0): Node | undefined {
        this.samplesCount, this.featuresCount = X.length, X[0].length
        const uniqueYs = [...new Set(y)].length
        this.classLabelsCount = uniqueYs

        if (this.#isFinished(depth)) {
            const mostCommonLabel = mode(y)
            return new Node({ value: mostCommonLabel })
        }
    }

    #entropy(y: Array<number>): number {
        // Calculate the gini impurity, this helps us to decide wether to include or not include this
        // feature in the decision tree.
        const proportions = bincountWeights(y)
        const proportionsSum = (-1) * proportions?.reduce((a, b) => {
            if (b > 0) return a + b * Math.log2(b)
            return a
        }, 0)
        return proportionsSum
    }

    #split(X: Array<Array<number>>, thresh: number) {

    }
    #informationGain(X: Array<Array<number>>, y: Array<number>, thresh: number) {
        const parentLoss = this.#entropy(y)
        return 0
    }
    #bestSplit(X: Array<Array<number>>, y: Array<number>, features: Array<number>) {
        const split = { score: -1, feat: 0, thresh: 0 }

        for (const feat of features) {
            let featureColumn: Array<Array<number>> = []
            for (let i = 0; i < X.length; i++) {
                featureColumn[i] = [X[i][feat]]
                const thresholds = [...new Set(featureColumn[0])]
                for (const thresh of thresholds) {
                    const score = this.informationGain(featureColumn, y, thresh)

                    if (score > split.score) {
                        split.score = score
                        split.feat = feat
                        split.thresh = thresh 
                    }
                }
            }
        }
    }
    
    traverse(x: number, node: Node) {}
    fit(X: Array<Array<number>>, y: Array<number>) {
        this.root = this.#buildTree(X, y)
    }
    predict(X: Array<Array<number>>) {}
}