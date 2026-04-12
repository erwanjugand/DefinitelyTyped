declare namespace chrome {
    ////////////////////
    // Browsing Data
    ////////////////////
    /**
     * Use the `chrome.browsingData` API to remove browsing data from a user's local profile.
     *
     * Permissions: "browsingData"
     */
    namespace browsingData {
        interface OriginTypes {
            /** Extensions and packaged applications a user has installed (be _really_ careful!). */
            extension?: boolean | undefined;
            /** Websites that have been installed as hosted applications (be careful!). */
            protectedWeb?: boolean | undefined;
            /** Normal websites. */
            unprotectedWeb?: boolean | undefined;
        }

        /** Options that determine exactly what data will be removed. */
        interface RemovalOptions {
            /**
             * When present, data for origins in this list is excluded from deletion. Can't be used together with `origins`. Only supported for cookies, storage and cache. Cookies are excluded for the whole registrable domain.
             * @since Chrome 74
             */
            excludeOrigins?: string[] | undefined;
            /** An object whose properties specify which origin types ought to be cleared. If this object isn't specified, it defaults to clearing only "unprotected" origins. Please ensure that you _really_ want to remove application data before adding 'protectedWeb' or 'extensions'. */
            originTypes?: OriginTypes | undefined;
            /**
             * When present, only data for origins in this list is deleted. Only supported for cookies, storage and cache. Cookies are cleared for the whole registrable domain.
             * @since Chrome 74
             */
            origins?: [string, ...string[]] | undefined;
            /** Remove data accumulated on or after this date, represented in milliseconds since the epoch (accessible via the {@link Date.getTime getTime} method of the JavaScript `Date` object). If absent, defaults to 0 (which would remove all browsing data). */
            since?: number | undefined;
        }

        /** A set of data types. Missing data types are interpreted as `false`. */
        interface DataTypeSet {
            /** Websites' WebSQL data. */
            webSQL?: boolean | undefined;
            /** Websites' IndexedDB data. */
            indexedDB?: boolean | undefined;
            /** The browser's cookies. */
            cookies?: boolean | undefined;
            /**
             * Stored passwords.
             * @deprecated since Chrome 144. Support for password deletion through extensions has been removed. This data type will be ignored.
             */
            passwords?: boolean | undefined;
            /**
             * Server-bound certificates.
             * @deprecated since Chrome 76. Support for server-bound certificates has been removed. This data type will be ignored.
             */
            serverBoundCertificates?: boolean | undefined;
            /** The browser's download list. */
            downloads?: boolean | undefined;
            /** The browser's cache. */
            cache?: boolean | undefined;
            /** Cache storage. */
            cacheStorage?: boolean | undefined;
            /** Websites' appcaches. */
            appcache?: boolean | undefined;
            /** Websites' file systems. */
            fileSystems?: boolean | undefined;
            /**
             * Plugins' data.
             * @deprecated since Chrome 88. Support for Flash has been removed. This data type will be ignored.
             */
            pluginData?: boolean | undefined;
            /** Websites' local storage data. */
            localStorage?: boolean | undefined;
            /** The browser's stored form data. */
            formData?: boolean | undefined;
            /** The browser's history. */
            history?: boolean | undefined;
            /** Service Workers. */
            serviceWorkers?: boolean | undefined;
        }

        interface SettingsResult {
            options: RemovalOptions;
            /** All of the types will be present in the result, with values of `true` if they are both selected to be removed and permitted to be removed, otherwise `false`. */
            dataToRemove: DataTypeSet;
            /** All of the types will be present in the result, with values of `true` if they are permitted to be removed (e.g., by enterprise policy) and `false` if not. */
            dataRemovalPermitted: DataTypeSet;
        }

        /**
         * Reports which types of data are currently selected in the 'Clear browsing data' settings UI. Note: some of the data types included in this API are not available in the settings UI, and some UI settings control more than one data type listed here.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function settings(): Promise<SettingsResult>;
        function settings(callback: (result: SettingsResult) => void): void;

        /**
         * Clears plugins' data.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         * @deprecated since Chrome 88. Support for Flash has been removed. This function has no effect
         */
        function removePluginData(options: RemovalOptions): Promise<void>;
        function removePluginData(options: RemovalOptions, callback: () => void): void;

        /**
         * Clears websites' service workers.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         * @since Chrome 72
         */
        function removeServiceWorkers(options: RemovalOptions): Promise<void>;
        function removeServiceWorkers(options: RemovalOptions, callback: () => void): void;

        /**
         * Clears the browser's stored form data (autofill).
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function removeFormData(options: RemovalOptions): Promise<void>;
        function removeFormData(options: RemovalOptions, callback: () => void): void;

        /**
         * Clears websites' file system data.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function removeFileSystems(options: RemovalOptions): Promise<void>;
        function removeFileSystems(options: RemovalOptions, callback: () => void): void;

        /**
         * Clears various types of browsing data stored in a user's profile.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         * @param dataToRemove The set of data types to remove.
         */
        function remove(options: RemovalOptions, dataToRemove: DataTypeSet): Promise<void>;
        function remove(options: RemovalOptions, dataToRemove: DataTypeSet, callback: () => void): void;

        /**
         * Clears the browser's stored passwords.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         * @deprecated since Chrome 144. Support for password deletion through extensions has been removed. This function has no effect.
         */
        function removePasswords(options: RemovalOptions): Promise<void>;
        function removePasswords(options: RemovalOptions, callback: () => void): void;

        /**
         * Clears the browser's cookies and server-bound certificates modified within a particular timeframe.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function removeCookies(options: RemovalOptions): Promise<void>;
        function removeCookies(options: RemovalOptions, callback: () => void): void;

        /**
         * Clears websites' WebSQL data.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function removeWebSQL(options: RemovalOptions): Promise<void>;
        function removeWebSQL(options: RemovalOptions, callback: () => void): void;

        /**
         * Clears websites' appcache data.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function removeAppcache(options: RemovalOptions): Promise<void>;
        function removeAppcache(options: RemovalOptions, callback: () => void): void;

        /**
         * Clears websites' cache storage data.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         * @since Chrome 72
         */
        function removeCacheStorage(options: RemovalOptions): Promise<void>;
        function removeCacheStorage(options: RemovalOptions, callback: () => void): void;

        /**
         * Clears the browser's list of downloaded files (not the downloaded files themselves).
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function removeDownloads(options: RemovalOptions): Promise<void>;
        function removeDownloads(options: RemovalOptions, callback: () => void): void;

        /**
         * Clears websites' local storage data.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function removeLocalStorage(options: RemovalOptions): Promise<void>;
        function removeLocalStorage(options: RemovalOptions, callback: () => void): void;

        /**
         * Clears the browser's cache.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function removeCache(options: RemovalOptions): Promise<void>;
        function removeCache(options: RemovalOptions, callback: () => void): void;

        /**
         * Clears the browser's history.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function removeHistory(options: RemovalOptions): Promise<void>;
        function removeHistory(options: RemovalOptions, callback: () => void): void;

        /**
         * Clears websites' IndexedDB data.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function removeIndexedDB(options: RemovalOptions): Promise<void>;
        function removeIndexedDB(options: RemovalOptions, callback: () => void): void;
    }
}
