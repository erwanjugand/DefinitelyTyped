declare namespace chrome {
    ////////////////////
    // Extension Types
    ////////////////////
    /** The `chrome.extensionTypes` API contains type declarations for Chrome extensions. */
    namespace extensionTypes {
        /** @since Chrome 139 */
        type ColorArray = [number, number, number, number];

        /**
         * The origin of injected CSS.
         * @since Chrome 66
         */
        type CSSOrigin = "author" | "user";

        /**
         * The document lifecycle of the frame.
         * @since Chrome 106
         */
        type DocumentLifecycle = "prerender" | "active" | "cached" | "pending_deletion";

        /**
         * The type of frame.
         * @since Chrome 106
         */
        type FrameType = "outermost_frame" | "fenced_frame" | "sub_frame";

        /** Details about the format and quality of an image. */
        interface ImageDetails {
            /** The format of the resulting image. Default is `"jpeg"`. */
            format?: ImageFormat | undefined;
            /** When format is `"jpeg"`, controls the quality of the resulting image. This value is ignored for PNG images. As quality is decreased, the resulting image will have more visual artifacts, and the number of bytes needed to store it will decrease. */
            quality?: number | undefined;
        }

        /**
         * The format of an image.
         * @since Chrome 44
         */
        type ImageFormat = "jpeg" | "png";

        /** Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time. */
        interface InjectDetails {
            /** If allFrames is `true`, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's `false` and is only injected into the top frame. If `true` and `frameId` is set, then the code is inserted in the selected frame and all of its child frames. */
            allFrames?: boolean | undefined;
            /**
             * JavaScript or CSS code to inject.
             *
             * **Warning:** Be careful using the `code` parameter. Incorrect use of it may open your extension to cross site scripting attacks
             */
            code?: string | undefined;
            /**
             * The origin of the CSS to inject. This may only be specified for CSS, not JavaScript. Defaults to `"author"`.
             * @since Chrome 66
             */
            cssOrigin?: CSSOrigin | undefined;
            /** JavaScript or CSS file to inject. */
            file?: string | undefined;
            /**
             * The frame where the script or CSS should be injected. Defaults to 0 (the top-level frame).
             * @since Chrome 50
             */
            frameId?: number | undefined;
            /** If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is `false`. */
            matchAboutBlank?: boolean;
            /** The soonest that the JavaScript or CSS will be injected into the tab. Defaults to "document_idle". */
            runAt?: RunAt | undefined;
        }

        /**
         * The soonest that the JavaScript or CSS will be injected into the tab.
         *
         * "document_start" : Script is injected after any files from css, but before any other DOM is constructed or any other script is run.
         *
         * "document_end" : Script is injected immediately after the DOM is complete, but before subresources like images and frames have loaded.
         *
         * "document_idle" : The browser chooses a time to inject the script between "document_end" and immediately after the `window.onload` event fires. The exact moment of injection depends on how complex the document is and how long it is taking to load, and is optimized for page load speed. Content scripts running at "document_idle" don't need to listen for the `window.onload` event; they are guaranteed to run after the DOM completes. If a script definitely needs to run after `window.onload`, the extension can check if `onload` has already fired by using the `document.readyState` property.
         * @since Chrome 44
         */
        type RunAt = "document_start" | "document_end" | "document_idle";
    }
}
