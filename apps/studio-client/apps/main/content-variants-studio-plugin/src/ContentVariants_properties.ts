/**
 * Interface values for ResourceBundle "ContentVariants".
 * @see ContentVariants_properties#INSTANCE
 */
import BlueprintDocumentTypes_properties
  from "@coremedia-blueprint/studio-client.main.blueprint-forms/BlueprintDocumentTypes_properties";

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
  "CMTeasable_localSettings.variants.{index:[0-9]+}.teaserTitle_text": BlueprintDocumentTypes_properties.CMTeasable_teaserTitle_text,
  "CMTeasable_localSettings.variants.{index:[0-9]+}.teaserTitle_emptyText": BlueprintDocumentTypes_properties.CMTeasable_teaserTitle_emptyText,
  "CMTeasable_localSettings.variants.{index:[0-9]+}.teaserText_text": BlueprintDocumentTypes_properties.CMTeasable_teaserText_text,
  "CMTeasable_localSettings.variants.{index:[0-9]+}.teaserText_emptyText": BlueprintDocumentTypes_properties.CMTeasable_teaserText_emptyText,
  TeaserVariantsTitle: "Teaser Variants",
  PictureVariantsTitle: "Picture Variants",
  VideoVariantsTitle: "Video Variants",
};

export default ContentVariants_properties;
