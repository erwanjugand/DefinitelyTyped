declare namespace chrome {
    ////////////////////
    // Browser Action
    ////////////////////
    /**
     * Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar. In addition to its icon, a browser action can have a tooltip, a badge, and a popup.
     *
     * Manifest: "browser_action"
     *
     * MV2 only
     */
    namespace browserAction {
        interface BadgeBackgroundColorDetails {
            /** An array of four integers in the range 0-255 that make up the RGBA color of the badge. Can also be a string with a CSS hex color value; for example, `#FF0000` or `#F00` (red). Renders colors at full opacity. */
            color: string | extensionTypes.ColorArray;
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
            tabId?: number | null | undefined;
        }

        interface BadgeTextDetails {
            /** Any number of characters can be passed, but only about four can fit into the space. If an empty string (`''`) is passed, the badge text is cleared. If `tabId` is specified and `text` is null, the text for the specified tab is cleared and defaults to the global badge text. */
            text?: string | null | undefined;
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
            tabId?: number | null | undefined;
        }

        interface TitleDetails {
            /** The string the browser action should display when moused over. */
            title: string;
            /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
            tabId?: number | null | undefined;
        }

        interface TabDetails {
            /** The ID of the tab to query state for. If no tab is specified, the non-tab-specific state is returned. */
            tabId?: number | null | undefined;
        }

        type TabIconDetails =
            & {
                /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
                tabId?: number | null | undefined;
            }
            & (
                | {
                    /** Either an ImageData object or a dictionary {size -> ImageData} representing an icon to be set. If the icon is specified as a dictionary, the image used is chosen depending on the screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then an image with size `scale` \* n is selected, where _n_ is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}' */
                    imageData: ImageData | { [index: number]: ImageData };
                    /** Either a relative image path or a dictionary {size -> relative image path} pointing to an icon to be set. If the icon is specified as a dictionary, the image used is chosen depending on the screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then an image with size `scale` \* n is selected, where _n_ is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}' */
                    path?: string | { [index: string]: string } | undefined;
                }
                | {
                    /** Either an ImageData object or a dictionary {size -> ImageData} representing an icon to be set. If the icon is specified as a dictionary, the image used is chosen depending on the screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then an image with size `scale` \* n is selected, where _n_ is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}' */
                    imageData?: ImageData | { [index: number]: ImageData } | undefined;
                    /** Either a relative image path or a dictionary {size -> relative image path} pointing to an icon to be set. If the icon is specified as a dictionary, the image used is chosen depending on the screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then an image with size `scale` \* n is selected, where _n_ is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}' */
                    path: string | { [index: string]: string };
                }
            );

        interface PopupDetails {
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
            tabId?: number | null | undefined;
            /** The relative path to the HTML file to show in a popup. If set to the empty string (`''`), no popup is shown.*/
            popup: string;
        }

        /**
         * Enables the browser action for a tab. Defaults to enabled.
         * @param tabId The ID of the tab for which to modify the browser action.
         * @param callback Since Chrome 67
         */
        function enable(callback?: () => void): void;
        function enable(tabId: number | null | undefined, callback?: () => void): void;

        /**
         * Sets the background color for the badge.
         * @param callback Since Chrome 67
         */
        function setBadgeBackgroundColor(details: BadgeBackgroundColorDetails, callback?: () => void): void;

        /**
         * Sets the badge text for the browser action. The badge is displayed on top of the icon.
         * @param callback Since Chrome 67
         */
        function setBadgeText(details: BadgeTextDetails, callback?: () => void): void;

        /**
         * Sets the title of the browser action. This title appears in the tooltip.
         * @param callback Since Chrome 67
         */
        function setTitle(details: TitleDetails, callback?: () => void): void;

        /** Gets the badge text of the browser action. If no tab is specified, the non-tab-specific badge text is returned. */
        function getBadgeText(details: TabDetails, callback: (result: string) => void): void;

        /**
         * Sets the HTML document to be opened as a popup when the user clicks the browser action icon.
         * @param callback Since Chrome 67
         */
        function setPopup(details: PopupDetails, callback?: () => void): void;

        /**
         * Disables the browser action for a tab.
         * @param tabId The ID of the tab for which to modify the browser action.
         * @param callback since Chrome 67
         */
        function disable(callback?: () => void): void;
        function disable(tabId: number | null | undefined, callback?: () => void): void;

        /** Gets the title of the browser action. */
        function getTitle(details: TabDetails, callback: (result: string) => void): void;

        /** Gets the background color of the browser action. */
        function getBadgeBackgroundColor(
            details: TabDetails,
            callback: (result: extensionTypes.ColorArray) => void,
        ): void;

        /** Gets the HTML document that is set as the popup for this browser action. */
        function getPopup(details: TabDetails, callback: (result: string) => void): void;

        /**
         * Sets the icon for the browser action. The icon can be specified as the path to an image file, as the pixel data from a canvas element, or as a dictionary of one of those. Either the `path` or the `imageData` property must be specified.
         */
        function setIcon(details: TabIconDetails, callback?: () => void): void;

        /** Fired when a browser action icon is clicked. Does not fire if the browser action has a popup. */
        const onClicked: events.Event<(tab: chrome.tabs.Tab) => void>;
    }
}
