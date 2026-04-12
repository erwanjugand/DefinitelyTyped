declare namespace chrome {
    ////////////////////
    // Enterprise Networking Attributes
    ////////////////////
    /**
     * Use the `chrome.enterprise.networkingAttributes` API to read information about your current network. Note: This API is only available to extensions force-installed by enterprise policy.
     *
     * Permissions: "enterprise.networkingAttributes"
     *
     * Note: Only available to policy installed extensions.
     * @platform ChromeOS only
     * @since Chrome 85
     */
    namespace enterprise.networkingAttributes {
        interface NetworkDetails {
            /** The device's MAC address. */
            macAddress: string;
            /** Optional. The device's local IPv4 address (undefined if not configured). */
            ipv4?: string | undefined;
            /** Optional. The device's local IPv6 address (undefined if not configured). */
            ipv6?: string | undefined;
        }

        /**
         * Retrieves the network details of the device's default network. If the user is not affiliated or the device is not connected to a network, {@link runtime.lastError} will be set with a failure reason.
         * @param callback Called with the device's default network's NetworkDetails.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getNetworkDetails(): Promise<NetworkDetails>;
        function getNetworkDetails(callback: (networkDetails: NetworkDetails) => void): void;
    }
}
