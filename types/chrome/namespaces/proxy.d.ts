declare namespace chrome {
    ////////////////////
    // Proxy
    ////////////////////
    /**
     * Use the `chrome.proxy` API to manage Chrome's proxy settings. This API relies on the ChromeSetting prototype of the type API for getting and setting the proxy configuration.
     *
     * Permissions: "proxy"
     */
    namespace proxy {
        /** @since Chrome 54 */
        enum Mode {
            /** Never use a proxy */
            DIRECT = "direct",
            /** Auto detect proxy settings */
            AUTO_DETECT = "auto_detect",
            /** Use specified PAC script */
            PAC_SCRIPT = "pac_script",
            /** Manually specify proxy servers */
            FIXED_SERVERS = "fixed_servers",
            /** Use system proxy settings */
            SYSTEM = "system",
        }

        /** An object holding proxy auto-config information. Exactly one of the fields should be non-empty. */
        interface PacScript {
            /** URL of the PAC file to be used. */
            url?: string | undefined;
            /** If true, an invalid PAC script will prevent the network stack from falling back to direct connections. Defaults to false. */
            mandatory?: boolean | undefined;
            /** A PAC script. */
            data?: string | undefined;
        }

        /** An object encapsulating a complete proxy configuration. */
        interface ProxyConfig {
            /** The proxy rules describing this configuration. Use this for 'fixed_servers' mode. */
            rules?: ProxyRules | undefined;
            /** The proxy auto-config (PAC) script for this configuration. Use this for 'pac_script' mode. */
            pacScript?: PacScript | undefined;
            mode: `${Mode}`;
        }

        /** An object encapsulating a single proxy server's specification. */
        interface ProxyServer {
            /** The hostname or IP address of the proxy server. Hostnames must be in ASCII (in Punycode format). IDNA is not supported, yet. */
            host: string;
            /** The scheme (protocol) of the proxy server itself. Defaults to 'http'. */
            scheme?: `${Scheme}` | undefined;
            /** The port of the proxy server. Defaults to a port that depends on the scheme. */
            port?: number | undefined;
        }

        /** An object encapsulating the set of proxy rules for all protocols. Use either 'singleProxy' or (a subset of) 'proxyForHttp', 'proxyForHttps', 'proxyForFtp' and 'fallbackProxy'. */
        interface ProxyRules {
            /** The proxy server to be used for FTP requests. */
            proxyForFtp?: ProxyServer | undefined;
            /** The proxy server to be used for HTTP requests. */
            proxyForHttp?: ProxyServer | undefined;
            /** The proxy server to be used for everything else or if any of the specific proxyFor... is not specified. */
            fallbackProxy?: ProxyServer | undefined;
            /** The proxy server to be used for all per-URL requests (that is http, https, and ftp). */
            singleProxy?: ProxyServer | undefined;
            /** The proxy server to be used for HTTPS requests. */
            proxyForHttps?: ProxyServer | undefined;
            /** List of servers to connect to without a proxy server. */
            bypassList?: string[] | undefined;
        }

        /** @since Chrome 54 */
        enum Scheme {
            HTTP = "http",
            HTTPS = "https",
            QUIC = "quic",
            SOCKS4 = "socks4",
            SOCKS5 = "socks5",
        }

        interface ErrorDetails {
            /** Additional details about the error such as a JavaScript runtime error. */
            details: string;
            /** The error description. */
            error: string;
            /** If true, the error was fatal and the network transaction was aborted. Otherwise, a direct connection is used instead. */
            fatal: boolean;
        }

        /** Proxy settings to be used. The value of this setting is a ProxyConfig object. */
        const settings: types.ChromeSetting<ProxyConfig>;

        /** Notifies about proxy errors. */
        const onProxyError: events.Event<(details: ErrorDetails) => void>;
    }
}
