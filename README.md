# decision-tree-ts

Basic, dependency-free and light-weight decision tree algorithm npm-module, use with both TypeScript and JavaScript! Currently only included algorithm is CART.

## Features

- DecisionTree-class, check Quick start to check how to use.
  - Currently only CART-algorithm is supported.
  - Functions fit and predict are public for your use.
  - Currently only numerical features supported.
- JSDoc included to make the use of the module as easy as possible.
- To get some useful functions, check out my [other repository](https://github.com/olliglorioso/linear-regression-ts). I am not going to redo them for this module.
- Package is tested to be working. Module [linear-regression-ts](https://github.com/olliglorioso/linear-regression-ts) utilized in tests.

## Quick start

```bash
npm install decision-tree-ts
```

```typescript
// Initialize the tree with parameters maxDepth, minSplit.
const tree = DecisionTree(10, 2)
const data = [
    [1, 3],
    [2, 3],
    [3, 1],
    [3, 1],
    [2, 3],
]
const labels = [1, 1, 2, 2, 3]
// Train the model by giving the training data and their labels. Every column is one feature in the data.
const response = tree.fit(data, labels)
// Response is true if the training succeeded, otherwise returns an error message.
console.log(response === true ? "Training succeeded." : "Error:", response)
const predictThisData = [
    [1, 3],
    [2, 3],
    [3, 1],
    [3, 1]
]
// Predict labels for your data.
const predictedLabels = tree.predict(predictThisData)
console.log(predictedLabels)
```

## Sources

- Template (configurations, structure): [https://github.com/olliglorioso/typescript-npm-base](https://github.com/olliglorioso/typescript-npm-base)
