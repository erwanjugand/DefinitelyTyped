declare namespace chrome {
    ////////////////////
    // Audio
    ////////////////////
    /**
     * The `chrome.audio` API is provided to allow users to get information about and control the audio devices attached to the system. This API is currently only available in kiosk mode for ChromeOS.
     *
     * Permissions: "audio"
     * @platform ChromeOS only
     * @since Chrome 59
     */
    namespace audio {
        interface AudioDeviceInfo {
            /** Device name */
            deviceName: string;
            /** Type of the device */
            deviceType: DeviceType;
            /** The user-friendly name (e.g. "USB Microphone"). */
            displayName: string;
            /** The unique identifier of the audio device. */
            id: string;
            /** True if this is the current active device. */
            isActive: boolean;
            /** The sound level of the device, volume for output, gain for input. */
            level: number;
            /** The stable/persisted device id string when available. */
            stableDeviceId?: string;
            /** Stream type associated with this device. */
            streamType: StreamType;
        }

        interface DeviceFilter {
            /** If set, only audio devices whose active state matches this value will satisfy the filter. */
            isActive?: boolean;
            /** If set, only audio devices whose stream type is included in this list will satisfy the filter. */
            streamTypes?: StreamType[];
        }

        interface DeviceIdLists {
            /**
             * List of input devices specified by their ID.
             * To indicate input devices should be unaffected, leave this property unset.
             */
            input?: string[];
            /**
             * List of output devices specified by their ID.
             * To indicate output devices should be unaffected, leave this property unset.
             */
            output?: string[];
        }

        interface DeviceProperties {
            /**
             * The audio device's desired sound level. Defaults to the device's current sound level.
             * If used with audio input device, represents audio device gain.
             * If used with audio output device, represents audio device volume.
             */
            level?: number;
        }

        /** Available audio device types. */
        enum DeviceType {
            ALSA_LOOPBACK = "ALSA_LOOPBACK",
            BLUETOOTH = "BLUETOOTH",
            FRONT_MIC = "FRONT_MIC",
            HDMI = "HDMI",
            HEADPHONE = "HEADPHONE",
            HOTWORD = "HOTWORD",
            INTERNAL_MIC = "INTERNAL_MIC",
            INTERNAL_SPEAKER = "INTERNAL_SPEAKER",
            KEYBOARD_MIC = "KEYBOARD_MIC",
            LINEOUT = "LINEOUT",
            MIC = "MIC",
            OTHER = "OTHER",
            POST_DSP_LOOPBACK = "POST_DSP_LOOPBACK",
            POST_MIX_LOOPBACK = "POST_MIX_LOOPBACK",
            REAR_MIC = "REAR_MIC",
            USB = "USB",
        }

        interface LevelChangedEvent {
            /** ID of device whose sound level has changed. */
            deviceId: string;
            /** The device's new sound level. */
            level: number;
        }

        interface MuteChangedEvent {
            /** Whether or not the stream is now muted. */
            isMuted: boolean;
            /** The type of the stream for which the mute value changed. The updated mute value applies to all devices with this stream type. */
            streamType: StreamType;
        }

        /** Type of stream an audio device provides. */
        enum StreamType {
            INPUT = "INPUT",
            OUTPUT = "OUTPUT",
        }

        /**
         * Gets a list of audio devices filtered based on filter.
         * Can return its result via Promise in Manifest V3 or later since Chrome 116.
         */
        function getDevices(filter?: DeviceFilter): Promise<AudioDeviceInfo[]>;
        function getDevices(filter: DeviceFilter, callback: (devices: AudioDeviceInfo[]) => void): void;
        function getDevices(callback: (devices: AudioDeviceInfo[]) => void): void;

        /**
         * Gets the system-wide mute state for the specified stream type.
         * Can return its result via Promise in Manifest V3 or later since Chrome 116.
         */
        function getMute(streamType: `${StreamType}`): Promise<boolean>;
        function getMute(streamType: `${StreamType}`, callback: (value: boolean) => void): void;

        /**
         * Sets lists of active input and/or output devices.
         * Can return its result via Promise in Manifest V3 or later since Chrome 116.
         */
        function setActiveDevices(ids: DeviceIdLists): Promise<void>;
        function setActiveDevices(ids: DeviceIdLists, callback: () => void): void;

        /**
         * Sets mute state for a stream type. The mute state will apply to all audio devices with the specified audio stream type.
         * Can return its result via Promise in Manifest V3 or later since Chrome 116.
         */
        function setMute(streamType: `${StreamType}`, isMuted: boolean): Promise<void>;
        function setMute(streamType: `${StreamType}`, isMuted: boolean, callback: () => void): void;

        /**
         * Sets the properties for the input or output device.
         * Can return its result via Promise in Manifest V3 or later since Chrome 116.
         */
        function setProperties(id: string, properties: DeviceProperties): Promise<void>;
        function setProperties(id: string, properties: DeviceProperties, callback: () => void): void;

        /**
         * Fired when audio devices change, either new devices being added, or existing devices being removed.
         */
        const onDeviceListChanged: chrome.events.Event<(devices: AudioDeviceInfo[]) => void>;

        /**
         * Fired when sound level changes for an active audio device.
         */
        const onLevelChanged: chrome.events.Event<(event: LevelChangedEvent) => void>;

        /**
         * Fired when the mute state of the audio input or output changes.
         * Note that mute state is system-wide and the new value applies to every audio device with specified stream type.
         */
        const onMuteChanged: chrome.events.Event<(event: MuteChangedEvent) => void>;
    }
}
