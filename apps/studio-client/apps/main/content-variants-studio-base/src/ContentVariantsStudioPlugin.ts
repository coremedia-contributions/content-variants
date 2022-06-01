import StudioPlugin from "@coremedia/studio-client.main.editor-components/configuration/StudioPlugin";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";

interface ContentVariantsStudioPluginConfig extends Config<StudioPlugin> {
}

class ContentVariantsStudioPlugin extends StudioPlugin {
  declare Config: ContentVariantsStudioPluginConfig;

  constructor(config: Config<ContentVariantsStudioPlugin> = null) {
    super((() => {
      return ConfigUtils.apply(Config(ContentVariantsStudioPlugin, {}), config);
    })());
  }
}

export default ContentVariantsStudioPlugin;
