declare namespace chrome {
    ////////////////////
    // System Display //
    ////////////////////
    /**
     * Use the `system.display` API to query display metadata.
     *
     * Permissions: "system.display"
     */
    namespace system.display {
        enum LayoutPosition {
            TOP = "top",
            RIGHT = "right",
            BOTTOM = "bottom",
            LEFT = "left",
        }

        /**
         * Mirror mode, i.e. different ways of how a display is mirrored to other displays.
         * @since Chrome 65
         */
        enum MirrorMode {
            /** Specifies the default mode (extended or unified desktop). */
            OFF = "off",
            /** Specifies that the default source display will be mirrored to all other displays. */
            NORMAL = "normal",
            /**
             * Specifies that the specified source display will be mirrored to the provided destination displays.
             * All other connected displays will be extended.
             */
            MIXED = "mixed",
        }

        interface Bounds {
            /**  The x-coordinate of the upper-left corner. */
            left: number;
            /**  The y-coordinate of the upper-left corner. */
            top: number;
            /** The width of the display in pixels. */
            width: number;
            /** The height of the display in pixels. */
            height: number;
        }

        interface Insets {
            /** The x-axis distance from the left bound. */
            left: number;
            /** The y-axis distance from the top bound. */
            top: number;
            /** The x-axis distance from the right bound. */
            right: number;
            /** The y-axis distance from the bottom bound. */
            bottom: number;
        }

        /** @since Chrome 57 */
        interface Point {
            /** The x-coordinate of the point. */
            x: number;
            /** The y-coordinate of the point. */
            y: number;
        }

        /** @since Chrome 57 */
        interface TouchCalibrationPair {
            /** The coordinates of the display point. */
            displayPoint: Point;
            /** The coordinates of the touch point corresponding to the display point. */
            touchPoint: Point;
        }

        /** @since Chrome 52 */
        interface DisplayMode {
            /** The display mode width in device independent (user visible) pixels. */
            width: number;
            /** The display mode height in device independent (user visible) pixels. */
            height: number;
            /** The display mode width in native pixels. */
            widthInNativePixels: number;
            /** The display mode height in native pixels. */
            heightInNativePixels: number;
            /**
             * True if this mode is interlaced, false if not provided.
             * @since Chrome 74
             */
            isInterlaced?: boolean;
            /**
             * The display mode UI scale factor.
             * @deprecated Deprecated since Chrome 70. Use `displayZoomFactor`
             */
            uiScale?: number;
            /** The display mode device scale factor. */
            deviceScaleFactor: number;
            /**
             * The display mode refresh rate in hertz.
             * @since Chrome 67
             */
            refreshRate: number;
            /** True if the mode is the display's native mode. */
            isNative: boolean;
            /** True if the display mode is currently selected. */
            isSelected: boolean;
        }

        /** @since Chrome 53 */
        interface DisplayLayout {
            /** The unique identifier of the display. */
            id: string;
            /** The unique identifier of the parent display. Empty if this is the root. */
            parentId: string;
            /**
             * The layout position of this display relative to the parent.
             * This will be ignored for the root.
             */
            position: `${LayoutPosition}`;
            /** The offset of the display along the connected edge. 0 indicates that the topmost or leftmost corners are aligned. */
            offset: number;
        }

        /** The pairs of point used to calibrate the display. */
        interface TouchCalibrationPairQuad {
            /** First pair of touch and display point required for touch calibration. */
            pair1: TouchCalibrationPair;
            /** Second pair of touch and display point required for touch calibration. */
            pair2: TouchCalibrationPair;
            /** Third pair of touch and display point required for touch calibration. */
            pair3: TouchCalibrationPair;
            /** Fourth pair of touch and display point required for touch calibration. */
            pair4: TouchCalibrationPair;
        }

