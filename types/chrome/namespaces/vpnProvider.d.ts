declare namespace chrome {
    ////////////////////
    // VPN Provider
    ////////////////////
    /**
     * Use the `chrome.vpnProvider` API to implement a VPN client.
     *
     * Permissions: "vpnProvider"
     * @platform ChromeOS only
     * @since Chrome 43
     */
    namespace vpnProvider {
        interface Parameters {
            /** IP address for the VPN interface in CIDR notation. IPv4 is currently the only supported mode. */
            address: string;
            /** Broadcast address for the VPN interface. (default: deduced from IP address and mask) */
            broadcastAddress?: string | undefined;
            /** MTU setting for the VPN interface. (default: 1500 bytes) */
            mtu?: string | undefined;
            /** Exclude network traffic to the list of IP blocks in CIDR notation from the tunnel. This can be used to bypass traffic to and from the VPN server. When many rules match a destination, the rule with the longest matching prefix wins. Entries that correspond to the same CIDR block are treated as duplicates. Such duplicates in the collated (exclusionList + inclusionList) list are eliminated and the exact duplicate entry that will be eliminated is undefined. */
            exclusionList: string[];
            /** Include network traffic to the list of IP blocks in CIDR notation to the tunnel. This parameter can be used to set up a split tunnel. By default no traffic is directed to the tunnel. Adding the entry "0.0.0.0/0" to this list gets all the user traffic redirected to the tunnel. When many rules match a destination, the rule with the longest matching prefix wins. Entries that correspond to the same CIDR block are treated as duplicates. Such duplicates in the collated (exclusionList + inclusionList) list are eliminated and the exact duplicate entry that will be eliminated is undefined. */
            inclusionList: string[];
            /** A list of search domains. (default: no search domain) */
            domainSearch?: string[] | undefined;
            /** A list of IPs for the DNS servers. */
            dnsServers: string[];
            /**
             * Whether or not the VPN extension implements auto-reconnection.
             *
             * If true, the `linkDown`, `linkUp`, `linkChanged`, `suspend`, and `resume` platform messages will be used to signal the respective events. If false, the system will forcibly disconnect the VPN if the network topology changes, and the user will need to reconnect manually. (default: false)
             *
             * This property is new in Chrome 51; it will generate an exception in earlier versions. try/catch can be used to conditionally enable the feature based on browser support.
             * @since Chrome 51
             */
            reconnect?: string | undefined;
        }

        /** @deprecated Use {@link Parameters} instead */
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface VpnSessionParameters extends Parameters {}

        /** The enum is used by the platform to notify the client of the VPN session status. */
        enum PlatformMessage {
            /** Indicates that the VPN configuration connected. */
            CONNECTED = "connected",
            /** Indicates that the VPN configuration disconnected. */
            DISCONNECTED = "disconnected",
            /** Indicates that an error occurred in VPN connection, for example a timeout. A description of the error is given as the error argument to onPlatformMessage. */
            ERROR = "error",
            /** Indicates that the default physical network connection is down. */
            LINK_DOWN = "linkDown",
            /** Indicates that the default physical network connection is back up. */
            LINK_UP = "linkUp",
            /** Indicates that the default physical network connection changed, e.g. wifi->mobile. */
            LINK_CHANGED = "linkChanged",
            /** Indicates that the OS is preparing to suspend, so the VPN should drop its connection. The extension is not guaranteed to receive this event prior to suspending. */
            SUSPEND = "suspend",
            /** Indicates that the OS has resumed and the user has logged back in, so the VPN should try to reconnect. */
            RESUME = "resume",
        }

        /** The enum is used by the platform to indicate the event that triggered {@link onUIEvent}. */
        enum UIEvent {
            /** Requests that the VPN client show the add configuration dialog box to the user. */
            SHOW_ADD_DIALOG = "showAddDialog",
            /** Requests that the VPN client show the configuration settings dialog box to the user. */
            SHOW_CONFIGURE_DIALOG = "showConfigureDialog",
        }

        /** The enum is used by the VPN client to inform the platform of its current state. This helps provide meaningful messages to the user. */
        enum VpnConnectionState {
            /** Specifies that VPN connection was successful. */
            CONNECTED = "connected",
            /** Specifies that VPN connection has failed. */
            FAILURE = "failure",
        }

        /**
         * Creates a new VPN configuration that persists across multiple login sessions of the user.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         * @param name The name of the VPN configuration.
         */
        function createConfig(name: string): Promise<string>;
        function createConfig(name: string, callback: (id: string) => void): void;

        /**
         * Destroys a VPN configuration created by the extension.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         * @param id ID of the VPN configuration to destroy.
         */
        function destroyConfig(id: string): Promise<void>;
        function destroyConfig(id: string, callback: () => void): void;

        /**
         * Sets the parameters for the VPN session. This should be called immediately after `"connected"` is received from the platform. This will succeed only when the VPN session is owned by the extension.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         * @param parameters The parameters for the VPN session.
         */
        function setParameters(parameters: Parameters): Promise<void>;
        function setParameters(parameters: Parameters, callback: () => void): void;

        /**
         * Sends an IP packet through the tunnel created for the VPN session. This will succeed only when the VPN session is owned by the extension.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         * @param data The IP packet to be sent to the platform.
         */
        function sendPacket(data: ArrayBuffer): Promise<void>;
        function sendPacket(data: ArrayBuffer, callback: () => void): void;

        /**
         * Notifies the VPN session state to the platform. This will succeed only when the VPN session is owned by the extension.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         * @param state The VPN session state of the VPN client.
         */
        function notifyConnectionStateChanged(state: `${VpnConnectionState}`): Promise<void>;
        function notifyConnectionStateChanged(state: `${VpnConnectionState}`, callback: () => void): void;

        /** Triggered when a message is received from the platform for a VPN configuration owned by the extension. */
        const onPlatformMessage: events.Event<
            (id: string, message: `${PlatformMessage}`, error: string) => void
        >;

        /** Triggered when an IP packet is received via the tunnel for the VPN session owned by the extension. */
        const onPacketReceived: events.Event<(data: ArrayBuffer) => void>;

        /** Triggered when a configuration created by the extension is removed by the platform. */
        const onConfigRemoved: events.Event<(id: string) => void>;

        // /** Triggered when a configuration is created by the platform for the extension. */
        const onConfigCreated: events.Event<
            (id: string, name: string, data: { [key: string]: unknown }) => void
        >;

        /** Triggered when there is a UI event for the extension. UI events are signals from the platform that indicate to the app that a UI dialog needs to be shown to the user. */
        const onUIEvent: events.Event<(event: `${UIEvent}`, id?: string) => void>;
    }
}
