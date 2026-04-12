declare namespace chrome {
    ////////////////////
    // Enterprise Hardware Platform
    ////////////////////
    /**
     * Use the `chrome.enterprise.hardwarePlatform` API to get the manufacturer and model of the hardware platform where the browser runs.
     *
     * Permissions: "enterprise.hardwarePlatform"
     *
     * Note: Only available to policy installed extensions.
     * @since Chrome 71
     */
    namespace enterprise.hardwarePlatform {
        interface HardwarePlatformInfo {
            manufacturer: string;
            model: string;
        }

        /**
         * Obtains the manufacturer and model for the hardware platform and, if the extension is authorized, returns it via callback.
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getHardwarePlatformInfo(): Promise<HardwarePlatformInfo>;
        function getHardwarePlatformInfo(callback: (info: HardwarePlatformInfo) => void): void;
    }
}
