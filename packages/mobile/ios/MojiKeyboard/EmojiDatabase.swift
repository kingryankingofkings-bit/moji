import Foundation

enum EmojiCategory: String, CaseIterable {
    case recent = "Recent"
    case smileys = "Smileys"
    case people = "People"
    case nature = "Nature"
    case food = "Food"
    case travel = "Travel"
    case activities = "Activities"
    case objects = "Objects"
    case symbols = "Symbols"
    case medieval = "Medieval & Fantasy"
    case herb = "420"
    case scifi = "Sci-Fi"
    case horror = "Horror"
    case music = "Music"
    case ocean = "Ocean"

    var icon: String {
        switch self {
        case .recent: return "🕐"
        case .smileys: return "😀"
        case .people: return "👋"
        case .nature: return "🌸"
        case .food: return "🍎"
        case .travel: return "✈️"
        case .activities: return "⚽"
        case .objects: return "💡"
        case .symbols: return "❤️"
        case .medieval: return "⚔️"
        case .herb: return "🌿"
        case .scifi: return "🛸"
        case .horror: return "💀"
        case .music: return "🎵"
        case .ocean: return "🌊"
        }
    }
}

struct EmojiItem {
    let id: String
    let emoji: String
    let name: String
    let category: EmojiCategory
    let keywords: [String]
    let hasSkinTones: Bool
    let skinToneVariants: [String]
}

enum EmojiDatabase {
    private static func tones(_ base: String) -> [String] {
        ["🏻","🏼","🏽","🏾","🏿"].map { base + $0 }
    }

