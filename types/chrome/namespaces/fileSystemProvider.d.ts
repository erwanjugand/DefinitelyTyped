declare namespace chrome {
    ////////////////////
    // File System Provider
    ////////////////////
    /**
     * Use the `chrome.fileSystemProvider` API to create file systems, that can be accessible from the file manager on Chrome OS.
     *
     * Permissions: "fileSystemProvider"
     * @platform ChromeOS only
     */
    namespace fileSystemProvider {
        interface AbortRequestedOptions {
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** An ID of the request to be aborted. */
            operationRequestId: number;
            /** The unique identifier of this request. */
            requestId: number;
        }

        /** @since Chrome 45 */
        interface Action {
            /** The identifier of the action. Any string or {@link CommonActionId} for common actions. */
            id: string;
            /** The title of the action. It may be ignored for common actions. */
            title?: string;
        }

        interface AddWatcherRequestedOptions {
            /** The path of the entry to be observed. */
            entryPath: string;
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** Whether observing should include all child entries recursively. It can be true for directories only. */
            recursive: boolean;
            /** The unique identifier of this request. */
            requestId: number;
        }

        interface Change {
            /** The type of the change which happened to the entry. */
            changeType: `${ChangeType}`;
            /**
             * Information relating to the file if backed by a cloud file system.
             * @since Chrome 125
             */
            cloudFileInfo?: CloudFileInfo;
            /** The path of the changed entry. */
            entryPath: string;
        }

        /** Type of a change detected on the observed directory. */
        enum ChangeType {
            CHANGED = "CHANGED",
            DELETED = "DELETED",
        }

        interface CloseFileRequestedOptions {
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** A request ID used to open the file. */
            openRequestId: number;
            /** The unique identifier of this request. */
            requestId: number;
        }

        /** @since Chrome 125 */
        interface CloudFileInfo {
            /** A tag that represents the version of the file. */
            versionTag?: string;
        }

        /** @since Chrome 117 */
        interface CloudIdentifier {
            /** The provider's identifier for the given file/directory. */
            id: string;
            /** Identifier for the cloud storage provider (e.g. 'drive.google.com'). */
            providerName: string;
        }

        /**
         * List of common actions. `"SHARE"` is for sharing files with others. `"SAVE_FOR_OFFLINE"` for pinning (saving for offline access). `"OFFLINE_NOT_NECESSARY"` for notifying that the file doesn't need to be stored for offline access anymore. Used by {@link onGetActionsRequested} and {@link onExecuteActionRequested}.
         * @since Chrome 45
         */
        enum CommonActionId {
            SAVE_FOR_OFFLINE = "SAVE_FOR_OFFLINE",
            OFFLINE_NOT_NECESSARY = "OFFLINE_NOT_NECESSARY",
            SHARE = "SHARE",
        }

        /** @since Chrome 44 */
        interface ConfigureRequestedOptions {
            /** The identifier of the file system to be configured. */
            fileSystemId: string;
            /** The unique identifier of this request. */
            requestId: number;
        }

        interface CopyEntryRequestedOptions {
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** The unique identifier of this request. */
            requestId: number;
            /** The source path of the entry to be copied. */
            sourcePath: string;
            /** The destination path for the copy operation. */
            targetPath: string;
        }

        interface CreateDirectoryRequestedOptions {
            /** The path of the directory to be created. */
            directoryPath: string;
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** Whether the operation is recursive (for directories only). */
            recursive: boolean;
            /** The unique identifier of this request. */
            requestId: number;
        }

        interface CreateFileRequestedOptions {
            /** The path of the file to be created. */
            filePath: string;
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** The unique identifier of this request. */
            requestId: number;
        }

        interface DeleteEntryRequestedOptions {
            /** The path of the entry to be deleted. */
            entryPath: string;
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** Whether the operation is recursive (for directories only). */
            recursive: boolean;
            /** The unique identifier of this request. */
            requestId: number;
        }

        interface EntryMetadata {
            /**
             * Information that identifies a specific file in the underlying cloud file system. Must be provided if requested in `options` and the file is backed by cloud storage.
             * @since Chrome 125
             */
            cloudFileInfo?: CloudFileInfo;
            /**
             * Cloud storage representation of this entry. Must be provided if requested in `options` and the file is backed by cloud storage. For local files not backed by cloud storage, it should be undefined when requested.
             * @since Chrome 117
             */
            cloudIdentifier?: CloudIdentifier;
            /** True if it is a directory. Must be provided if requested in `options`. */
            isDirectory?: boolean;
            /** Mime type for the entry. Always optional, but should be provided if requested in `options`. */
            mimeType?: string;
            /** The last modified time of this entry. Must be provided if requested in `options`. */
            modificationTime?: Date;
            /** Name of this entry (not full path name). Must not contain '/'. For root it must be empty. Must be provided if requested in `options`. */
            name?: string;
            /** File size in bytes. Must be provided if requested in `options`. */
            size?: number;
            /** Thumbnail image as a data URI in either PNG, JPEG or WEBP format, at most 32 KB in size. Optional, but can be provided only when explicitly requested by the {@link onGetMetadataRequested} event. */
            thumbnail?: string;
        }

        /** @since Chrome 45 */
        interface ExecuteActionRequestedOptions {
            /** The identifier of the action to be executed. */
            actionId: string;
            /**
             * The set of paths of the entries to be used for the action.
             * @since Chrome 47
             */
            entryPaths: string[];
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** The unique identifier of this request. */
            requestId: number;
        }

        interface FileSystemInfo {
            /** A human-readable name for the file system. */
            displayName: string;
            /** The identifier of the file system. */
            fileSystemId: string;
            /** List of currently opened files. */
            openedFiles: OpenedFile[];
            /** The maximum number of files that can be opened at once. If 0, then not limited. */
            openedFilesLimit: number;
            /**
             * Whether the file system supports the `tag` field for observing directories.
             * @since Chrome 45
             */
            supportsNotifyTag?: boolean;
            /**
             * List of watchers.
             * @since Chrome 45
             */
            watchers: Watcher[];
            /** Whether the file system supports operations which may change contents of the file system (such as creating, deleting or writing to files). */
            writable: boolean;
        }

        /** @since Chrome 45 */
        interface GetActionsRequestedOptions {
            /**
             * List of paths of entries for the list of actions.
             * @since Chrome 47
             */
            entryPaths: string[];
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** The unique identifier of this request. */
            requestId: number;
        }

        interface GetMetadataRequestedOptions {
            /**
             * Set to `true` if `cloudFileInfo` value is requested.
             * @since Chrome 125
             */
            cloudFileInfo: boolean;
            /**
             * Set to `true` if `cloudIdentifier` value is requested.
             * @since Chrome 117
             */
            cloudIdentifier: boolean;
            /** The path of the entry to fetch metadata about. */
            entryPath: string;
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /**
             * Set to `true` if `is_directory` value is requested.
             * @since Chrome 49
             */
            isDirectory: boolean;
            /**
             * Set to `true` if `mimeType` value is requested.
             * @since Chrome 49
             */
            mimeType: boolean;
            /**
             * Set to `true` if `modificationTime` value is requested.
             * @since Chrome 49
             */
            modificationTime: boolean;
            /**
             * Set to `true` if `name` value is requested.
             * @since Chrome 49
             */
            name: boolean;
            /** The unique identifier of this request. */
            requestId: number;
            /**
             * Set to `true` if `size` value is requested.
             * @since Chrome 49
             */
            size: boolean;
            /** Set to `true` if `thumbnail` value is requested. */
            thumbnail: boolean;
        }

        interface MountOptions {
            /** A human-readable name for the file system. */
            displayName: string;
            /** The string identifier of the file system. Must be unique per each extension. */
            fileSystemId: string;
            /** The maximum number of files that can be opened at once. If not specified, or 0, then not limited. */
            openedFilesLimit?: number;
            /**
             * Whether the framework should resume the file system at the next sign-in session. True by default.
             * @since Chrome 64
             */
            persistent?: boolean;
            /**
             * Whether the file system supports the `tag` field for observed directories.
             * @since Chrome 45
             */
            supportsNotifyTag?: boolean;
            /** Whether the file system supports operations which may change contents of the file system (such as creating, deleting or writing to files). */
            writable?: boolean;
        }

        interface MoveEntryRequestedOptions {
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** The unique identifier of this request. */
            requestId: number;
            /** The source path of the entry to be moved into a new place. */
            sourcePath: string;
            /** The destination path for the copy operation. */
            targetPath: string;
        }

        interface NotifyOptions {
            /** The type of the change which happened to the observed entry. If it is DELETED, then the observed entry will be automatically removed from the list of observed entries. */
            changeType: `${ChangeType}`;
            /** List of changes to entries within the observed directory (including the entry itself) */
            changes?: Change[];
            /** The identifier of the file system related to this change. */
            fileSystemId: string;
            /** The path of the observed entry. */
            observedPath: string;
            /** Mode of the observed entry. */
            recursive: boolean;
            /** Tag for the notification. Required if the file system was mounted with the `supportsNotifyTag` option. Note, that this flag is necessary to provide notifications about changes which changed even when the system was shutdown. */
            tag?: string;
        }

        interface OpenedFile {
            /** The path of the opened file. */
            filePath: string;
            /** Whether the file was opened for reading or writing. */
            mode: `${OpenFileMode}`;
            /** A request ID to be be used by consecutive read/write and close requests. */
            openRequestId: number;
        }

        /** Mode of opening a file. Used by {@link onOpenFileRequested}. */
        enum OpenFileMode {
            READ = "READ",
            WRITE = "WRITE",
        }

        interface OpenFileRequestedOptions {
            /** The path of the file to be opened. */
            filePath: string;
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** Whether the file will be used for reading or writing. */
            mode: `${OpenFileMode}`;
            /** A request ID which will be used by consecutive read/write and close requests. */
            requestId: number;
        }

        /** Error codes used by providing extensions in response to requests as well as in case of errors when calling methods of the API. For success, `"OK"` must be used.*/
        enum ProviderError {
            OK = "OK",
            FAILED = "FAILED",
            IN_USE = "IN_USE",
            EXISTS = "EXISTS",
            NOT_FOUND = "NOT_FOUND",
            ACCESS_DENIED = "ACCESS_DENIED",
            TOO_MANY_OPENED = "TOO_MANY_OPENED",
            NO_MEMORY = "NO_MEMORY",
            NO_SPACE = "NO_SPACE",
            NOT_A_DIRECTORY = "NOT_A_DIRECTORY",
            INVALID_OPERATION = "INVALID_OPERATION",
            SECURITY = "SECURITY",
            ABORT = "ABORT",
            NOT_A_FILE = "NOT_A_FILE",
            NOT_EMPTY = "NOT_EMPTY",
            INVALID_URL = "INVALID_URL",
            IO = "IO",
        }

        interface ReadDirectoryRequestedOptions {
            /** The path of the directory which contents are requested. */
            directoryPath: string;
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /**
             * Set to `true` if `is_directory` value is requested.
             * @since Chrome 49
             */
            isDirectory: boolean;
            /**
             * Set to `true` if `mimeType` value is requested.
             * @since Chrome 49
             */
            mimeType: boolean;
            /**
             * Set to `true` if `modificationTime` value is requested.
             * @since Chrome 49
             */
            modificationTime: boolean;
            /**
             * Set to `true` if `name` value is requested.
             * @since Chrome 49
             */
            name: boolean;
            /** The unique identifier of this request. */
            requestId: number;
            /**
             * Set to `true` if `size` value is requested.
             * @since Chrome 49
             */
            size: boolean;
            /**
             * Set to `true` if `thumbnail` value is requested.
             * @since Chrome 49
             */
            thumbnail: boolean;
        }

        interface ReadFileRequestedOptions {
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** Number of bytes to be returned. */
            length: number;
            /** Position in the file (in bytes) to start reading from. */
            offset: number;
            /** A request ID used to open the file. */
            openRequestId: number;
            /** The unique identifier of this request. */
            requestId: number;
        }

        interface RemoveWatcherRequestedOptions {
            /** The path of the watched entry. */
            entryPath: string;
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** Mode of the watcher. */
            recursive: boolean;
            /** The unique identifier of this request. */
            requestId: number;
        }

        interface TruncateRequestedOptions {
            /** The path of the file to be truncated. */
            filePath: string;
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** Number of bytes to be retained after the operation completes. */
            length: number;
            /** The unique identifier of this request. */
            requestId: number;
        }

        interface UnmountOptions {
            /** The identifier of the file system to be unmounted. */
            fileSystemId: string;
        }

        interface UnmountRequestedOptions {
            /** The identifier of the file system to be unmounted. */
            fileSystemId: string;
            /** The unique identifier of this request. */
            requestId: number;
        }

        interface Watcher {
            /** The path of the entry being observed. */
            entryPath: string;
            /** Tag used by the last notification for the watcher. */
            lastTag?: string;
            /** Whether watching should include all child entries recursively. It can be true for directories only. */
            recursive: boolean;
        }

        interface WriteFileRequestedOptions {
            /** Buffer of bytes to be written to the file. */
            data: ArrayBuffer;
            /** The identifier of the file system related to this operation. */
            fileSystemId: string;
            /** Position in the file (in bytes) to start writing the bytes from. */
            offset: number;
            /** A request ID used to open the file. */
            openRequestId: number;
            /** The unique identifier of this request. */
            requestId: number;
        }

        /**
         * Returns information about a file system with the passed `fileSystemId`.
         *
         * Can return its result via Promise since Chrome 96.
         */
        function get(fileSystemId: string): Promise<FileSystemInfo>;
        function get(fileSystemId: string, callback: (fileSystem: FileSystemInfo) => void): void;

        /**
         * Returns all file systems mounted by the extension.
         *
         * Can return its result via Promise since Chrome 96.
         */
        function getAll(): Promise<FileSystemInfo[]>;
        function getAll(callback: (fileSystems: FileSystemInfo[]) => void): void;

        /**
         * Mounts a file system with the given `fileSystemId` and `displayName`. `displayName` will be shown in the left panel of the Files app. `displayName` can contain any characters including '/', but cannot be an empty string. `displayName` must be descriptive but doesn't have to be unique. The `fileSystemId` must not be an empty string.
         *
         * Depending on the type of the file system being mounted, the `source` option must be set appropriately.
         *
         * In case of an error, {@link runtime.lastError} will be set with a corresponding error code.
         *
         * Can return its result via Promise since Chrome 96.
         */
        function mount(options: MountOptions): Promise<void>;
        function mount(options: MountOptions, callback: () => void): void;

        /**
         * Notifies about changes in the watched directory at `observedPath` in `recursive` mode. If the file system is mounted with `supportsNotifyTag`, then `tag` must be provided, and all changes since the last notification always reported, even if the system was shutdown. The last tag can be obtained with {@link getAll}.
         *
         * To use, the `file_system_provider.notify` manifest option must be set to true.
         *
         * Value of `tag` can be any string which is unique per call, so it's possible to identify the last registered notification. Eg. if the providing extension starts after a reboot, and the last registered notification's tag is equal to "123", then it should call {@link notify} for all changes which happened since the change tagged as "123". It cannot be an empty string.
         *
         * Not all providers are able to provide a tag, but if the file system has a changelog, then the tag can be eg. a change number, or a revision number.
         *
         * Note that if a parent directory is removed, then all descendant entries are also removed, and if they are watched, then the API must be notified about the fact. Also, if a directory is renamed, then all descendant entries are in fact removed, as there is no entry under their original paths anymore.
         *
         * In case of an error, {@link runtime.lastError} will be set will a corresponding error code.
         *
         * Can return its result via Promise since Chrome 96.
         * @since Chrome 45
         */
        function notify(options: NotifyOptions): Promise<void>;
        function notify(options: NotifyOptions, callback: () => void): void;

        /**
         * Unmounts a file system with the given `fileSystemId`. It must be called after {@link onUnmountRequested} is invoked. Also, the providing extension can decide to perform unmounting if not requested (eg. in case of lost connection, or a file error).
         *
         * In case of an error, {@link runtime.lastError} will be set with a corresponding error code.
         *
         * Can return its result via Promise since Chrome 96.
         */
        function unmount(options: UnmountOptions): Promise<void>;
        function unmount(options: UnmountOptions, callback: () => void): void;

        /** Raised when aborting an operation with `operationRequestId` is requested. The operation executed with `operationRequestId` must be immediately stopped and `successCallback` of this abort request executed. If aborting fails, then `errorCallback` must be called. Note, that callbacks of the aborted operation must not be called, as they will be ignored. Despite calling `errorCallback`, the request may be forcibly aborted. */
        const onAbortRequested: events.Event<
            (
                options: AbortRequestedOptions,
                successCallback: () => void,
                errorCallback: (error: `${ProviderError}`) => void,
            ) => void
        >;

        /**
         * Raised when setting a new directory watcher is requested. If an error occurs, then `errorCallback` must be called.
         * @since Chrome 45
         */
        const onAddWatcherRequested: events.Event<
            (
                options: AddWatcherRequestedOptions,
                successCallback: () => void,
                errorCallback: (error: `${ProviderError}`) => void,
            ) => void
        >;

        /** Raised when opening a file previously opened with `openRequestId` is requested to be closed.*/
        const onCloseFileRequested: events.Event<
            (
                options: CloseFileRequestedOptions,
                successCallback: () => void,
                errorCallback: (error: `${ProviderError}`) => void,
            ) => void
        >;

        /**
         * Raised when showing a configuration dialog for `fileSystemId` is requested. If it's handled, the `file_system_provider.configurable` manifest option must be set to true.
         * @since Chrome 44
         */
        const onConfigureRequested: events.Event<
            (
                options: ConfigureRequestedOptions,
                successCallback: () => void,
                errorCallback: (error: `${ProviderError}`) => void,
            ) => void
        >;

        /** Raised when copying an entry (recursively if a directory) is requested. If an error occurs, then `errorCallback` must be called. */
        const onCopyEntryRequested: events.Event<
            (
                options: CopyEntryRequestedOptions,
                successCallback: () => void,
                errorCallback: (error: `${ProviderError}`) => void,
            ) => void
        >;

        /** Raised when creating a directory is requested. The operation must fail with the EXISTS error if the target directory already exists. If `recursive` is true, then all of the missing directories on the directory path must be created. */
        const onCreateDirectoryRequested: events.Event<
            (
                options: CreateDirectoryRequestedOptions,
                successCallback: () => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;

        /** Raised when creating a file is requested. If the file already exists, then `errorCallback` must be called with the `"EXISTS"` error code. */
        const onCreateFileRequested: events.Event<
            (
                options: CreateFileRequestedOptions,
                successCallback: () => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;

        /** Raised when deleting an entry is requested. If `recursive` is true, and the entry is a directory, then all of the entries inside must be recursively deleted as well. */
        const onDeleteEntryRequested: events.Event<
            (
                options: DeleteEntryRequestedOptions,
                successCallback: () => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;

        /**
         * Raised when executing an action for a set of files or directories is\\ requested. After the action is completed, `successCallback` must be called. On error, `errorCallback` must be called.
         * @since Chrome 48
         */
        const onExecuteActionRequested: events.Event<
            (
                options: ExecuteActionRequestedOptions,
                successCallback: () => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;

        /**
         * Raised when a list of actions for a set of files or directories at `entryPaths` is requested. All of the returned actions must be applicable to each entry. If there are no such actions, an empty array should be returned. The actions must be returned with the `successCallback` call. In case of an error, `errorCallback` must be called.
         * @since Chrome 48
         */
        const onGetActionsRequested: events.Event<
            (
                options: GetActionsRequestedOptions,
                successCallback: (
                    actions: Action[],
                ) => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;

        /** Raised when metadata of a file or a directory at `entryPath` is requested. The metadata must be returned with the `successCallback` call. In case of an error, `errorCallback` must be called. */
        const onGetMetadataRequested: events.Event<
            (
                options: GetMetadataRequestedOptions,
                successCallback: (
                    metadata: EntryMetadata,
                ) => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;

        /**
         * Raised when showing a dialog for mounting a new file system is requested. If the extension/app is a file handler, then this event shouldn't be handled. Instead `app.runtime.onLaunched` should be handled in order to mount new file systems when a file is opened. For multiple mounts, the `file_system_provider.multiple_mounts` manifest option must be set to true.
         * @since Chrome 44
         */
        const onMountRequested: events.Event<
            (
                successCallback: () => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;

        /** Raised when moving an entry (recursively if a directory) is requested. If an error occurs, then `errorCallback` must be called. */
        const onMoveEntryRequested: events.Event<
            (
                options: MoveEntryRequestedOptions,
                successCallback: () => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;

        /** Raised when opening a file at `filePath` is requested. If the file does not exist, then the operation must fail. Maximum number of files opened at once can be specified with `MountOptions`. */
        const onOpenFileRequested: events.Event<
            (
                options: OpenFileRequestedOptions,
                successCallback: (
                    /**
                     * @since Chrome 125
                     */
                    metadata?: EntryMetadata,
                ) => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;

        /** Raised when contents of a directory at `directoryPath` are requested. The results must be returned in chunks by calling the `successCallback` several times. In case of an error, `errorCallback` must be called. */
        const onReadDirectoryRequested: events.Event<
            (
                options: ReadDirectoryRequestedOptions,
                successCallback: (
                    entries: EntryMetadata[],
                    hasMore: boolean,
                ) => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;

        /** Raised when reading contents of a file opened previously with `openRequestId` is requested. The results must be returned in chunks by calling `successCallback` several times. In case of an error, `errorCallback` must be called. */
        const onReadFileRequested: events.Event<
            (
                options: ReadFileRequestedOptions,
                successCallback: (
                    data: ArrayBuffer,
                    hasMore: boolean,
                ) => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;

        /**
         * Raised when the watcher should be removed. If an error occurs, then `errorCallback` must be called.
         * @since Chrome 45
         */
        const onRemoveWatcherRequested: events.Event<
            (
                options: RemoveWatcherRequestedOptions,
                successCallback: () => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;

        /** Raised when truncating a file to a desired length is requested. If an error occurs, then `errorCallback` must be called. */
        const onTruncateRequested: events.Event<
            (
                options: TruncateRequestedOptions,
                successCallback: () => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;

        /** Raised when unmounting for the file system with the `fileSystemId` identifier is requested. In the response, the {@link unmount} API method must be called together with `successCallback`. If unmounting is not possible (eg. due to a pending operation), then `errorCallback` must be called. */
        const onUnmountRequested: events.Event<
            (
                options: UnmountRequestedOptions,
                successCallback: () => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;

        /** Raised when writing contents to a file opened previously with `openRequestId` is requested. */
        const onWriteFileRequested: events.Event<
            (
                options: WriteFileRequestedOptions,
                successCallback: () => void,
                errorCallback: (
                    error: `${ProviderError}`,
                ) => void,
            ) => void
        >;
    }
}
