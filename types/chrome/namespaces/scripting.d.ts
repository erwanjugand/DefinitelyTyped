declare namespace chrome {
    ////////////////////
    // Scripting
    ////////////////////
    /**
     * Use the `chrome.scripting` API to execute script in different contexts.
     *
     * Permissions: "scripting"
     * @since Chrome 88, MV3
     */
    namespace scripting {
        /** The origin for a style change. See style origins for more info. */
        enum StyleOrigin {
            AUTHOR = "AUTHOR",
            USER = "USER",
        }

        /**
         * The JavaScript world for a script to execute within.
         * @since Chrome 95
         */
        enum ExecutionWorld {
            /** Specifies the isolated world, which is the execution environment unique to this extension. */
            ISOLATED = "ISOLATED",
            /** Specifies the main world of the DOM, which is the execution environment shared with the host page's JavaScript. */
            MAIN = "MAIN",
        }

        interface InjectionResult<T extends any = any> {
            /**
             * The document associated with the injection.
             * @since Chrome 106
             */
            documentId: string;
            /**
             * The frame associated with the injection.
             * @since Chrome 90
             */
            frameId: number;
            /** The result of the script execution. */
            result?: T;
        }

        type InjectionTarget =
            & {
                /** The ID of the tab into which to inject. */
                tabId: number;
            }
            & (
                | {
                    /** Whether the script should inject into all frames within the tab. Defaults to false. This must not be true if `frameIds` or `documentIds` is specified. */
                    allFrames?: boolean | undefined;
                    /**
                     * The IDs of specific documentIds to inject into. This must not be set if `frameIds` is set.
                     * @since Chrome 106
                     */
                    documentIds?: never | undefined;
                    /** The IDs of specific frames to inject into. */
                    frameIds?: never | undefined;
                }
                | {
                    /** Whether the script should inject into all frames within the tab. Defaults to false. This must not be true if `frameIds` or `documentIds` is specified. */
                    allFrames?: false | undefined;
                    /**
                     * The IDs of specific documentIds to inject into. This must not be set if `frameIds` is set.
                     * @since Chrome 106
                     */
                    documentIds?: never | undefined;
                    /** The IDs of specific frames to inject into. */
                    frameIds: number[] | undefined;
                }
                | {
                    /** Whether the script should inject into all frames within the tab. Defaults to false. This must not be true if `frameIds` or `documentIds` is specified. */
                    allFrames?: false | undefined;
                    /**
                     * The IDs of specific documentIds to inject into. This must not be set if `frameIds` is set.
                     * @since Chrome 106
                     */
                    documentIds?: string[] | undefined;
                    /** The IDs of specific frames to inject into. */
                    frameIds?: never | undefined;
                }
            );

        type CSSInjection =
            & {
                /** The style origin for the injection. Defaults to `'AUTHOR'`. */
                origin?: `${StyleOrigin}` | undefined;
                /** Details specifying the target into which to insert the CSS. */
                target: InjectionTarget;
            }
            & (
                | {
                    /** A string containing the CSS to inject. Exactly one of `files` and `css` must be specified. */
                    css: string;
                    /** The path of the CSS files to inject, relative to the extension's root directory. Exactly one of `files` and `css` must be specified. */
                    files?: never | undefined;
                }
                | {
                    /** A string containing the CSS to inject. Exactly one of `files` and `css` must be specified. */
                    css?: never | undefined;
                    /** The path of the CSS files to inject, relative to the extension's root directory. Exactly one of `files` and `css` must be specified. */
                    files: string[];
                }
            );

        type ScriptInjection<Args extends any[], Result> =
            & {
                /** Details specifying the target into which to inject the script. */
                target: InjectionTarget;
                /** The JavaScript "world" to run the script in. Defaults to `ISOLATED`. */
                world?: `${ExecutionWorld}`;
                /**
                 * Whether the injection should be triggered in the target as soon as possible. Note that this is not a guarantee that injection will occur prior to page load, as the page may have already loaded by the time the script reaches the target.
                 * @since Chrome 102
                 */
                injectImmediately?: boolean;
            }
            & (
                | {
                    /** A JavaScript function to inject. This function will be serialized, and then deserialized for injection. This means that any bound parameters and execution context will be lost. Exactly one of `files` or `func` must be specified. */
                    func?: never | undefined;
                    /** The path of the JS or CSS files to inject, relative to the extension's root directory. Exactly one of files or func must be specified. */
                    files: string[];
                }
                | ({
                    /** A JavaScript function to inject. This function will be serialized, and then deserialized for injection. This means that any bound parameters and execution context will be lost. Exactly one of `files` or `func` must be specified. */
                    func: () => Result;
                    /** The path of the JS or CSS files to inject, relative to the extension's root directory. Exactly one of files or func must be specified. */
                    files?: never | undefined;
                } | {
                    /** The arguments to pass to the provided function. This is only valid if the `func` parameter is specified. These arguments must be JSON-serializable. */
                    args: Args;
                    /** A JavaScript function to inject. This function will be serialized, and then deserialized for injection. This means that any bound parameters and execution context will be lost. Exactly one of `files` or `func` must be specified. */
                    func: (...args: Args) => Result;
                    /** The path of the JS or CSS files to inject, relative to the extension's root directory. Exactly one of files or func must be specified. */
                    files?: never | undefined;
                })
            );

        type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

        /** @since Chrome 96 */
        type RegisteredContentScript =
            & {
                /** The id of the content script, specified in the API call. Must not start with a '_' as it's reserved as a prefix for generated script IDs. */
                id: string;
                /** If specified true, it will inject into all frames, even if the frame is not the top-most frame in the tab. Each frame is checked independently for URL requirements; it will not inject into child frames if the URL requirements are not met. Defaults to false, meaning that only the top frame is matched. */
                allFrames?: boolean | undefined;
                /** Excludes pages that this content script would otherwise be injected into. See Match Patterns for more details on the syntax of these strings. */
                excludeMatches?: string[] | undefined;
                /**
                 * Indicates whether the script can be injected into frames where the URL contains an unsupported scheme; specifically: about:, data:, blob:, or filesystem:. In these cases, the URL's origin is checked to determine if the script should be injected. If the origin is `null` (as is the case for data: URLs) then the used origin is either the frame that created the current frame or the frame that initiated the navigation to this frame. Note that this may not be the parent frame.
                 * @since Chrome 119
                 */
                matchOriginAsFallback?: boolean | undefined;
                /** Specifies which pages this content script will be injected into. See Match Patterns for more details on the syntax of these strings. Must be specified for {@link registerContentScripts}. */
                matches?: string[] | undefined;
                /** Specifies if this content script will persist into future sessions. The default is true. */
                persistAcrossSessions?: boolean | undefined;
                /** Specifies when JavaScript files are injected into the web page. The preferred and default value is `document_idle`. */
                runAt?: extensionTypes.RunAt | undefined;
                /** The JavaScript "world" to run the script in. Defaults to `ISOLATED`. */
                world?: `${ExecutionWorld}` | undefined;
            }
            & (
                | {
                    /** The list of JavaScript files to be injected into matching pages. These are injected in the order they appear in this array. */
                    js: string[];
                    /** The list of CSS files to be injected into matching pages. These are injected in the order they appear in this array, before any DOM is constructed or displayed for the page. */
                    css?: string[] | undefined;
                }
                | {
                    /** The list of JavaScript files to be injected into matching pages. These are injected in the order they appear in this array. */
                    js?: string[] | undefined;
                    /** The list of CSS files to be injected into matching pages. These are injected in the order they appear in this array, before any DOM is constructed or displayed for the page. */
                    css: string[];
                }
            );

        /** @since Chrome 96 */
        interface ContentScriptFilter {
            /** If specified, {@link getRegisteredContentScripts} will only return scripts with an id specified in this list. */
            ids?: string[] | undefined;
        }

        /**
         * Injects a script into a target context. By default, the script will be run at `document_idle`, or immediately if the page has already loaded. If the `injectImmediately` property is set, the script will inject without waiting, even if the page has not finished loading. If the script evaluates to a promise, the browser will wait for the promise to settle and return the resulting value.
         *
         * Can return its result via Promise since Chrome 90.
         * @param injection The details of the script which to inject.
         */
        function executeScript<Args extends any[], Result>(
            injection: ScriptInjection<Args, Result>,
        ): Promise<Array<InjectionResult<Awaited<Result>>>>;
        function executeScript<Args extends any[], Result>(
            injection: ScriptInjection<Args, Result>,
            callback: (results: Array<InjectionResult<Awaited<Result>>>) => void,
        ): void;

        /**
         * Inserts a CSS stylesheet into a target context. If multiple frames are specified, unsuccessful injections are ignored.
         *
         * Can return its result via Promise since Chrome 90.
         * @param injection The details of the styles to insert.
         */
        function insertCSS(injection: CSSInjection): Promise<void>;
        function insertCSS(injection: CSSInjection, callback: () => void): void;

        /**
         * Removes a CSS stylesheet that was previously inserted by this extension from a target context.
         * @param injection The details of the styles to remove. Note that the `css`, `files`, and `origin` properties must exactly match the stylesheet inserted through {@link insertCSS}. Attempting to remove a non-existent stylesheet is a no-op.
         * @since Chrome 90
         */
        function removeCSS(injection: CSSInjection): Promise<void>;
        function removeCSS(injection: CSSInjection, callback: () => void): void;

        /**
         * Registers one or more content scripts for this extension
         * @param scripts Contains a list of scripts to be registered. If there are errors during script parsing/file validation, or if the IDs specified already exist, then no scripts are registered.
         * @since Chrome 96
         */
        function registerContentScripts(scripts: RegisteredContentScript[]): Promise<void>;
        function registerContentScripts(scripts: RegisteredContentScript[], callback: () => void): void;

        /**
         * Unregisters content scripts for this extension.
         * @param filter If specified, only unregisters dynamic content scripts which match the filter. Otherwise, all of the extension's dynamic content scripts are unregistered.
         * @since Chrome 96
         */
        function unregisterContentScripts(filter?: ContentScriptFilter): Promise<void>;
        function unregisterContentScripts(callback: () => void): void;
        function unregisterContentScripts(filter: ContentScriptFilter | undefined, callback: () => void): void;

        /**
         * Returns all dynamically registered content scripts for this extension that match the given filter.
         * @param filter An object to filter the extension's dynamically registered scripts.
         * @since Chrome 96
         */
        function getRegisteredContentScripts(filter?: ContentScriptFilter): Promise<RegisteredContentScript[]>;
        function getRegisteredContentScripts(callback: (scripts: RegisteredContentScript[]) => void): void;
        function getRegisteredContentScripts(
            filter: ContentScriptFilter | undefined,
            callback: (scripts: RegisteredContentScript[]) => void,
        ): void;

        /**
         * Updates one or more content scripts for this extension.
         * @param scripts Contains a list of scripts to be updated. A property is only updated for the existing script if it is specified in this object. If there are errors during script parsing/file validation, or if the IDs specified do not correspond to a fully registered script, then no scripts are updated.
         * @since Chrome 96
         */
        function updateContentScripts(scripts: RegisteredContentScript[]): Promise<void>;
        function updateContentScripts(scripts: RegisteredContentScript[], callback: () => void): void;
    }
}
