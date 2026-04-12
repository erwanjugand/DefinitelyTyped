declare namespace chrome {
    ////////////////////
    // Tabs
    ////////////////////
    /**
     * Use the `chrome.tabs` API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.
     *
     * Permissions: The majority of the chrome.tabs API can be used without declaring any permission. However, the "tabs" permission is required in order to populate the url, title, and favIconUrl properties of Tab.
     */
    namespace tabs {
        /**
         * The tab's muted state and the reason for the last state change.
         * @since Chrome 46
         */
        interface MutedInfo {
            /** Whether the tab is muted (prevented from playing sound). The tab may be muted even if it has not played or is not currently playing sound. Equivalent to whether the 'muted' audio indicator is showing. */
            muted: boolean;
            /* The reason the tab was muted or unmuted. Not set if the tab's mute state has never been changed. */
            reason?: `${MutedInfoReason}` | undefined;
            /** The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed. */
            extensionId?: string | undefined;
        }

        /**
         * An event that caused a muted state change.
         * @since Chrome 46
         */
        enum MutedInfoReason {
            /** A user input action set the muted state. */
            USER = "user",
            /** Tab capture was started, forcing a muted state change. */
            CAPTURE = "capture",
            /** An extension set the muted state. */
            EXTENSION = "extension",
        }

        interface Tab {
            /** The tab's loading status. */
            status?: `${TabStatus}` | undefined;
            /** The zero-based index of the tab within its window. */
            index: number;
            /** The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists. */
            openerTabId?: number | undefined;
            /** The title of the tab. This property is only present if the extension has the `"tabs"` permission or has host permissions for the page. */
            title?: string | undefined;
            /** The last committed URL of the main frame of the tab. This property is only present if the extension has the `"tabs"` permission or has host permissions for the page. May be an empty string if the tab has not yet committed. See also {@link Tab.pendingUrl}. */
            url?: string | undefined;
            /**
             * The URL the tab is navigating to, before it has committed. This property is only present if the extension has the `"tabs"` permission or has host permissions for the page and there is a pending navigation.
             * @since Chrome 79
             */
            pendingUrl?: string | undefined;
            /** Whether the tab is pinned. */
            pinned: boolean;
            /** Whether the tab is highlighted. */
            highlighted: boolean;
            /** The ID of the window that contains the tab. */
            windowId: number;
            /** Whether the tab is active in its window. Does not necessarily mean the window is focused. */
            active: boolean;
            /** The URL of the tab's favicon. This property is only present if the extension has the `tabs` permission or has host permissions for the page. It may also be an empty string if the tab is loading. */
            favIconUrl?: string | undefined;
            /**
             * Whether the tab is frozen. A frozen tab cannot execute tasks, including event handlers or timers. It is visible in the tab strip and its content is loaded in memory. It is unfrozen on activation.
             * @since Chrome 132
             */
            frozen: boolean;
            /** The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a tab may not be assigned an ID; for example, when querying foreign tabs using the {@link sessions} API, in which case a session ID may be present. Tab ID can also be set to `chrome.tabs.TAB_ID_NONE` for apps and devtools windows. */
            id?: number | undefined;
            /** Whether the tab is in an incognito window. */
            incognito: boolean;
            /**
             * Whether the tab is selected.
             * @deprecated since Chrome 33. Please use {@link Tab.highlighted}.
             */
            selected: boolean;
            /**
             * Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the 'speaker audio' indicator is showing.
             * @since Chrome 45
             */
            audible?: boolean | undefined;
            /**
             * Whether the tab is discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
             * @since Chrome 54
             */
            discarded: boolean;
            /**
             * Whether the tab can be discarded automatically by the browser when resources are low.
             * @since Chrome 54
             */
            autoDiscardable: boolean;
            /**
             * The tab's muted state and the reason for the last state change.
             * @since Chrome 46
             */
            mutedInfo?: MutedInfo | undefined;
            /** The width of the tab in pixels. */
            width?: number | undefined;
            /** The height of the tab in pixels. */
            height?: number | undefined;
            /** The session ID used to uniquely identify a tab obtained from the {@link sessions} API. */
            sessionId?: string | undefined;
            /**
             * The ID of the Split View that the tab belongs to.
             * @since Chrome 140
             */
            splitViewId?: number | undefined;
            /**
             * The ID of the group that the tab belongs to.
             * @since Chrome 88
             */
            groupId: number;
            /**
             * The last time the tab became active in its window as the number of milliseconds since epoch.
             * @since Chrome 121
             */
            lastAccessed?: number | undefined;
        }

        /** The tab's loading status. */
        enum TabStatus {
            UNLOADED = "unloaded",
            LOADING = "loading",
            COMPLETE = "complete",
        }

        /** The type of window. */
        enum WindowType {
            NORMAL = "normal",
            POPUP = "popup",
            PANEL = "panel",
            APP = "app",
            DEVTOOLS = "devtools",
        }

        /** Defines how zoom changes in a tab are handled and at what scope. */
        interface ZoomSettings {
            /** Defines how zoom changes are handled, i.e., which entity is responsible for the actual scaling of the page; defaults to `automatic`. */
            mode?: `${ZoomSettingsMode}` | undefined;
            /** Defines whether zoom changes persist for the page's origin, or only take effect in this tab; defaults to `per-origin` when in `automatic` mode, and `per-tab` otherwise. */
            scope?: `${ZoomSettingsScope}` | undefined;
            /**
             * Used to return the default zoom level for the current tab in calls to {@link tabs.getZoomSettings}.
             * @since Chrome 43
             */
            defaultZoomFactor?: number | undefined;
        }

        /**
         * Defines how zoom changes are handled, i.e., which entity is responsible for the actual scaling of the page; defaults to `automatic`.
         * @since Chrome 44
         */
        enum ZoomSettingsMode {
            /** Zoom changes are handled automatically by the browser. */
            AUTOMATIC = "automatic",
            /** Overrides the automatic handling of zoom changes. The `onZoomChange` event will still be dispatched, and it is the extension's responsibility to listen for this event and manually scale the page. This mode does not support `per-origin` zooming, and thus ignores the `scope` zoom setting and assumes `per-tab`. */
            MANUAL = "manual",
            /** Disables all zooming in the tab. The tab reverts to the default zoom level, and all attempted zoom changes are ignored. */
            DISABLED = "disabled",
        }

        /**
         * Defines whether zoom changes persist for the page's origin, or only take effect in this tab; defaults to `per-origin` when in `automatic` mode, and `per-tab` otherwise.
         * @since Chrome 44
         */
        enum ZoomSettingsScope {
            /** Zoom changes persist in the zoomed page's origin, i.e., all other tabs navigated to that same origin are zoomed as well. Moreover, `per-origin` zoom changes are saved with the origin, meaning that when navigating to other pages in the same origin, they are all zoomed to the same zoom factor. The `per-origin` scope is only available in the `automatic` mode. */
            PER_ORIGIN = "per-origin",
            /** Zoom changes only take effect in this tab, and zoom changes in other tabs do not affect the zooming of this tab. Also, `per-tab` zoom changes are reset on navigation; navigating a tab always loads pages with their `per-origin` zoom factors. */
            PER_TAB = "per-tab",
        }

        /**
         * The maximum number of times that {@link captureVisibleTab} can be called per second. {@link captureVisibleTab} is expensive and should not be called too often.
         * @since Chrome 92
         */
        const MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND = 2;

        /**
         * An ID that represents the absence of a split tab.
         * @since Chrome 140
         */
        const SPLIT_VIEW_ID_NONE: -1;

        /**
         * An ID that represents the absence of a browser tab.
         * @since Chrome 46
         */
        const TAB_ID_NONE = -1;

        /**
         * An index that represents the absence of a tab index in a tab_strip.
         * @since Chrome 123
         */
        const TAB_INDEX_NONE = -1;

        interface CreateProperties {
            /** The position the tab should take in the window. The provided value is clamped to between zero and the number of tabs in the window. */
            index?: number | undefined;
            /** The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab. */
            openerTabId?: number | undefined;
            /** The URL to initially navigate the tab to. Fully-qualified URLs must include a scheme (i.e., 'http://www.google.com', not 'www.google.com'). Relative URLs are relative to the current page within the extension. Defaults to the New Tab Page. */
            url?: string | undefined;
            /** Whether the tab should be pinned. Defaults to `false` */
            pinned?: boolean | undefined;
            /** The window in which to create the new tab. Defaults to the current window. */
            windowId?: number | undefined;
            /** Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see {@link windows.update}). Defaults to `true`. */
            active?: boolean | undefined;
            /**
             * Whether the tab should become the selected tab in the window. Defaults to `true`
             * @deprecated since Chrome 33. Please use {@link CreateProperties.active active}.
             */
            selected?: boolean | undefined;
        }

        interface MoveProperties {
            /** The position to move the window to. Use `-1` to place the tab at the end of the window. */
            index: number;
            /** Defaults to the window the tab is currently in. */
            windowId?: number | undefined;
        }

        interface UpdateProperties {
            /** Whether the tab should be pinned. */
            pinned?: boolean | undefined;
            /** The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab. */
            openerTabId?: number | undefined;
            /** A URL to navigate the tab to. JavaScript URLs are not supported; use {@link scripting.executeScript} instead. */
            url?: string | undefined;
            /** Adds or removes the tab from the current selection. */
            highlighted?: boolean | undefined;
            /** Whether the tab should be active. Does not affect whether the window is focused (see {@link windows.update}).*/
            active?: boolean | undefined;
            /**
             * Whether the tab should be selected.
             * @deprecated since Chrome 33. Please use {@link highlighted}.
             */
            selected?: boolean | undefined;
            /**
             * Whether the tab should be muted.
             * @since Chrome 45
             */
            muted?: boolean | undefined;
            /**
             * Whether the tab should be discarded automatically by the browser when resources are low.
             * @since Chrome 54
             */
            autoDiscardable?: boolean | undefined;
        }

        interface ReloadProperties {
            /** Whether to bypass local caching. Defaults to `false`. */
            bypassCache?: boolean | undefined;
        }

        interface ConnectInfo {
            /** Is passed into onConnect for content scripts that are listening for the connection event. */
            name?: string | undefined;
            /** Open a port to a specific frame identified by `frameId` instead of all frames in the tab. */
            frameId?: number | undefined;
            /**
             * Open a port to a specific document identified by `documentId` instead of all frames in the tab.
             * @since Chrome 106
             */
            documentId?: string;
        }

        interface MessageSendOptions {
            /** Send a message to a specific frame identified by `frameId` instead of all frames in the tab. */
            frameId?: number | undefined;
            /**
             * Send a message to a specific document identified by `documentId` instead of all frames in the tab.
             * @since Chrome 106
             */
            documentId?: string;
        }

        interface GroupOptions {
            /** Configurations for creating a group. Cannot be used if groupId is already specified. */
            createProperties?: {
                /** The window of the new group. Defaults to the current window. */
                windowId?: number | undefined;
            } | undefined;
            /** The ID of the group to add the tabs to. If not specified, a new group will be created. */
            groupId?: number | undefined;
            /** The tab ID or list of tab IDs to add to the specified group. */
            tabIds?: number | [number, ...number[]] | undefined;
        }

        interface HighlightInfo {
            /** One or more tab indices to highlight. */
            tabs: number | number[];
            /** The window that contains the tabs. */
            windowId?: number | undefined;
        }

        interface QueryInfo {
            /** The tab loading status. */
            status?: `${TabStatus}` | undefined;
            /** Whether the tabs are in the last focused window. */
            lastFocusedWindow?: boolean | undefined;
            /** The ID of the parent window, or {@link windows.WINDOW_ID_CURRENT} for the current window. */
            windowId?: number | undefined;
            /** The type of window the tabs are in. */
            windowType?: `${WindowType}` | undefined;
            /** Whether the tabs are active in their windows. */
            active?: boolean | undefined;
            /** The position of the tabs within their windows. */
            index?: number | undefined;
            /** Match page titles against a pattern. This property is ignored if the extension does not have the `"tabs"` permission or host permissions for the page. */
            title?: string | undefined;
            /** Match tabs against one or more URL patterns. Fragment identifiers are not matched. This property is ignored if the extension does not have the `"tabs"` permission or host permissions for the page. */
            url?: string | string[] | undefined;
            /** Whether the tabs are in the current window. */
            currentWindow?: boolean | undefined;
            /** Whether the tabs are highlighted. */
            highlighted?: boolean | undefined;
            /**
             * Whether the tabs are discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
             * @since Chrome 54
             */
            discarded?: boolean | undefined;
            /**
             * Whether the tabs are frozen. A frozen tab cannot execute tasks, including event handlers or timers. It is visible in the tab strip and its content is loaded in memory. It is unfrozen on activation.
             * @since Chrome 132
             */
            frozen?: boolean | undefined;
            /**
             * Whether the tabs can be discarded automatically by the browser when resources are low.
             * @since Chrome 54
             */
            autoDiscardable?: boolean | undefined;
            /** Whether the tabs are pinned. */
            pinned?: boolean | undefined;
            /**
             * The ID of the Split View that the tabs are in, or `tabs.SPLIT_VIEW_ID_NONE` for tabs that aren't in a Split View.
             * @since Chrome 140
             */
            splitViewId?: number | undefined;
            /**
             * Whether the tabs are audible.
             * @since Chrome 45
             */
            audible?: boolean | undefined;
            /**
             * Whether the tabs are muted.
             * @since Chrome 45
             */
            muted?: boolean | undefined;
            /**
             * The ID of the group that the tabs are in, or {@link chrome.tabGroups.TAB_GROUP_ID_NONE} for ungrouped tabs.
             * @since Chrome 88
             */
            groupId?: number | undefined;
        }

        interface OnHighlightedInfo {
            /** All highlighted tabs in the window. */
            tabIds: number[];
            /** The window whose tabs changed. */
            windowId: number;
        }

        interface OnRemovedInfo {
            /** True when the tab was closed because its parent window was closed. */
            isWindowClosing: boolean;
            /** The window whose tab is closed */
            windowId: number;
        }

        interface OnUpdatedInfo {
            /** The tab's new audible state. */
            audible?: boolean;
            /**
             * The tab's new auto-discardable state.
             * @since Chrome 54
             */
            autoDiscardable?: boolean;
            /**
             * The tab's new discarded state.
             * @since Chrome 54
             */
            discarded?: boolean;
            /** The tab's new favicon URL. */
            favIconUrl?: string;
            /**
             * The tab's new frozen state.
             * @since Chrome 132
             */
            frozen?: boolean;
            /**
             * The tab's new group.
             * @since Chrome 88
             */
            groupId?: number;
            /**
             * The tab's new muted state and the reason for the change.
             * @since Chrome 46
             */
            mutedInfo?: MutedInfo;
            /** The tab's new pinned state. */
            pinned?: boolean;
            /**
             * The tab's new Split View.
             * @since Chrome 140
             */
            splitViewId?: number;
            /** The tab's loading status. */
            status?: `${TabStatus}`;
            /**
             * The tab's new title.
             * @since Chrome 48
             */
            title?: string;
            /** The tab's URL if it has changed. */
            url?: string;
        }

        interface OnAttachedInfo {
            newPosition: number;
            newWindowId: number;
        }

        interface OnMovedInfo {
            fromIndex: number;
            toIndex: number;
            windowId: number;
        }

        interface OnDetachedInfo {
            oldPosition: number;
            oldWindowId: number;
        }

        interface OnActivatedInfo {
            /** The ID of the tab that has become active. */
            tabId: number;
            /** The ID of the window the active tab changed inside of. */
            windowId: number;
        }

        interface OnSelectionChangedInfo {
            /** The ID of the window the selected tab changed inside of. */
            windowId: number;
        }

        interface OnActiveChangedInfo {
            /** The ID of the window the selected tab changed inside of. */
            windowId: number;
        }

        interface OnHighlightChangedInfo {
            /** All highlighted tabs in the window. */
            tabIds: number[];
            /** The window whose tabs changed. */
            windowId: number;
        }

        interface OnZoomChangeInfo {
            newZoomFactor: number;
            oldZoomFactor: number;
            tabId: number;
            zoomSettings: ZoomSettings;
        }

        /**
         * Injects JavaScript code into a page. For details, see the programmatic injection section of the content scripts doc.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         *
         * MV2 only
         * @param tabId The ID of the tab in which to run the script; defaults to the active tab of the current window.
         * @param details Details of the script to run. Either the code or the file property must be set, but both may not be set at the same time
         * @deprecated since Chrome 99. Replaced by {@link scripting.executeScript} in Manifest V3.
         */
        function executeScript(details: extensionTypes.InjectDetails): Promise<any[] | undefined>;
        function executeScript(
            tabId: number | undefined,
            details: extensionTypes.InjectDetails,
        ): Promise<any[] | undefined>;
        function executeScript(details: extensionTypes.InjectDetails, callback: (result?: any[]) => void): void;
        function executeScript(
            tabId: number | undefined,
            details: extensionTypes.InjectDetails,
            callback: (result?: any[]) => void,
        ): void;

        /**
         * Retrieves details about the specified tab
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function get(tabId: number): Promise<Tab>;
        function get(tabId: number, callback: (tab: Tab) => void): void;

        /**
         * Gets details about all tabs in the specified window.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         *
         * MV2 only
         * @deprecated Please use {@link tabs.query} `{windowId: windowId}`.
         */
        function getAllInWindow(windowId?: number): Promise<Tab[]>;
        function getAllInWindow(callback: (tabs: Tab[]) => void): void;
        function getAllInWindow(windowId: number | undefined, callback: (tabs: Tab[]) => void): void;

        /**
         * Gets the tab that this script call is being made from. Returns `undefined` if called from a non-tab context (for example, a background page or popup view).
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function getCurrent(): Promise<Tab | undefined>;
        function getCurrent(callback: (tab?: Tab) => void): void;

        /**
         * Gets the tab that is selected in the specified window.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         *
         * MV2 only
         * @param windowId Defaults to the current window.
         * @deprecated Please use {@link tabs.query} `{active: true}`.
         */
        function getSelected(windowId?: number): Promise<Tab>;
        function getSelected(callback: (tab: Tab) => void): void;
        function getSelected(windowId: number | undefined, callback: (tab: Tab) => void): void;

        /**
         * Creates a new tab.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function create(createProperties: CreateProperties): Promise<Tab>;
        function create(createProperties: CreateProperties, callback: (tab: Tab) => void): void;

        /**
         * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
         * @param tabId The tab ID to move.
         * @param tabIds List of tab IDs to move.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function move(tabId: number, moveProperties: MoveProperties): Promise<Tab>;
        function move(tabIds: number[], moveProperties: MoveProperties): Promise<Tab[]>;
        function move(tabId: number, moveProperties: MoveProperties, callback: (tab: Tab) => void): void;
        function move(tabIds: number[], moveProperties: MoveProperties, callback: (tabs: Tab[]) => void): void;

        /**
         * Modifies the properties of a tab. Properties that are not specified in `updateProperties` are not modified.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param tabId Defaults to the selected tab of the current window.
         */
        function update(updateProperties: UpdateProperties): Promise<Tab | undefined>;
        function update(tabId: number | undefined, updateProperties: UpdateProperties): Promise<Tab | undefined>;
        function update(updateProperties: UpdateProperties, callback: (tab?: Tab) => void): void;
        function update(
            tabId: number | undefined,
            updateProperties: UpdateProperties,
            callback: (tab?: Tab) => void,
        ): void;

        /**
         * Closes one or more tabs.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param tabId The tab ID to close.
         * @param tabIds List of tab IDs to close.
         */
        function remove(tabId: number): Promise<void>;
        function remove(tabIds: number[]): Promise<void>;
        function remove(tabId: number, callback: () => void): void;
        function remove(tabIds: number[], callback: () => void): void;

        /**
         * Captures the visible area of the currently active tab in the specified window. In order to call this method, the extension must have either the [<all\_urls>](https://developer.chrome.com/extensions/develop/concepts/declare-permissions) permission or the [activeTab](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab) permission. In addition to sites that extensions can normally access, this method allows extensions to capture sensitive sites that are otherwise restricted, including chrome:-scheme pages, other extensions' pages, and data: URLs. These sensitive sites can only be captured with the activeTab permission. File URLs may be captured only if the extension has been granted file access.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param windowId The target window. Defaults to the current window.
         */
        function captureVisibleTab(): Promise<string>;
        function captureVisibleTab(windowId: number): Promise<string>;
        function captureVisibleTab(options: extensionTypes.ImageDetails): Promise<string>;
        function captureVisibleTab(windowId: number, options: extensionTypes.ImageDetails): Promise<string>;
        function captureVisibleTab(callback: (dataUrl: string) => void): void;
        function captureVisibleTab(windowId: number, callback: (dataUrl: string) => void): void;
        function captureVisibleTab(
            options: extensionTypes.ImageDetails,
            callback: (dataUrl: string) => void,
        ): void;
        function captureVisibleTab(
            windowId: number,
            options: extensionTypes.ImageDetails,
            callback: (dataUrl: string) => void,
        ): void;

        /**
         * Reload a tab.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param tabId The ID of the tab to reload; defaults to the selected tab of the current window.
         */
        function reload(): Promise<void>;
        function reload(tabId: number): Promise<void>;
        function reload(reloadProperties: ReloadProperties): Promise<void>;
        function reload(tabId: number, reloadProperties: ReloadProperties): Promise<void>;
        function reload(callback: () => void): void;
        function reload(tabId: number | undefined, callback: () => void): void;
        function reload(reloadProperties: ReloadProperties | undefined, callback: () => void): void;
        function reload(
            tabId: number | undefined,
            reloadProperties: ReloadProperties | undefined,
            callback: () => void,
        ): void;

        /**
         * Duplicates a tab.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param tabId The ID of the tab to duplicate.
         */
        function duplicate(tabId: number): Promise<Tab | undefined>;
        function duplicate(tabId: number, callback: (tab?: Tab) => void): void;

        /**
         * Sends a single message to the content script(s) in the specified tab. The {@link runtime.onMessage} event is fired in each content script running in the specified tab for the current extension.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 99.
         */
        function sendMessage<M = any, R = any>(
            tabId: number,
            message: M,
            options?: MessageSendOptions,
        ): Promise<R>;
        function sendMessage<M = any, R = any>(
            tabId: number,
            message: M,
            /** @since Chrome 99 */
            callback: (response: R) => void,
        ): void;
        function sendMessage<M = any, R = any>(
            tabId: number,
            message: M,
            options: MessageSendOptions | undefined,
            /** @since Chrome 99 */
            callback: (response: R) => void,
        ): void;

        /**
         * Sends a single request to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The {@link extension.onRequest} event is fired in each content script running in the specified tab for the current extension.
         *
         * MV2 only
         * @deprecated Please use {@link runtime.sendMessage}.
         */
        function sendRequest<Request = any, Response = any>(
            tabId: number,
            request: Request,
        ): Promise<Response>;
        function sendRequest<Request = any, Response = any>(
            tabId: number,
            request: Request,
            /** @since Chrome 99 */
            callback?: (response: Response) => void,
        ): void;

        /**
         * Connects to the content script(s) in the specified tab. The {@link runtime.onConnect} event is fired in each content script running in the specified tab for the current extension.
         * @returns A port that can be used to communicate with the content scripts running in the specified tab. The port's {@link runtime.Port} event is fired if the tab closes or does not exist.
         */
        function connect(tabId: number, connectInfo?: ConnectInfo): runtime.Port;

        /**
         * Injects CSS into a page. Styles inserted with this method can be removed with {@link scripting.removeCSS}`. For details, see the programmatic injection section of the content scripts doc.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         *
         * MV2 only
         * @param tabId The ID of the tab in which to insert the CSS; defaults to the active tab of the current window.
         * @param details Details of the CSS text to insert. Either the code or the file property must be set, but both may not be set at the same time.
         * @deprecated since Chrome 99. Replaced by {@link scripting.insertCSS} in Manifest V3.
         */
        function insertCSS(details: extensionTypes.InjectDetails): Promise<void>;
        function insertCSS(tabId: number | undefined, details: extensionTypes.InjectDetails): Promise<void>;
        function insertCSS(details: extensionTypes.InjectDetails, callback: () => void): void;
        function insertCSS(tabId: number | undefined, details: extensionTypes.InjectDetails): Promise<void>;
        function insertCSS(tabId: number, details: extensionTypes.InjectDetails, callback: () => void): void;

        /**
         * Highlights the given tabs and focuses on the first of group. Will appear to do nothing if the specified tab is currently active.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function highlight(highlightInfo: HighlightInfo): Promise<windows.Window>;
        function highlight(highlightInfo: HighlightInfo, callback: (window: windows.Window) => void): void;

        /** Gets all tabs that have the specified properties, or all tabs if no properties are specified. */
        function query(queryInfo: QueryInfo): Promise<Tab[]>;
        function query(queryInfo: QueryInfo, callback: (result: Tab[]) => void): void;

        /**
         * Detects the primary language of the content in a tab.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param tabId The ID of the tab to get the current zoom factor from; defaults to the active tab of the current window.
         */
        function detectLanguage(tabId?: number): Promise<string>;
        function detectLanguage(callback: (language: string) => void): void;
        function detectLanguage(tabId: number | undefined, callback: (language: string) => void): void;

        /**
         * Zooms a specified tab.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param tabId The ID of the tab to zoom; defaults to the active tab of the current window.
         * @param zoomFactor The new zoom factor. A value of `0` sets the tab to its current default zoom factor. Values greater than 0 specify a (possibly non-default) zoom factor for the tab.
         */
        function setZoom(zoomFactor: number): Promise<void>;
        function setZoom(tabId: number | undefined, zoomFactor: number): Promise<void>;
        function setZoom(zoomFactor: number, callback: () => void): void;
        function setZoom(tabId: number | undefined, zoomFactor: number, callback: () => void): void;

        /**
         * Gets the current zoom factor of a specified tab.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param tabId The ID of the tab to get the current zoom factor from; defaults to the active tab of the current window.
         */
        function getZoom(tabId?: number): Promise<number>;
        function getZoom(callback: (zoomFactor: number) => void): void;
        function getZoom(tabId: number | undefined, callback: (zoomFactor: number) => void): void;

        /**
         * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param tabId The ID of the tab to change the zoom settings for; defaults to the active tab of the current window.
         * @param zoomSettings Defines how zoom changes are handled and at what scope.
         */
        function setZoomSettings(zoomSettings: ZoomSettings): Promise<void>;
        function setZoomSettings(tabId: number | undefined, zoomSettings: ZoomSettings): Promise<void>;
        function setZoomSettings(zoomSettings: ZoomSettings, callback: () => void): void;
        function setZoomSettings(
            tabId: number | undefined,
            zoomSettings: ZoomSettings,
            callback: () => void,
        ): void;

        /**
         * Gets the current zoom settings of a specified tab.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param tabId The ID of the tab to get the current zoom settings from; defaults to the active tab of the current window.
         */
        function getZoomSettings(tabId?: number): Promise<ZoomSettings>;
        function getZoomSettings(callback: (zoomSettings: ZoomSettings) => void): void;
        function getZoomSettings(
            tabId: number | undefined,
            callback: (zoomSettings: ZoomSettings) => void,
        ): void;

        /**
         * Discards a tab from memory. Discarded tabs are still visible on the tab strip and are reloaded when activated.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param tabId The ID of the tab to be discarded. If specified, the tab is discarded unless it is active or already discarded. If omitted, the browser discards the least important tab. This can fail if no discardable tabs exist..
         * @since Chrome 54
         */
        function discard(tabId?: number): Promise<Tab | undefined>;
        function discard(callback: (tab?: Tab) => void): void;
        function discard(tabId: number | undefined, callback: (tab?: Tab) => void): void;

        /**
         * Go forward to the next page, if one is available.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param tabId The ID of the tab to navigate forward; defaults to the selected tab of the current window.
         * @since Chrome 72
         */
        function goForward(tabId?: number): Promise<void>;
        function goForward(callback: () => void): void;
        function goForward(tabId: number | undefined, callback: () => void): void;

        /**
         * Go back to the previous page, if one is available.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param tabId The ID of the tab to navigate back; defaults to the selected tab of the current window.
         * @since Chrome 72
         */
        function goBack(tabId?: number): Promise<void>;
        function goBack(callback: () => void): void;
        function goBack(tabId: number | undefined, callback: () => void): void;

        /**
         * Adds one or more tabs to a specified group, or if no group is specified, adds the given tabs to a newly created group.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @since Chrome 88
         */
        function group(options: GroupOptions): Promise<number>;
        function group(options: GroupOptions, callback: (groupId: number) => void): void;

        /**
         * Removes one or more tabs from their respective groups. If any groups become empty, they are deleted
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         * @param tabIds The tab ID or list of tab IDs to remove from their respective groups.
         * @since Chrome 88
         */
        function ungroup(tabIds: number | [number, ...number[]]): Promise<void>;
        function ungroup(tabIds: number | [number, ...number[]], callback: () => void): void;

        /** Fired when the highlighted or selected tabs in a window changes */
        const onHighlighted: events.Event<
            (highlightInfo: OnHighlightedInfo) => void
        >;

        /** Fired when a tab is closed. */
        const onRemoved: events.Event<
            (tabId: number, removeInfo: OnRemovedInfo) => void
        >;

        /** Fired when a tab is updated. */
        const onUpdated: events.Event<
            (tabId: number, changeInfo: OnUpdatedInfo, tab: Tab) => void
        >;

        /** Fired when a tab is attached to a window, for example because it was moved between windows. */
        const onAttached: events.Event<
            (tabId: number, attachInfo: OnAttachedInfo) => void
        >;

        /** Fired when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response to the manually-moved tab. This event is not fired when a tab is moved between windows; for details, see {@link tabs.onDetached}. */
        const onMoved: events.Event<
            (tabId: number, moveInfo: OnMovedInfo) => void
        >;

        /** Fired when a tab is detached from a window; for example, because it was moved between windows. */
        const onDetached: events.Event<
            (tabId: number, detachInfo: OnDetachedInfo) => void
        >;

        /** Fired when a tab is created. Note that the tab's URL and tab group membership may not be set at the time this event is fired, but you can listen to onUpdated events so as to be notified when a URL is set or the tab is added to a tab group. */
        const onCreated: events.Event<(tab: Tab) => void>;

        /** Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events so as to be notified when a URL is set */
        const onActivated: events.Event<
            (activeInfo: OnActivatedInfo) => void
        >;

        /** Fired when a tab is replaced with another tab due to prerendering or instant */
        const onReplaced: events.Event<
            (addedTabId: number, removedTabId: number) => void
        >;

        /**
         * Fires when the selected tab in a window changes.
         *
         * MV2 only
         * @deprecated Please use {@link tabs.onActivated}.
         */
        const onSelectionChanged: events.Event<
            (tabId: number, selectInfo: OnSelectionChangedInfo) => void
        >;

        /**
         * Fires when the selected tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to {@link tabs.onUpdated} events so as to be notified when a URL is set.
         *
         * MV2 only
         * @deprecated Please use {@link tabs.onActivated}.
         */
        const onActiveChanged: events.Event<
            (tabId: number, selectInfo: OnActiveChangedInfo) => void
        >;

        /**
         * Fired when the highlighted or selected tabs in a window changes.
         *
         * MV2 only
         * @deprecated Please use {@link tabs.onHighlighted}.
         */
        const onHighlightChanged: events.Event<
            (selectInfo: OnHighlightChangedInfo) => void
        >;

        /** Fired when a tab is zoomed */
        const onZoomChange: events.Event<
            (ZoomChangeInfo: OnZoomChangeInfo) => void
        >;
    }
}
