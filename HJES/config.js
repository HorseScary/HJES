import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @SliderProperty, @SelectorProperty, Color } from 'Vigilance';

/*
@Vigilant("Bloom", "Bloom", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Dungeons", "Solvers", "Gui", "Party Finder"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Config {
....
*/
@Vigilant("HJES", "HJES", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Diana", "Private Lobbies", "Blaze", "Crimson", "Trinity", "Trollege", "Testing"]
        return categories.indexOf(a.name) - categories.indexOf(b.name)
    }
})
class Settings {
    // General config
    @ButtonProperty({
        name: "Edit GUI locations",
        description: "what the name says",
        category: "General",
        placeholder: "Change"
    })
    action() {
        ChatLib.command("HJES gui", true)
    }

    @SwitchProperty({
        name: "Chicken Head",
        description: "Tells you when chicken head is ready to make a new egg.",
        category: "General",
        subcategory: "general",
    })
    eggReady = true;

    // crimson
    @SwitchProperty({
        name: "Flare Hype Break (No Book Of Stats!!!)",
        description: "notifies you if hype breaks when killing flares, /isflaring to turn on and off",
        category: "Crimson"
    })
    isFlaring = false;

    @SwitchProperty({
        name: "Announces Vanquishers to Party",
        description: "does what you think it does",
        category: "Crimson"
    })
    announceVanqs = true;

    @SwitchProperty({
        name: "Turn off all flare features",
        description: "no book of stats flare tracking is hard so it can break sometimes so use this",
        category: "Crimson"
    })
    noFlaring = true

    // Diana configs

    // Inquis 
    @SwitchProperty({
        name: "Show Damage Percentage",
        description: "Displays inquis and champ damage percentage on screen",
        category: "Diana",
        subcategory: "Inquis"
    })
    showPercentage = false;

    @TextProperty({
        name: "InquisTimeout",
        description: "Time (in milliseconds) before inquis is registered as killed",
        category: "Diana",
        subcategory: "Inquis",
        placeholder: "75000"
    })
    inquisTimeout = "75000";

    @SwitchProperty({
        name: "Announce Inquis",
        description: "announces inquis in chat and sends coords",
        category: "Diana",
        subcategory: "Inquis"
    })
    announceInquis = true;

    @SwitchProperty({
        name: "Show Nearest Warp to Inquis",
        description: "Tells you the closest warp to the inquis when coords are sent in chat.",
        category: "Diana",
        subcategory: "Inquis"
    })
    getClosestWarp = true;

    @SwitchProperty({
        name: "Announce Closest Warp to Inquis",
        description: "Says the closest warp to your inquis in party chat.",
        category: "Diana",
        subcategory: "Inquis"
    })
    announceClosestWarp = false;

    // rat
    @SwitchProperty({
        name: "Cheese Announcement",
        description: "Tells party when cheese spawns and when cheese is picked up",
        category: "Diana",
        subcategory: "Rat"
    })
    announceCheese = true;

    @SwitchProperty({
        name: "Leave on Cheese",
        description: "Leaves skyblock when someone in party gets cheese.",
        category: "Diana",
        subcategory: "Rat"
    })
    leaveOnCheese = true;

    @SwitchProperty({
        name: "Join on Cheese",
        description: "Re-joins skyblock when cheese is picked up",
        category: "Diana",
        subcategory: "Rat"
    })
    rejoinOnCheese = true;

    // misc
    @SwitchProperty({
        name: "Burrow Overview",
        description: "Gives overview of burrow in chat. Mostly for debugging purposes.",
        category: "Diana",
        subcategory: "Misc"
    })
    burrowOverview = false;


    // privateLobby configs
    @SwitchProperty({
        name: "Random Notifier",
        description: "notifies you if there are more players in the lobby than in your diana party.\nUse /partyPlayers or run /pl to set the number of players in your party",
        category: "Private Lobbies",
    })
    randomNotifier = false;

    @SwitchProperty({
        name: "Private Lobby Finder",
        description: "Notifies you when you find a private lobby",
        category: "Private Lobbies"
    })
    privateFinder = false;


