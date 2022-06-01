
import PropertyFieldGroup from "@coremedia/studio-client.main.editor-components/sdk/premular/PropertyFieldGroup";

import LinkListPropertyField
  from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/LinkListPropertyField";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";

interface SingleLinklistFormConfig extends Config<PropertyFieldGroup>, Partial<Pick<SingleLinklistForm,
        "propertyName" |
        "linkType"
        >> {
}

class SingleLinklistForm extends PropertyFieldGroup {
  declare Config: SingleLinklistFormConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.studio.config.SingleLinklistForm";

  propertyName: string = null;

  linkType: string = null;

  constructor(config: Config<SingleLinklistForm> = null) {
    super(ConfigUtils.apply(Config(SingleLinklistForm, {
      header: false,
      itemId: "singleLinklistForm",
      propertyNames: [],

      items: [
        Config(LinkListPropertyField, {
          linkType: config.linkType,
          itemId: "singleItem",
          showThumbnails: true,
          propertyName: config.propertyName + ".target",
          bindTo: config.bindTo,
          maxCardinality: 1,
        }),
      ],

    }), config));
  }
}

export default SingleLinklistForm;
