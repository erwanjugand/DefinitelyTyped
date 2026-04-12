declare namespace chrome {
    ////////////////////
    // Search
    ////////////////////
    /**
     * Use the `chrome.search` API to search via the default provider.
     *
     * Permissions: "search"
     * @since Chrome 87
     */
    namespace search {
        enum Disposition {
            /** Specifies that the search results display in the calling tab or the tab from the active browser. */
            CURRENT_TAB = "CURRENT_TAB",
            /** Specifies that the search results display in a new tab. */
            NEW_TAB = "NEW_TAB",
            /** Specifies that the search results display in a new window. */
            NEW_WINDOW = "NEW_WINDOW",
        }

        type QueryInfo =
            & {
                /** String to query with the default search provider. */
                text: string;
            }
            & (
                | {
                    /** Location where search results should be displayed. `CURRENT_TAB` is the default. */
                    disposition?: `${Disposition}` | undefined;
                    /** Location where search results should be displayed. `tabId` cannot be used with `disposition`. */
                    tabId?: undefined;
                }
                | {
                    /** Location where search results should be displayed. `CURRENT_TAB` is the default. */
                    disposition?: undefined;
                    /** Location where search results should be displayed. `tabId` cannot be used with `disposition`. */
                    tabId?: number | undefined;
                }
            );

        /**
         * Used to query the default search provider. In case of an error, {@link runtime.lastError} will be set.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function query(options: QueryInfo): Promise<void>;
        function query(options: QueryInfo, callback: () => void): void;
    }
}