        interface DisplayProperties {
            /**
             * If set to true, changes the display mode to unified desktop (see `enableUnifiedDesktop` for details).
             * If set to false, unified desktop mode will be disabled.
             * This is only valid for the primary display.
             * If provided, mirroringSourceId must not be provided and other properties will be ignored.
             * This is has no effect if not provided.
             * @platform ChromeOS only
             * @since Chrome 59
             */
            isUnified?: boolean | undefined;
            /**
             * If set and not empty, enables mirroring for this display only.
             * Otherwise disables mirroring for all displays.
             * This value should indicate the id of the source display to mirror, which must not be the same as the id passed to setDisplayProperties.
             * If set, no other property may be set.
             * @platform ChromeOS only
             * @deprecated Deprecated since Chrome 68. Use ´setMirrorMode´
             */
            mirroringSourceId?: string | undefined;
            /**
             * If set to true, makes the display primary.
             * No-op if set to false.
             * Note: If set, the display is considered primary for all other properties (i.e. `isUnified` may be set and bounds origin may not).
             */
            isPrimary?: boolean | undefined;
            /**
             * If set, sets the display's overscan insets to the provided values.
             * Note that overscan values may not be negative or larger than a half of the screen's size.
             * Overscan cannot be changed on the internal monitor.
             */
            overscan?: Insets | undefined;
            /**
             * If set, updates the display's rotation.
             * Legal values are [0, 90, 180, 270].
             * The rotation is set clockwise, relative to the display's vertical position.
             * It's applied after overscan parameter.
             */
            rotation?: 0 | 90 | 180 | 270 | undefined;
            /**
             * If set, updates the display's logical bounds origin along the x-axis.
             * Applied together with `boundsOriginY`.
             * Defaults to the current value if not set and `boundsOriginY` is set.
             * Note that when updating the display origin, some constraints will be applied, so the final bounds origin may be different than the one set.
             * The final bounds can be retrieved using `getInfo`.
             * The bounds origin cannot be changed on the primary display.
             */
            boundsOriginX?: number | undefined;
            /**
             * If set, updates the display's logical bounds origin along the y-axis.
             * See documentation for `boundsOriginX` parameter.
             */
            boundsOriginY?: number | undefined;
            /**
             * If set, updates the display mode to the mode matching this value.
             * If other parameters are invalid, this will not be applied.
             * If the display mode is invalid, it will not be applied and an error will be set, but other properties will still be applied.
             * @since Chrome 52
             */
            displayMode?: DisplayMode | undefined;
            /**
             * If set, updates the zoom associated with the display.
             * This zoom performs re-layout and repaint thus resulting in a better quality zoom than just performing a pixel by pixel stretch enlargement.
             * @since Chrome 65
             */
            displayZoomFactor?: number | undefined;
        }

        /**
         * Options affecting how the information is returned.
         * @since Chrome 59
         */
        interface GetInfoFlags {
            /**
             * If set to true, only a single `DisplayUnitInfo` will be returned by `getInfo` when in unified desktop mode (see `enableUnifiedDesktop`).
             * @default false
             */
            singleUnified?: boolean | undefined;
        }

        /**
         * An enum to tell if the display is detected and used by the system.
         * The display is considered 'inactive', if it is not detected by the system (maybe disconnected, or considered disconnected due to sleep mode, etc).
         * This state is used to keep existing display when the all displays are disconnected, for example.
         * @since Chrome 117
         */
        enum ActiveState {
            ACTIVE = "active",
            INACTIVE = "inactive",
        }

