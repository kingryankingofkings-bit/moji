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
