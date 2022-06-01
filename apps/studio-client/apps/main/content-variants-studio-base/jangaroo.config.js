const { jangarooConfig } = require("@jangaroo/core");

module.exports = jangarooConfig({
  type: "code",
  sencha: {
    name: "com.coremedia.blueprint__content-variants-studio-client",
    namespace: "com.coremedia.blueprint.contentvariants.studio",
    studioPlugins: [
      {
        mainClass: "com.coremedia.blueprint.contentvariants.studio.ContentVariantsStudioPlugin",
        name: "Content Variants",
      },
    ],
  },
});
