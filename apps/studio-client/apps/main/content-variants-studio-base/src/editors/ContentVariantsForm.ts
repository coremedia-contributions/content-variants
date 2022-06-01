import StructContentLinkListWrapper
  from "@coremedia/studio-client.content-link-list-models/StructContentLinkListWrapper";

import NameColumn from "@coremedia/studio-client.ext.cap-base-components/columns/NameColumn";
import StatusColumn from "@coremedia/studio-client.ext.cap-base-components/columns/StatusColumn";
import TypeIconColumn from "@coremedia/studio-client.ext.cap-base-components/columns/TypeIconColumn";
import LinkListThumbnailColumn
  from "@coremedia/studio-client.ext.content-link-list-components/columns/LinkListThumbnailColumn";
import ILinkListWrapper from "@coremedia/studio-client.link-list-models/ILinkListWrapper";
import PropertyFieldAnnotatedLinkListWidget
  from "@coremedia/studio-client.main.editor-components/sdk/premular/PropertyFieldAnnotatedLinkListWidget";
import PropertyFieldGroup from "@coremedia/studio-client.main.editor-components/sdk/premular/PropertyFieldGroup";

import LinkListPropertyField
  from "@coremedia/studio-client.main.editor-components/sdk/premular/fields/LinkListPropertyField";
import QuickCreateLinklistMenu
  from "@coremedia/studio-client.main.editor-components/sdk/quickcreate/QuickCreateLinklistMenu";
import AnnotatedLinkListHelper from "@coremedia/studio-client.main.editor-components/sdk/util/AnnotatedLinkListHelper";

import Separator from "@jangaroo/ext-ts/toolbar/Separator";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import ContentVariants_properties from "../ContentVariants_properties";
import ContentVariantsTypeSuggester from "./ContentVariantsTypeSuggester";

interface ContentVariantsFormConfig extends Config<PropertyFieldGroup>, Partial<Pick<ContentVariantsForm,
        "rowWidgetItems" |
        "propertyName" |
        "titleSuffix" |
        "linkType">> {
}

class ContentVariantsForm extends PropertyFieldGroup {
  declare Config: ContentVariantsFormConfig;

  static override readonly xtype: string = "com.coremedia.blueprint.variants.config.contentVariantsForm";

  #structContentLinkListWrapper: StructContentLinkListWrapper = null;

  /**
   * A constant for the linklist property name
   */
  static readonly CONTENT_VARIANTS_PROPERTY_NAME: string = "localSettings";

  static readonly DEFAULT_LINK_TYPE: string = "CMViewtype";

  static readonly CONTENT_VARIANTS_ANNOTATION_WIDGET_ITEM_ID: string = "content-variants-annotation-widget";

  constructor(config: Config<ContentVariantsForm> = null) {
    super((() => ConfigUtils.apply(Config(ContentVariantsForm, {
      title: ContentVariants_properties.ContentVariantsFormTitle,
      itemId: "contentVariantsForm",

      items: [
        Config(LinkListPropertyField, {
          propertyName: ConfigUtils.asString(config.propertyName || ContentVariantsForm.CONTENT_VARIANTS_PROPERTY_NAME),
          showThumbnails: true,
          hideLabel: true,
          bindTo: config.bindTo,
          linkListWrapper: this.#getStructContentLinkListWrapper(config),
          linkType: ConfigUtils.asString(config.linkType || ContentVariantsForm.DEFAULT_LINK_TYPE),
          linkSuggester: new ContentVariantsTypeSuggester({ linkTypeName: "CMViewtype" }),
          additionalToolbarItems: [
            Config(Separator),
            Config(QuickCreateLinklistMenu, {
              bindTo: config.bindTo,
              sourceLinkListVE: this.#getStructContentLinkListWrapper(config).getVE(),
            }),
          ],
          columns: [
            Config(LinkListThumbnailColumn),
            Config(TypeIconColumn),
            Config(NameColumn, { flex: 1 }),
            Config(StatusColumn),
          ],
          rowWidget: Config(PropertyFieldAnnotatedLinkListWidget, {
            bindTo: config.bindTo,
            propertyNameWithoutIndex: ContentVariantsForm.CONTENT_VARIANTS_PROPERTY_NAME + ".variants",
            forceReadOnlyValueExpression: config.forceReadOnlyValueExpression,
            items: config.rowWidgetItems,
          }),
        }),
      ],
    }), config))());
  }

  /**
   * Items to add to the row widget.
   */
  rowWidgetItems: Array<any> = null;

  #getStructContentLinkListWrapper(config: Config<ContentVariantsForm>): ILinkListWrapper {
    if (!this.#structContentLinkListWrapper) {
      this.#structContentLinkListWrapper = AnnotatedLinkListHelper.createStructContentLinkListWrapper(config.bindTo,
        config.forceReadOnlyValueExpression,
        config.linkType || ContentVariantsForm.DEFAULT_LINK_TYPE,
        config.propertyName || ContentVariantsForm.CONTENT_VARIANTS_PROPERTY_NAME,
        "variants",
        "contentVariantName",
      );
    }
    return this.#structContentLinkListWrapper;
  }

  /** the property of the Bean to bind in this field - defaults to "extendedItems" */
  propertyName: string = null;

  /* The allowed type of links - default to "CMTeasable" */
  linkType: string = null;

  titleSuffix: string = null;
}

export default ContentVariantsForm;
