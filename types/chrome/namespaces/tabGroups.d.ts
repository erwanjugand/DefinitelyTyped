declare namespace chrome {
    ////////////////////
    // Tab Groups
    ////////////////////
    /**
     * Use the `chrome.tabGroups` API to interact with the browser's tab grouping system. You can use this API to modify and rearrange tab groups in the browser. To group and ungroup tabs, or to query what tabs are in groups, use the `chrome.tabs` API.
     *
     * Permissions: "tabGroups"
     * @since Chrome 89, MV3
     */
    namespace tabGroups {
        /** An ID that represents the absence of a group. */
        const TAB_GROUP_ID_NONE: -1;

        /** The group's color. */
        enum Color {
            BLUE = "blue",
            CYAN = "cyan",
            GREEN = "green",
            GREY = "grey",
            ORANGE = "orange",
            PINK = "pink",
            PURPLE = "purple",
            RED = "red",
            YELLOW = "yellow",
        }

        interface TabGroup {
            /** Whether the group is collapsed. A collapsed group is one whose tabs are hidden. */
            collapsed: boolean;
            /** The group's color. */
            color: `${Color}`;
            /** The ID of the group. Group IDs are unique within a browser session. */
            id: number;
            /**
             * Whether the group is shared.
             * @since Chrome 137
             */
            shared: boolean;
            /** The title of the group. */
            title?: string;
            /** The ID of the window that contains the group. */
            windowId: number;
        }

        interface MoveProperties {
            /** The position to move the group to. Use `-1` to place the group at the end of the window. */
            index: number;
            /** The window to move the group to. Defaults to the window the group is currently in. Note that groups can only be moved to and from windows with {@link windows.windowTypeEnum windows.windowType} type `"normal"`. */
            windowId?: number;
        }

        interface QueryInfo {
            /** Whether the groups are collapsed. */
            collapsed?: boolean | undefined;
            /** The color of the groups. */
            color?: `${Color}` | undefined;
            /**
             * Whether the group is shared.
             * @since Chrome 137
             */
            shared?: boolean | undefined;
            /** Match group titles against a pattern. */
            title?: string | undefined;
            /** The ID of the parent window, or {@link windows.WINDOW_ID_CURRENT} for the current window. */
            windowId?: number | undefined;
        }

        interface UpdateProperties {
            /** Whether the group should be collapsed. */
            collapsed?: boolean;
            /** The color of the group. */
            color?: `${Color}`;
            /** The title of the group. */
            title?: string;
        }

        /**
         * Retrieves details about the specified group.
         *
         * Can return its result via Promise since Chrome 90.
         */
        function get(groupId: number): Promise<TabGroup>;
        function get(groupId: number, callback: (group: TabGroup) => void): void;

        /**
         * Moves the group and all its tabs within its window, or to a new window.
         * @param groupId The ID of the group to move.
         *
         * Can return its result via Promise since Chrome 90.
         */
        function move(groupId: number, moveProperties: MoveProperties): Promise<TabGroup | undefined>;
        function move(
            groupId: number,
            moveProperties: MoveProperties,
            callback: (group?: TabGroup) => void,
        ): void;

        /**
         * Gets all groups that have the specified properties, or all groups if no properties are specified.
         *
         * Can return its result via Promise since Chrome 90.
         */
        function query(queryInfo: QueryInfo): Promise<TabGroup[]>;
        function query(queryInfo: QueryInfo, callback: (result: TabGroup[]) => void): void;

        /**
         * Modifies the properties of a group. Properties that are not specified in `updateProperties` are not modified.
         * @param groupId The ID of the group to modify.
         *
         * Can return its result via Promise since Chrome 90.
         */
        function update(groupId: number, updateProperties: UpdateProperties): Promise<TabGroup | undefined>;
        function update(
            groupId: number,
            updateProperties: UpdateProperties,
            callback: (group?: TabGroup) => void,
        ): void;

        /** Fired when a group is created. */
        const onCreated: events.Event<(group: TabGroup) => void>;
        /** Fired when a group is moved within a window. Move events are still fired for the individual tabs within the group, as well as for the group itself. This event is not fired when a group is moved between windows; instead, it will be removed from one window and created in another. */
        const onMoved: events.Event<(group: TabGroup) => void>;
        /** Fired when a group is closed, either directly by the user or automatically because it contained zero tabs. */
        const onRemoved: events.Event<(group: TabGroup) => void>;
        /** Fired when a group is updated. */
        const onUpdated: events.Event<(group: TabGroup) => void>;
    }
}
