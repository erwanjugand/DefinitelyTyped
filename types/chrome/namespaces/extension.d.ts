declare namespace chrome {
    ////////////////////
    // Extension
    ////////////////////
    /**
     * The `chrome.extension` API has utilities that can be used by any extension page. It includes support for exchanging messages between an extension and its content scripts or between extensions, as described in detail in Message Passing.
     */
    namespace extension {
        /**
         * The type of extension view.
         * @since Chrome 44
         */
        enum ViewType {
            TAB = "tab",
            POPUP = "popup",
        }

        interface FetchProperties {
            /**
             * Find a view according to a tab id. If this field is omitted, returns all views.
             * @since Chrome 54
             */
            tabId?: number | undefined;
            /** The window to restrict the search to. If omitted, returns all views. */
            windowId?: number | undefined;
            /** The type of view to get. If omitted, returns all views (including background pages and tabs). */
            type?: `${ViewType}` | undefined;
        }

        /** True for content scripts running inside incognito tabs, and for extension pages running inside an incognito process. The latter only applies to extensions with 'split' incognito_behavior. */
        const inIncognitoContext: boolean;

        /**
         * Set for the lifetime of a callback if an ansychronous extension api has resulted in an error. If no error has occurred lastError will be `undefined`.
         * @deprecated since Chrome 58. Please use {@link runtime.lastError}
         */
        const lastError: runtime.LastError | undefined;

        /** Returns the JavaScript 'window' object for the background page running inside the current extension. Returns null if the extension has no background page. */
        function getBackgroundPage(): Window | null;

        /**
         * Converts a relative path within an extension install directory to a fully-qualified URL.
         * @param path A path to a resource within an extension expressed relative to its install directory.
         * @deprecated since Chrome 58. Please use {@link runtime.getURL}
         */
        function getURL(path: string): string;

        /** Sets the value of the ap CGI parameter used in the extension's update URL. This value is ignored for extensions that are hosted in the Chrome Extension Gallery. */
        function setUpdateUrlData(data: string): void;

        /** Returns an array of the JavaScript 'window' objects for each of the pages running inside the current extension. */
        function getViews(fetchProperties?: FetchProperties): Window[];

        /**
         * Retrieves the state of the extension's access to the 'file://' scheme. This corresponds to the user-controlled per-extension 'Allow access to File URLs' setting accessible via the `chrome://extensions` page.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 99.
         */
        function isAllowedFileSchemeAccess(): Promise<boolean>;
        function isAllowedFileSchemeAccess(callback: (isAllowedAccess: boolean) => void): void;

        /**
         * Retrieves the state of the extension's access to Incognito-mode. This corresponds to the user-controlled per-extension 'Allowed in Incognito' setting accessible via the `chrome://extensions` page.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 99.
         */
        function isAllowedIncognitoAccess(): Promise<boolean>;
        function isAllowedIncognitoAccess(callback: (isAllowedAccess: boolean) => void): void;

        /**
         * Sends a single request to other listeners within the extension. Similar to {@link runtime.connect}, but only sends a single request with an optional response. The {@link extension.onRequest} event is fired in each page of the extension.
         *
         * MV2 only
         * @param extensionId The extension ID of the extension you want to connect to. If omitted, default is your own extension.
         * @deprecated Please use {@link runtime.sendMessage}
         */
        function sendRequest<Request = any, Response = any>(
            extensionId: string | undefined,
            request: Request,
            callback?: (response: Response) => void,
        ): void;
        function sendRequest<Request = any, Response = any>(
            request: Request,
            callback?: (response: Response) => void,
        ): void;

        /**
         * Returns an array of the JavaScript 'window' objects for each of the tabs running inside the current extension. If `windowId` is specified, returns only the 'window' objects of tabs attached to the specified window.
         *
         * MV2 only
         * @deprecated Please use {@link extension.getViews} `{type: "tab"}`.
         */
        function getExtensionTabs(windowId?: number): Window[];

        /**
         * Fired when a request is sent from either an extension process or a content script.
         *
         * MV2 only
         * @deprecated Please use {@link runtime.onMessage}.
         */
        const onRequest: chrome.events.Event<
            | ((request: any, sender: runtime.MessageSender, sendResponse: (response: any) => void) => void)
            | ((sender: runtime.MessageSender, sendResponse: (response: any) => void) => void)
        >;

        /**
         * Fired when a request is sent from another extension.
         *
         * MV2 only
         * @deprecated Please use {@link runtime.onMessageExternal}.
         */
        const onRequestExternal: chrome.events.Event<
            | ((request: any, sender: runtime.MessageSender, sendResponse: (response: any) => void) => void)
            | ((sender: runtime.MessageSender, sendResponse: (response: any) => void) => void)
        >;
    }
}
