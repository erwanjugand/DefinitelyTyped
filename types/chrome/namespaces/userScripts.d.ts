declare namespace chrome {
    ////////////////////
    // User Scripts
    ////////////////////
    /**
     * Use the `userScripts` API to execute user scripts in the User Scripts context.
     *
     * Permissions: "userScripts"
     * @since Chrome 120, MV3
     */
    namespace userScripts {
        /** The JavaScript world for a user script to execute within. */
        enum ExecutionWorld {
            /** Specifies the execution environment of the DOM, which is the execution environment shared with the host page's JavaScript. */
            MAIN = "MAIN",
            /** Specifies the execution environment that is specific to user scripts and is exempt from the page's CSP. */
            USER_SCRIPT = "USER_SCRIPT",
        }

        /** @since Chrome 135 */
        type InjectionResult<T = unknown> =
            & {
                /** The document associated with the injection. */
                documentId: string;
                /** The frame associated with the injection. */
                frameId: number;
            }
            & (
                | {
                    /** The error, if any */
                    error?: never;
                    /** The result of the script execution. */
                    result: T;
                }
                | {
                    /** The error, if any */
                    error: string;
                    /** The result of the script execution. */
                    result?: never;
                }
            );

        interface WorldProperties {
            /** Specifies the world csp. The default is the `ISOLATED` world csp. */
            csp?: string | undefined;
            /** Specifies whether messaging APIs are exposed. The default is `false`.*/
            messaging?: boolean | undefined;
            /**
             * Specifies the ID of the specific user script world to update. If not provided, updates the properties of the default user script world. Values with leading underscores (`_`) are reserved.
             * @since Chrome 133
             */
            worldId?: string | undefined;
        }

        interface UserScriptFilter {
            /** {@link getScripts} only returns scripts with the IDs specified in this list. */
            ids?: string[] | undefined;
        }

        // /** @since Chrome 135 */
        type InjectionTarget =
            & {
                /** The ID of the tab into which to inject. */
                tabId: number;
            }
            & (
                | {
                    /** Whether the script should inject into all frames within the tab. Defaults to false. */
                    allFrames?: boolean | undefined;
                    /** The IDs of specific documentIds to inject into. */
                    documentIds?: never;
                    /** The IDs of specific frames to inject into. */
                    frameIds?: never;
                }
                | {
                    /** Whether the script should inject into all frames within the tab. Defaults to false. */
                    allFrames?: false | undefined;
                    /** The IDs of specific documentIds to inject into. */
                    documentIds?: never;
                    /** The IDs of specific frames to inject into. */
                    frameIds: number[] | undefined;
                }
                | {
                    /** Whether the script should inject into all frames within the tab. Defaults to false. */
                    allFrames?: false | undefined;
                    /** The IDs of specific documentIds to inject into. */
                    documentIds?: string[] | undefined;
                    /** The IDs of specific frames to inject into. */
                    frameIds?: never;
                }
            );

        interface RegisteredUserScript {
            /** If true, it will inject into all frames, even if the frame is not the top-most frame in the tab. Each frame is checked independently for URL requirements; it will not inject into child frames if the URL requirements are not met. Defaults to false, meaning that only the top frame is matched. */
            allFrames?: boolean | undefined;
            /** Specifies wildcard patterns for pages this user script will NOT be injected into. */
            excludeGlobs?: string[] | undefined;
            /**Excludes pages that this user script would otherwise be injected into. See Match Patterns for more details on the syntax of these strings. */
            excludeMatches?: string[] | undefined;
            /** The ID of the user script specified in the API call. This property must not start with a '_' as it's reserved as a prefix for generated script IDs. */
            id: string;
            /** Specifies wildcard patterns for pages this user script will be injected into. */
            includeGlobs?: string[] | undefined;
            /** The list of ScriptSource objects defining sources of scripts to be injected into matching pages. This property must be specified for {@link register}, and when specified it must be a non-empty array.*/
            js?: ScriptSource[] | undefined;
            /** Specifies which pages this user script will be injected into. See Match Patterns for more details on the syntax of these strings. This property must be specified for {@link register}. */
            matches?: string[] | undefined;
            /** Specifies when JavaScript files are injected into the web page. The preferred and default value is `document_idle` */
            runAt?: extensionTypes.RunAt | undefined;
            /** The JavaScript execution environment to run the script in. The default is `USER_SCRIPT` */
            world?: `${ExecutionWorld}` | undefined;
            /**
             * Specifies the user script world ID to execute in. If omitted, the script will execute in the default user script world. Only valid if `world` is omitted or is `USER_SCRIPT`. Values with leading underscores (`_`) are reserved.
             * @since Chrome 133
             */
            worldId?: string | undefined;
        }

        /** @since Chrome 135 */
        interface UserScriptInjection {
            /** Whether the injection should be triggered in the target as soon as possible. Note that this is not a guarantee that injection will occur prior to page load, as the page may have already loaded by the time the script reaches the target. */
            injectImmediately?: boolean | undefined;
            /** The list of ScriptSource objects defining sources of scripts to be injected into the target. */
            js: [ScriptSource, ...ScriptSource[]];
            /** Details specifying the target into which to inject the script. */
            target: InjectionTarget;
            /** The JavaScript "world" to run the script in. The default is `USER_SCRIPT`. */
            world?: `${ExecutionWorld}` | undefined;
            /** Specifies the user script world ID to execute in. If omitted, the script will execute in the default user script world. Only valid if `world` is omitted or is `USER_SCRIPT`. Values with leading underscores (`_`) are reserved. */
            worldId?: string | undefined;
        }

        type ScriptSource = {
            /** A string containing the JavaScript code to inject. */
            code: string;
            /** The path of the JavaScript file to inject relative to the extension's root directory. */
            file?: undefined;
        } | {
            /** A string containing the JavaScript code to inject. */
            code?: undefined;
            /** The path of the JavaScript file to inject relative to the extension's root directory. */
            file: string;
        };

        /**
         * Configures the `USER_SCRIPT` execution environment.
         *
         * Can return its result via Promise.
         * @param properties Contains the user script world configuration.
         */
        function configureWorld(properties: WorldProperties): Promise<void>;
        function configureWorld(properties: WorldProperties, callback: () => void): void;

        /**
         * Returns all dynamically-registered user scripts for this extension.
         *
         * Can return its result via Promise.
         * @param filter If specified, this method returns only the user scripts that match it.
         */
        function getScripts(filter?: UserScriptFilter): Promise<RegisteredUserScript[]>;
        function getScripts(callback: (scripts: RegisteredUserScript[]) => void): void;
        function getScripts(
            filter: UserScriptFilter | undefined,
            callback: (scripts: RegisteredUserScript[]) => void,
        ): void;

        /**
         * Retrieves all registered world configurations.
         *
         * Can return its result via Promise.
         * @since Chrome 133
         */
        function getWorldConfigurations(): Promise<WorldProperties[]>;
        function getWorldConfigurations(callback: (worlds: WorldProperties[]) => void): void;

        /**
         * Injects a script into a target context. By default, the script will be run at `document_idle`, or immediately if the page has already loaded. If the `injectImmediately` property is set, the script will inject without waiting, even if the page has not finished loading. If the script evaluates to a promise, the browser will wait for the promise to settle and return the resulting value.
         *
         * Can return its result via Promise.
         * @since Chrome 135
         */
        function execute<T>(injection: UserScriptInjection): Promise<InjectionResult<T>[]>;
        function execute<T>(
            injection: UserScriptInjection,
            callback: (result: InjectionResult<T>[]) => void,
        ): void;

        /**
         * Registers one or more user scripts for this extension.
         *
         * Can return its result via Promise.
         * @param scripts - Contains a list of user scripts to be registered.
         */
        function register(scripts: RegisteredUserScript[]): Promise<void>;
        function register(scripts: RegisteredUserScript[], callback: () => void): void;

        /**
         * Resets the configuration for a user script world. Any scripts that inject into the world with the specified ID will use the default world configuration.
         * @param worldId The ID of the user script world to reset. If omitted, resets the default world's configuration.
         */
        function resetWorldConfiguration(worldId?: string): Promise<void>;
        function resetWorldConfiguration(callback: () => void): void;
        function resetWorldConfiguration(worldId: string | undefined, callback: () => void): void;

        /**
         * Unregisters all dynamically-registered user scripts for this extension.
         *
         * Can return its result via Promise.
         * @param filter If specified, this method unregisters only the user scripts that match it.
         */
        function unregister(filter?: UserScriptFilter): Promise<void>;
        function unregister(callback: () => void): void;
        function unregister(filter: UserScriptFilter | undefined, callback: () => void): void;

        /**
         * Updates one or more user scripts for this extension.
         *
         * Can return its result via Promise.
         * @param scripts Contains a list of user scripts to be updated. A property is only updated for the existing script if it is specified in this object. If there are errors during script parsing/file validation, or if the IDs specified do not correspond to a fully registered script, then no scripts are updated.
         */
        function update(scripts: RegisteredUserScript[]): Promise<void>;
        function update(scripts: RegisteredUserScript[], callback: () => void): void;
    }
}
