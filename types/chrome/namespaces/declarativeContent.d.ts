declare namespace chrome {
    ////////////////////
    // Declarative Content
    ////////////////////
    /**
     * Use the `chrome.declarativeContent` API to take actions depending on the content of a page, without requiring permission to read the page's content.
     *
     * Permissions: "declarativeContent"
     */
    namespace declarativeContent {
        interface PageStateMatcherProperties {
            /** Matches if the conditions of the `UrlFilter` are fulfilled for the top-level URL of the page. */
            pageUrl?: events.UrlFilter | undefined;
            /** Matches if all of the CSS selectors in the array match displayed elements in a frame with the same origin as the page's main frame. All selectors in this array must be compound selectors to speed up matching. Note: Listing hundreds of CSS selectors or listing CSS selectors that match hundreds of times per page can slow down web sites. */
            css?: string[] | undefined;
            /**
             * Matches if the bookmarked state of the page is equal to the specified value. Requires the bookmarks permission.
             * @since Chrome 45
             */
            isBookmarked?: boolean | undefined;
        }

        /** Matches the state of a web page based on various criteria. */
        class PageStateMatcher {
            constructor(arg: PageStateMatcherProperties);
        }

        interface RequestContentScriptProperties {
            /** Whether the content script runs in all frames of the matching page, or in only the top frame. Default is `false`. */
            allFrames?: boolean | undefined;

            /** Names of CSS files to be injected as a part of the content script. */
            css?: string[] | undefined;

            /** Names of JavaScript files to be injected as a part of the content script. */
            js?: string[] | undefined;

            /** Whether to insert the content script on `about:blank` and `about:srcdoc`. Default is `false`. */
            matchAboutBlank?: boolean | undefined;
        }

        /** Declarative event action that injects a content script. */
        class RequestContentScript {
            constructor(arg: RequestContentScriptProperties);
        }

        /**
         * A declarative event action that sets the extension's toolbar {@link action} to an enabled state while the corresponding conditions are met. This action can be used without host permissions. If the extension has the `activeTab` permission, clicking the page action grants access to the active tab.
         *
         * On pages where the conditions are not met the extension's toolbar action will be grey-scale, and clicking it will open the context menu, instead of triggering the action.
         * @since MV3
         */
        class ShowAction {}

        /**
         * A declarative event action that sets the extension's {@link pageAction} to an enabled state while the corresponding conditions are met. This action can be used without host permissions, but the extension must have a page action. If the extension has the `activeTab` permission, clicking the page action grants access to the active tab.
         *
         * On pages where the conditions are not met the extension's toolbar action will be grey-scale, and clicking it will open the context menu, instead of triggering the action.
         *
         * MV2 only
         */
        class ShowPageAction {}

        /**
         * Declarative event action that sets the n-dip square icon for the extension's {@link pageAction} or {@link browserAction} while the corresponding conditions are met. This action can be used without host permissions, but the extension must have a page or browser action.
         *
         * Exactly one of `imageData` or `path` must be specified. Both are dictionaries mapping a number of pixels to an image representation. The image representation in `imageData` is an `ImageData` object; for example, from a `canvas` element, while the image representation in `path` is the path to an image file relative to the extension's manifest. If `scale` screen pixels fit into a device-independent pixel, the `scale * n` icon is used. If that scale is missing, another image is resized to the required size.
         */
        class SetIcon {
            constructor(
                options:
                    | {
                        imageData: ImageData | { [index: number]: ImageData };
                        path?: string | { [index: number]: string } | undefined;
                    }
                    | {
                        imageData?: ImageData | { [index: number]: ImageData } | undefined;
                        path: string | { [index: number]: string };
                    },
            );
        }

        /** Provides the Declarative Event API consisting of {@link events.Event.addRules addRules}, {@link events.Event.removeRules removeRules}, and {@link events.Event.getRules getRules}. */
        const onPageChanged: events.Event<() => void>;
    }
}
