declare namespace chrome {
    ////////////////////
    // Web Navigation
    ////////////////////
    /**
     * Use the `chrome.webNavigation` API to receive notifications about the status of navigation requests in-flight.
     *
     * Permissions: "webNavigation"
     */
    namespace webNavigation {
        /** @since Chrome 44 */
        enum TransitionQualifier {
            CLIENT_REDIRECT = "client_redirect",
            SERVER_REDIRECT = "server_redirect",
            FORWARD_BACK = "forward_back",
            FROM_ADDRESS_BAR = "from_address_bar",
        }

        /**
         * Cause of the navigation. The same transition types as defined in the history API are used. These are the same transition types as defined in the history API except with `"start_page"` in place of `"auto_toplevel"` (for backwards compatibility).
         * @since Chrome 44
         */
        enum TransitionType {
            LINK = "link",
            TYPED = "typed",
            AUTO_BOOKMARK = "auto_bookmark",
            AUTO_SUBFRAME = "auto_subframe",
            MANUAL_SUBFRAME = "manual_subframe",
            GENERATED = "generated",
            START_PAGE = "start_page",
            FORM_SUBMIT = "form_submit",
            RELOAD = "reload",
            KEYWORD = "keyword",
            KEYWORD_GENERATED = "keyword_generated",
        }

        type GetFrameDetails =
            & ({
                /**
                 * The ID of the process that runs the renderer for this tab.
                 * @deprecated since Chrome 49. Frames are now uniquely identified by their tab ID and frame ID; the process ID is no longer needed and therefore ignored.
                 */
                processId?: number | undefined;
            })
            & (
                {
                    /** The ID of the tab in which the frame is. */
                    tabId?: number | undefined;
                    /** The ID of the frame in the given tab. */
                    frameId?: number | undefined;
                    /**
                     * The UUID of the document. If the frameId and/or tabId are provided they will be validated to match the document found by provided document ID.
                     * @since Chrome 106
                     */
                    documentId: string;
                } | {
                    /** The ID of the tab in which the frame is. */
                    tabId: number;
                    /** The ID of the frame in the given tab. */
                    frameId: number;
                    /**
                     * The UUID of the document. If the frameId and/or tabId are provided they will be validated to match the document found by provided document ID.
                     * @since Chrome 106
                     */
                    documentId?: string | undefined;
                }
            );

        interface GetFrameResultDetails {
            /** The URL currently associated with this frame, if the frame identified by the frameId existed at one point in the given tab. The fact that an URL is associated with a given frameId does not imply that the corresponding frame still exists. */
            url: string;
            /** A UUID of the document loaded. */
            documentId: string;
            /**
             * The lifecycle the document is in.
             * @since Chrome 106
             */
            documentLifecycle: extensionTypes.DocumentLifecycle;
            /** True if the last navigation in this frame was interrupted by an error, i.e. the onErrorOccurred event fired. */
            errorOccurred: boolean;
            /** The type of frame the navigation occurred in. */
            frameType: extensionTypes.FrameType;
            /**
             * A UUID of the parent document owning this frame. This is not set if there is no parent.
             * @since Chrome 106
             */
            parentDocumentId?: string | undefined;
            /** The ID of the parent frame, or `-1` if this is the main frame. */
            parentFrameId: number;
        }

        interface GetAllFrameDetails {
            /** The ID of the tab. */
            tabId: number;
        }

        /** A list of frames in the given tab, null if the specified tab ID is invalid. */
        interface GetAllFrameResultDetails extends GetFrameResultDetails {
            /** The ID of the process that runs the renderer for this frame. */
            processId: number;
            /** The ID of the frame. 0 indicates that this is the main frame; a positive value indicates the ID of a subframe. */
            frameId: number;
        }

        interface WebNavigationReplacementCallbackDetails {
            /** The ID of the tab that was replaced. */
            replacedTabId: number;
            /** The ID of the tab that replaced the old tab. */
            tabId: number;
            /** The time when the replacement happened, in milliseconds since the epoch. */
            timeStamp: number;
        }

        interface WebNavigationBaseCallbackDetails {
            /** The lifecycle the document is in. */
            documentLifecycle: extensionTypes.DocumentLifecycle;
            /** 0 indicates the navigation happens in the tab content window; a positive value indicates navigation in a subframe. Frame IDs are unique within a tab. */
            frameId: number;
            /** The type of frame the navigation occurred in. */
            frameType: extensionTypes.FrameType;
            /** A UUID of the parent document owning this frame. This is not set if there is no parent. */
            parentDocumentId?: string;
            /** The ID of the parent frame, or `-1` if this is the main frame. */
            parentFrameId: number;
            /** The ID of the process that runs the renderer for this frame. */
            processId: number;
            /** The ID of the tab in which the navigation occurs. */
            tabId: number;
            /** The time when the browser was about to start the navigation, in milliseconds since the epoch */
            timeStamp: number;
            url: string;
        }

