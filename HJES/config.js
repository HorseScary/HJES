import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @SliderProperty, @SelectorProperty, Color } from 'Vigilance';

@Vigilant("dianaUtils")
class Settings {
    @TextProperty({
        name: "InquisTimeout",
        description: "Time (in milliseconds) before inquis is registered as killed",
        category: "General",
        subcategory: "Inquis",
        placeholder: "100000"
    })
    inquisTimeout = "100000";

    @SwitchProperty({
        name: "Announce Inquis",
        description: "announces inquis in chat and sends coords",
        category: "General",
        subcategory: "Inquis"
    })
    announceInquis = true;

    @SwitchProperty({
        name: "Cheese Announcement",
        description: "Tells party when cheese spawns and when cheese is picked up",
        category: "General",
        subcategory: "Rat"
    })
    announceCheese = true;

    @SwitchProperty({
        name: "Leave on Cheese",
        description: "Leaves skyblock when someone in party gets cheese.",
        category: "General",
        subcategory: "Rat"
    })
    leaveOnCheese = true;

    @SwitchProperty({
        name: "Join on Cheese",
        description: "Re-joins skyblock when cheese is picked up",
        category: "General",
        subcategory: "Rat"
    })
    rejoinOnCheese = true;

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
        this.setCategoryDescription("General", "&dDiana Utils");
        this.setSubcategoryDescription("General", "Rat", "Remote Access Tool config");
        this.setSubcategoryDescription("General", "Inquis", "things for inquisitors");

        this.setCategoryDescription("Trollege", "&4 trollege")
        this.setCategoryDescription("Testing", "prolly dont enable these")
    }
}

export default new Settings();