    static let all: [EmojiItem] = [
        // Smileys
        EmojiItem(id:"grinning",     emoji:"😀", name:"Grinning Face",           category:.smileys,    keywords:["smile","happy"],            hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"joy",          emoji:"😂", name:"Tears of Joy",            category:.smileys,    keywords:["laugh","happy"],             hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"rofl",         emoji:"🤣", name:"Rolling on Floor",        category:.smileys,    keywords:["laugh","funny"],             hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"smile",        emoji:"😊", name:"Smiling Face",            category:.smileys,    keywords:["smile","happy"],             hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"wink",         emoji:"😉", name:"Winking Face",            category:.smileys,    keywords:["wink","smile"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"heart_eyes",   emoji:"😍", name:"Heart Eyes",              category:.smileys,    keywords:["love","heart"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"star_eyes",    emoji:"🤩", name:"Star Eyes",               category:.smileys,    keywords:["star","excited"],            hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"kiss",         emoji:"😘", name:"Kissing Heart",           category:.smileys,    keywords:["kiss","love"],               hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"thinking",     emoji:"🤔", name:"Thinking Face",           category:.smileys,    keywords:["think","hmm"],               hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"flushed",      emoji:"😳", name:"Flushed Face",            category:.smileys,    keywords:["blush","shy"],               hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sob",          emoji:"😭", name:"Loudly Crying",           category:.smileys,    keywords:["cry","sad"],                 hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"angry",        emoji:"😠", name:"Angry Face",              category:.smileys,    keywords:["angry","mad"],               hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"skull",        emoji:"💀", name:"Skull",                   category:.smileys,    keywords:["dead","skull"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"ghost",        emoji:"👻", name:"Ghost",                   category:.smileys,    keywords:["ghost","boo"],               hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hot",          emoji:"🥵", name:"Hot Face",                category:.smileys,    keywords:["hot","warm"],                hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"cold",         emoji:"🥶", name:"Cold Face",               category:.smileys,    keywords:["cold","freezing"],           hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sleeping",     emoji:"😴", name:"Sleeping Face",           category:.smileys,    keywords:["sleep","tired"],             hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"cowboy",       emoji:"🤠", name:"Cowboy Hat",              category:.smileys,    keywords:["cowboy","hat"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"partying",     emoji:"🥳", name:"Partying Face",           category:.smileys,    keywords:["party","celebrate"],         hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"nerd",         emoji:"🤓", name:"Nerd Face",               category:.smileys,    keywords:["nerd","glasses"],            hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sunglasses",   emoji:"😎", name:"Sunglasses",              category:.smileys,    keywords:["cool","sunglasses"],         hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"clown",        emoji:"🤡", name:"Clown Face",              category:.smileys,    keywords:["clown","joker"],             hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"poop",         emoji:"💩", name:"Pile of Poo",             category:.smileys,    keywords:["poop","funny"],              hasSkinTones:false, skinToneVariants:[]),

        // People
        EmojiItem(id:"wave",         emoji:"👋", name:"Waving Hand",             category:.people,     keywords:["wave","hello"],              hasSkinTones:true,  skinToneVariants:tones("👋")),
        EmojiItem(id:"thumbsup",     emoji:"👍", name:"Thumbs Up",               category:.people,     keywords:["thumbs","good"],             hasSkinTones:true,  skinToneVariants:tones("👍")),
        EmojiItem(id:"thumbsdown",   emoji:"👎", name:"Thumbs Down",             category:.people,     keywords:["thumbs","bad"],              hasSkinTones:true,  skinToneVariants:tones("👎")),
        EmojiItem(id:"clap",         emoji:"👏", name:"Clapping Hands",          category:.people,     keywords:["clap","applause"],           hasSkinTones:true,  skinToneVariants:tones("👏")),
        EmojiItem(id:"raised_hands", emoji:"🙌", name:"Raising Hands",           category:.people,     keywords:["celebrate","party"],         hasSkinTones:true,  skinToneVariants:tones("🙌")),
        EmojiItem(id:"fist",         emoji:"✊", name:"Raised Fist",             category:.people,     keywords:["fist","power"],              hasSkinTones:true,  skinToneVariants:tones("✊")),
        EmojiItem(id:"ok_hand",      emoji:"👌", name:"OK Hand",                 category:.people,     keywords:["ok","good"],                 hasSkinTones:true,  skinToneVariants:tones("👌")),
        EmojiItem(id:"peace",        emoji:"✌️", name:"Victory Hand",            category:.people,     keywords:["peace","victory"],           hasSkinTones:true,  skinToneVariants:tones("✌️")),
        EmojiItem(id:"love_you",     emoji:"🤟", name:"Love You Gesture",        category:.people,     keywords:["love","rock"],               hasSkinTones:true,  skinToneVariants:tones("🤟")),
        EmojiItem(id:"metal",        emoji:"🤘", name:"Sign of Horns",           category:.people,     keywords:["rock","metal"],              hasSkinTones:true,  skinToneVariants:tones("🤘")),
        EmojiItem(id:"call_me",      emoji:"🤙", name:"Call Me Hand",            category:.people,     keywords:["call","phone"],              hasSkinTones:true,  skinToneVariants:tones("🤙")),
        EmojiItem(id:"point_right",  emoji:"👉", name:"Pointing Right",          category:.people,     keywords:["point","right"],             hasSkinTones:true,  skinToneVariants:tones("👉")),
        EmojiItem(id:"point_left",   emoji:"👈", name:"Pointing Left",           category:.people,     keywords:["point","left"],              hasSkinTones:true,  skinToneVariants:tones("👈")),
        EmojiItem(id:"raised_hand",  emoji:"✋", name:"Raised Hand",             category:.people,     keywords:["hand","stop"],               hasSkinTones:true,  skinToneVariants:tones("✋")),
        EmojiItem(id:"pray",         emoji:"🙏", name:"Folded Hands",            category:.people,     keywords:["pray","thanks"],             hasSkinTones:true,  skinToneVariants:tones("🙏")),
        EmojiItem(id:"muscle",       emoji:"💪", name:"Flexed Biceps",           category:.people,     keywords:["strong","muscle"],           hasSkinTones:true,  skinToneVariants:tones("💪")),
        EmojiItem(id:"eyes",         emoji:"👀", name:"Eyes",                    category:.people,     keywords:["eyes","look"],               hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"brain",        emoji:"🧠", name:"Brain",                   category:.people,     keywords:["brain","smart"],             hasSkinTones:false, skinToneVariants:[]),

        // Nature
        EmojiItem(id:"dog",          emoji:"🐶", name:"Dog Face",                category:.nature,     keywords:["dog","pet"],                 hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"cat",          emoji:"🐱", name:"Cat Face",                category:.nature,     keywords:["cat","pet"],                 hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"rabbit",       emoji:"🐰", name:"Rabbit Face",             category:.nature,     keywords:["rabbit","bunny"],            hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"fox",          emoji:"🦊", name:"Fox",                     category:.nature,     keywords:["fox","animal"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"bear",         emoji:"🐻", name:"Bear Face",               category:.nature,     keywords:["bear","animal"],             hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"panda",        emoji:"🐼", name:"Panda",                   category:.nature,     keywords:["panda","cute"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"lion",         emoji:"🦁", name:"Lion",                    category:.nature,     keywords:["lion","king"],               hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"frog",         emoji:"🐸", name:"Frog",                    category:.nature,     keywords:["frog","green"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"butterfly",    emoji:"🦋", name:"Butterfly",               category:.nature,     keywords:["butterfly","insect"],        hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"flower",       emoji:"🌸", name:"Cherry Blossom",          category:.nature,     keywords:["flower","pink"],             hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"rose",         emoji:"🌹", name:"Rose",                    category:.nature,     keywords:["rose","love"],               hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sunflower",    emoji:"🌻", name:"Sunflower",               category:.nature,     keywords:["sunflower","flower"],        hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"tree",         emoji:"🌳", name:"Deciduous Tree",          category:.nature,     keywords:["tree","nature"],             hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sun",          emoji:"☀️", name:"Sun",                     category:.nature,     keywords:["sun","bright"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"moon",         emoji:"🌙", name:"Crescent Moon",           category:.nature,     keywords:["moon","night"],              hasSkinTones:false, skinToneVariants:[]),

        // Food
        EmojiItem(id:"apple",        emoji:"🍎", name:"Red Apple",               category:.food,       keywords:["apple","fruit"],             hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"banana",       emoji:"🍌", name:"Banana",                  category:.food,       keywords:["banana","fruit"],            hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"strawberry",   emoji:"🍓", name:"Strawberry",              category:.food,       keywords:["strawberry","berry"],        hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"pizza",        emoji:"🍕", name:"Pizza",                   category:.food,       keywords:["pizza","food"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"burger",       emoji:"🍔", name:"Hamburger",               category:.food,       keywords:["burger","food"],             hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"taco",         emoji:"🌮", name:"Taco",                    category:.food,       keywords:["taco","mexican"],            hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sushi",        emoji:"🍣", name:"Sushi",                   category:.food,       keywords:["sushi","japanese"],          hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"cake",         emoji:"🎂", name:"Birthday Cake",           category:.food,       keywords:["cake","birthday"],           hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"coffee",       emoji:"☕", name:"Hot Beverage",            category:.food,       keywords:["coffee","tea"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"beer",         emoji:"🍺", name:"Beer Mug",                category:.food,       keywords:["beer","drink"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"bubble_tea",   emoji:"🧋", name:"Bubble Tea",              category:.food,       keywords:["boba","tea"],                hasSkinTones:false, skinToneVariants:[]),

        // Travel
        EmojiItem(id:"airplane",     emoji:"✈️", name:"Airplane",                category:.travel,     keywords:["fly","travel"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"rocket",       emoji:"🚀", name:"Rocket",                  category:.travel,     keywords:["rocket","space"],            hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"car",          emoji:"🚗", name:"Automobile",              category:.travel,     keywords:["car","drive"],               hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"house",        emoji:"🏠", name:"House",                   category:.travel,     keywords:["home","house"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"beach",        emoji:"🏖️", name:"Beach",                  category:.travel,     keywords:["beach","sand"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"rainbow",      emoji:"🌈", name:"Rainbow",                 category:.travel,     keywords:["rainbow","colorful"],        hasSkinTones:false, skinToneVariants:[]),

        // Activities
        EmojiItem(id:"soccer",       emoji:"⚽", name:"Soccer Ball",             category:.activities, keywords:["soccer","sports"],           hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"basketball",   emoji:"🏀", name:"Basketball",              category:.activities, keywords:["basketball","sports"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"gaming",       emoji:"🎮", name:"Video Game",              category:.activities, keywords:["game","gaming"],             hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"guitar",       emoji:"🎸", name:"Guitar",                  category:.activities, keywords:["guitar","music"],            hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"music",        emoji:"🎵", name:"Musical Note",            category:.activities, keywords:["music","note"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"trophy",       emoji:"🏆", name:"Trophy",                  category:.activities, keywords:["trophy","win"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"art",          emoji:"🎨", name:"Artist Palette",          category:.activities, keywords:["art","paint"],               hasSkinTones:false, skinToneVariants:[]),

        // Objects
        EmojiItem(id:"phone",        emoji:"📱", name:"Mobile Phone",            category:.objects,    keywords:["phone","mobile"],            hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"laptop",       emoji:"💻", name:"Laptop",                  category:.objects,    keywords:["laptop","computer"],         hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"camera",       emoji:"📷", name:"Camera",                  category:.objects,    keywords:["camera","photo"],            hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"bulb",         emoji:"💡", name:"Light Bulb",              category:.objects,    keywords:["idea","light"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"money",        emoji:"💰", name:"Money Bag",               category:.objects,    keywords:["money","rich"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"gift",         emoji:"🎁", name:"Gift",                    category:.objects,    keywords:["gift","present"],            hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"key",          emoji:"🔑", name:"Key",                     category:.objects,    keywords:["key","lock"],                hasSkinTones:false, skinToneVariants:[]),

        // Symbols
        EmojiItem(id:"heart",        emoji:"❤️", name:"Red Heart",               category:.symbols,    keywords:["heart","love"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"orange_heart", emoji:"🧡", name:"Orange Heart",            category:.symbols,    keywords:["heart","orange"],            hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"yellow_heart", emoji:"💛", name:"Yellow Heart",            category:.symbols,    keywords:["heart","yellow"],            hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"green_heart",  emoji:"💚", name:"Green Heart",             category:.symbols,    keywords:["heart","green"],             hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"blue_heart",   emoji:"💙", name:"Blue Heart",              category:.symbols,    keywords:["heart","blue"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"fire",         emoji:"🔥", name:"Fire",                    category:.symbols,    keywords:["fire","hot"],                hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sparkles",     emoji:"✨", name:"Sparkles",                category:.symbols,    keywords:["sparkle","shine"],           hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"star",         emoji:"⭐", name:"Star",                    category:.symbols,    keywords:["star","favorite"],           hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"check",        emoji:"✅", name:"Check Mark",              category:.symbols,    keywords:["check","done"],              hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"cross",        emoji:"❌", name:"Cross Mark",              category:.symbols,    keywords:["cross","no"],                hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"100",          emoji:"💯", name:"Hundred Points",          category:.symbols,    keywords:["100","perfect"],             hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"fire2",        emoji:"💥", name:"Collision",               category:.symbols,    keywords:["boom","explosion"],          hasSkinTones:false, skinToneVariants:[]),

        // Medieval & Fantasy
        EmojiItem(id:"med_swords",   emoji:"⚔️", name:"Crossed Swords",         category:.medieval,   keywords:["sword","battle","fight"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_dagger",   emoji:"🗡️", name:"Dagger",                 category:.medieval,   keywords:["knife","stab","weapon"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_shield",   emoji:"🛡️", name:"Shield",                 category:.medieval,   keywords:["defend","protect","armor"],   hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_castle",   emoji:"🏰", name:"Castle",                  category:.medieval,   keywords:["fortress","kingdom"],         hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_crown",    emoji:"👑", name:"Crown",                   category:.medieval,   keywords:["king","queen","royalty"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_prince",   emoji:"🤴", name:"Prince",                  category:.medieval,   keywords:["royal","king"],               hasSkinTones:true,  skinToneVariants:tones("🤴")),
        EmojiItem(id:"med_princess", emoji:"👸", name:"Princess",                category:.medieval,   keywords:["royal","queen"],              hasSkinTones:true,  skinToneVariants:tones("👸")),
        EmojiItem(id:"med_wizard",   emoji:"🧙", name:"Wizard",                  category:.medieval,   keywords:["mage","sorcerer","magic"],    hasSkinTones:true,  skinToneVariants:tones("🧙")),
        EmojiItem(id:"med_elf",      emoji:"🧝", name:"Elf",                     category:.medieval,   keywords:["fairy","forest","fantasy"],   hasSkinTones:true,  skinToneVariants:tones("🧝")),
        EmojiItem(id:"med_vampire",  emoji:"🧛", name:"Vampire",                 category:.medieval,   keywords:["dracula","blood","undead"],   hasSkinTones:true,  skinToneVariants:tones("🧛")),
        EmojiItem(id:"med_zombie",   emoji:"🧟", name:"Zombie",                  category:.medieval,   keywords:["undead","walking dead"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_genie",    emoji:"🧞", name:"Genie",                   category:.medieval,   keywords:["wish","lamp","magic"],        hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_unicorn",  emoji:"🦄", name:"Unicorn",                 category:.medieval,   keywords:["horse","magic","rainbow"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_dragon",   emoji:"🐉", name:"Dragon",                  category:.medieval,   keywords:["fire","beast","fantasy"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_bow",      emoji:"🏹", name:"Bow and Arrow",           category:.medieval,   keywords:["arrow","hunt","archery"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_wand",     emoji:"🪄", name:"Magic Wand",              category:.medieval,   keywords:["magic","spell","trick"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_crystal",  emoji:"🔮", name:"Crystal Ball",            category:.medieval,   keywords:["fortune","predict","magic"],  hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_scroll",   emoji:"📜", name:"Scroll",                  category:.medieval,   keywords:["parchment","ancient","text"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_candle",   emoji:"🕯️", name:"Candle",                 category:.medieval,   keywords:["light","flame","wax"],        hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_key2",     emoji:"🗝️", name:"Old Key",                category:.medieval,   keywords:["ancient","lock","open"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_potion",   emoji:"⚗️", name:"Alembic",                category:.medieval,   keywords:["potion","alchemy","brew"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_coin",     emoji:"🪙", name:"Coin",                    category:.medieval,   keywords:["gold","money","treasure"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_scales",   emoji:"⚖️", name:"Balance Scale",          category:.medieval,   keywords:["justice","law","judge"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_blood",    emoji:"🩸", name:"Drop of Blood",           category:.medieval,   keywords:["blood","wound","battle"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"med_trident",  emoji:"🔱", name:"Trident Emblem",          category:.medieval,   keywords:["poseidon","sea","power"],     hasSkinTones:false, skinToneVariants:[]),

        // 420
        EmojiItem(id:"herb_herb",    emoji:"🌿", name:"Herb",                    category:.herb,       keywords:["plant","green","leaf"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_leaves",  emoji:"🍃", name:"Falling Leaf",            category:.herb,       keywords:["leaf","green","nature"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_sprout",  emoji:"🌱", name:"Seedling",                category:.herb,       keywords:["grow","plant","sprout"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_tree2",   emoji:"🌲", name:"Evergreen Tree",          category:.herb,       keywords:["pine","forest","green"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_pot",     emoji:"🪴", name:"Potted Plant",            category:.herb,       keywords:["plant","grow","indoor"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_wind",    emoji:"💨", name:"Wind",                    category:.herb,       keywords:["air","blow","smoke"],         hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_fire2",   emoji:"🔥", name:"Fire",                    category:.herb,       keywords:["blaze","hot","light"],        hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_exhale",  emoji:"😮‍💨",name:"Face Exhaling",         category:.herb,       keywords:["exhale","breathe","sigh"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_relax",   emoji:"😌", name:"Relieved Face",           category:.herb,       keywords:["calm","peace","chill"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_drool",   emoji:"🤤", name:"Drooling Face",           category:.herb,       keywords:["hungry","munchies","want"],   hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_pizza2",  emoji:"🍕", name:"Pizza",                   category:.herb,       keywords:["munchies","food","snack"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_burger2", emoji:"🍔", name:"Hamburger",               category:.herb,       keywords:["munchies","food","snack"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_fries2",  emoji:"🍟", name:"French Fries",            category:.herb,       keywords:["munchies","snack","salty"],   hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_cookie2", emoji:"🍪", name:"Cookie",                  category:.herb,       keywords:["munchies","sweet","snack"],   hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_cupcake", emoji:"🧁", name:"Cupcake",                 category:.herb,       keywords:["sweet","munchies","dessert"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_choc",    emoji:"🍫", name:"Chocolate",               category:.herb,       keywords:["sweet","candy","munchies"],   hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_sleep",   emoji:"😴", name:"Sleeping",                category:.herb,       keywords:["sleep","tired","zzz"],        hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_cloud",   emoji:"💭", name:"Thought Bubble",          category:.herb,       keywords:["think","dream","idea"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_rainbow", emoji:"🌈", name:"Rainbow",                 category:.herb,       keywords:["colors","vibe","peace"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_peace",   emoji:"☮️", name:"Peace Symbol",           category:.herb,       keywords:["peace","love","chill"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_meditate",emoji:"🧘", name:"Lotus Position",          category:.herb,       keywords:["meditate","relax","zen"],     hasSkinTones:true,  skinToneVariants:tones("🧘")),
        EmojiItem(id:"herb_green",   emoji:"💚", name:"Green Heart",             category:.herb,       keywords:["love","green","nature"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_sun2",    emoji:"🌻", name:"Sunflower",               category:.herb,       keywords:["sunshine","happy","vibe"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_couch",   emoji:"🛋️", name:"Couch",                  category:.herb,       keywords:["relax","chill","lazy"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"herb_moon2",   emoji:"🌙", name:"Moon",                    category:.herb,       keywords:["night","chill","vibes"],      hasSkinTones:false, skinToneVariants:[]),

        // Sci-Fi
        EmojiItem(id:"sci_ufo",      emoji:"🛸", name:"Flying Saucer",           category:.scifi,      keywords:["alien","ufo","abduct"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_rocket2",  emoji:"🚀", name:"Rocket",                  category:.scifi,      keywords:["space","launch","nasa"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_invader",  emoji:"👾", name:"Alien Monster",           category:.scifi,      keywords:["game","pixel","invader"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_alien",    emoji:"👽", name:"Alien",                   category:.scifi,      keywords:["extraterrestrial","space"],   hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_robot",    emoji:"🤖", name:"Robot",                   category:.scifi,      keywords:["android","ai","machine"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_galaxy",   emoji:"🌌", name:"Milky Way",               category:.scifi,      keywords:["galaxy","stars","cosmos"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_planet",   emoji:"🪐", name:"Ringed Planet",           category:.scifi,      keywords:["saturn","orbit","space"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_comet",    emoji:"☄️", name:"Comet",                   category:.scifi,      keywords:["meteor","asteroid","sky"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_star2",    emoji:"🌠", name:"Shooting Star",           category:.scifi,      keywords:["wish","star","night"],        hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_scope",    emoji:"🔭", name:"Telescope",               category:.scifi,      keywords:["observe","stars","science"],  hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_satellite",emoji:"🛰️", name:"Satellite",              category:.scifi,      keywords:["orbit","space","signal"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_dish",     emoji:"📡", name:"Satellite Dish",          category:.scifi,      keywords:["signal","broadcast","alien"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_dna",      emoji:"🧬", name:"DNA",                     category:.scifi,      keywords:["genetics","biology","clone"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_atom",     emoji:"⚛️", name:"Atom Symbol",            category:.scifi,      keywords:["nuclear","physics","science"],hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_arm",      emoji:"🦾", name:"Mechanical Arm",          category:.scifi,      keywords:["prosthetic","robot","cyber"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_mindblown",emoji:"🤯", name:"Exploding Head",          category:.scifi,      keywords:["mindblown","wow","shock"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_micro",    emoji:"🔬", name:"Microscope",              category:.scifi,      keywords:["science","lab","tiny"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_bolt",     emoji:"⚡", name:"Lightning Bolt",          category:.scifi,      keywords:["energy","power","electric"],  hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_vortex",   emoji:"🌀", name:"Cyclone",                 category:.scifi,      keywords:["vortex","warp","spiral"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_hole",     emoji:"🕳️", name:"Hole",                   category:.scifi,      keywords:["black hole","void","empty"],  hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_globe",    emoji:"🌐", name:"Globe",                   category:.scifi,      keywords:["network","world","internet"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_disk",     emoji:"💾", name:"Floppy Disk",             category:.scifi,      keywords:["save","data","retro"],        hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_battery",  emoji:"🔋", name:"Battery",                 category:.scifi,      keywords:["power","charge","energy"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_flask",    emoji:"🧪", name:"Test Tube",               category:.scifi,      keywords:["lab","experiment","science"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sci_explosion",emoji:"💥", name:"Explosion",               category:.scifi,      keywords:["boom","blast","impact"],      hasSkinTones:false, skinToneVariants:[]),

        // Horror
        EmojiItem(id:"hor_ghost2",   emoji:"👻", name:"Ghost",                   category:.horror,     keywords:["spooky","haunt","spirit"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_skull2",   emoji:"💀", name:"Skull",                   category:.horror,     keywords:["death","dead","bones"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_bones",    emoji:"☠️", name:"Skull Crossbones",       category:.horror,     keywords:["poison","pirate","death"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_zombie2",  emoji:"🧟", name:"Zombie",                  category:.horror,     keywords:["undead","walking dead"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_vampire2", emoji:"🧛", name:"Vampire",                 category:.horror,     keywords:["dracula","blood","bite"],     hasSkinTones:true,  skinToneVariants:tones("🧛")),
        EmojiItem(id:"hor_spider",   emoji:"🕷️", name:"Spider",                 category:.horror,     keywords:["web","creepy","eight legs"],  hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_web",      emoji:"🕸️", name:"Spider Web",             category:.horror,     keywords:["trap","spider","creepy"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_bat",      emoji:"🦇", name:"Bat",                     category:.horror,     keywords:["vampire","night","cave"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_grave",    emoji:"🪦", name:"Headstone",               category:.horror,     keywords:["grave","cemetery","dead"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_coffin",   emoji:"⚰️", name:"Coffin",                 category:.horror,     keywords:["dead","buried","vampire"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_blood2",   emoji:"🩸", name:"Blood Drop",              category:.horror,     keywords:["blood","wound","horror"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_scream",   emoji:"😱", name:"Screaming Face",          category:.horror,     keywords:["scream","scared","fear"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_haunted",  emoji:"🏚️", name:"Derelict House",         category:.horror,     keywords:["haunted","abandoned","ghost"],hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_knife",    emoji:"🔪", name:"Knife",                   category:.horror,     keywords:["stab","blade","horror"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_chains",   emoji:"⛓️", name:"Chains",                 category:.horror,     keywords:["bound","prisoner","trap"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_night",    emoji:"🌑", name:"New Moon",                category:.horror,     keywords:["dark","night","black"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_demon",    emoji:"😈", name:"Smiling Imp",             category:.horror,     keywords:["devil","evil","mischief"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_bone",     emoji:"🦴", name:"Bone",                    category:.horror,     keywords:["skeleton","dog","dead"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_brain2",   emoji:"🧠", name:"Brain",                   category:.horror,     keywords:["zombie","organ","mind"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_eye",      emoji:"👁️", name:"Eye",                    category:.horror,     keywords:["watching","spy","creepy"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_fog",      emoji:"🌫️", name:"Fog",                    category:.horror,     keywords:["mist","haze","eerie"],        hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_jack",     emoji:"🎃", name:"Jack-O-Lantern",          category:.horror,     keywords:["halloween","pumpkin","scary"],hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_virus",    emoji:"🦠", name:"Microbe",                 category:.horror,     keywords:["virus","germ","plague"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_tornado",  emoji:"🌪️", name:"Tornado",                category:.horror,     keywords:["storm","destruction","fear"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"hor_axe",      emoji:"🪓", name:"Axe",                     category:.horror,     keywords:["chop","horror","weapon"],     hasSkinTones:false, skinToneVariants:[]),

        // Music
        EmojiItem(id:"mus_note",     emoji:"🎵", name:"Musical Note",            category:.music,      keywords:["music","sound","melody"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_notes",    emoji:"🎶", name:"Musical Notes",           category:.music,      keywords:["music","song","melody"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_guitar2",  emoji:"🎸", name:"Guitar",                  category:.music,      keywords:["rock","string","band"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_piano",    emoji:"🎹", name:"Piano",                   category:.music,      keywords:["keyboard","classic","keys"],  hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_trumpet",  emoji:"🎺", name:"Trumpet",                 category:.music,      keywords:["jazz","brass","horn"],        hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_violin",   emoji:"🎻", name:"Violin",                  category:.music,      keywords:["strings","classic","fiddle"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_drum",     emoji:"🥁", name:"Drum",                    category:.music,      keywords:["beat","rhythm","percussion"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_bongo",    emoji:"🪘", name:"Long Drum",               category:.music,      keywords:["bongo","conga","beat"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_mic2",     emoji:"🎤", name:"Microphone",              category:.music,      keywords:["sing","perform","karaoke"],   hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_headphones2",emoji:"🎧",name:"Headphones",             category:.music,      keywords:["listen","audio","music"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_sheet",    emoji:"🎼", name:"Musical Score",           category:.music,      keywords:["sheet","compose","notes"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_cd",       emoji:"💿", name:"Optical Disk",            category:.music,      keywords:["album","record","cd"],        hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_radio",    emoji:"📻", name:"Radio",                   category:.music,      keywords:["broadcast","station","tune"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_studio",   emoji:"🎙️", name:"Studio Mic",             category:.music,      keywords:["record","broadcast","podcast"],hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_sax",      emoji:"🎷", name:"Saxophone",               category:.music,      keywords:["jazz","woodwind","blues"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_accordion",emoji:"🪗", name:"Accordion",               category:.music,      keywords:["folk","squeeze","polka"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_banjo",    emoji:"🪕", name:"Banjo",                   category:.music,      keywords:["country","strings","folk"],   hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_mixer",    emoji:"🎚️", name:"Level Slider",           category:.music,      keywords:["mix","adjust","audio"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_controls", emoji:"🎛️", name:"Control Knobs",          category:.music,      keywords:["mix","dj","produce"],         hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_speaker",  emoji:"🔊", name:"Speaker",                 category:.music,      keywords:["loud","audio","sound"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_disco",    emoji:"🪩", name:"Mirror Ball",             category:.music,      keywords:["disco","dance","party"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_theater",  emoji:"🎭", name:"Performing Arts",         category:.music,      keywords:["drama","perform","show"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_horn",     emoji:"📯", name:"Postal Horn",             category:.music,      keywords:["horn","announce","fanfare"],  hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_clapper",  emoji:"🎬", name:"Clapperboard",            category:.music,      keywords:["film","action","movie"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"mus_circus",   emoji:"🎪", name:"Circus Tent",             category:.music,      keywords:["show","perform","circus"],    hasSkinTones:false, skinToneVariants:[]),

        // Ocean
        EmojiItem(id:"sea_wave2",    emoji:"🌊", name:"Wave",                    category:.ocean,      keywords:["ocean","sea","surf","water"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_beach2",   emoji:"🏖️", name:"Beach",                  category:.ocean,      keywords:["sand","sun","vacation"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_shell",    emoji:"🐚", name:"Spiral Shell",            category:.ocean,      keywords:["shell","beach","ocean"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_crab",     emoji:"🦀", name:"Crab",                    category:.ocean,      keywords:["seafood","red","claws"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_lobster",  emoji:"🦞", name:"Lobster",                 category:.ocean,      keywords:["seafood","red","ocean"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_shrimp",   emoji:"🦐", name:"Shrimp",                  category:.ocean,      keywords:["seafood","small","pink"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_octopus",  emoji:"🐙", name:"Octopus",                 category:.ocean,      keywords:["tentacles","ink","sea"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_squid",    emoji:"🦑", name:"Squid",                   category:.ocean,      keywords:["calamari","ink","tentacles"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_fish",     emoji:"🐟", name:"Fish",                    category:.ocean,      keywords:["swim","ocean","seafood"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_tropfish", emoji:"🐠", name:"Tropical Fish",           category:.ocean,      keywords:["colorful","reef","aquarium"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_blowfish", emoji:"🐡", name:"Blowfish",                category:.ocean,      keywords:["puffer","spiky","poison"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_shark",    emoji:"🦈", name:"Shark",                   category:.ocean,      keywords:["predator","fin","danger"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_whale",    emoji:"🐳", name:"Whale",                   category:.ocean,      keywords:["big","mammal","spout"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_dolphin",  emoji:"🐬", name:"Dolphin",                 category:.ocean,      keywords:["smart","jump","mammal"],      hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_sailboat", emoji:"⛵", name:"Sailboat",                category:.ocean,      keywords:["sail","wind","voyage"],       hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_surf",     emoji:"🏄", name:"Surfing",                 category:.ocean,      keywords:["surf","wave","sport"],        hasSkinTones:true,  skinToneVariants:tones("🏄")),
        EmojiItem(id:"sea_dive",     emoji:"🤿", name:"Diving Mask",             category:.ocean,      keywords:["scuba","snorkel","dive"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_island",   emoji:"🏝️", name:"Desert Island",          category:.ocean,      keywords:["tropical","palm","paradise"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_anchor",   emoji:"⚓", name:"Anchor",                  category:.ocean,      keywords:["ship","dock","navy"],         hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_coral",    emoji:"🪸", name:"Coral",                   category:.ocean,      keywords:["reef","colorful","ocean"],    hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_seal",     emoji:"🦭", name:"Seal",                    category:.ocean,      keywords:["mammal","flipper","arctic"],  hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_palm",     emoji:"🌴", name:"Palm Tree",               category:.ocean,      keywords:["beach","tropical","coconut"], hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_mermaid",  emoji:"🧜", name:"Mermaid",                 category:.ocean,      keywords:["myth","sea","fantasy"],       hasSkinTones:true,  skinToneVariants:tones("🧜")),
        EmojiItem(id:"sea_flamingo", emoji:"🦩", name:"Flamingo",                category:.ocean,      keywords:["pink","bird","tropical"],     hasSkinTones:false, skinToneVariants:[]),
        EmojiItem(id:"sea_whale2",   emoji:"🐋", name:"Blue Whale",              category:.ocean,      keywords:["blue whale","ocean","big"],   hasSkinTones:false, skinToneVariants:[]),
    ]

    static func byCategory(_ category: EmojiCategory) -> [EmojiItem] {
        all.filter { $0.category == category }
    }

    static func search(query: String) -> [EmojiItem] {
        let q = query.lowercased()
        return all.filter {
            $0.name.lowercased().contains(q) || $0.keywords.contains { $0.contains(q) }
        }
    }
}