        interface WebNavigationFramedCallbackDetails extends WebNavigationBaseCallbackDetails {
            /**
             * A UUID of the document loaded.
             * @since Chrome 106
             */
            documentId: string;
        }

        interface WebNavigationFramedErrorCallbackDetails extends WebNavigationBaseCallbackDetails {
            /**
             * A UUID of the document loaded.
             * @since Chrome 106
             */
            documentId: string;
            /** The error description. */
            error: string;
        }

        interface WebNavigationSourceCallbackDetails {
            /** The ID of the frame with sourceTabId in which the navigation is triggered. 0 indicates the main frame. */
            sourceFrameId: number;
            /** The ID of the process that runs the renderer for the source frame. */
            sourceProcessId: number;
            /** The ID of the tab in which the navigation is triggered. */
            sourceTabId: number;
            /** The ID of the tab in which the url is opened */
            tabId: number;
            /** The time when the browser was about to create a new view, in milliseconds since the epoch. */
            timeStamp: number;
            /** The URL to be opened in the new window. */
            url: string;
        }

        interface WebNavigationTransitionCallbackDetails extends WebNavigationBaseCallbackDetails {
            /**
             * A UUID of the document loaded.
             * @since Chrome 106
             */
            documentId: string;
            /** Cause of the navigation. */
            transitionType: `${TransitionType}`;
            /** A list of transition qualifiers.*/
            transitionQualifiers: `${TransitionQualifier}`[];
        }

        interface WebNavigationEventFilter {
            /** Conditions that the URL being navigated to must satisfy. The 'schemes' and 'ports' fields of UrlFilter are ignored for this event. */
            url: chrome.events.UrlFilter[];
        }

        interface WebNavigationEvent<T extends (...args: any) => void>
            extends Omit<chrome.events.Event<T>, "addListener">
        {
            addListener(callback: T, filters?: WebNavigationEventFilter): void;
        }

        /**
         * Retrieves information about the given frame. A frame refers to an <iframe> or a <frame> of a web page and is identified by a tab ID and a frame ID.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 93.
         * @param details Information about the frame to retrieve information about.
         */
        function getFrame(
            details: GetFrameDetails,
        ): Promise<GetFrameResultDetails | null>;
        function getFrame(
            details: GetFrameDetails,
            callback: (details: GetFrameResultDetails | null) => void,
        ): void;

        /**
         * Retrieves information about all frames of a given tab.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 93.
         * @param details Information about the tab to retrieve all frames from.
         */
        function getAllFrames(
            details: GetAllFrameDetails,
        ): Promise<GetAllFrameResultDetails[] | null>;
        function getAllFrames(
            details: GetAllFrameDetails,
            callback: (details: GetAllFrameResultDetails[] | null) => void,
        ): void;

        /** Fired when the reference fragment of a frame was updated. All future events for that frame will use the updated URL. */
        const onReferenceFragmentUpdated: WebNavigationEvent<
            (details: WebNavigationTransitionCallbackDetails) => void
        >;

        /** Fired when a document, including the resources it refers to, is completely loaded and initialized. */
        const onCompleted: WebNavigationEvent<(details: WebNavigationFramedCallbackDetails) => void>;

        // /** Fired when the frame's history was updated to a new URL. All future events for that frame will use the updated URL. */
        const onHistoryStateUpdated: WebNavigationEvent<
            (details: WebNavigationTransitionCallbackDetails) => void
        >;

        /** Fired when a new window, or a new tab in an existing window, is created to host a navigation. */
        const onCreatedNavigationTarget: WebNavigationEvent<
            (details: WebNavigationSourceCallbackDetails) => void
        >;

        /** Fired when the contents of the tab is replaced by a different (usually previously pre-rendered) tab*/
        const onTabReplaced: events.Event<(details: WebNavigationReplacementCallbackDetails) => void>;

        /** Fired when a navigation is about to occur. */
        const onBeforeNavigate: WebNavigationEvent<(details: WebNavigationBaseCallbackDetails) => void>;

        /** Fired when a navigation is committed. The document (and the resources it refers to, such as images and subframes) might still be downloading, but at least part of the document has been received from the server and the browser has decided to switch to the new document. */
        const onCommitted: WebNavigationEvent<(details: WebNavigationTransitionCallbackDetails) => void>;

        /** Fired when the page's DOM is fully constructed, but the referenced resources may not finish loading. */
        const onDOMContentLoaded: WebNavigationEvent<(details: WebNavigationFramedCallbackDetails) => void>;

        /** Fired when an error occurs and the navigation is aborted. This can happen if either a network error occurred, or the user aborted the navigation. */
        const onErrorOccurred: WebNavigationEvent<(details: WebNavigationFramedErrorCallbackDetails) => void>;
    }
}