        interface DisplayUnitInfo {
            /**
             * Active if the display is detected and used by the system.
             * @since Chrome 117
             */
            activeState: `${ActiveState}`;
            /** The unique identifier of the display. */
            id: string;
            /** The user-friendly name (e.g. 'HP LCD monitor'). */
            name: string;
            /**
             * @platform ChromeOS and Web UI only
             * @since Chrome 67
             */
            edid?: Edid;
            /**
             * Identifier of the display that is being mirrored if mirroring is enabled, otherwise empty.
             * This will be set for all displays (including the display being mirrored).
             * @platform ChromeOS only
             */
            mirroringSourceId: string;
            /**
             * Identifiers of the displays to which the source display is being mirrored.
             * Empty if no displays are being mirrored.
             * This must not include `mirroringSourceId`.
             * @platform ChromeOS only
             * @since Chrome 64
             */
            mirroringDestinationIds: string[];
            /** True if this is the primary display. */
            isPrimary: boolean;
            /** True if this is an internal display. */
            isInternal: boolean;
            /** True if this display is enabled. */
            isEnabled: boolean;
            /**
             * True for all displays when in unified desktop mode. See documentation for `enableUnifiedDesktop`.
             * @since Chrome 59
             */
            isUnified: boolean;
            /** The number of pixels per inch along the x-axis. */
            dpiX: number;
            /** The number of pixels per inch along the y-axis. */
            dpiY: number;
            /** The display's clockwise rotation in degrees relative to the vertical position.
             * Currently exposed only on ChromeOS. Will be set to 0 on other platforms.
             * A value of -1 will be interpreted as auto-rotate when the device is in a physical tablet state.
             * @platform ChromeOS only
             */
            rotation: number;
            /** The display's logical bounds. */
            bounds: Bounds;
            /**
             * The display's insets within its screen's bounds.
             * Currently exposed only on ChromeOS. Will be set to empty insets on other platforms.
             * @platform ChromeOS only
             */
            overscan: Insets;
            /**
             * The usable work area of the display within the display bounds.
             * The work area excludes areas of the display reserved for OS, for example taskbar and launcher.
             */
            workArea: Bounds;
            /**
             * The list of available display modes.
             * The current mode will have isSelected=true.
             * Will be set to an empty array on other platforms.
             * @platform ChromeOS only
             * @since Chrome 52
             */
            modes: DisplayMode[];
            /**
             * True if this display has a touch input device associated with it.
             * @since Chrome 57
             */
            hasTouchSupport: boolean;
            /**
             * A list of zoom factor values that can be set for the display.
             * @since Chrome 67
             */
            availableDisplayZoomFactors: number[];
            /**
             * The ratio between the display's current and default zoom.
             * For example, value 1 is equivalent to 100% zoom, and value 1.5 is equivalent to 150% zoom.
             * @since Chrome 65
             */
            displayZoomFactor: number;
        }

        /** @since Chrome 67 */
        interface Edid {
            /** 3 character manufacturer code. */
            manufacturerId: string;
            /** 2 byte manufacturer-assigned code. */
            productId: string;
            /** Year of manufacturer. */
            yearOfManufacture: number;
        }

        interface MirrorModeInfo {
            /** The mirror mode that should be set. */
            mode?: `${MirrorMode}`;
        }

        interface MirrorModeInfoMixed extends MirrorModeInfo {
            /** The mirror mode that should be set. */
            mode: "mixed";
            /** The id of the mirroring source display. */
            mirroringSourceId?: string | undefined;
            /** The ids of the mirroring destination displays. */
            mirroringDestinationIds?: string[] | undefined;
        }

        /**
         * Requests the information for all attached display devices.
         * Can return its result via Promise in Manifest V3 or later since Chrome 91.
         * @param flags Options affecting how the information is returned.
         */
        function getInfo(callback: (displayInfo: DisplayUnitInfo[]) => void): void;
        function getInfo(flags: GetInfoFlags, callback: (displayInfo: DisplayUnitInfo[]) => void): void;
        function getInfo(): Promise<DisplayUnitInfo[]>;
        function getInfo(flags: GetInfoFlags): Promise<DisplayUnitInfo[]>;

        /**
         * Requests the layout info for all displays
         * Can return its result via Promise in Manifest V3 or later since Chrome 91.
         * @platform ChromeOS and Web UI only
         * @since Chrome 53
         */
        function getDisplayLayout(callback: (layouts: DisplayLayout[]) => void): void;
        function getDisplayLayout(): Promise<DisplayLayout[]>;

        /**
         * requires(CrOS Kiosk apps | WebUI) This is only available to Chrome OS Kiosk apps and Web UI.
         * @description
         * Updates the properties for the display specified by `id`,
         * according to the information provided in `info`.
         * On failure, `runtime.lastError` will be set.
         * @platform ChromeOS and Web UI only
         * @param id The display's unique identifier.
         * @param info The information about display properties that should be changed. A property will be changed only if a new value for it is specified in `info`.
         */
        function setDisplayProperties(id: string, info: DisplayProperties, callback: () => void): void;
        function setDisplayProperties(id: string, info: DisplayProperties): Promise<void>;

        /**
         * Set the layout for all displays.
         * Any display not included will use the default layout.
         * If a layout would overlap or be otherwise invalid it will be adjusted to a valid layout.
         * After layout is resolved, an onDisplayChanged event will be triggered.
         * Can return its result via Promise in Manifest V3 or later since Chrome 91.
         * @platform ChromeOS and Web UI only
         * @since Chrome 53
         * @param layouts The layout information, required for all displays except the primary display.
         */
        function setDisplayLayout(layouts: DisplayLayout[], callback: () => void): void;
        function setDisplayLayout(layouts: DisplayLayout[]): Promise<void>;

