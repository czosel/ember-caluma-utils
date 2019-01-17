"use strict";

const Funnel = require("broccoli-funnel");
const mergeTrees = require("broccoli-merge-trees");
const path = require("path");

module.exports = {
  name: require("./package").name,

  options: {
    babel: {
      plugins: [
        ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
        "@babel/plugin-proposal-object-rest-spread"
      ]
    }
  },

  treeForApp(appTree) {
    const trees = [appTree];

    const mirageDir = path.join(__dirname, "addon-mirage-support");

    const mirageTree = new Funnel(mirageDir, {
      destDir: "mirage"
    });

    trees.push(mirageTree);

    return mergeTrees(trees);
  }
};
