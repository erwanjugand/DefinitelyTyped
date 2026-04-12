declare namespace chrome {
    ////////////////////
    // Windows
    ////////////////////
    /**
     * Use the `chrome.windows` API to interact with browser windows. You can use this API to create, modify, and rearrange windows in the browser.
     *
     * Permissions: The chrome.windows API can be used without declaring any permission. However, the "tabs" permission is required in order to populate the url, title, and favIconUrl properties of Tab objects.
     */
    namespace windows {
        interface WindowsEvent<T extends (...args: any) => void> extends Omit<chrome.events.Event<T>, "addListener"> {
            addListener(callback: T, filter?: {
                windowTypes: `${WindowType}`[];
            }): void;
        }

        interface Window {
            /** Array of {@link tabs.Tab} objects representing the current tabs in the window. */
            tabs?: chrome.tabs.Tab[] | undefined;
            /** The offset of the window from the top edge of the screen in pixels. In some circumstances a window may not be assigned a `top` property; for example, when querying closed windows from the {@link sessions} API. */
            top?: number | undefined;
            /** The height of the window, including the frame, in pixels. In some circumstances a window may not be assigned a `height` property, for example when querying closed windows from the {@link sessions} API. */
            height?: number | undefined;
            /** The width of the window, including the frame, in pixels. In some circumstances a window may not be assigned a `width` property; for example, when querying closed windows from the {@link sessions} API. */
            width?: number | undefined;
            /** The state of this browser window. */
            state?: `${WindowState}` | undefined;
            /** Whether the window is currently the focused window. */
            focused: boolean;
            /** Whether the window is set to be always on top. */
            alwaysOnTop: boolean;
            /** Whether the window is incognito. */
            incognito: boolean;
            /** The type of browser window this is. */
            type?: `${WindowType}` | undefined;
            /** The ID of the window. Window IDs are unique within a browser session. In some circumstances a window may not be assigned an `ID` property; for example, when querying windows using the {@link sessions} API, in which case a session ID may be present. */
            id?: number | undefined;
            /** The offset of the window from the left edge of the screen in pixels. In some circumstances a window may not be assigned a `left` property; for example, when querying closed windows from the {@link sessions} API. */
            left?: number | undefined;
            /** The session ID used to uniquely identify a window, obtained from the {@link sessions} API. */
            sessionId?: string | undefined;
        }

        /** @since Chrome 88 */
        interface QueryOptions {
            /** If true, the {@link windows.Window} object has a `tabs` property that contains a list of the {@link tabs.Tab} objects. The `Tab` objects only contain the `url`, `pendingUrl`, `title`, and `favIconUrl` properties if the extension's manifest file includes the `"tabs"` permission. */
            populate?: boolean | undefined;
            /** If set, the {@link windows.Window} returned is filtered based on its type. If unset, the default filter is set to `['normal', 'popup']`. */
            windowTypes?: `${WindowType}`[] | undefined;
        }

        interface CreateData {
            /** The ID of the tab to add to the new window. */
            tabId?: number | undefined;
            /** A URL or array of URLs to open as tabs in the window. Fully-qualified URLs must include a scheme, e.g., 'http://www.google.com', not 'www.google.com'. Non-fully-qualified URLs are considered relative within the extension. Defaults to the New Tab Page. */
            url?: string | string[] | undefined;
            /** The number of pixels to position the new window from the top edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels. */
            top?: number | undefined;
            /** The height in pixels of the new window, including the frame. If not specified, defaults to a natural height. */
            height?: number | undefined;
            /** The width in pixels of the new window, including the frame. If not specified, defaults to a natural width. */
            width?: number | undefined;
            /** If `true`, opens an active window. If `false`, opens an inactive window. */
            focused?: boolean | undefined;
            /** Whether the new window should be an incognito window. */
            incognito?: boolean | undefined;
            /** Specifies what type of browser window to create. */
            type?: `${CreateType}` | undefined;
            /** The number of pixels to position the new window from the left edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels. */
            left?: number | undefined;
            /**
             * The initial state of the window. The `minimized`, `maximized`, and `fullscreen` states cannot be combined with `left`, `top`, `width`, or `height`.
             * @since Chrome 44
             */
            state?: `${WindowState}` | undefined;
            /**
             * If `true`, the newly-created window's 'window.opener' is set to the caller and is in the same [unit of related browsing contexts](https://www.w3.org/TR/html51/browsers.html#unit-of-related-browsing-contexts) as the caller.
             * @since Chrome 64
             */
            setSelfAsOpener?: boolean | undefined;
        }

        interface UpdateInfo {
            /** The offset from the top edge of the screen to move the window to in pixels. This value is ignored for panels. */
            top?: number | undefined;
            /** If `true`, causes the window to be displayed in a manner that draws the user's attention to the window, without changing the focused window. The effect lasts until the user changes focus to the window. This option has no effect if the window already has focus. Set to `false` to cancel a previous `drawAttention` request. */
            drawAttention?: boolean | undefined;
            /** The height to resize the window to in pixels. This value is ignored for panels. */
            height?: number | undefined;
            /** The width to resize the window to in pixels. This value is ignored for panels. */
            width?: number | undefined;
            /** The new state of the window. The 'minimized', 'maximized', and 'fullscreen' states cannot be combined with 'left', 'top', 'width', or 'height'. */
            state?: `${WindowState}` | undefined;
            /** If `true`, brings the window to the front; cannot be combined with the state 'minimized'. If `false`, brings the next window in the z-order to the front; cannot be combined with the state 'fullscreen' or 'maximized'. */
            focused?: boolean | undefined;
            /** The offset from the left edge of the screen to move the window to in pixels. This value is ignored for panels. */
            left?: number | undefined;
        }

        /**
         * Specifies what type of browser window to create.
         * 'panel' is deprecated and is available only to existing whitelisted extensions on Chrome OS.
         * @since Chrome 44
         */
        enum CreateType {
            /** Specifies the window as a standard window. */
            NORMAL = "normal",
            /** Specifies the window as a popup window. */
            POPUP = "popup",
            /** @deprecated Specifies the window as a panel. */
            PANEL = "panel",
        }

        /**
         * The state of this browser window. In some circumstances a window may not be assigned a `state` property; for example, when querying closed windows from the {@link sessions} API.
         * @since Chrome 44
         */
        enum WindowState {
            /** Normal window state (not minimized, maximized, or fullscreen). */
            NORMAL = "normal",
            /** Minimized window state. */
            MINIMIZED = "minimized",
            /** Maximized window state. */
            MAXIMIZED = "maximized",
            /** Fullscreen window state. */
            FULLSCREEN = "fullscreen",
            /** Locked fullscreen window state. This fullscreen state cannot be exited by user action and is available only to allowlisted extensions on Chrome OS. */
            LOCKED_FULLSCREEN = "locked-fullscreen",
        }

        /**
         * The type of browser window this is. In some circumstances a window may not be assigned a `type` property; for example, when querying closed windows from the {@link sessions} API.
         * @since Chrome 44
         */
        enum WindowType {
            /** A normal browser window. */
            NORMAL = "normal",
            /** A browser popup. */
            POPUP = "popup",
            /** @deprecated A Chrome App panel-style window. Extensions can only see their own panel windows. */
            PANEL = "panel",
            /** @deprecated A Chrome App window. Extensions can only see their app own windows. */
            APP = "app",
            /** A Developer Tools window. */
            DEVTOOLS = "devtools",
        }

        /** The windowId value that represents the current window. */
        const WINDOW_ID_CURRENT: -2;

        /** The windowId value that represents the absence of a Chrome browser window */
        const WINDOW_ID_NONE: -1;

        /**
         * Gets details about a window.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function get(windowId: number, queryOptions?: QueryOptions): Promise<Window>;
        function get(windowId: number, callback: (window: Window) => void): void;
        function get(
            windowId: number,
            queryOptions: QueryOptions | undefined,
            callback: (window: Window) => void,
        ): void;

        /**
         * Gets the current window.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function getCurrent(queryOptions?: QueryOptions): Promise<Window>;
        function getCurrent(callback: (window: Window) => void): void;
        function getCurrent(queryOptions: QueryOptions | undefined, callback: (window: Window) => void): void;

        /**
         * Creates (opens) a new browser window with any optional sizing, position, or default URL provided.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function create(createData?: CreateData): Promise<Window | undefined>;
        function create(callback: (window?: Window) => void): void;
        function create(createData: CreateData | undefined, callback: (window?: Window) => void): void;

        /**
         * Gets all windows.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function getAll(queryOptions?: QueryOptions): Promise<Window[]>;
        function getAll(callback: (windows: Window[]) => void): void;
        function getAll(queryOptions: QueryOptions | undefined, callback: (windows: Window[]) => void): void;

        /**
         * Updates the properties of a window. Specify only the properties that to be changed; unspecified properties are unchanged.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function update(windowId: number, updateInfo: UpdateInfo): Promise<Window>;
        function update(windowId: number, updateInfo: UpdateInfo, callback: (window: Window) => void): void;

        /**
         * Removes (closes) a window and all the tabs inside it.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function remove(windowId: number): Promise<void>;
        function remove(windowId: number, callback: () => void): void;

        /**
         * Gets the window that was most recently focused — typically the window 'on top'.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 88.
         */
        function getLastFocused(queryOptions?: QueryOptions): Promise<Window>;
        function getLastFocused(callback: (window: Window) => void): void;
        function getLastFocused(
            queryOptions: QueryOptions | undefined,
            callback: (window: Window) => void,
        ): void;

        /** Fired when a window is removed (closed). */
        const onRemoved: WindowsEvent<(windowId: number) => void>;

        /** Fired when a window is created. */
        const onCreated: WindowsEvent<(window: Window) => void>;

        /** Fired when the currently focused window changes. Returns `chrome.windows.WINDOW_ID_NONE` if all Chrome windows have lost focus. **Note:** On some Linux window managers, `WINDOW_ID_NONE` is always sent immediately preceding a switch from one Chrome window to another. */
        const onFocusChanged: WindowsEvent<(windowId: number) => void>;

        /**
         * Fired when a window has been resized; this event is only dispatched when the new bounds are committed, and not for in-progress changes.
         * @since Chrome 86
         */
        const onBoundsChanged: events.Event<(window: Window) => void>;
    }
}
