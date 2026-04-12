declare namespace chrome {
    ////////////////////
    // Page Capture
    ////////////////////
    /**
     * Use the `chrome.pageCapture` API to save a tab as MHTML.
     *
     * Permissions: "pageCapture"
     */
    namespace pageCapture {
        interface SaveDetails {
            /** The id of the tab to save as MHTML. */
            tabId: number;
        }

        /**
         * Saves the content of the tab with given id as MHTML.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 116.
         */
        function saveAsMHTML(details: SaveDetails): Promise<Blob | undefined>;
        function saveAsMHTML(details: SaveDetails, callback: (mhtmlData?: Blob) => void): void;
    }
}
