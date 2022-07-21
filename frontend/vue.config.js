const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, "src"),
                "@components": path.join(__dirname, "src/components"),
                "@store": path.join(__dirname, "src/store"),
                "@api": path.join(__dirname, "src/api"),
            },
            extensions: [".js", ".vue", ".json"],
        },
    },
});