    //Trollege configs
    @SwitchProperty({
        name: "Auto Mute",
        description: "automatically g mutes player",
        category: "Trollege"
    })
    autoMute = false;

    @TextProperty({
        name: "AutoMutePlayer",
        description: "player to be muted",
        category: "Trollege",
        placeholder: "sergeantsar"
    })
    autoMutePlayer = "sergeantsar";

    @SwitchProperty({
        name: "runic",
        description: "justifies gaia construct deaths",
        category: "Trollege",
        subcategory: "Diana"
    })
    runic = true;

    @SwitchProperty({
        name: "Announce Drops",
        description: "Announce rare drops from diana in chat. Based on changes in inventory between burrow digs, and doesn't support dae stick cause fuck you.",
        category: "Trollege",
        subcategory: "Diana"
    })
    announceDrops = false;

    @SelectorProperty({
        name: "Announce Drops Chat",
        description: "The chat that drops are announced in",
        category: "Trollege",
        subcategory: "Diana",
        options: ["Guild", "Party", "All (prolly don't do this)"]
    })
    announceDropsChat = 0;

    @SelectorProperty({
        name: "Announce Drops Level",
        description: "How rare the drops you announce are",
        category: "Trollege",
        subcategory: "Diana",
        options: ["Relic", "Shelm", "Crochet", "Feather", "Claws"]
    })
    announceDropsLevel = 2;

    @SwitchProperty({
        name: "Announce Coins",
        description: "Announce coins in chat.",
        category: "Trollege",
        subcategory: "Diana"
    })
    announceCoins = false;

    @SelectorProperty({
        name: "Announce Coins Threshold",
        description: "How many coins should be in a drop before its announced",
        category: "Trollege",
        subcategory: "Diana",
        options: ["10k", "15k", "25k", "40k", "50k", "75k", "100k", "250k", "500k", "750k"]
    })
    announceCoinsAtValue = 8;

    @SwitchProperty({
        name: "Animation",
        description: "/911 animation by default",
        category: "Trollege",
        subcategory: "911"
    })
    animate911 = false;

    @SliderProperty({
        name: "Planes",
        description: "Number of planes for /911 animation",
        category: "Trollege",
        subcategory: "911",
        min: 1,
        max: 10,
    })
    numPlanes = 1;

    //Blaze configs
    @SwitchProperty({
        name: "Re-Heated Notification",
        description: "Notifies you when your re-heated gummy polar bear runs out",
        category: "Blaze"
    })
    notifyReheated = false;

    @SliderProperty({
        name: "Re-Heated Notify Before",
        description: "how many minutes before gummy runs out for notification to happen",
        min: 0,
        max: 10,
        category: "Blaze"
    })
    notifyReheatedOffset = 0;

    @SwitchProperty({
        name: "Wisp Notification",
        description: "Notifies you when your wisp pots run out",
        category: "Blaze"
    })
    notifyWisp = false;

    @SliderProperty({
        name: "Wisp Notify Before",
        description: "how many minutes before wisp pot runs out for notification to happen",
        min: 0,
        max: 10,
        category: "Blaze",
    })
    notifyWispOffset = 0;


    //Trinity configs
    @SwitchProperty({
        name: "5 Puzzle Alert",
        description: "Alerts you when there are 5 puzzles",
        category: "Trinity"
    })
    puzzleAlert = false;

    @SwitchProperty({
        name: "Party Transfer Alert",
        description: "Alerts you when the party is transferer to you.",
        category: "Trinity"
    })
    transferAlert = false;


    //Testing configs
    @SwitchProperty({
        name: "chat thing",
        description: "tests chat thing",
        category: "Testing"
    })
    chatThing = false;

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "&aH&3J&dES")

        this.setCategoryDescription("Diana", "&dDiana Utils");
        this.setSubcategoryDescription("Diana", "Rat", "Remote Access Trojan config");
        this.setSubcategoryDescription("Diana", "Inquis", "things for inquisitors");

        this.setCategoryDescription("Trollege", "&4 trollege")
        this.setSubcategoryDescription("Trollege", "Diana", "Diana Trollege")

        this.setCategoryDescription("Testing", "prolly don't enable these")
    }
}

export default new Settings();