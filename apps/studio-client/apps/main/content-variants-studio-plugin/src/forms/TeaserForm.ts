import RichTextPropertyField from "@coremedia/studio-client.main.ckeditor4-components/fields/RichTextPropertyField";
import PropertyFieldGroup from "@coremedia/studio-client.main.editor-components/sdk/premular/PropertyFieldGroup";
import StringPropertyField
  from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/StringPropertyField";
import StringPropertyFieldDelegatePlugin
  from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/plugins/StringPropertyFieldDelegatePlugin";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";

interface TeaserFormConfig extends Config<PropertyFieldGroup>, Partial<Pick<TeaserForm,
        "propertyName"
        >> {
}

/**
 * This is a form panel which combines several form elements to an editor for local settings to configure
 * the visibility behaviour. A combination of two date time field specifing visibleFrom and visibleTo.
 */
class TeaserForm extends PropertyFieldGroup {
  declare Config: TeaserFormConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.studio.config.TeaserForm";

  propertyName: string = null;

  constructor(config: Config<TeaserForm> = null) {
    super(ConfigUtils.apply(Config(TeaserForm, {
      header: false,
      itemId: "teaserDocumentForm",
      propertyNames: [],

      items: [
        Config(StringPropertyField, {
          itemId: "teaserTitle",
          propertyName: config.propertyName + ".teaserTitle",
          ...ConfigUtils.append({
            plugins: [
              Config(StringPropertyFieldDelegatePlugin, { delegatePropertyName: "teaserTitle" }),
            ],
          }),
        }),
        Config(RichTextPropertyField, {
          itemId: "teaserText",
          propertyName: config.propertyName + ".teaserText",
          initialHeight: 100,
        }),
      ],

    }), config));
  }
}

export default TeaserForm;
