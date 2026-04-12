declare namespace chrome {
    ////////////////////
    // Top Sites
    ////////////////////
    /**
     * Use the `chrome.topSites` API to access the top sites (i.e. most visited sites) that are displayed on the new tab page. These do not include shortcuts customized by the user.
     *
     * Permissions: "topSites"
     */
    namespace topSites {
        /** An object encapsulating a most visited URL, such as the default shortcuts on the new tab page. */
        interface MostVisitedURL {
            /** The most visited URL. */
            url: string;
            /** The title of the page */
            title: string;
        }

        /**
         * Gets a list of top sites.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function get(): Promise<MostVisitedURL[]>;
        function get(callback: (data: MostVisitedURL[]) => void): void;
    }
}
