module.exports = function(api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: ["relay", { artifactDirectory: "./__generated__/relay/", schema: "schema.json" }]
    };
};
