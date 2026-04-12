declare namespace chrome {
    ////////////////////
    // Dev Tools - Performance
    ////////////////////
    /**
     * Use the `chrome.devtools.performance` API to listen to recording status updates in the Performance panel in DevTools.
     * @since Chrome 129
     */
    namespace devtools.performance {
        /** Fired when the Performance panel starts recording. */
        const onProfilingStarted: events.Event<() => void>;
        /** Fired when the Performance panel stops recording. */
        const onProfilingStopped: events.Event<() => void>;
    }
}
