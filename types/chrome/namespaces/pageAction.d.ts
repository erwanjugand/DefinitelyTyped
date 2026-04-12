declare namespace chrome {
    ////////////////////
    // Page Action
    ////////////////////
    /**
     * Use the `chrome.pageAction` API to put icons in the main Google Chrome toolbar, to the right of the address bar. Page actions represent actions that can be taken on the current page, but that aren't applicable to all pages. Page actions appear grayed out when inactive.
     *
     * Manifest: "page_action"
     *
     * MV2 only
     */
    namespace pageAction {
        interface TitleDetails {
            /** The id of the tab for which you want to modify the page action. */
            tabId: number;
            /** The tooltip string. */
            title: string;
        }

        interface TabDetails {
            /** The ID of the tab to query state for. */
            tabId: number;
        }

        interface PopupDetails {
            /** The id of the tab for which you want to modify the page action. */
            tabId: number;
            /** The relative path to the HTML file to show in a popup. If set to the empty string (`''`), no popup is shown. */
            popup: string;
        }

        type IconDetails =
            & {
                /** @deprecated This argument is ignored. */
                iconIndex?: number | undefined;
                /** The id of the tab for which you want to modify the page action. */
                tabId: number;
            }
            & (
                | {
                    /** Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}' */
                    imageData: ImageData | { [index: number]: ImageData };
                    /** Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}' */
                    path?: string | { [index: string]: string } | undefined;
                }
                | {
                    /** Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}' */
                    imageData?: ImageData | { [index: number]: ImageData } | undefined;
                    /** Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}' */
                    path: string | { [index: string]: string };
                }
            );

        /**
         * Hides the page action. Hidden page actions still appear in the Chrome toolbar, but are grayed out.
         * @param tabId The id of the tab for which you want to modify the page action.
         * @param callback Since Chrome 67
         */
        function hide(tabId: number, callback?: () => void): void;

        /**
         * Shows the page action. The page action is shown whenever the tab is selected.
         * @param tabId The id of the tab for which you want to modify the page action.
         * @param callback Since Chrome 67
         */
        function show(tabId: number, callback?: () => void): void;

        /**
         * Sets the title of the page action. This is displayed in a tooltip over the page action.
         * @param callback Since Chrome 67
         */
        function setTitle(details: TitleDetails, callback?: () => void): void;

        /**
         * Sets the HTML document to be opened as a popup when the user clicks on the page action's icon.
         * @param callback Since Chrome 67
         */
        function setPopup(details: PopupDetails, callback?: () => void): void;

        /** Gets the title of the page action. */
        function getTitle(details: TabDetails, callback: (result: string) => void): void;

        /** Gets the html document set as the popup for this page action. */
        function getPopup(details: TabDetails, callback: (result: string) => void): void;

        /** Sets the icon for the page action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the path or the imageData property must be specified. */
        function setIcon(details: IconDetails, callback?: () => void): void;

        /** Fired when a page action icon is clicked. This event will not fire if the page action has a popup. */
        const onClicked: events.Event<(tab: chrome.tabs.Tab) => void>;
    }
}
