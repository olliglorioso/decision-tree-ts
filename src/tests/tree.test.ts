import DecisionTree from "../index"
import { Array2DT } from "../types"
import { trainAndTestSets } from "linear-regression-ts"
import { arraySimilarity } from "../util"

test("Test the decision tree with Haberman data", async () => {
    const url = "https://raw.githubusercontent.com/olliglorioso/datasets/main/haberman.data"
    const res = await (await fetch(url)).text()
    const lines = (res as unknown as string).split("\n")

    const data: Array2DT = []
    const labels: Array<number> = []
    for (const line of lines) {
        const values = line.trim().split(",")
        if (values.length === 4) {
            const age = parseInt(values[0])
            const yearOfOperation = parseInt(values[1])
            const positiveAxillaryNodesDetected = parseInt(values[2])
            const survivalStatus = parseInt(values[3]) // 1 = patient survived 5 years or longer, 2 = died within 5 yers
            data.push([age, yearOfOperation, positiveAxillaryNodesDetected])
            labels.push(survivalStatus)
        }
    }
    const { trainValues, testValues, trainLabels, testLabels } = trainAndTestSets({ inputs: data, labels, ratio: 30 })
    const tree = new DecisionTree(10, 2)
    tree.fit(trainValues, trainLabels)
    const predictions = tree.predict(testValues)
    const accuracy = arraySimilarity(testLabels, predictions as Array<number>)
    expect(accuracy[0]).toBeGreaterThan(0.6)
})
