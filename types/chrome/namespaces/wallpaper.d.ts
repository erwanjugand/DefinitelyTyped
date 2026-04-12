declare namespace chrome {
    ////////////////////
    // Wallpaper
    ////////////////////
    /**
     * Use the `chrome.wallpaper` API to change the ChromeOS wallpaper.
     *
     * Permissions: "wallpaper"
     * @platform ChromeOS only
     * @since Chrome 43
     */
    namespace wallpaper {
        /**
         * The supported wallpaper layouts.
         * @since Chrome 44
         */
        enum WallpaperLayout {
            STRETCH = "STRETCH",
            CENTER = "CENTER",
            CENTER_CROPPED = "CENTER_CROPPED",
        }

        interface WallpaperDetails {
            /** The jpeg or png encoded wallpaper image as an ArrayBuffer. */
            data?: ArrayBuffer | undefined;
            /** The URL of the wallpaper to be set (can be relative). */
            url?: string | undefined;
            /** The supported wallpaper layouts. */
            layout: `${WallpaperLayout}`;
            /** The file name of the saved wallpaper. */
            filename: string;
            /** True if a 128x60 thumbnail should be generated. Layout and ratio are not supported yet. */
            thumbnail?: boolean | undefined;
        }

        /**
         * Sets wallpaper to the image at url or wallpaperData with the specified layout
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function setWallpaper(details: WallpaperDetails): Promise<ArrayBuffer | undefined>;
        function setWallpaper(details: WallpaperDetails, callback: (thumbnail?: ArrayBuffer) => void): void;
    }
}
