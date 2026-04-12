declare namespace chrome {
    ////////////////////
    // Context Menus
    ////////////////////
    /**
     * Use the `chrome.contextMenus` API to add items to Google Chrome's context menu. You can choose what types of objects your context menu additions apply to, such as images, hyperlinks, and pages.
     *
     * Permissions: "contextMenus"
     */
    namespace contextMenus {
        /**
         * The different contexts a menu can appear in. Specifying 'all' is equivalent to the combination of all other contexts except for 'launcher'. The 'launcher' context is only supported by apps and is used to add menu items to the context menu that appears when clicking the app icon in the launcher/taskbar/dock/etc. Different platforms might put limitations on what is actually supported in a launcher context menu.
         * @since Chrome 44
         */
        enum ContextType {
            ALL = "all",
            PAGE = "page",
            FRAME = "frame",
            SELECTION = "selection",
            LINK = "link",
            EDITABLE = "editable",
            IMAGE = "image",
            VIDEO = "video",
            AUDIO = "audio",
            LAUNCHER = "launcher",
            BROWSER_ACTION = "browser_action",
            PAGE_ACTION = "page_action",
            ACTION = "action",
        }

        /**
         * Properties of the new context menu item.
         * @since Chrome 123
         */
        interface CreateProperties {
            /** The initial state of a checkbox or radio button: `true` for selected, `false` for unselected. Only one radio button can be selected at a time in a given group. */
            checked?: boolean;
            /** List of contexts this menu item will appear in. Defaults to `['page']`. */
            contexts?: [`${ContextType}`, ...`${ContextType}`[]];
            /** Restricts the item to apply only to documents or frames whose URL matches one of the given patterns. For details on pattern formats, see Match Patterns.  */
            documentUrlPatterns?: string[];
            /**  Whether this context menu item is enabled or disabled. Defaults to `true`. */
            enabled?: boolean;
            /** The unique ID to assign to this item. Mandatory for event pages. Cannot be the same as another ID for this extension. */
            id?: string;
            /**  The ID of a parent menu item; this makes the item a child of a previously added item. */
            parentId?: number | string;
            /**  Similar to `documentUrlPatterns`, filters based on the `src` attribute of `img`, `audio`, and `video` tags and the `href` attribute of `a` tags. */
            targetUrlPatterns?: string[];
            /** The text to display in the item; this is _required_ unless `type` is `separator`. When the context is `selection`, use `%s` within the string to show the selected text. For example, if this parameter's value is "Translate '%s' to Pig Latin" and the user selects the word "cool", the context menu item for the selection is "Translate 'cool' to Pig Latin". */
            title?: string;
            /** The type of menu item. Defaults to `normal`. */
            type?: `${ItemType}`;
            /** Whether the item is visible in the menu. */
            visible?: boolean;
            /**
             * A function that is called back when the menu item is clicked. This is not available inside of a service worker; instead, you should register a listener for {@link contextMenus.onClicked}.
             * @param info Information about the item clicked and the context where the click happened.
             * @param tab The details of the tab where the click took place. This parameter is not present for platform apps.
             */
            onclick?: (
                info: OnClickData,
                tab: tabs.Tab,
            ) => void;
        }

        /**
         * The type of menu item.
         * @since Chrome 44
         */
        enum ItemType {
            NORMAL = "normal",
            CHECKBOX = "checkbox",
            RADIO = "radio",
            SEPARATOR = "separator",
        }

        /** Information sent when a context menu item is clicked. */
        interface OnClickData {
            /** A flag indicating the state of a checkbox or radio item after it is clicked. */
            checked?: boolean;
            /**  A flag indicating whether the element is editable (text input, textarea, etc.). */
            editable: boolean;
            /**
             * The ID of the frame of the element where the context menu was clicked, if it was in a frame.
             * @since Chrome 51
             */
            frameId?: number;
            /** The URL of the frame of the element where the context menu was clicked, if it was in a frame. */
            frameUrl?: string;
            /** If the element is a link, the URL it points to. */
            linkUrl?: string;
            /** One of 'image', 'video', or 'audio' if the context menu was activated on one of these types of elements. */
            mediaType?: `${ContextType.IMAGE}` | `${ContextType.VIDEO}` | `${ContextType.AUDIO}`;
            /** The ID of the menu item that was clicked. */
            menuItemId: number | string;
            /** The URL of the page where the menu item was clicked. This property is not set if the click occurred in a context where there is no current page, such as in a launcher context menu. */
            pageUrl?: string;
            /** The parent ID, if any, for the item clicked.*/
            parentMenuItemId?: number | string;
            /** The text for the context selection, if any. */
            selectionText?: string | undefined;
            /** Will be present for elements with a 'src' URL. */
            srcUrl?: string | undefined;
            /** A flag indicating the state of a checkbox or radio item before it was clicked. */
            wasChecked?: boolean | undefined;
        }

        /** The maximum number of top level extension items that can be added to an extension action context menu. Any items beyond this limit will be ignored. */
        const ACTION_MENU_TOP_LEVEL_LIMIT: 6;

        /**
         * Creates a new context menu item. If an error occurs during creation, it may not be detected until the creation callback fires; details will be in {@link chrome.runtime.lastError}.
         * @return The ID of the newly created item.
         */
        function create(createProperties: CreateProperties, callback?: () => void): number | string;

        /**
         * Removes a context menu item.
         * @param menuItemId The ID of the context menu item to remove.
         *
         * Can return its result via Promise since Chrome 123.
         */
        function remove(menuItemId: string | number): Promise<void>;
        function remove(menuItemId: string | number, callback: () => void): void;

        /**
         * Removes all context menu items added by this extension.
         *
         * Can return its result via Promise since Chrome 123.
         */
        function removeAll(): Promise<void>;
        function removeAll(callback: () => void): void;

        /**
         * Updates a previously created context menu item.
         * @param id The ID of the item to update.
         * @param updateProperties The properties to update. Accepts the same values as the {@link contextMenus.create} function.
         *
         * Can return its result via Promise since Chrome 123.
         */
        function update(id: string | number, updateProperties: Omit<CreateProperties, "id">): Promise<void>;
        function update(
            id: string | number,
            updateProperties: Omit<CreateProperties, "id">,
            callback: () => void,
        ): void;

        /** Fired when a context menu item is clicked. */
        const onClicked: events.Event<(info: OnClickData, tab?: tabs.Tab) => void>;
    }
}
