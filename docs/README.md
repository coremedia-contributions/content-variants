# Scope of the implementation

This extension allows business users to either
* Add inline variants (e.g., for Teaser Title and Teaser Text)
* Add alternative content items (e.g., for Pictures)

Variants are configured as Layout Variants within the Repository (/Settings/Options/Formats)
![Library](./images/Library.png)
![Form](./images/Form.png)

Delivery Support is currently implemented for Headless Service only
![Headless Support](./images/Headless.png)

The Features uses annotated linklists. All you need to do is to define a custom from below forms similar to e.g. [SingleLinklistForm.ts](../apps/studio-client/apps/main/content-variants-studio-plugin/src/forms/SingleLinklistForm.ts)
![Code](./images/Studio Code.png)
and activate it in [ContentVariantsStudioPlugin.ts](../apps/studio-client/apps/main/content-variants-studio-plugin/src/ContentVariantsStudioPlugin.ts)


