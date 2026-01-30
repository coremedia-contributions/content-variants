import BlueprintDoctypesDocTypes_properties
  from "@coremedia-blueprint/studio-client.blueprint-doctypes/dist/src/BlueprintDoctypesDocTypes_properties";

/**
 * Interface values for ResourceBundle "ContentVariants".
 * @see ContentVariants_properties#INSTANCE
 */
interface ContentVariants_properties {
  "CMTeasable_localSettings.variants.{index:[0-9]+}.teaserText_text": string;
  "CMTeasable_localSettings.variants.{index:[0-9]+}.teaserText_emptyText": string;
  "CMTeasable_localSettings.variants.{index:[0-9]+}.teaserTitle_text": string;
  "CMTeasable_localSettings.variants.{index:[0-9]+}.teaserTitle_emptyText": string;

  TeaserVariantsTitle: string;
  PictureVariantsTitle: string;
  VideoVariantsTitle: string;

}

/**
 * Singleton for the current user Locale's instance of ResourceBundle "ContentVariants".
 * @see ContentVariants_properties
 */
const ContentVariants_properties: ContentVariants_properties = {
  "CMTeasable_localSettings.variants.{index:[0-9]+}.teaserTitle_text": BlueprintDoctypesDocTypes_properties.CMTeasable_teaserTitle_displayName,
  "CMTeasable_localSettings.variants.{index:[0-9]+}.teaserTitle_emptyText": BlueprintDoctypesDocTypes_properties.CMTeasable_teaserTitle_emptyText,
  "CMTeasable_localSettings.variants.{index:[0-9]+}.teaserText_text": BlueprintDoctypesDocTypes_properties.CMTeasable_teaserText_displayName,
  "CMTeasable_localSettings.variants.{index:[0-9]+}.teaserText_emptyText": BlueprintDoctypesDocTypes_properties.CMTeasable_teaserText_emptyText,
  TeaserVariantsTitle: "Teaser Variants",
  PictureVariantsTitle: "Picture Variants",
  VideoVariantsTitle: "Video Variants",
};

export default ContentVariants_properties;
