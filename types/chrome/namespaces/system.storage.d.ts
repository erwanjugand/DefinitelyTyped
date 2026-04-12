declare namespace chrome {
    ////////////////////
    // System Storage
    ////////////////////
    /**
     * Use the `chrome.system.storage` API to query storage device information and be notified when a removable storage device is attached and detached.
     *
     * Permissions: "system.storage"
     */
    namespace system.storage {
        enum EjectDeviceResultCode {
            /** The ejection command is successful -- the application can prompt the user to remove the device. */
            SUCCESS = "success",
            /** The device is in use by another application. The ejection did not succeed; the user should not remove the device until the other application is done with the device. */
            IN_USE = "in_use",
            /** There is no such device known. */
            NO_SUCH_DEVICE = "no_such_device",
            /** The ejection command failed. */
            FAILURE = "failure",
        }

        interface StorageUnitInfo {
            /** The transient ID that uniquely identifies the storage device. This ID will be persistent within the same run of a single application. It will not be a persistent identifier between different runs of an application, or between different applications. */
            id: string;
            /** The name of the storage unit. */
            name: string;
            /** The media type of the storage unit. */
            type: `${StorageUnitType}`;
            /** The total amount of the storage space, in bytes. */
            capacity: number;
        }

        enum StorageUnitType {
            /** The storage has fixed media, e.g. hard disk or SSD. */
            FIXED = "fixed",
            /** The storage is removable, e.g. USB flash drive. */
            REMOVABLE = "removable",
            /** The storage type is unknown. */
            UNKNOWN = "unknown",
        }

        interface StorageAvailableCapacityInfo {
            /** A copied `id` of getAvailableCapacity function parameter `id`. */
            id: string;
            /** The available capacity of the storage device, in bytes. */
            availableCapacity: number;
        }

        /**
         * Get the storage information from the system. The argument passed to the callback is an array of StorageUnitInfo objects.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 91.
         */
        function getInfo(): Promise<StorageUnitInfo[]>;
        function getInfo(callback: (info: StorageUnitInfo[]) => void): void;

        /**
         * Ejects a removable storage device.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 91.
         */
        function ejectDevice(id: string): Promise<`${EjectDeviceResultCode}`>;
        function ejectDevice(id: string, callback: (result: `${EjectDeviceResultCode}`) => void): void;

        /**
         * Get the available capacity of a specified `id` storage device. The `id` is the transient device ID from StorageUnitInfo.
         *
         * Can return its result via Promise in Manifest V3.
         * @since Dev channel only.
         */
        function getAvailableCapacity(id: string): Promise<StorageAvailableCapacityInfo>;
        function getAvailableCapacity(id: string, callback: (info: StorageAvailableCapacityInfo) => void): void;

        /** Fired when a new removable storage is attached to the system. */
        const onAttached: events.Event<(info: StorageUnitInfo) => void>;

        /** Fired when a removable storage is detached from the system. */
        const onDetached: events.Event<(id: string) => void>;
    }
}