        /**
         * Enables/disables the unified desktop feature.
         * If enabled while mirroring is active, the desktop mode will not change until mirroring is turned off.
         * Otherwise, the desktop mode will switch to unified immediately.
         * @since Chrome 46
         * @platform ChromeOS and Web UI only
         * @param enabled True if unified desktop should be enabled.
         */
        function enableUnifiedDesktop(enabled: boolean): void;

        /**
         * Starts overscan calibration for a display.
         * This will show an overlay on the screen indicating the current overscan insets.
         * If overscan calibration for display `id` is in progress this will reset calibration.
         * @since Chrome 53
         * @param id The display's unique identifier.
         */
        function overscanCalibrationStart(id: string): void;

        /**
         * Adjusts the current overscan insets for a display.
         * Typically this should either move the display along an axis (e.g. left+right have the same value)
         * or scale it along an axis (e.g. top+bottom have opposite values).
         * Each Adjust call is cumulative with previous calls since Start.
         * @since Chrome 53
         * @param id The display's unique identifier.
         * @param delta The amount to change the overscan insets.
         */
        function overscanCalibrationAdjust(id: string, delta: Insets): void;

        /**
         * Resets the overscan insets for a display to the last saved value (i.e before Start was called).
         * @since Chrome 53
         * @param id The display's unique identifier.
         */
        function overscanCalibrationReset(id: string): void;

        /**
         * Complete overscan adjustments for a display by saving the current values and hiding the overlay.
         * @since Chrome 53
         * @param id The display's unique identifier.
         */
        function overscanCalibrationComplete(id: string): void;

        /**
         * Displays the native touch calibration UX for the display with `id` as display id.
         * This will show an overlay on the screen with required instructions on how to proceed.
         * The callback will be invoked in case of successful calibration only.
         * If the calibration fails, this will throw an error.
         * Can return its result via Promise in Manifest V3 or later since Chrome 91.
         * @since Chrome 57
         * @param id The display's unique identifier.
         */
        function showNativeTouchCalibration(id: string, callback: (success: boolean) => void): void;
        function showNativeTouchCalibration(id: string): Promise<boolean>;

        /**
         * Starts custom touch calibration for a display.
         * This should be called when using a custom UX for collecting calibration data.
         * If another touch calibration is already in progress this will throw an error.
         * @since Chrome 57
         * @param id The display's unique identifier.
         */
        function startCustomTouchCalibration(id: string): void;

        /**
         * Sets the touch calibration pairs for a display.
         * These `pairs` would be used to calibrate the touch screen for display with `id` called in startCustomTouchCalibration().
         * Always call `startCustomTouchCalibration` before calling this method.
         * If another touch calibration is already in progress this will throw an error.
         * @since Chrome 57
         * @param pairs The pairs of point used to calibrate the display.
         * @param bounds Bounds of the display when the touch calibration was performed. `bounds.left` and `bounds.top` values are ignored.
         * @throws Error
         */
        function completeCustomTouchCalibration(pairs: TouchCalibrationPairQuad, bounds: Bounds): void;

        /**
         * Resets the touch calibration for the display and brings it back to its default state by clearing any touch calibration data associated with the display.
         * @since Chrome 57
         * @param id The display's unique identifier.
         */
        function clearTouchCalibration(id: string): void;

        /**
         * Sets the display mode to the specified mirror mode.
         * Each call resets the state from previous calls.
         * Calling setDisplayProperties() will fail for the mirroring destination displays.
         * @platform ChromeOS and Web UI only
         * @param info The information of the mirror mode that should be applied to the display mode.
         * @since Chrome 65
         */
        function setMirrorMode(info: MirrorModeInfo | MirrorModeInfoMixed, callback: () => void): void;
        function setMirrorMode(info: MirrorModeInfo | MirrorModeInfoMixed): Promise<void>;

        /** Fired when anything changes to the display configuration. */
        const onDisplayChanged: chrome.events.Event<() => void>;
    }
}
