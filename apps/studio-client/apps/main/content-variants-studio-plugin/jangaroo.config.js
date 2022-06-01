const { jangarooConfig } = require("@jangaroo/core");

module.exports = jangarooConfig({
  type: "code",
  sencha: {
    name: "com.coremedia.blueprint__content-variants-studio-client.main",
    namespace: "com.coremedia.blueprint.contentvariants.main",
    studioPlugins: [
      {
        mainClass: "com.coremedia.blueprint.contentvariants.main.ContentVariantsStudioPlugin",
        name: "Content Variants",
      },
    ],
  },
});
