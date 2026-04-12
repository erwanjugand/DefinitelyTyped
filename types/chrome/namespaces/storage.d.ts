declare namespace chrome {
    ////////////////////
    // Storage
    ////////////////////
    /**
     * Use the `chrome.storage` API to store, retrieve, and track changes to user data.
     *
     * Permissions: "storage"
     */
    namespace storage {
        /** NoInfer for old TypeScript versions (Required TS 5.4+) */
        type NoInferX<T> = T[][T extends any ? 0 : never];
        // The next line prevents things without the export keyword from being automatically exported (like NoInferX)
        export {};

        export interface StorageArea {
            /**
             * Gets the amount of space (in bytes) being used by one or more items.
             * @param keys A single key or list of keys to get the total usage for. An empty list will return 0. Pass in `null` to get the total usage of all of storage.
             *
             * Can return its result via Promise in Manifest V3 or later since Chrome 95.
             */
            getBytesInUse<T = { [key: string]: any }>(keys?: keyof T | Array<keyof T> | null): Promise<number>;
            getBytesInUse<T = { [key: string]: any }>(callback: (bytesInUse: number) => void): void;
            getBytesInUse<T = { [key: string]: any }>(
                keys: keyof T | Array<keyof T> | null | undefined,
                callback: (bytesInUse: number) => void,
            ): void;

            /**
             * Removes all items from storage.
             *
             * Can return its result via Promise in Manifest V3 or later since Chrome 95.
             */
            clear(): Promise<void>;
            clear(callback: () => void): void;

            /**
             * Sets multiple items.
             * @param items An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected. Primitive values such as numbers will serialize as expected. Values with a `typeof` `object` and `function` will typically serialize to `{}`, with the exception of `Array` (serializes as expected), `Date`, and `Regex` (serialize using their `String` representation).
             *
             * Can return its result via Promise in Manifest V3 or later since Chrome 95.
             */
            set<T = { [key: string]: any }>(items: Partial<T>): Promise<void>;
            set<T = { [key: string]: any }>(items: Partial<T>, callback: () => void): void;

            /**
             * Removes one or more items from storage.
             * @param keys A single key or a list of keys for items to remove.
             *
             * Can return its result via Promise in Manifest V3 or later since Chrome 95.
             */
            remove<T = { [key: string]: any }>(keys: keyof T | Array<keyof T>): Promise<void>;
            remove<T = { [key: string]: any }>(keys: keyof T | Array<keyof T>, callback: () => void): void;

            /**
             * Gets one or more items from storage.
             * @param keys A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in `null` to get the entire contents of storage.
             *
             * Can return its result via Promise in Manifest V3 or later since Chrome 95.
             */
            get<T = { [key: string]: unknown }>(
                keys?: NoInferX<keyof T> | Array<NoInferX<keyof T>> | Partial<NoInferX<T>> | null,
            ): Promise<T>;
            get<T = { [key: string]: unknown }>(callback: (items: T) => void): void;
            get<T = { [key: string]: unknown }>(
                keys: NoInferX<keyof T> | Array<NoInferX<keyof T>> | Partial<NoInferX<T>> | null | undefined,
                callback: (items: T) => void,
            ): void;

            /**
             * Sets the desired access level for the storage area. By default, session storage is restricted to trusted contexts (extension pages and service workers), while `managed`, `local`, and `sync` storage allow access from both trusted and untrusted contexts.
             * @param accessOptions The access level of the storage area.
             *
             * Can return its result via Promise in Manifest V3 or later.
             * @since Chrome 102
             */
            setAccessLevel(accessOptions: { accessLevel: `${AccessLevel}` }): Promise<void>;
            setAccessLevel(accessOptions: { accessLevel: `${AccessLevel}` }, callback: () => void): void;

            /** Fired when one or more items change. */
            onChanged: events.Event<(changes: { [key: string]: StorageChange }) => void>;

            /**
             * Gets all keys from storage.
             *
             * Can return its result via Promise in Manifest V3 or later.
             * @since Chrome 130
             */
            getKeys(): Promise<string[]>;
            getKeys(callback: (keys: string[]) => void): void;
        }

        export interface StorageChange {
            /** The new value of the item, if there is a new value. */
            newValue?: unknown;
            /** The old value of the item, if there was an old value. */
            oldValue?: unknown;
        }

        export interface LocalStorageArea extends StorageArea {
            /** The maximum amount (in bytes) of data that can be stored in local storage, as measured by the JSON stringification of every value plus every key's length. This value will be ignored if the extension has the unlimitedStorage permission. Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError when using a callback, or a rejected Promise if using async/await. */
            QUOTA_BYTES: 10485760;
        }

        export interface SyncStorageArea extends StorageArea {
            /** @deprecated The storage.sync API no longer has a sustained write operation quota. */
            MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: 1000000;
            /** The maximum total amount (in bytes) of data that can be stored in sync storage, as measured by the JSON stringification of every value plus every key's length. Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError when using a callback, or when a Promise is rejected. */
            QUOTA_BYTES: 102400;
            /** The maximum size (in bytes) of each individual item in sync storage, as measured by the JSON stringification of its value plus its key length. Updates containing items larger than this limit will fail immediately and set runtime.lastError when using a callback, or when a Promise is rejected. */
            QUOTA_BYTES_PER_ITEM: 8192;
            /** The maximum number of items that can be stored in sync storage. Updates that would cause this limit to be exceeded will fail immediately and set runtime.lastError when using a callback, or when a Promise is rejected. */
            MAX_ITEMS: 512;
            /**
             * The maximum number of `set`, `remove`, or `clear` operations that can be performed each hour. This is 1 every 2 seconds, a lower ceiling than the short term higher writes-per-minute limit.
             *
             * Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError when using a callback, or when a Promise is rejected.
             */
            MAX_WRITE_OPERATIONS_PER_HOUR: 1800;
            /**
             * The maximum number of `set`, `remove`, or `clear` operations that can be performed each minute. This is 2 per second, providing higher throughput than writes-per-hour over a shorter period of time.
             *
             * Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError when using a callback, or when a Promise is rejected.
             */
            MAX_WRITE_OPERATIONS_PER_MINUTE: 120;
        }

        export interface SessionStorageArea extends StorageArea {
            /** The maximum amount (in bytes) of data that can be stored in memory, as measured by estimating the dynamically allocated memory usage of every value and key. Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError when using a callback, or when a Promise is rejected. */
            QUOTA_BYTES: 10485760;
        }

        export type AreaName = "sync" | "local" | "managed" | "session";

        /**
         * The storage area's access level.
         * @since Chrome 102
         */
        export enum AccessLevel {
            /** Specifies contexts originating from the extension itself. */
            TRUSTED_CONTEXTS = "TRUSTED_CONTEXTS",
            /** Specifies contexts originating from outside the extension. */
            TRUSTED_AND_UNTRUSTED_CONTEXTS = "TRUSTED_AND_UNTRUSTED_CONTEXTS",
        }

        /** Items in the `local` storage area are local to each machine. */
        export const local: LocalStorageArea;

        /** Items in the `sync` storage area are synced using Chrome Sync. */
        export const sync: SyncStorageArea;

        /** Items in the `managed` storage area are set by an enterprise policy configured by the domain administrator, and are read-only for the extension; trying to modify this namespace results in an error. For information on configuring a policy, see Manifest for storage areas. */
        export const managed: StorageArea;

        /**
         * Items in the `session` storage area are stored in-memory and will not be persisted to disk.
         *
         * MV3 only
         * @since Chrome 102
         */
        export const session: SessionStorageArea;

        /** Fired when one or more items change. */
        export const onChanged: events.Event<(changes: { [key: string]: StorageChange }, areaName: AreaName) => void>;
    }
}
