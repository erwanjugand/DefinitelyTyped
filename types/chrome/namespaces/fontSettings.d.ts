declare namespace chrome {
    ////////////////////
    // Font Settings
    ////////////////////
    /**
     * Use the `chrome.fontSettings` API to manage Chrome's font settings.
     *
     * Permissions: "fontSettings"
     */
    namespace fontSettings {
        /** Represents a font name. */
        interface FontName {
            /** The display name of the font. */
            displayName: string;
            /** The font ID. */
            fontId: string;
        }

        /** A CSS generic font family. */
        enum GenericFamily {
            STANDARD = "standard",
            SANSSERIF = "sansserif",
            SERIF = "serif",
            FIXED = "fixed",
            CURSIVE = "cursive",
            FANTASY = "fantasy",
            MATH = "math",
        }

        enum LevelOfControl {
            /** Cannot be controlled by any extension */
            NOT_CONTROLLABLE = "not_controllable",
            /** Controlled by extensions with higher precedence */
            CONTROLLED_BY_OTHER_EXTENSIONS = "controlled_by_other_extensions",
            /** Can be controlled by this extension */
            CONTROLLABLE_BY_THIS_EXTENSION = "controllable_by_this_extension",
            /** Controlled by this extension */
            CONTROLLED_BY_THIS_EXTENSION = "controlled_by_this_extension",
        }

        /** An ISO 15924 script code. The default, or global, script is represented by script code "Zyyy". */
        enum ScriptCode {
            AFAK = "Afak",
            ARAB = "Arab",
            ARMI = "Armi",
            ARMN = "Armn",
            AVST = "Avst",
            BALI = "Bali",
            BAMU = "Bamu",
            BASS = "Bass",
            BATK = "Batk",
            BENG = "Beng",
            BLIS = "Blis",
            BOPO = "Bopo",
            BRAH = "Brah",
            BRAI = "Brai",
            BUGI = "Bugi",
            BUHD = "Buhd",
            CAKM = "Cakm",
            CANS = "Cans",
            CARI = "Cari",
            CHAM = "Cham",
            CHER = "Cher",
            CIRT = "Cirt",
            COPT = "Copt",
            CPRT = "Cprt",
            CYRL = "Cyrl",
            CYRS = "Cyrs",
            DEVA = "Deva",
            DSRT = "Dsrt",
            DUPL = "Dupl",
            EGYD = "Egyd",
            EGYH = "Egyh",
            EGYP = "Egyp",
            ELBA = "Elba",
            ETHI = "Ethi",
            GEOK = "Geok",
            GEOR = "Geor",
            GLAG = "Glag",
            GOTH = "Goth",
            GRAN = "Gran",
            GREK = "Grek",
            GUJR = "Gujr",
            GURU = "Guru",
            HANG = "Hang",
            HANI = "Hani",
            HANO = "Hano",
            HANS = "Hans",
            HANT = "Hant",
            HEBR = "Hebr",
            HLUW = "Hluw",
            HMNG = "Hmng",
            HUNG = "Hung",
            INDS = "Inds",
            ITAL = "Ital",
            JAVA = "Java",
            JPAN = "Jpan",
            JURC = "Jurc",
            KALI = "Kali",
            KHAR = "Khar",
            KHMR = "Khmr",
            KHOJ = "Khoj",
            KNDA = "Knda",
            KPEL = "Kpel",
            KTHI = "Kthi",
            LANA = "Lana",
            LAOO = "Laoo",
            LATF = "Latf",
            LATG = "Latg",
            LATN = "Latn",
            LEPC = "Lepc",
            LIMB = "Limb",
            LINA = "Lina",
            LINB = "Linb",
            LISU = "Lisu",
            LOMA = "Loma",
            LYCI = "Lyci",
            LYDI = "Lydi",
            MAND = "Mand",
            MANI = "Mani",
            MAYA = "Maya",
            MEND = "Mend",
            MERC = "Merc",
            MERO = "Mero",
            MLYM = "Mlym",
            MONG = "Mong",
            MOON = "Moon",
            MROO = "Mroo",
            MTEI = "Mtei",
            MYMR = "Mymr",
            NARB = "Narb",
            NBAT = "Nbat",
            NKGB = "Nkgb",
            NKOO = "Nkoo",
            NSHU = "Nshu",
            OGAM = "Ogam",
            OLCK = "Olck",
            ORKH = "Orkh",
            ORYA = "Orya",
            OSMA = "Osma",
            PALM = "Palm",
            PERM = "Perm",
            PHAG = "Phag",
            PHLI = "Phli",
            PHLP = "Phlp",
            PHLV = "Phlv",
            PHNX = "Phnx",
            PLRD = "Plrd",
            PRTI = "Prti",
            RJNG = "Rjng",
            RORO = "Roro",
            RUNR = "Runr",
            SAMR = "Samr",
            SARA = "Sara",
            SARB = "Sarb",
            SAUR = "Saur",
            SGNW = "Sgnw",
            SHAW = "Shaw",
            SHRD = "Shrd",
            SIND = "Sind",
            SINH = "Sinh",
            SORA = "Sora",
            SUND = "Sund",
            SYLO = "Sylo",
            SYRC = "Syrc",
            SYRE = "Syre",
            SYRJ = "Syrj",
            SYRN = "Syrn",
            TAGB = "Tagb",
            TAKR = "Takr",
            TALE = "Tale",
            TALU = "Talu",
            TAML = "Taml",
            TANG = "Tang",
            TAVT = "Tavt",
            TELU = "Telu",
            TENG = "Teng",
            TFNG = "Tfng",
            TGLG = "Tglg",
            THAA = "Thaa",
            THAI = "Thai",
            TIBT = "Tibt",
            TIRH = "Tirh",
            UGAR = "Ugar",
            VAII = "Vaii",
            VISP = "Visp",
            WARA = "Wara",
            WOLE = "Wole",
            XPEO = "Xpeo",
            XSUX = "Xsux",
            YIII = "Yiii",
            ZMTH = "Zmth",
            ZSYM = "Zsym",
            ZYYY = "Zyyy",
        }

        interface ClearFontDetails {
            /** The generic font family for which the font should be cleared. */
            genericFamily: `${GenericFamily}`;
            /** The script for which the font should be cleared. If omitted, the global script font setting is cleared. */
            script?: `${ScriptCode}` | undefined;
        }

        interface GetFontDetails {
            /** The generic font family for which the font should be retrieved. */
            genericFamily: `${GenericFamily}`;
            /** The script for which the font should be retrieved. If omitted, the font setting for the global script (script code "Zyyy") is retrieved. */
            script?: `${ScriptCode}` | undefined;
        }

        interface SetFontDetails {
            /** The font ID. The empty string means to fallback to the global script font setting. */
            fontId: string;
            /** The generic font family for which the font should be set. */
            genericFamily: `${GenericFamily}`;
            /** The script code which the font should be set. If omitted, the font setting for the global script (script code "Zyyy") is set. */
            script?: `${ScriptCode}` | undefined;
        }

        interface FontChangedResult {
            /** The generic font family for which the font setting has changed. */
            genericFamily: `${GenericFamily}`;
            /** The level of control this extension has over the setting. */
            levelOfControl: `${LevelOfControl}`;
            /** Optional. The script code for which the font setting has changed.  */
            script?: `${ScriptCode}`;
            /** The font ID. See the description in {@link getFont}. */
            fontId: string;
        }

        interface FontResult {
            /** The level of control this extension has over the setting. */
            levelOfControl: `${LevelOfControl}`;
            /** The font ID. Rather than the literal font ID preference value, this may be the ID of the font that the system resolves the preference value to. So, `fontId` can differ from the font passed to {@link setFont}, if, for example, the font is not available on the system. The empty string signifies fallback to the global script font setting. */
            fontId: string;
        }

        interface FontSizeResult {
            /** The font size in pixels. */
            pixelSize: number;
            /** The level of control this extension has over the setting. */
            levelOfControl: `${LevelOfControl}`;
        }

        interface FontSizeDetails {
            /** The font size in pixels. */
            pixelSize: number;
        }

        /**
         * Sets the default font size.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function setDefaultFontSize(details: FontSizeDetails): Promise<void>;
        function setDefaultFontSize(details: FontSizeDetails, callback: () => void): void;

        /**
         * Gets the font for a given script and generic font family.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getFont(details: GetFontDetails): Promise<FontResult>;
        function getFont(details: GetFontDetails, callback: (details: FontResult) => void): void;

        /**
         * Gets the default font size.
         * @param details This parameter is currently unused.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getDefaultFontSize(details?: { [key: string]: unknown }): Promise<FontSizeResult>;
        function getDefaultFontSize(callback: (options: FontSizeResult) => void): void;
        function getDefaultFontSize(
            details: { [key: string]: unknown } | undefined,
            callback: (options: FontSizeResult) => void,
        ): void;

        /**
         * Gets the minimum font size.
         * @param details This parameter is currently unused.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getMinimumFontSize(details?: { [key: string]: unknown }): Promise<FontSizeResult>;
        function getMinimumFontSize(callback: (options: FontSizeResult) => void): void;
        function getMinimumFontSize(
            details: { [key: string]: unknown } | undefined,
            callback: (options: FontSizeResult) => void,
        ): void;

        /**
         * Sets the minimum font size.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function setMinimumFontSize(details: FontSizeDetails): Promise<void>;
        function setMinimumFontSize(details: FontSizeDetails, callback: () => void): void;

        /**
         * Gets the default size for fixed width fonts.
         * @param details This parameter is currently unused.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getDefaultFixedFontSize(details?: { [key: string]: unknown }): Promise<FontSizeResult>;
        function getDefaultFixedFontSize(callback: (details: FontSizeResult) => void): void;
        function getDefaultFixedFontSize(
            details: { [key: string]: unknown } | undefined,
            callback: (details: FontSizeResult) => void,
        ): void;

        /**
         * Clears the default font size set by this extension, if any.
         * @param details This parameter is currently unused.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function clearDefaultFontSize(details?: { [key: string]: unknown }): Promise<void>;
        function clearDefaultFontSize(callback: () => void): void;
        function clearDefaultFontSize(
            details: { [key: string]: unknown } | undefined,
            callback: () => void,
        ): void;

        /**
         * Sets the default size for fixed width fonts.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function setDefaultFixedFontSize(details: FontSizeDetails): Promise<void>;
        function setDefaultFixedFontSize(details: FontSizeDetails, callback: () => void): void;

        /**
         * Clears the font set by this extension, if any.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function clearFont(details: ClearFontDetails): Promise<void>;
        function clearFont(details: ClearFontDetails, callback: () => void): void;

        /**
         * Sets the font for a given script and generic font family.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function setFont(details: SetFontDetails): Promise<void>;
        function setFont(details: SetFontDetails, callback: () => void): void;

        /**
         * Clears the minimum font size set by this extension, if any.
         * @param details This parameter is currently unused.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function clearMinimumFontSize(details?: { [key: string]: unknown }): Promise<void>;
        function clearMinimumFontSize(callback: () => void): void;
        function clearMinimumFontSize(
            details: { [key: string]: unknown } | undefined,
            callback: () => void,
        ): void;

        /**
         * Gets a list of fonts on the system.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function getFontList(): Promise<FontName[]>;
        function getFontList(callback: (results: FontName[]) => void): void;

        /**
         * Clears the default fixed font size set by this extension, if any.
         * @param details This parameter is currently unused.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        function clearDefaultFixedFontSize(details?: { [key: string]: unknown }): Promise<void>;
        function clearDefaultFixedFontSize(callback: () => void): void;
        function clearDefaultFixedFontSize(
            details: { [key: string]: unknown } | undefined,
            callback: () => void,
        ): void;

        /** Fired when the default fixed font size setting changes. */
        const onDefaultFixedFontSizeChanged: events.Event<(details: FontSizeResult) => void>;

        /** Fired when the default font size setting changes. */
        const onDefaultFontSizeChanged: events.Event<(details: FontSizeResult) => void>;

        /** Fired when the minimum font size setting changes. */
        const onMinimumFontSizeChanged: events.Event<(details: FontSizeResult) => void>;

        /** Fired when a font setting changes. */
        const onFontChanged: events.Event<(details: FontChangedResult) => void>;
    }
}
