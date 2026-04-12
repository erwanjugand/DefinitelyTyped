declare namespace chrome {
    ////////////////////
    // Bookmarks
    ////////////////////
    /**
     * Use the `chrome.bookmarks` API to create, organize, and otherwise manipulate bookmarks. Also see Override Pages, which you can use to create a custom Bookmark Manager page.
     *
     * Permissions: "bookmarks"
     */
    namespace bookmarks {
        /** A node (either a bookmark or a folder) in the bookmark tree. Child nodes are ordered within their parent folder. */
        interface BookmarkTreeNode {
            /** An ordered list of children of this node. */
            children?: BookmarkTreeNode[];
            /** When this node was created, in milliseconds since the epoch (`new Date(dateAdded)`). */
            dateAdded?: number;
            /** When the contents of this folder last changed, in milliseconds since the epoch. */
            dateGroupModified?: number;
            /**
             * When this node was last opened, in milliseconds since the epoch. Not set for folders.
             * @since Chrome 114
             */
            dateLastUsed?: number;
            /**
             * If present, this is a folder that is added by the browser and that cannot be modified by the user or the extension. Child nodes may be modified, if this node does not have the `unmodifiable` property set. Omitted if the node can be modified by the user and the extension (default).
             *
             * There may be zero, one or multiple nodes of each folder type. A folder may be added or removed by the browser, but not via the extensions API.
             * @since Chrome 134
             */
            folderType?: `${FolderType}`;
            /** The unique identifier for the node. IDs are unique within the current profile, and they remain valid even after the browser is restarted. */
            id: string;
            /** The 0-based position of this node within its parent folder. */
            index?: number;
            /** The `id` of the parent folder. Omitted for the root node. */
            parentId?: string;
            /**
             * Whether this node is synced with the user's remote account storage by the browser. This can be used to distinguish between account and local-only versions of the same {@link FolderType}. The value of this property may change for an existing node, for example as a result of user action.
             *
             * Note: this reflects whether the node is saved to the browser's built-in account provider. It is possible that a node could be synced via a third-party, even if this value is false.
             *
             * For managed nodes (nodes where `unmodifiable` is set to `true`), this property will always be `false`.
             * @since Chrome 134
             */
            syncing: boolean;
            /** The text displayed for the node. */
            title: string;
            /** Indicates the reason why this node is unmodifiable. The `managed` value indicates that this node was configured by the system administrator or by the custodian of a supervised user. Omitted if the node can be modified by the user and the extension (default). */
            unmodifiable?: `${BookmarkTreeNodeUnmodifiable}`;
            /* The URL navigated to when a user clicks the bookmark. Omitted for folders. */
            url?: string;
        }

        /**
         * Indicates the reason why this node is unmodifiable. The `managed` value indicates that this node was configured by the system administrator. Omitted if the node can be modified by the user and the extension (default).
         * @since Chrome 44
         */
        enum BookmarkTreeNodeUnmodifiable {
            MANAGED = "managed",
        }

        /** Object passed to the create() function. */
        interface CreateDetails {
            index?: number;
            /** Defaults to the Other Bookmarks folder. */
            parentId?: string;
            title?: string;
            url?: string;
        }

        /**
         * Indicates the type of folder.
         * @since Chrome 134
         */

        enum FolderType {
            /** The folder whose contents is displayed at the top of the browser window. */
            BOOKMARKS_BAR = "bookmarks-bar",
            /** Bookmarks which are displayed in the full list of bookmarks on all platforms. */
            OTHER = "other",
            /** Bookmarks generally available on the user's mobile devices, but modifiable by extension or in the bookmarks manager. */
            MOBILE = "mobile",
            /** A top-level folder that may be present if the system administrator or the custodian of a supervised user has configured bookmarks. */
            MANAGED = "managed",
        }

        /** @deprecated Bookmark write operations are no longer limited by Chrome. */
        const MAX_WRITE_OPERATIONS_PER_HOUR: 1000000;

        /** @deprecated Bookmark write operations are no longer limited by Chrome. */
        const MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: 1000000;

        /**
         * The `id` associated with the root level node.
         * @since Chrome 145
         */
        const ROOT_NODE_ID = "0";

        /**
         * Creates a bookmark or folder under the specified parentId. If url is NULL or missing, it will be a folder.
         *
         * Can return its result via Promise since Chrome 90.
         */
        function create(bookmark: CreateDetails): Promise<BookmarkTreeNode>;
        function create(bookmark: CreateDetails, callback: (result: BookmarkTreeNode) => void): void;

        /**
         * Retrieves the specified BookmarkTreeNode(s).
         * @param idOrIdList A single string-valued id, or an array of string-valued ids
         *
         * Can return its result via Promise since Chrome 90.
         */
        function get(idOrIdList: string | [string, ...string[]]): Promise<BookmarkTreeNode[]>;
        function get(
            idOrIdList: string | [string, ...string[]],
            callback: (results: BookmarkTreeNode[]) => void,
        ): void;

        /**
         * Retrieves the children of the specified BookmarkTreeNode id.
         *
         * Can return its result via Promise since Chrome Chrome 90
         */
        function getChildren(id: string): Promise<BookmarkTreeNode[]>;
        function getChildren(id: string, callback: (results: BookmarkTreeNode[]) => void): void;

        /**
         * Retrieves the recently added bookmarks.
         * @param numberOfItems The maximum number of items to return.
         *
         * Can return its result via Promise since Chrome Chrome 90
         */
        function getRecent(numberOfItems: number): Promise<BookmarkTreeNode[]>;
        function getRecent(numberOfItems: number, callback: (results: BookmarkTreeNode[]) => void): void;

        /**
         * Retrieves part of the Bookmarks hierarchy, starting at the specified node.
         * @param id The ID of the root of the subtree to retrieve.
         *
         * Can return its result via Promise since Chrome Chrome 90
         */
        function getSubTree(id: string): Promise<BookmarkTreeNode[]>;
        function getSubTree(id: string, callback: (results: BookmarkTreeNode[]) => void): void;

        /**
         * Retrieves the entire Bookmarks hierarchy.
         *
         * Can return its result via Promise since Chrome Chrome 90
         */
        function getTree(): Promise<BookmarkTreeNode[]>;
        function getTree(callback: (results: BookmarkTreeNode[]) => void): void;

        interface MoveDestination {
            parentId?: string;
            index?: number;
        }

        /**
         * Moves the specified BookmarkTreeNode to the provided location.
         *
         * Can return its result via Promise since Chrome Chrome 90
         */
        function move(id: string, destination: MoveDestination): Promise<BookmarkTreeNode>;
        function move(
            id: string,
            destination: MoveDestination,
            callback: (result: BookmarkTreeNode) => void,
        ): void;

        /**
         * Removes a bookmark or an empty bookmark folder.
         *
         * Can return its result via Promise since Chrome Chrome 90
         */
        function remove(id: string): Promise<void>;
        function remove(id: string, callback: () => void): void;

        /**
         * Recursively removes a bookmark folder.
         *
         * Can return its result via Promise since Chrome Chrome 90
         */
        function removeTree(id: string): Promise<void>;
        function removeTree(id: string, callback: () => void): void;

        interface SearchQuery {
            /** A string of words and quoted phrases that are matched against bookmark URLs and titles.*/
            query?: string;
            /** The URL of the bookmark; matches verbatim. Note that folders have no URL. */
            url?: string;
            /** The title of the bookmark; matches verbatim. */
            title?: string;
        }

        /**
         * Searches for BookmarkTreeNodes matching the given query. Queries specified with an object produce BookmarkTreeNodes matching all specified properties.
         * @param query Either a string of words and quoted phrases that are matched against bookmark URLs and titles, or an object. If an object, the properties `query`, `url`, and `title` may be specified and bookmarks matching all specified properties will be produced.
         *
         * Can return its result via Promise since Chrome Chrome 90
         */
        function search(query: string | SearchQuery): Promise<BookmarkTreeNode[]>;
        function search(query: string | SearchQuery, callback: (results: BookmarkTreeNode[]) => void): void;

        interface UpdateChanges {
            title?: string;
            url?: string;
        }

        /**
         * Updates the properties of a bookmark or folder. Specify only the properties that you want to change; unspecified properties will be left unchanged. **Note:** Currently, only 'title' and 'url' are supported.
         *
         * Can return its result via Promise since Chrome Chrome 90
         */
        function update(id: string, changes: UpdateChanges): Promise<BookmarkTreeNode>;
        function update(id: string, changes: UpdateChanges, callback: (result: BookmarkTreeNode) => void): void;

        /** Fired when a bookmark or folder changes. **Note:** Currently, only title and url changes trigger this.*/
        const onChanged: events.Event<(id: string, changeInfo: { title: string; url?: string }) => void>;

        /** Fired when the children of a folder have changed their order due to the order being sorted in the UI. This is not called as a result of a move(). */
        const onChildrenReordered: events.Event<(id: string, reorderInfo: { childIds: string[] }) => void>;

        /** Fired when a bookmark or folder is created. */
        const onCreated: events.Event<(id: string, bookmark: BookmarkTreeNode) => void>;

        /** Fired when a bookmark import session is begun. Expensive observers should ignore onCreated updates until onImportEnded is fired. Observers should still handle other notifications immediately. */
        const onImportBegan: events.Event<() => void>;

        /** Fired when a bookmark import session is ended.  */
        const onImportEnded: events.Event<() => void>;

        /** Fired when a bookmark or folder is moved to a different parent folder. */
        const onMoved: events.Event<
            (
                id: string,
                moveInfo: {
                    parentId: string;
                    index: number;
                    oldParentId: string;
                    oldIndex: number;
                },
            ) => void
        >;

        /** Fired when a bookmark or folder is removed. When a folder is removed recursively, a single notification is fired for the folder, and none for its contents. */
        const onRemoved: events.Event<
            (
                id: string,
                removeInfo: {
                    parentId: string;
                    index: number;
                    /** @since Chrome 48 */
                    node: BookmarkTreeNode;
                },
            ) => void
        >;
    }
}
