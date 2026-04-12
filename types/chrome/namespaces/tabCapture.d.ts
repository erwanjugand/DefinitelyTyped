declare namespace chrome {
    ////////////////////
    // TabCapture
    ////////////////////
    /**
     * Use the `chrome.tabCapture` API to interact with tab media streams.
     *
     * Permissions: "tabCapture"
     */
    namespace tabCapture {
        interface CaptureInfo {
            /** The id of the tab whose status changed. */
            tabId: number;
            /** The new capture status of the tab. */
            status: `${TabCaptureState}`;
            /** Whether an element in the tab being captured is in fullscreen mode. */
            fullscreen: boolean;
        }

        interface MediaStreamConstraint {
            mandatory: object;
            optional?: object | undefined;
        }

        interface CaptureOptions {
            audio?: boolean | undefined;
            video?: boolean | undefined;
            audioConstraints?: MediaStreamConstraint | undefined;
            videoConstraints?: MediaStreamConstraint | undefined;
        }

        /** @since Chrome 71 */
        interface GetMediaStreamOptions {
            /** Optional tab id of the tab which will later invoke `getUserMedia()` to consume the stream. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches the consumber tab's origin. The tab's origin must be a secure origin, e.g. HTTPS. */
            consumerTabId?: number | undefined;
            /** Optional tab id of the tab which will be captured. If not specified then the current active tab will be selected. Only tabs for which the extension has been granted the `activeTab` permission can be used as the target tab. */
            targetTabId?: number | undefined;
        }

        enum TabCaptureState {
            PENDING = "pending",
            ACTIVE = "active",
            STOPPED = "stopped",
            ERROR = "error",
        }

        /**
         * Captures the visible area of the currently active tab. Capture can only be started on the currently active tab after the extension has been invoked, similar to the way that activeTab works. Capture is maintained across page navigations within the tab, and stops when the tab is closed, or the media stream is closed by the extension.
         * @param options Configures the returned media stream.
         */
        function capture(options: CaptureOptions, callback: (stream: MediaStream | null) => void): void;

        /**
         * Returns a list of tabs that have requested capture or are being captured, i.e. status != stopped and status != error. This allows extensions to inform the user that there is an existing tab capture that would prevent a new tab capture from succeeding (or to prevent redundant requests for the same tab).
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 116.
         */
        function getCapturedTabs(): Promise<CaptureInfo[]>;
        function getCapturedTabs(callback: (result: CaptureInfo[]) => void): void;

        /**
         * Creates a stream ID to capture the target tab. Similar to chrome.tabCapture.capture() method, but returns a media stream ID, instead of a media stream, to the consumer tab.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 116.
         */
        function getMediaStreamId(options?: GetMediaStreamOptions): Promise<string>;
        function getMediaStreamId(callback: (streamId: string) => void): void;
        function getMediaStreamId(
            options: GetMediaStreamOptions | undefined,
            callback: (streamId: string) => void,
        ): void;

        /** Event fired when the capture status of a tab changes. This allows extension authors to keep track of the capture status of tabs to keep UI elements like page actions in sync. */
        const onStatusChanged: events.Event<(info: CaptureInfo) => void>;
    }
}
