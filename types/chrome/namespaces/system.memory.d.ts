declare namespace chrome {
    ////////////////////
    // System Memory
    ////////////////////
    /**
     * The `chrome.system.memory` API.
     *
     * Permissions: "system.memory"
     */
    namespace system.memory {
        interface MemoryInfo {
            /** The total amount of physical memory capacity, in bytes. */
            capacity: number;
            /** The amount of available capacity, in bytes. */
            availableCapacity: number;
        }

        /**
         * Get physical memory information.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 91.
         */
        function getInfo(): Promise<MemoryInfo>;
        function getInfo(callback: (info: MemoryInfo) => void): void;
    }
}
