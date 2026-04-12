declare namespace chrome {
    ////////////////////
    // DesktopCapture
    ////////////////////
    /**
     * The Desktop Capture API captures the content of the screen, individual windows, or individual tabs.
     *
     * Permissions: "desktopCapture"
     */
    namespace desktopCapture {
        /** Enum used to define set of desktop media sources used in {@link chooseDesktopMedia}. */
        enum DesktopCaptureSourceType {
            SCREEN = "screen",
            WINDOW = "window",
            TAB = "tab",
            AUDIO = "audio",
        }

        /**
         * Contains properties that describe the stream.
         * @since Chrome 57
         */
        interface StreamOptions {
            /** True if "audio" is included in parameter sources, and the end user does not uncheck the "Share audio" checkbox. Otherwise false, and in this case, one should not ask for audio stream through getUserMedia call. */
            canRequestAudioTrack: boolean;
        }
        /**
         * Shows desktop media picker UI with the specified set of sources.
         * @param sources Set of sources that should be shown to the user. The sources order in the set decides the tab order in the picker.
         * @param targetTab Optional tab for which the stream is created. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches `tab.url`. The tab's origin must be a secure origin, e.g. HTTPS.
         * @param callback streamId: An opaque string that can be passed to `getUserMedia()` API to generate media stream that corresponds to the source selected by the user. If user didn't select any source (i.e. canceled the prompt) then the callback is called with an empty `streamId`. The created `streamId` can be used only once and expires after a few seconds when it is not used.
         * @return An id that can be passed to cancelChooseDesktopMedia() in case the prompt need to be canceled.
         */
        function chooseDesktopMedia(
            sources: `${DesktopCaptureSourceType}`[],
            callback: (streamId: string, options: StreamOptions) => void,
        ): number;
        function chooseDesktopMedia(
            sources: `${DesktopCaptureSourceType}`[],
            targetTab: tabs.Tab | undefined,
            callback: (streamId: string, options: StreamOptions) => void,
        ): number;

        /**
         * Hides desktop media picker dialog shown by chooseDesktopMedia().
         * @param desktopMediaRequestId Id returned by chooseDesktopMedia()
         */
        function cancelChooseDesktopMedia(desktopMediaRequestId: number): void;
    }
}
