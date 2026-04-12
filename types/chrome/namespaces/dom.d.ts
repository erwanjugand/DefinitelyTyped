declare namespace chrome {
    ////////////////////
    // DOM
    ////////////////////
    /**
     * Use the `chrome.dom` API to access special DOM APIs for Extensions
     * @since Chrome 88
     */
    namespace dom {
        /**
         * @since Chrome 88
         * Requests chrome to return the open/closed shadow roots else return null.
         * @param element reference of HTMLElement.
         */
        function openOrClosedShadowRoot(element: HTMLElement): ShadowRoot | null;
    }
}
