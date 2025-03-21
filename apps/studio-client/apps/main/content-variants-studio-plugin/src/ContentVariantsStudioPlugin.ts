
import CMPictureForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/CMPictureForm";
import CMVideoForm from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/CMVideoForm";
import TeaserDocumentForm
  from "@coremedia-blueprint/studio-client.main.blueprint-forms/forms/containers/TeaserDocumentForm";
import ContentVariantsForm from "@coremedia-labs/studio-client.ext.content-variants-studio-client/editors/ContentVariantsForm";

import ContentTypes_properties from "@coremedia/studio-client.cap-base-models/content/ContentTypes_properties";
import AddItemsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/AddItemsPlugin";
import CopyResourceBundleProperties
  from "@coremedia/studio-client.main.editor-components/configuration/CopyResourceBundleProperties";
import StudioPlugin from "@coremedia/studio-client.main.editor-components/configuration/StudioPlugin";

import Component from "@jangaroo/ext-ts/Component";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import resourceManager from "@jangaroo/runtime/l10n/resourceManager";
import ContentVariants_properties from "./ContentVariants_properties";
import SingleLinklistForm from "./forms/SingleLinklistForm";
import TeaserForm from "./forms/TeaserForm";

interface ContentVariantsStudioPluginConfig extends Config<StudioPlugin> {
}

class ContentVariantsStudioPlugin extends StudioPlugin {
  declare Config: ContentVariantsStudioPluginConfig;

  constructor(config: Config<ContentVariantsStudioPlugin> = null) {
    super((() => {
      return ConfigUtils.apply(Config(ContentVariantsStudioPlugin, {

        rules: [
          Config(TeaserDocumentForm, {
            plugins: [
              Config(AddItemsPlugin, {
                recursive: true,
                items: [
                  Config(ContentVariantsForm, {
                    itemId: "teaserVariantsForm",
                    title: ContentVariants_properties.TeaserVariantsTitle,
                    rowWidgetItems: [
                      Config(TeaserForm),
                    ],
                  }),
                ],
                before: [
                  Config(Component, { itemId: "teaserSettings" }),
                ],
              }),
            ],
          }),

          Config(CMVideoForm, {
            plugins: [
              Config(AddItemsPlugin, {
                recursive: true,
                items: [
                  Config(ContentVariantsForm, {
                    itemId: "singleLinklistVariantsForm",
                    title: ContentVariants_properties.VideoVariantsTitle,
                    rowWidgetItems: [
                      Config(SingleLinklistForm, { linkType: "CMVideo" }),
                    ],
                  }),
                ],
                after: [
                  Config(Component, { itemId: "dataUrl" }),
                ],
              }),
            ],
          }),

          Config(CMPictureForm, {
            plugins: [
              Config(AddItemsPlugin, {
                recursive: true,
                items: [
                  Config(ContentVariantsForm, {
                    itemId: "singleLinklistVariantsForm",
                    title: ContentVariants_properties.PictureVariantsTitle,
                    rowWidgetItems: [
                      Config(SingleLinklistForm, { linkType: "CMPicture" }),
                    ],
                  }),
                ],
                after: [
                  Config(Component, { itemId: CMPictureForm.IMAGE_EDITOR_ITEM_ID }),
                ],
              }),
            ],
          }),
        ],
        configuration: [
          new CopyResourceBundleProperties({
            destination: resourceManager.getResourceBundle(null, ContentTypes_properties),
            source: resourceManager.getResourceBundle(null, ContentVariants_properties),
          }),
        ],
      }), config);
    })());
  }
}

export default ContentVariantsStudioPlugin;
