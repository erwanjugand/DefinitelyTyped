declare namespace chrome {
    ////////////////////
    // Permissions
    ////////////////////
    /**
     * Use the `chrome.permissions` API to request declared optional permissions at run time rather than install time, so users understand why the permissions are needed and grant only those that are necessary.
     */
    namespace permissions {
        interface Permissions {
            /** The list of host permissions, including those specified in the `optional_permissions` or `permissions` keys in the manifest, and those associated with [Content Scripts](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts). */
            origins?: string[];
            /** List of named permissions (does not include hosts or origins). */
            permissions?: chrome.runtime.ManifestPermission[];
        }

        interface AddHostAccessRequest {
            /** The id of a document where host access requests can be shown. Must be the top-level document within a tab. If provided, the request is shown on the tab of the specified document and is removed when the document navigates to a new origin. Adding a new request will override any existent request for `tabId`. This or `tabId` must be specified. */
            documentId?: string;
            /** The URL pattern where host access requests can be shown. If provided, host access requests will only be shown on URLs that match this pattern. */
            pattern?: string;
            /** The id of the tab where host access requests can be shown. If provided, the request is shown on the specified tab and is removed when the tab navigates to a new origin. Adding a new request will override an existent request for `documentId`. This or `documentId` must be specified. */
            tabId?: number;
        }

        /**
         * Adds a host access request. Request will only be signaled to the user if extension can be granted access to the host in the request. Request will be reset on cross-origin navigation. When accepted, grants persistent access to the site’s top origin
         * @since Chrome 133
         */
        function addHostAccessRequest(request: AddHostAccessRequest): Promise<void>;
        function addHostAccessRequest(request: AddHostAccessRequest, callback: () => void): void;

        /**
         * Checks if the extension has the specified permissions.
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function contains(permissions: Permissions): Promise<boolean>;
        function contains(permissions: Permissions, callback: (result: boolean) => void): void;

        /**
         * Gets the extension's current set of permissions.
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getAll(): Promise<Permissions>;
        function getAll(callback: (permissions: Permissions) => void): void;

        /**
         * Requests access to the specified permissions, displaying a prompt to the user if necessary.
         * These permissions must either be defined in the optional_permissions field of the manifest or be required permissions that were withheld by the user.
         * Paths on origin patterns will be ignored.
         * You can request subsets of optional origin permissions; for example, if you specify `*://*\/*` in the `optional_permissions` section of the manifest, you can request `http://example.com/`.
         * If there are any problems requesting the permissions, {@link runtime.lastError} will be set.
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function request(permissions: Permissions): Promise<boolean>;
        function request(permissions: Permissions, callback: (granted: boolean) => void): void;

        /**
         * Removes access to the specified permissions. If there are any problems removing the permissions, {@link runtime.lastError} will be set.
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function remove(permissions: Permissions): Promise<boolean>;
        function remove(permissions: Permissions, callback: (removed: boolean) => void): void;

        interface RemoveHostAccessRequest {
            /** The id of a document where host access request will be removed. Must be the top-level document within a tab. This or `tabId` must be specified. */
            documentId?: string;
            /** The URL pattern where host access request will be removed. If provided, this must exactly match the pattern of an existing host access request. */
            pattern?: string;
            /** The id of the tab where host access request will be removed. This or `documentId` must be specified. */
            tabId?: number;
        }

        /**
         * Removes a host access request, if existent.
         * @since Chrome 133
         */
        function removeHostAccessRequest(request: RemoveHostAccessRequest): Promise<void>;
        function removeHostAccessRequest(request: RemoveHostAccessRequest, callback: () => void): void;

        /** Fired when access to permissions has been removed from the extension. */
        const onRemoved: chrome.events.Event<(permissions: Permissions) => void>;

        /** Fired when the extension acquires new permissions. */
        const onAdded: chrome.events.Event<(permissions: Permissions) => void>;
    }
}
