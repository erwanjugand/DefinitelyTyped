declare namespace chrome {
    ////////////////////
    // Action
    ////////////////////
    /**
     * Use the `chrome.action` API to control the extension's icon in the Google Chrome toolbar.
     * The action icons are displayed in the browser toolbar next to the omnibox. After installation, these appear in the extensions menu (the puzzle piece icon). Users can pin your extension icon to the toolbar.
     *
     * Manifest: "action"
     * @since Chrome 88, MV3
     */
    namespace action {
        interface BadgeColorDetails {
            /** An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example, opaque red is `[255, 0, 0, 255]`. Can also be a string with a CSS value, with opaque red being `#FF0000` or `#F00`. */
            color: string | extensionTypes.ColorArray;
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
            tabId?: number | undefined;
        }

        interface BadgeTextDetails {
            /** Any number of characters can be passed, but only about four can fit in the space. If an empty string (`''`) is passed, the badge text is cleared. If `tabId` is specified and `text` is null, the text for the specified tab is cleared and defaults to the global badge text. */
            text?: string | undefined;
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
            tabId?: number | undefined;
        }

        interface TitleDetails {
            /** The string the action should display when moused over. */
            title: string;
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
            tabId?: number | undefined;
        }

        interface PopupDetails {
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
            tabId?: number | undefined;
            /** The html file to show in a popup. If set to the empty string (`''`), no popup is shown. */
            popup: string;
        }

        interface TabIconDetails {
            /** Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}' */
            path?: string | { [index: number]: string } | undefined;
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
            tabId?: number | undefined;
            /** Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}' */
            imageData?: ImageData | { [index: number]: ImageData } | undefined;
        }

        /** @since Chrome 99 */
        interface OpenPopupOptions {
            /** The id of the window to open the action popup in. Defaults to the currently-active window if unspecified.  */
            windowId?: number | undefined;
        }

        interface TabDetails {
            /** The ID of the tab to query state for. If no tab is specified, the non-tab-specific state is returned.  */
            tabId?: number | undefined;
        }

        /**
         * The collection of user-specified settings relating to an extension's action.
         * @since Chrome 91
         */
        interface UserSettings {
            /** Whether the extension's action icon is visible on browser windows' top-level toolbar (i.e., whether the extension has been 'pinned' by the user). */
            isOnToolbar: boolean;
        }

        /** @since Chrome 130 */
        interface UserSettingsChange {
            /** Whether the extension's action icon is visible on browser windows' top-level toolbar (i.e., whether the extension has been 'pinned' by the user). */
            isOnToolbar?: boolean;
        }

        /**
         * Disables the action for a tab.
         * @param tabId The ID of the tab for which you want to modify the action.
         *
         * Can return its result via Promise.
         */
        function disable(tabId?: number): Promise<void>;
        function disable(callback: () => void): void;
        function disable(tabId: number | undefined, callback: () => void): void;

        /**
         * Enables the action for a tab. By default, actions are enabled.
         * @param tabId The ID of the tab for which you want to modify the action.
         *
         * Can return its result via Promise.
         */
        function enable(tabId?: number): Promise<void>;
        function enable(callback: () => void): void;
        function enable(tabId: number | undefined, callback: () => void): void;

        /**
         * Gets the background color of the action.
         *
         * Can return its result via Promise.
         */
        function getBadgeBackgroundColor(details: TabDetails): Promise<extensionTypes.ColorArray>;
        function getBadgeBackgroundColor(
            details: TabDetails,
            callback: (result: extensionTypes.ColorArray) => void,
        ): void;

        /**
         * Gets the badge text of the action. If no tab is specified, the non-tab-specific badge text is returned. If {@link declarativeNetRequest.ExtensionActionOptions.displayActionCountAsBadgeText displayActionCountAsBadgeText} is enabled, a placeholder text will be returned unless the {@link runtime.ManifestPermission declarativeNetRequestFeedback} permission is present or tab-specific badge text was provided.
         *
         * Can return its result via Promise.
         */
        function getBadgeText(details: TabDetails): Promise<string>;
        function getBadgeText(details: TabDetails, callback: (result: string) => void): void;

        /**
         * Gets the text color of the action.
         *
         * Can return its result via Promise.
         * @since Chrome 110
         */
        function getBadgeTextColor(details: TabDetails): Promise<extensionTypes.ColorArray>;
        function getBadgeTextColor(
            details: TabDetails,
            callback: (result: extensionTypes.ColorArray) => void,
        ): void;

        /**
         * Gets the html document set as the popup for this action.
         *
         * Can return its result via Promise.
         */
        function getPopup(details: TabDetails): Promise<string>;
        function getPopup(details: TabDetails, callback: (result: string) => void): void;

        /**
         * Gets the title of the action.
         *
         * Can return its result via Promise.
         */
        function getTitle(details: TabDetails): Promise<string>;
        function getTitle(details: TabDetails, callback: (result: string) => void): void;

        /**
         * Returns the user-specified settings relating to an extension's action.
         *
         * Can return its result via Promise.
         * @since Chrome 91
         */
        function getUserSettings(): Promise<UserSettings>;
        function getUserSettings(callback: (userSettings: UserSettings) => void): void;

        /**
         * Indicates whether the extension action is enabled for a tab (or globally if no `tabId` is provided). Actions enabled using only {@link declarativeContent} always return false.
         *
         * Can return its result via Promise.
         * @since Chrome 110
         */
        function isEnabled(tabId?: number): Promise<boolean>;
        function isEnabled(callback: (isEnabled: boolean) => void): void;
        function isEnabled(tabId: number | undefined, callback: (isEnabled: boolean) => void): void;

        /**
         * Opens the extension's popup. Between Chrome 118 and Chrome 126, this is only available to policy installed extensions.
         *
         * @param options Specifies options for opening the popup.
         *
         * Can return its result via Promise.
         * @since Chrome 127
         */
        function openPopup(options?: OpenPopupOptions): Promise<void>;
        function openPopup(callback: () => void): void;
        function openPopup(options: OpenPopupOptions | undefined, callback: () => void): void;

        /**
         * Sets the background color for the badge.
         *
         * Can return its result via Promise.
         */
        function setBadgeBackgroundColor(details: BadgeColorDetails): Promise<void>;
        function setBadgeBackgroundColor(details: BadgeColorDetails, callback: () => void): void;

        /**
         * Sets the badge text for the action. The badge is displayed on top of the icon.
         *
         * Can return its result via Promise.
         */
        function setBadgeText(details: BadgeTextDetails): Promise<void>;
        function setBadgeText(details: BadgeTextDetails, callback: () => void): void;

        /**
         * Sets the text color for the badge.
         *
         * Can return its result via Promise.
         * @since Chrome 110
         */
        function setBadgeTextColor(details: BadgeColorDetails): Promise<void>;
        function setBadgeTextColor(details: BadgeColorDetails, callback: () => void): void;

        /**
         * Sets the icon for the action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the path or the imageData property must be specified.
         *
         * Can return its result via Promise.
         */
        function setIcon(details: TabIconDetails): Promise<void>;
        function setIcon(details: TabIconDetails, callback: () => void): void;

        /**
         * Sets the HTML document to be opened as a popup when the user clicks on the action's icon.
         *
         * Can return its result via Promise.
         * @since Chrome 96
         */
        function setPopup(details: PopupDetails): Promise<void>;
        function setPopup(details: PopupDetails, callback: () => void): void;

        /**
         * Sets the title of the action. This shows up in the tooltip.
         *
         * Can return its result via Promise.
         */
        function setTitle(details: TitleDetails): Promise<void>;
        function setTitle(details: TitleDetails, callback: () => void): void;

        /** Fired when an action icon is clicked. This event will not fire if the action has a popup. */
        const onClicked: events.Event<(tab: chrome.tabs.Tab) => void>;

        /**
         * Fired when user-specified settings relating to an extension's action change.
         * @since Chrome 130
         */
        const onUserSettingsChanged: events.Event<(change: UserSettingsChange) => void>;
    }
}
