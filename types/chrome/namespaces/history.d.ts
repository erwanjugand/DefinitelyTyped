declare namespace chrome {
    ////////////////////
    // History
    ////////////////////
    /**
     * Use the `chrome.history` API to interact with the browser's record of visited pages. You can add, remove, and query for URLs in the browser's history. To override the history page with your own version, see Override Pages.
     *
     * Permissions: "history"
     */
    namespace history {
        /** An object encapsulating one visit to a URL. */
        interface VisitItem {
            /** The transition type for this visit from its referrer. */
            transition: `${TransitionType}`;
            /**
             * True if the visit originated on this device. False if it was synced from a different device
             * @since Chrome 115
             */
            isLocal: boolean;
            /** When this visit occurred, represented in milliseconds since the epoch. */
            visitTime?: number;
            /** The unique identifier for this visit. */
            visitId: string;
            /** The visit ID of the referrer. */
            referringVisitId: string;
            /** The unique identifier for the corresponding {@link history.HistoryItem}. */
            id: string;
        }

        /** An object encapsulating one result of a history query. */
        interface HistoryItem {
            /** The number of times the user has navigated to this page by typing in the address. */
            typedCount?: number;
            /** The title of the page when it was last loaded. */
            title?: string;
            /** The URL navigated to by a user. */
            url?: string;
            /** When this page was last loaded, represented in milliseconds since the epoch. */
            lastVisitTime?: number;
            /** The number of times the user has navigated to this page. */
            visitCount?: number;
            /** The unique identifier for the item. */
            id: string;
        }

        /**
         * The transition type for this visit from its referrer.
         * @since Chrome 44
         */
        enum TransitionType {
            /** The user arrived at this page by clicking a link on another page. */
            LINK = "link",
            /** The user arrived at this page by typing the URL in the address bar. This is also used for other explicit navigation actions. */
            TYPED = "typed",
            /** The user arrived at this page through a suggestion in the UI, for example, through a menu item. */
            AUTO_BOOKMARK = "auto_bookmark",
            /** The user arrived at this page through subframe navigation that they didn't request, such as through an ad loading in a frame on the previous page. These don't always generate new navigation entries in the back and forward menus. */
            AUTO_SUBFRAME = "auto_subframe",
            /** The user arrived at this page by selecting something in a subframe. */
            MANUAL_SUBFRAME = "manual_subframe",
            /** The user arrived at this page by typing in the address bar and selecting an entry that didn't look like a URL, such as a Google Search suggestion. For example, a match might have the URL of a Google Search result page, but it might appear to the user as "Search Google for ...". These are different from typed navigations because the user didn't type or see the destination URL. They're also related to keyword navigations. */
            GENERATED = "generated",
            /** The page was specified in the command line or is the start page. */
            AUTO_TOPLEVEL = "auto_toplevel",
            /** The user arrived at this page by filling out values in a form and submitting the form. Not all form submissions use this transition type. */
            FORM_SUBMIT = "form_submit",
            /** The user reloaded the page, either by clicking the reload button or by pressing Enter in the address bar. Session restore and Reopen closed tab also use this transition type. */
            RELOAD = "reload",
            /** The URL for this page was generated from a replaceable keyword other than the default search provider. */
            KEYWORD = "keyword",
            /** Corresponds to a visit generated for a keyword. */
            KEYWORD_GENERATED = "keyword_generated",
        }

        interface HistoryQuery {
            /** A free-text query to the history service. Leave this empty to retrieve all pages. */
            text: string;
            /** The maximum number of results to retrieve. Defaults to 100. */
            maxResults?: number | undefined;
            /** Limit results to those visited after this date, represented in milliseconds since the epoch. If property is not specified, it will default to 24 hours. */
            startTime?: number | undefined;
            /** Limit results to those visited before this date, represented in milliseconds since the epoch. */
            endTime?: number | undefined;
        }

        /** @since Chrome 88 */
        interface UrlDetails {
            /** The URL for the operation. It must be in the format as returned from a call to {@link history.search}. */
            url: string;
        }

        interface Range {
            /** Items added to history before this date, represented in milliseconds since the epoch. */
            endTime: number;
            /** Items added to history after this date, represented in milliseconds since the epoch. */
            startTime: number;
        }

        interface RemovedResult {
            /** True if all history was removed. If true, then urls will be empty. */
            allHistory: boolean;
            urls?: string[];
        }

        /**
         * Searches the history for the last visit time of each page matching the query.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function search(query: HistoryQuery): Promise<HistoryItem[]>;
        function search(query: HistoryQuery, callback: (results: HistoryItem[]) => void): void;

        /**
         * Adds a URL to the history at the current time with a transition type of "link".
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function addUrl(details: UrlDetails): Promise<void>;
        function addUrl(details: UrlDetails, callback: () => void): void;

        /**
         * Removes all items within the specified date range from the history. Pages will not be removed from the history unless all visits fall within the range.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function deleteRange(range: Range): Promise<void>;
        function deleteRange(range: Range, callback: () => void): void;

        /**
         * Deletes all items from the history.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function deleteAll(): Promise<void>;
        function deleteAll(callback: () => void): void;

        /**
         * Retrieves information about visits to a URL.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getVisits(details: UrlDetails): Promise<VisitItem[]>;
        function getVisits(details: UrlDetails, callback: (results: VisitItem[]) => void): void;

        /**
         * Removes all occurrences of the given URL from the history.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function deleteUrl(details: UrlDetails): Promise<void>;
        function deleteUrl(details: UrlDetails, callback: () => void): void;

        /** Fired when a URL is visited, providing the {@link HistoryItem} data for that URL. This event fires before the page has loaded. */
        const onVisited: events.Event<(result: HistoryItem) => void>;

        /** Fired when one or more URLs are removed from history. When all visits have been removed the URL is purged from history. */
        const onVisitRemoved: events.Event<(removed: RemovedResult) => void>;
    }
}
