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
        const categories = ["General", "Diana", "Trollege", "Testing"]
        return categories.indexOf(a.name) - categories.indexOf(b.name)
    }
})
class Settings {
    // General config
    @SwitchProperty({
        name: "Switch",
        description: "useless switch",
        category: "General"
    })
    a = true

    //Diana configs
    @TextProperty({
        name: "InquisTimeout",
        description: "Time (in milliseconds) before inquis is registered as killed",
        category: "Diana",
        subcategory: "Inquis",
        placeholder: "100000"
    })
    inquisTimeout = "100000";

    @SwitchProperty({
        name: "Announce Inquis",
        description: "announces inquis in chat and sends coords",
        category: "Diana",
        subcategory: "Inquis"
    })
    announceInquis = true;

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

    @SwitchProperty({
        name: "Burrow Overview",
        description: "Gives overview of burrow in chat. Mostly for debugging purposes.",
        category: "Diana"
    })
    burrowOverview = false

    //Trollege configs
    @SwitchProperty({
        name: "runic",
        description: "justifies gia construct deaths",
        category: "Trollege"
    })
    runic = true;

    @SwitchProperty({
        name: "Auto Mute",
        description: "automaticly g mutes player",
        category: "Trollege"
    })
    autoMute = false;

    @TextProperty({
        name: "AutoMutePlayer",
        description: "player to be muted",
        category: "Trollege",
        placeholder: "sergeantsar"
    })
    autoMutePlayer = "sergeantsar"

    @SwitchProperty({
        name: "Announce Drops",
        description: "announce rare drops from diana in guild chat",
        category: "Trollege",
        subcategory: "Diana"
    })
    announceDrops = false

    //Testing configs
    @SwitchProperty({
        name: "announce champ",
        description: "tests inquis stuff",
        category: "Testing"
    })
    announceChamp = false;

    @TextProperty({
        name: "ChampTimeout",
        description: "Time (in milliseconds) before inquis is registered as killed",
        category: "Testing",
        placeholder: "100000"
    })
    champTimeout = "100000";

    @SwitchProperty({
        name: "chat thing",
        description: "tests chat thing",
        category: "Testing"
    })
    chatThing = false

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "&aH&3J&dES")

        this.setCategoryDescription("Diana", "&dDiana Utils");
        this.setSubcategoryDescription("Diana", "Rat", "Remote Access Tool config");
        this.setSubcategoryDescription("Diana", "Inquis", "things for inquisitors");

        this.setCategoryDescription("Trollege", "&4 trollege")
        this.setSubcategoryDescription("Trollege", "Diana", "Diana Trollege")

        this.setCategoryDescription("Testing", "prolly dont enable these")
    }
}

export default new Settings();