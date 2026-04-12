declare namespace chrome {
    ////////////////////
    // Cookies
    ////////////////////
    /**
     * Use the `chrome.cookies` API to query and modify cookies, and to be notified when they change.
     *
     * Permissions: "cookies"
     *
     * Manifest: "host_permissions"
     */
    namespace cookies {
        /** A cookie's 'SameSite' state (https://tools.ietf.org/html/draft-west-first-party-cookies). 'no_restriction' corresponds to a cookie set with 'SameSite=None', 'lax' to 'SameSite=Lax', and 'strict' to 'SameSite=Strict'. 'unspecified' corresponds to a cookie set without the SameSite attribute. **/
        enum SameSiteStatus {
            NO_RESTRICTION = "no_restriction",
            LAX = "lax",
            STRICT = "strict",
            UNSPECIFIED = "unspecified",
        }

        /** Represents information about an HTTP cookie. */
        interface Cookie {
            /** The domain of the cookie (e.g. "www.google.com", "example.com"). */
            domain: string;
            /** The name of the cookie. */
            name: string;
            /**
             * The partition key for reading or modifying cookies with the Partitioned attribute.
             * @since Chrome 119
             */
            partitionKey?: CookiePartitionKey;
            /** The ID of the cookie store containing this cookie, as provided in getAllCookieStores(). */
            storeId: string;
            /** The value of the cookie. */
            value: string;
            /** True if the cookie is a session cookie, as opposed to a persistent cookie with an expiration date. */
            session: boolean;
            /** True if the cookie is a host-only cookie (i.e. a request's host must exactly match the domain of the cookie). */
            hostOnly: boolean;
            /** The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies. */
            expirationDate?: number;
            /** The path of the cookie. */
            path: string;
            /** True if the cookie is marked as HttpOnly (i.e. the cookie is inaccessible to client-side scripts). */
            httpOnly: boolean;
            /** True if the cookie is marked as Secure (i.e. its scope is limited to secure channels, typically HTTPS). */
            secure: boolean;
            /**
             * The cookie's same-site status (i.e. whether the cookie is sent with cross-site requests).
             * @since Chrome 51
             */
            sameSite: `${SameSiteStatus}`;
        }

        /**
         * Represents a partitioned cookie's partition key.
         * @since Chrome 119
         */
        interface CookiePartitionKey {
            /**
             * Indicates if the cookie was set in a cross-cross site context. This prevents a top-level site embedded in a cross-site context from accessing cookies set by the top-level site in a same-site context.
             * @since Chrome 130
             */
            hasCrossSiteAncestor?: boolean | undefined;
            /** The top-level site the partitioned cookie is available in. */
            topLevelSite?: string | undefined;
        }

        /** Represents a cookie store in the browser. An incognito mode window, for instance, uses a separate cookie store from a non-incognito window. */
        interface CookieStore {
            /** The unique identifier for the cookie store. */
            id: string;
            /** Identifiers of all the browser tabs that share this cookie store. */
            tabIds: number[];
        }

        interface GetAllDetails {
            /** Restricts the retrieved cookies to those whose domains match or are subdomains of this one. */
            domain?: string | undefined;
            /** Filters the cookies by name. */
            name?: string | undefined;
            /**
             * The partition key for reading or modifying cookies with the Partitioned attribute.
             * @since Chrome 119
             */
            partitionKey?: CookiePartitionKey | undefined;
            /** Restricts the retrieved cookies to those that would match the given URL. */
            url?: string | undefined;
            /** The cookie store to retrieve cookies from. If omitted, the current execution context's cookie store will be used. */
            storeId?: string | undefined;
            /** Filters out session vs. persistent cookies. */
            session?: boolean | undefined;
            /** Restricts the retrieved cookies to those whose path exactly matches this string. */
            path?: string | undefined;
            /** Filters the cookies by their Secure property. */
            secure?: boolean | undefined;
        }

        interface SetDetails {
            /** The domain of the cookie. If omitted, the cookie becomes a host-only cookie. */
            domain?: string | undefined;
            /** The name of the cookie. Empty by default if omitted. */
            name?: string | undefined;
            /**
             * The partition key for reading or modifying cookies with the Partitioned attribute.
             * @since Chrome 119
             */
            partitionKey?: CookiePartitionKey | undefined;
            /** The request-URI to associate with the setting of the cookie. This value can affect the default domain and path values of the created cookie. If host permissions for this URL are not specified in the manifest file, the API call will fail. */
            url: string;
            /** The ID of the cookie store in which to set the cookie. By default, the cookie is set in the current execution context's cookie store. */
            storeId?: string | undefined;
            /** The value of the cookie. Empty by default if omitted. */
            value?: string | undefined;
            /** The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted, the cookie becomes a session cookie. */
            expirationDate?: number | undefined;
            /** The path of the cookie. Defaults to the path portion of the url parameter. */
            path?: string | undefined;
            /** Whether the cookie should be marked as HttpOnly. Defaults to false. */
            httpOnly?: boolean | undefined;
            /** Whether the cookie should be marked as Secure. Defaults to false. */
            secure?: boolean | undefined;
            /**
             * The cookie's same-site status. Defaults to "unspecified", i.e., if omitted, the cookie is set without specifying a SameSite attribute.
             * @since Chrome 51
             */
            sameSite?: `${SameSiteStatus}` | undefined;
        }

        /**
         * Details to identify the cookie.
         * @since Chrome 88
         */
        interface CookieDetails {
            /** The name of the cookie to access. */
            name: string;
            /**
             * The partition key for reading or modifying cookies with the Partitioned attribute.
             * @since Chrome 119
             */
            partitionKey?: CookiePartitionKey | undefined;
            /** The ID of the cookie store in which to look for the cookie. By default, the current execution context's cookie store will be used. */
            storeId?: string | undefined;
            /** The URL with which the cookie to access is associated. This argument may be a full URL, in which case any data following the URL path (e.g. the query string) is simply ignored. If host permissions for this URL are not specified in the manifest file, the API call will fail. */
            url: string;
        }

        interface CookieChangeInfo {
            /** Information about the cookie that was set or removed. */
            cookie: Cookie;
            /** True if a cookie was removed. */
            removed: boolean;
            /** The underlying reason behind the cookie's change. */
            cause: `${OnChangedCause}`;
        }

        /**
         * Details to identify the frame.
         * @since Chrome 132
         */
        interface FrameDetails {
            /** The unique identifier for the document. If the frameId and/or tabId are provided they will be validated to match the document found by provided document ID. */
            documentId?: string | undefined;
            /** The unique identifier for the frame within the tab. */
            frameId?: number | undefined;
            /* The unique identifier for the tab containing the frame. */
            tabId?: number | undefined;
        }

        /**
         * The underlying reason behind the cookie's change. If a cookie was inserted, or removed via an explicit call to "chrome.cookies.remove", "cause" will be "explicit". If a cookie was automatically removed due to expiry, "cause" will be "expired". If a cookie was removed due to being overwritten with an already-expired expiration date, "cause" will be set to "expired_overwrite". If a cookie was automatically removed due to garbage collection, "cause" will be "evicted". If a cookie was automatically removed due to a "set" call that overwrote it, "cause" will be "overwrite". Plan your response accordingly.
         * @since Chrome 44
         */
        enum OnChangedCause {
            EVICTED = "evicted",
            EXPIRED = "expired",
            EXPLICIT = "explicit",
            EXPIRED_OVERWRITE = "expired_overwrite",
            OVERWRITE = "overwrite",
        }

        /**
         * Lists all existing cookie stores.
         *
         * Can return its result via Promise in Manifest V3 or later.
         */
        function getAllCookieStores(): Promise<CookieStore[]>;
        function getAllCookieStores(callback: (cookieStores: CookieStore[]) => void): void;

        /**
         * The partition key for the frame indicated.
         *
         * Can return its result via Promise in Manifest V3 or later.
         * @since Chrome 132
         */
        function getPartitionKey(details: FrameDetails): Promise<{ partitionKey: CookiePartitionKey }>;
        function getPartitionKey(
            details: FrameDetails,
            callback: (details: { partitionKey: CookiePartitionKey }) => void,
        ): void;

        /**
         * Retrieves all cookies from a single cookie store that match the given information. The cookies returned will be sorted, with those with the longest path first. If multiple cookies have the same path length, those with the earliest creation time will be first. This method only retrieves cookies for domains that the extension has host permissions to
         * @param details Information to identify the cookie to remove.
         *
         * Can return its result via Promise in Manifest V3 or later.
         */
        function getAll(details: GetAllDetails): Promise<Cookie[]>;
        function getAll(details: GetAllDetails, callback: (cookies: Cookie[]) => void): void;

        /**
         * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.
         * @param details Details about the cookie being set.
         *
         * Can return its result via Promise in Manifest V3 or later.
         */
        function set(details: SetDetails): Promise<Cookie | null>;
        function set(details: SetDetails, callback: (cookie: Cookie | null) => void): void;

        /**
         * Deletes a cookie by name.
         *
         * Can return its result via Promise in Manifest V3 or later.
         */
        function remove(details: CookieDetails): Promise<CookieDetails>;
        function remove(details: CookieDetails, callback?: (details: CookieDetails) => void): void;

        /**
         * Retrieves information about a single cookie. If more than one cookie of the same name exists for the given URL, the one with the longest path will be returned. For cookies with the same path length, the cookie with the earliest creation time will be returned.
         *
         * Can return its result via Promise in Manifest V3 or later.
         */
        function get(details: CookieDetails): Promise<Cookie | null>;
        function get(details: CookieDetails, callback: (cookie: Cookie | null) => void): void;

        /** Fired when a cookie is set or removed. As a special case, note that updating a cookie's properties is implemented as a two step process: the cookie to be updated is first removed entirely, generating a notification with "cause" of "overwrite" . Afterwards, a new cookie is written with the updated values, generating a second notification with "cause" "explicit". */
        const onChanged: events.Event<(changeInfo: CookieChangeInfo) => void>;
    }
}
