import TeaserOverlayConstants from "@coremedia-blueprint/studio-client.main.blueprint-forms/TeaserOverlayConstants";
import TeaserOverlayPropertyField
  from "@coremedia/studio-client.main.ckeditor4-components/fields/TeaserOverlayPropertyField";
import PropertyFieldGroup from "@coremedia/studio-client.main.editor-components/sdk/premular/PropertyFieldGroup";
import StringPropertyField
  from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/StringPropertyField";
import StringPropertyFieldDelegatePlugin
  from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/plugins/StringPropertyFieldDelegatePlugin";
import ShowIssuesPlugin from "@coremedia/studio-client.main.editor-components/sdk/validation/ShowIssuesPlugin";
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
        Config(TeaserOverlayPropertyField, {
          propertyName: config.propertyName + ".teaserText",
          delegatePropertyName: "teaserText",
          initialHeight: 100,
          itemId: "teaserText",
          settingsPath: TeaserOverlayConstants.DEFAULT_SETTINGS_PATH,
          styleDescriptorFolderPaths: TeaserOverlayConstants.DEFAULT_STYLE_DESCRIPTOR_FOLDER_PATHS,
          ...ConfigUtils.append({
            plugins: [
              Config(ShowIssuesPlugin, {
                bindTo: config.bindTo,
                propertyName: config.propertyName + ".teaserText",
                statefulSubComponentsFunction: (): Array<any> =>
                  [this.queryById(TeaserOverlayPropertyField.TEASER_OVERLAY_RICHTEXT_ITEM_ID)],
              }),
            ],
          }),
        }),
      ],

    }), config));
  }
}

export default TeaserForm;
