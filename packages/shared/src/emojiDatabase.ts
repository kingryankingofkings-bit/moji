import { Emoji, EmojiCategory, SkinTone } from './types';

const SKIN_TONE_MODIFIERS = [SkinTone.LIGHT, SkinTone.MEDIUM_LIGHT, SkinTone.MEDIUM, SkinTone.MEDIUM_DARK, SkinTone.DARK];

const applySkinTones = (baseEmoji: string): string[] => {
  return SKIN_TONE_MODIFIERS.map(tone => baseEmoji + tone);
};

const emojis: Emoji[] = [
  // Smileys & Emotion
  { id: 'grinning_face', emoji: '😀', name: 'Grinning Face', category: EmojiCategory.SMILEYS, keywords: ['smile', 'happy', 'face'], hasSkinTones: false },
  { id: 'beaming_face', emoji: '😁', name: 'Beaming Face with Smiling Eyes', category: EmojiCategory.SMILEYS, keywords: ['smile', 'happy', 'joy'], hasSkinTones: false },
  { id: 'face_with_joy', emoji: '😂', name: 'Face with Tears of Joy', category: EmojiCategory.SMILEYS, keywords: ['laugh', 'happy', 'cry'], hasSkinTones: false },
  { id: 'rolling_on_floor', emoji: '🤣', name: 'Rolling on the Floor Laughing', category: EmojiCategory.SMILEYS, keywords: ['laugh', 'happy', 'floor'], hasSkinTones: false },
  { id: 'smiling_face', emoji: '☺️', name: 'Smiling Face', category: EmojiCategory.SMILEYS, keywords: ['smile', 'happy'], hasSkinTones: false },
  { id: 'sweat_smile', emoji: '😅', name: 'Smiling Face with Sweat', category: EmojiCategory.SMILEYS, keywords: ['smile', 'sweat', 'hot'], hasSkinTones: false },
  { id: 'joy_face', emoji: '😆', name: 'Grinning Face with Smiling Eyes', category: EmojiCategory.SMILEYS, keywords: ['laugh', 'happy', 'joy'], hasSkinTones: false },
  { id: 'winking_face', emoji: '😉', name: 'Winking Face', category: EmojiCategory.SMILEYS, keywords: ['wink', 'smile'], hasSkinTones: false },
  { id: 'smiling_sweat', emoji: '😊', name: 'Smiling Face with Smiling Eyes', category: EmojiCategory.SMILEYS, keywords: ['smile', 'happy', 'joy'], hasSkinTones: false },
  { id: 'innocent_face', emoji: '😇', name: 'Smiling Face with Halo', category: EmojiCategory.SMILEYS, keywords: ['angel', 'halo', 'innocent'], hasSkinTones: false },
  { id: 'heart_eyes', emoji: '😍', name: 'Smiling Face with Heart Eyes', category: EmojiCategory.SMILEYS, keywords: ['love', 'heart', 'happy'], hasSkinTones: false },
  { id: 'star_eyes', emoji: '🤩', name: 'Smiling Face with Star Eyes', category: EmojiCategory.SMILEYS, keywords: ['star', 'eyes', 'love'], hasSkinTones: false },
  { id: 'kissing_heart', emoji: '😘', name: 'Kissing Face with Heart Eyes', category: EmojiCategory.SMILEYS, keywords: ['kiss', 'heart', 'love'], hasSkinTones: false },
  { id: 'thinking', emoji: '🤔', name: 'Thinking Face', category: EmojiCategory.SMILEYS, keywords: ['think', 'puzzle', 'confused'], hasSkinTones: false },
  { id: 'mouth_open', emoji: '😮', name: 'Surprised Face', category: EmojiCategory.SMILEYS, keywords: ['surprise', 'amazed', 'shocked'], hasSkinTones: false },
  { id: 'raised_eyebrow', emoji: '🤨', name: 'Raised Eyebrow', category: EmojiCategory.SMILEYS, keywords: ['doubt', 'skeptical', 'eyebrow'], hasSkinTones: false },
  { id: 'neutral', emoji: '😐', name: 'Neutral Face', category: EmojiCategory.SMILEYS, keywords: ['neutral', 'unimpressed'], hasSkinTones: false },
  { id: 'expressionless', emoji: '😑', name: 'Expressionless Face', category: EmojiCategory.SMILEYS, keywords: ['meh', 'blank', 'unimpressed'], hasSkinTones: false },
  { id: 'confused', emoji: '😕', name: 'Confused Face', category: EmojiCategory.SMILEYS, keywords: ['confused', 'unsure'], hasSkinTones: false },
  { id: 'worried', emoji: '😟', name: 'Worried Face', category: EmojiCategory.SMILEYS, keywords: ['worry', 'scared', 'concerned'], hasSkinTones: false },
  { id: 'angry', emoji: '😠', name: 'Angry Face', category: EmojiCategory.SMILEYS, keywords: ['angry', 'mean', 'face'], hasSkinTones: false },
  { id: 'rage', emoji: '😡', name: 'Pouting Face', category: EmojiCategory.SMILEYS, keywords: ['angry', 'rage', 'hate'], hasSkinTones: false },
  { id: 'crying', emoji: '😢', name: 'Crying Face', category: EmojiCategory.SMILEYS, keywords: ['sad', 'cry', 'tear'], hasSkinTones: false },
  { id: 'sad', emoji: '😞', name: 'Disappointed Face', category: EmojiCategory.SMILEYS, keywords: ['sad', 'disappointed'], hasSkinTones: false },
  { id: 'triumph', emoji: '😤', name: 'Face with Steam from Nose', category: EmojiCategory.SMILEYS, keywords: ['frustration', 'steam'], hasSkinTones: false },
  { id: 'frowning', emoji: '🙁', name: 'Slightly Frowning Face', category: EmojiCategory.SMILEYS, keywords: ['frown', 'sad'], hasSkinTones: false },
  { id: 'anguished', emoji: '😧', name: 'Anguished Face', category: EmojiCategory.SMILEYS, keywords: ['scared', 'shocked'], hasSkinTones: false },
  { id: 'scream', emoji: '😱', name: 'Face Screaming in Fear', category: EmojiCategory.SMILEYS, keywords: ['scary', 'shocked', 'afraid'], hasSkinTones: false },
  { id: 'astonished', emoji: '😲', name: 'Astonished Face', category: EmojiCategory.SMILEYS, keywords: ['surprised', 'shocked', 'amazed'], hasSkinTones: false },
  { id: 'flushed', emoji: '😳', name: 'Flushed Face', category: EmojiCategory.SMILEYS, keywords: ['blush', 'shy', 'embarrassed'], hasSkinTones: false },
  { id: 'sleeping', emoji: '😴', name: 'Sleeping Face', category: EmojiCategory.SMILEYS, keywords: ['sleep', 'tired'], hasSkinTones: false },
  { id: 'dizzy', emoji: '😵', name: 'Dizzy Face', category: EmojiCategory.SMILEYS, keywords: ['dizzy', 'confused'], hasSkinTones: false },
  { id: 'face_with_mask', emoji: '😷', name: 'Face with Medical Mask', category: EmojiCategory.SMILEYS, keywords: ['sick', 'medical', 'mask'], hasSkinTones: false },
  { id: 'grinning_sweat', emoji: '😬', name: 'Grimacing Face', category: EmojiCategory.SMILEYS, keywords: ['grimace', 'awkward'], hasSkinTones: false },
  { id: 'hugging_face', emoji: '🤗', name: 'Hugging Face', category: EmojiCategory.SMILEYS, keywords: ['hug', 'support'], hasSkinTones: false },
  { id: 'thinking_face', emoji: '🤨', name: 'Face with Raised Eyebrow', category: EmojiCategory.SMILEYS, keywords: ['think', 'suspicious'], hasSkinTones: false },
  { id: 'shushing_face', emoji: '🤫', name: 'Shushing Face', category: EmojiCategory.SMILEYS, keywords: ['shush', 'quiet', 'silence'], hasSkinTones: false },
  { id: 'nauseated_face', emoji: '🤢', name: 'Nauseated Face', category: EmojiCategory.SMILEYS, keywords: ['sick', 'puke'], hasSkinTones: false },
  { id: 'sneezing_face', emoji: '🤧', name: 'Sneezing Face', category: EmojiCategory.SMILEYS, keywords: ['sneeze', 'sick'], hasSkinTones: false },
  { id: 'vomiting_face', emoji: '🤮', name: 'Vomiting Face', category: EmojiCategory.SMILEYS, keywords: ['vomit', 'sick'], hasSkinTones: false },
  { id: 'hot_face', emoji: '🥵', name: 'Hot Face', category: EmojiCategory.SMILEYS, keywords: ['hot', 'heat', 'warm'], hasSkinTones: false },
  { id: 'cold_face', emoji: '🥶', name: 'Cold Face', category: EmojiCategory.SMILEYS, keywords: ['cold', 'freezing'], hasSkinTones: false },
  { id: 'weary_face', emoji: '😩', name: 'Weary Face', category: EmojiCategory.SMILEYS, keywords: ['tired', 'exhausted'], hasSkinTones: false },
  { id: 'tired_face', emoji: '😫', name: 'Tired Face', category: EmojiCategory.SMILEYS, keywords: ['tired', 'sleepy'], hasSkinTones: false },

  // People
  { id: 'wave', emoji: '👋', name: 'Waving Hand', category: EmojiCategory.PEOPLE, keywords: ['wave', 'hello', 'goodbye'], hasSkinTones: true, skinToneVariants: applySkinTones('👋') },
  { id: 'raised_back_hand', emoji: '🤚', name: 'Raised Back of Hand', category: EmojiCategory.PEOPLE, keywords: ['hand', 'raised'], hasSkinTones: true, skinToneVariants: applySkinTones('🤚') },
  { id: 'raised_hand', emoji: '✋', name: 'Raised Hand', category: EmojiCategory.PEOPLE, keywords: ['hand', 'raised', 'stop'], hasSkinTones: true, skinToneVariants: applySkinTones('✋') },
  { id: 'vulcan_salute', emoji: '🖖', name: 'Vulcan Salute', category: EmojiCategory.PEOPLE, keywords: ['hand', 'peace'], hasSkinTones: true, skinToneVariants: applySkinTones('🖖') },
  { id: 'ok_hand', emoji: '👌', name: 'OK Hand', category: EmojiCategory.PEOPLE, keywords: ['ok', 'good', 'perfect'], hasSkinTones: true, skinToneVariants: applySkinTones('👌') },
  { id: 'pinching_hand', emoji: '🤏', name: 'Pinching Hand', category: EmojiCategory.PEOPLE, keywords: ['pinch', 'small'], hasSkinTones: true, skinToneVariants: applySkinTones('🤏') },
  { id: 'victory', emoji: '✌️', name: 'Victory Hand', category: EmojiCategory.PEOPLE, keywords: ['peace', 'victory'], hasSkinTones: true, skinToneVariants: applySkinTones('✌️') },
  { id: 'love_you', emoji: '🤟', name: 'I Love You Hand Sign', category: EmojiCategory.PEOPLE, keywords: ['love', 'gesture'], hasSkinTones: true, skinToneVariants: applySkinTones('🤟') },
  { id: 'metal', emoji: '🤘', name: 'Sign of the Horns', category: EmojiCategory.PEOPLE, keywords: ['rock', 'metal', 'horns'], hasSkinTones: true, skinToneVariants: applySkinTones('🤘') },
  { id: 'call_me', emoji: '🤙', name: 'Call Me Hand', category: EmojiCategory.PEOPLE, keywords: ['call', 'phone'], hasSkinTones: true, skinToneVariants: applySkinTones('🤙') },
  { id: 'point_left', emoji: '👈', name: 'Backhand Index Pointing Left', category: EmojiCategory.PEOPLE, keywords: ['point', 'left', 'arrow'], hasSkinTones: true, skinToneVariants: applySkinTones('👈') },
  { id: 'point_right', emoji: '👉', name: 'Backhand Index Pointing Right', category: EmojiCategory.PEOPLE, keywords: ['point', 'right', 'arrow'], hasSkinTones: true, skinToneVariants: applySkinTones('👉') },
  { id: 'point_up_2', emoji: '👆', name: 'Backhand Index Pointing Up', category: EmojiCategory.PEOPLE, keywords: ['point', 'up', 'arrow'], hasSkinTones: true, skinToneVariants: applySkinTones('👆') },
  { id: 'point_down', emoji: '👇', name: 'Backhand Index Pointing Down', category: EmojiCategory.PEOPLE, keywords: ['point', 'down', 'arrow'], hasSkinTones: true, skinToneVariants: applySkinTones('👇') },
  { id: 'point_up', emoji: '☝️', name: 'Index Pointing Up', category: EmojiCategory.PEOPLE, keywords: ['point', 'up', 'arrow'], hasSkinTones: true, skinToneVariants: applySkinTones('☝️') },
  { id: 'thumbsup', emoji: '👍', name: 'Thumbs Up', category: EmojiCategory.PEOPLE, keywords: ['thumbs', 'up', 'good'], hasSkinTones: true, skinToneVariants: applySkinTones('👍') },
  { id: 'thumbsdown', emoji: '👎', name: 'Thumbs Down', category: EmojiCategory.PEOPLE, keywords: ['thumbs', 'down', 'bad'], hasSkinTones: true, skinToneVariants: applySkinTones('👎') },
  { id: 'fist', emoji: '✊', name: 'Raised Fist', category: EmojiCategory.PEOPLE, keywords: ['fist', 'power', 'punch'], hasSkinTones: true, skinToneVariants: applySkinTones('✊') },
  { id: 'facepunch', emoji: '👊', name: 'Oncoming Fist', category: EmojiCategory.PEOPLE, keywords: ['fist', 'punch', 'punch'], hasSkinTones: true, skinToneVariants: applySkinTones('👊') },
  { id: 'handshake', emoji: '🤝', name: 'Handshake', category: EmojiCategory.PEOPLE, keywords: ['hand', 'shake', 'deal'], hasSkinTones: false },
  { id: 'clap', emoji: '👏', name: 'Clapping Hands', category: EmojiCategory.PEOPLE, keywords: ['clap', 'applause'], hasSkinTones: true, skinToneVariants: applySkinTones('👏') },
  { id: 'raised_hands', emoji: '🙌', name: 'Raising Hands', category: EmojiCategory.PEOPLE, keywords: ['celebration', 'party'], hasSkinTones: true, skinToneVariants: applySkinTones('🙌') },
  { id: 'open_hands', emoji: '👐', name: 'Open Hands', category: EmojiCategory.PEOPLE, keywords: ['hands', 'open'], hasSkinTones: true, skinToneVariants: applySkinTones('👐') },
  { id: 'palms_up', emoji: '🤲', name: 'Open Hands with Fingers Splayed', category: EmojiCategory.PEOPLE, keywords: ['hands', 'palms'], hasSkinTones: true, skinToneVariants: applySkinTones('🤲') },
  { id: 'handwriting', emoji: '👋', name: 'Writing Hand', category: EmojiCategory.PEOPLE, keywords: ['write', 'hand'], hasSkinTones: true, skinToneVariants: applySkinTones('👋') },
  { id: 'nail_care', emoji: '💅', name: 'Nail Polish', category: EmojiCategory.PEOPLE, keywords: ['nails', 'beauty'], hasSkinTones: true, skinToneVariants: applySkinTones('💅') },
  { id: 'lips', emoji: '👄', name: 'Lips', category: EmojiCategory.PEOPLE, keywords: ['mouth', 'kiss'], hasSkinTones: false },
  { id: 'tooth', emoji: '👦', name: 'Boy', category: EmojiCategory.PEOPLE, keywords: ['boy', 'child'], hasSkinTones: true, skinToneVariants: applySkinTones('👦') },

  // Nature
  { id: 'dog', emoji: '🐶', name: 'Dog Face', category: EmojiCategory.NATURE, keywords: ['dog', 'pet', 'woof'], hasSkinTones: false },
  { id: 'cat', emoji: '🐱', name: 'Cat Face', category: EmojiCategory.NATURE, keywords: ['cat', 'pet', 'meow'], hasSkinTones: false },
  { id: 'monkey', emoji: '🐵', name: 'Monkey Face', category: EmojiCategory.NATURE, keywords: ['monkey', 'animal'], hasSkinTones: false },
  { id: 'chicken', emoji: '🐔', name: 'Chicken', category: EmojiCategory.NATURE, keywords: ['chicken', 'bird'], hasSkinTones: false },
  { id: 'penguin', emoji: '🐧', name: 'Penguin', category: EmojiCategory.NATURE, keywords: ['penguin', 'bird'], hasSkinTones: false },
  { id: 'fish', emoji: '🐟', name: 'Fish', category: EmojiCategory.NATURE, keywords: ['fish', 'water', 'animal'], hasSkinTones: false },
  { id: 'butterfly', emoji: '🦋', name: 'Butterfly', category: EmojiCategory.NATURE, keywords: ['butterfly', 'insect', 'nature'], hasSkinTones: false },
  { id: 'flower', emoji: '🌸', name: 'Cherry Blossom', category: EmojiCategory.NATURE, keywords: ['flower', 'spring'], hasSkinTones: false },
  { id: 'sunflower', emoji: '🌻', name: 'Sunflower', category: EmojiCategory.NATURE, keywords: ['sunflower', 'flower', 'nature'], hasSkinTones: false },
  { id: 'rose', emoji: '🌹', name: 'Rose', category: EmojiCategory.NATURE, keywords: ['rose', 'flower', 'love'], hasSkinTones: false },
  { id: 'hibiscus', emoji: '🌺', name: 'Hibiscus', category: EmojiCategory.NATURE, keywords: ['flower', 'hibiscus'], hasSkinTones: false },
  { id: 'tree', emoji: '🌳', name: 'Deciduous Tree', category: EmojiCategory.NATURE, keywords: ['tree', 'nature'], hasSkinTones: false },
  { id: 'evergreen_tree', emoji: '🌲', name: 'Evergreen Tree', category: EmojiCategory.NATURE, keywords: ['tree', 'nature'], hasSkinTones: false },
  { id: 'palm_tree', emoji: '🌴', name: 'Palm Tree', category: EmojiCategory.NATURE, keywords: ['palm', 'tree', 'beach'], hasSkinTones: false },

  // Food & Drink
  { id: 'apple', emoji: '🍎', name: 'Red Apple', category: EmojiCategory.FOOD, keywords: ['apple', 'fruit', 'red'], hasSkinTones: false },
  { id: 'banana', emoji: '🍌', name: 'Banana', category: EmojiCategory.FOOD, keywords: ['banana', 'fruit', 'yellow'], hasSkinTones: false },
  { id: 'orange', emoji: '🍊', name: 'Orange', category: EmojiCategory.FOOD, keywords: ['orange', 'fruit', 'citrus'], hasSkinTones: false },
  { id: 'lemon', emoji: '🍋', name: 'Lemon', category: EmojiCategory.FOOD, keywords: ['lemon', 'fruit', 'citrus'], hasSkinTones: false },
  { id: 'strawberry', emoji: '🍓', name: 'Strawberry', category: EmojiCategory.FOOD, keywords: ['strawberry', 'fruit', 'red'], hasSkinTones: false },
  { id: 'grapes', emoji: '🍇', name: 'Grapes', category: EmojiCategory.FOOD, keywords: ['grapes', 'fruit', 'wine'], hasSkinTones: false },
  { id: 'watermelon', emoji: '🍉', name: 'Watermelon', category: EmojiCategory.FOOD, keywords: ['watermelon', 'fruit', 'summer'], hasSkinTones: false },
  { id: 'bread', emoji: '🍞', name: 'Bread', category: EmojiCategory.FOOD, keywords: ['bread', 'bake'], hasSkinTones: false },
  { id: 'pizza', emoji: '🍕', name: 'Pizza', category: EmojiCategory.FOOD, keywords: ['pizza', 'food', 'italian'], hasSkinTones: false },
  { id: 'hamburger', emoji: '🍔', name: 'Hamburger', category: EmojiCategory.FOOD, keywords: ['hamburger', 'food', 'burger'], hasSkinTones: false },
  { id: 'fries', emoji: '🍟', name: 'French Fries', category: EmojiCategory.FOOD, keywords: ['fries', 'food'], hasSkinTones: false },
  { id: 'popcorn', emoji: '🍿', name: 'Popcorn', category: EmojiCategory.FOOD, keywords: ['popcorn', 'food', 'movie'], hasSkinTones: false },
  { id: 'cake', emoji: '🍰', name: 'Cake', category: EmojiCategory.FOOD, keywords: ['cake', 'dessert'], hasSkinTones: false },
  { id: 'ice_cream', emoji: '🍦', name: 'Soft Ice Cream', category: EmojiCategory.FOOD, keywords: ['ice cream', 'dessert'], hasSkinTones: false },
  { id: 'coffee', emoji: '☕', name: 'Hot Beverage', category: EmojiCategory.FOOD, keywords: ['coffee', 'tea', 'hot'], hasSkinTones: false },
  { id: 'beer', emoji: '🍺', name: 'Beer Mug', category: EmojiCategory.FOOD, keywords: ['beer', 'alcohol'], hasSkinTones: false },
  { id: 'wine_glass', emoji: '🍷', name: 'Wine Glass', category: EmojiCategory.FOOD, keywords: ['wine', 'alcohol'], hasSkinTones: false },

  // Travel & Places
  { id: 'airplane', emoji: '✈️', name: 'Airplane', category: EmojiCategory.TRAVEL, keywords: ['airplane', 'travel', 'flight'], hasSkinTones: false },
  { id: 'rocket', emoji: '🚀', name: 'Rocket', category: EmojiCategory.TRAVEL, keywords: ['rocket', 'space', 'launch'], hasSkinTones: false },
  { id: 'car', emoji: '🚗', name: 'Automobile', category: EmojiCategory.TRAVEL, keywords: ['car', 'vehicle'], hasSkinTones: false },
  { id: 'train', emoji: '🚂', name: 'Locomotive', category: EmojiCategory.TRAVEL, keywords: ['train', 'travel'], hasSkinTones: false },
  { id: 'ship', emoji: '⛴️', name: 'Ferry', category: EmojiCategory.TRAVEL, keywords: ['ship', 'boat', 'travel'], hasSkinTones: false },
  { id: 'world_map', emoji: '🗺️', name: 'World Map', category: EmojiCategory.TRAVEL, keywords: ['map', 'world'], hasSkinTones: false },
  { id: 'mountain', emoji: '⛰️', name: 'Mountain', category: EmojiCategory.TRAVEL, keywords: ['mountain', 'nature'], hasSkinTones: false },
  { id: 'beach', emoji: '🏖️', name: 'Beach with Umbrella', category: EmojiCategory.TRAVEL, keywords: ['beach', 'sand', 'vacation'], hasSkinTones: false },
  { id: 'sunrise', emoji: '🌅', name: 'Sunrise', category: EmojiCategory.TRAVEL, keywords: ['sunrise', 'morning'], hasSkinTones: false },
  { id: 'sunset', emoji: '🌇', name: 'Sunset', category: EmojiCategory.TRAVEL, keywords: ['sunset', 'evening'], hasSkinTones: false },
  { id: 'rainbow', emoji: '🌈', name: 'Rainbow', category: EmojiCategory.TRAVEL, keywords: ['rainbow', 'weather'], hasSkinTones: false },
  { id: 'house', emoji: '🏠', name: 'House', category: EmojiCategory.TRAVEL, keywords: ['house', 'home', 'building'], hasSkinTones: false },
  { id: 'office_building', emoji: '🏢', name: 'Office Building', category: EmojiCategory.TRAVEL, keywords: ['office', 'building'], hasSkinTones: false },
  { id: 'statue_of_liberty', emoji: '🗽', name: 'Statue of Liberty', category: EmojiCategory.TRAVEL, keywords: ['statue', 'liberty'], hasSkinTones: false },

  // Activities
  { id: 'soccer', emoji: '⚽', name: 'Soccer Ball', category: EmojiCategory.ACTIVITIES, keywords: ['soccer', 'football', 'sports'], hasSkinTones: false },
  { id: 'basketball', emoji: '🏀', name: 'Basketball', category: EmojiCategory.ACTIVITIES, keywords: ['basketball', 'sports'], hasSkinTones: false },
  { id: 'baseball', emoji: '⚾', name: 'Baseball', category: EmojiCategory.ACTIVITIES, keywords: ['baseball', 'sports'], hasSkinTones: false },
  { id: 'american_football', emoji: '🏈', name: 'American Football', category: EmojiCategory.ACTIVITIES, keywords: ['football', 'sports'], hasSkinTones: false },
  { id: 'tennis', emoji: '🎾', name: 'Tennis', category: EmojiCategory.ACTIVITIES, keywords: ['tennis', 'sports'], hasSkinTones: false },
  { id: 'bowling', emoji: '🎳', name: 'Bowling', category: EmojiCategory.ACTIVITIES, keywords: ['bowling', 'sports'], hasSkinTones: false },
  { id: 'video_game', emoji: '🎮', name: 'Video Game', category: EmojiCategory.ACTIVITIES, keywords: ['game', 'gaming'], hasSkinTones: false },
  { id: 'guitar', emoji: '🎸', name: 'Guitar', category: EmojiCategory.ACTIVITIES, keywords: ['guitar', 'music'], hasSkinTones: false },
  { id: 'musical_note', emoji: '🎵', name: 'Musical Note', category: EmojiCategory.ACTIVITIES, keywords: ['music', 'note'], hasSkinTones: false },
  { id: 'microphone', emoji: '🎤', name: 'Microphone', category: EmojiCategory.ACTIVITIES, keywords: ['microphone', 'sing'], hasSkinTones: false },

  // Objects
  { id: 'watch', emoji: '⌚', name: 'Watch', category: EmojiCategory.OBJECTS, keywords: ['watch', 'time'], hasSkinTones: false },
  { id: 'iphone', emoji: '📱', name: 'Mobile Phone', category: EmojiCategory.OBJECTS, keywords: ['phone', 'mobile'], hasSkinTones: false },
  { id: 'computer', emoji: '💻', name: 'Laptop', category: EmojiCategory.OBJECTS, keywords: ['computer', 'laptop'], hasSkinTones: false },
  { id: 'keyboard', emoji: '⌨️', name: 'Keyboard', category: EmojiCategory.OBJECTS, keywords: ['keyboard', 'type'], hasSkinTones: false },
  { id: 'mouse', emoji: '🖱️', name: 'Computer Mouse', category: EmojiCategory.OBJECTS, keywords: ['mouse', 'computer'], hasSkinTones: false },
  { id: 'camera', emoji: '📷', name: 'Camera', category: EmojiCategory.OBJECTS, keywords: ['camera', 'photo'], hasSkinTones: false },
  { id: 'movie_camera', emoji: '🎥', name: 'Movie Camera', category: EmojiCategory.OBJECTS, keywords: ['camera', 'movie', 'video'], hasSkinTones: false },
  { id: 'television', emoji: '📺', name: 'Television', category: EmojiCategory.OBJECTS, keywords: ['tv', 'television'], hasSkinTones: false },
  { id: 'radio', emoji: '📻', name: 'Radio', category: EmojiCategory.OBJECTS, keywords: ['radio', 'broadcast'], hasSkinTones: false },
  { id: 'headphones', emoji: '🎧', name: 'Headphone', category: EmojiCategory.OBJECTS, keywords: ['headphones', 'music'], hasSkinTones: false },
  { id: 'briefcase', emoji: '💼', name: 'Briefcase', category: EmojiCategory.OBJECTS, keywords: ['briefcase', 'work'], hasSkinTones: false },
  { id: 'book', emoji: '📖', name: 'Open Book', category: EmojiCategory.OBJECTS, keywords: ['book', 'read'], hasSkinTones: false },
  { id: 'newspaper', emoji: '📰', name: 'Newspaper', category: EmojiCategory.OBJECTS, keywords: ['newspaper', 'news'], hasSkinTones: false },
  { id: 'gift', emoji: '🎁', name: 'Wrapped Gift', category: EmojiCategory.OBJECTS, keywords: ['gift', 'present'], hasSkinTones: false },
  { id: 'alarm_clock', emoji: '⏰', name: 'Alarm Clock', category: EmojiCategory.OBJECTS, keywords: ['alarm', 'clock', 'time'], hasSkinTones: false },
  { id: 'hourglass', emoji: '⌛', name: 'Hourglass Done', category: EmojiCategory.OBJECTS, keywords: ['hourglass', 'time'], hasSkinTones: false },
  { id: 'bulb', emoji: '💡', name: 'Light Bulb', category: EmojiCategory.OBJECTS, keywords: ['light', 'bulb', 'idea'], hasSkinTones: false },
  { id: 'flashlight', emoji: '🔦', name: 'Flashlight', category: EmojiCategory.OBJECTS, keywords: ['flashlight', 'light'], hasSkinTones: false },
  { id: 'candle', emoji: '🕯️', name: 'Candle', category: EmojiCategory.OBJECTS, keywords: ['candle', 'light'], hasSkinTones: false },
  { id: 'lock', emoji: '🔒', name: 'Locked', category: EmojiCategory.OBJECTS, keywords: ['lock', 'secure'], hasSkinTones: false },
  { id: 'key', emoji: '🔑', name: 'Key', category: EmojiCategory.OBJECTS, keywords: ['key', 'access'], hasSkinTones: false },
  { id: 'hammer', emoji: '🔨', name: 'Hammer', category: EmojiCategory.OBJECTS, keywords: ['hammer', 'tool'], hasSkinTones: false },
  { id: 'gun', emoji: '🔫', name: 'Pistol', category: EmojiCategory.OBJECTS, keywords: ['gun', 'weapon'], hasSkinTones: false },
  { id: 'axe', emoji: '🪓', name: 'Axe', category: EmojiCategory.OBJECTS, keywords: ['axe', 'tool'], hasSkinTones: false },

  // Symbols
  { id: 'heart', emoji: '❤️', name: 'Red Heart', category: EmojiCategory.SYMBOLS, keywords: ['heart', 'love', 'red'], hasSkinTones: false },
  { id: 'orange_heart', emoji: '🧡', name: 'Orange Heart', category: EmojiCategory.SYMBOLS, keywords: ['heart', 'love', 'orange'], hasSkinTones: false },
  { id: 'yellow_heart', emoji: '💛', name: 'Yellow Heart', category: EmojiCategory.SYMBOLS, keywords: ['heart', 'love', 'yellow'], hasSkinTones: false },
  { id: 'green_heart', emoji: '💚', name: 'Green Heart', category: EmojiCategory.SYMBOLS, keywords: ['heart', 'love', 'green'], hasSkinTones: false },
  { id: 'blue_heart', emoji: '💙', name: 'Blue Heart', category: EmojiCategory.SYMBOLS, keywords: ['heart', 'love', 'blue'], hasSkinTones: false },
  { id: 'purple_heart', emoji: '💜', name: 'Purple Heart', category: EmojiCategory.SYMBOLS, keywords: ['heart', 'love', 'purple'], hasSkinTones: false },
  { id: 'black_heart', emoji: '🖤', name: 'Black Heart', category: EmojiCategory.SYMBOLS, keywords: ['heart', 'black'], hasSkinTones: false },
  { id: 'white_heart', emoji: '🤍', name: 'White Heart', category: EmojiCategory.SYMBOLS, keywords: ['heart', 'white'], hasSkinTones: false },
  { id: 'broken_heart', emoji: '💔', name: 'Broken Heart', category: EmojiCategory.SYMBOLS, keywords: ['heart', 'sad', 'broken'], hasSkinTones: false },
  { id: 'star', emoji: '⭐', name: 'Star', category: EmojiCategory.SYMBOLS, keywords: ['star', 'favorite'], hasSkinTones: false },
  { id: 'sun', emoji: '☀️', name: 'Sun', category: EmojiCategory.SYMBOLS, keywords: ['sun', 'weather'], hasSkinTones: false },
  { id: 'moon', emoji: '🌙', name: 'Crescent Moon', category: EmojiCategory.SYMBOLS, keywords: ['moon', 'night'], hasSkinTones: false },
  { id: 'fire', emoji: '🔥', name: 'Fire', category: EmojiCategory.SYMBOLS, keywords: ['fire', 'hot', 'flame'], hasSkinTones: false },
  { id: 'sparkles', emoji: '✨', name: 'Sparkles', category: EmojiCategory.SYMBOLS, keywords: ['sparkles', 'glitter'], hasSkinTones: false },
  { id: 'snowflake', emoji: '❄️', name: 'Snowflake', category: EmojiCategory.SYMBOLS, keywords: ['snowflake', 'cold', 'winter'], hasSkinTones: false },
  { id: 'check_mark', emoji: '✅', name: 'Check Mark Button', category: EmojiCategory.SYMBOLS, keywords: ['check', 'mark', 'ok'], hasSkinTones: false },
  { id: 'x', emoji: '❌', name: 'Cross Mark', category: EmojiCategory.SYMBOLS, keywords: ['cross', 'mark', 'wrong'], hasSkinTones: false },
  { id: 'warning', emoji: '⚠️', name: 'Warning', category: EmojiCategory.SYMBOLS, keywords: ['warning', 'alert'], hasSkinTones: false },
  { id: 'forbidden', emoji: '🚫', name: 'Prohibited', category: EmojiCategory.SYMBOLS, keywords: ['forbidden', 'no'], hasSkinTones: false },
  { id: 'question_mark', emoji: '❓', name: 'Red Question Mark', category: EmojiCategory.SYMBOLS, keywords: ['question', 'mark', 'help'], hasSkinTones: false },
  { id: 'grey_question_mark', emoji: '❔', name: 'White Question Mark', category: EmojiCategory.SYMBOLS, keywords: ['question', 'mark'], hasSkinTones: false },
  { id: 'exclamation', emoji: '❕', name: 'White Exclamation Mark', category: EmojiCategory.SYMBOLS, keywords: ['exclamation', 'mark'], hasSkinTones: false },
  { id: 'heavy_exclamation_mark', emoji: '❗', name: 'Heavy Exclamation Mark Symbol', category: EmojiCategory.SYMBOLS, keywords: ['exclamation', 'mark'], hasSkinTones: false },
  { id: 'hundred_points', emoji: '💯', name: 'Hundred Points', category: EmojiCategory.SYMBOLS, keywords: ['100', 'score'], hasSkinTones: false },
  { id: 'zzz', emoji: '💤', name: 'Zzz', category: EmojiCategory.SYMBOLS, keywords: ['sleep', 'zzz'], hasSkinTones: false },
];

export const emojiDatabase = new Map<string, Emoji>();

emojis.forEach(emoji => {
  emojiDatabase.set(emoji.id, emoji);
});

export const getEmojisByCategory = (category: EmojiCategory): Emoji[] => {
  return emojis.filter(emoji => emoji.category === category);
};

export const searchEmojis = (query: string): Emoji[] => {
  const lowerQuery = query.toLowerCase();
  return emojis.filter(emoji =>
    emoji.name.toLowerCase().includes(lowerQuery) ||
    emoji.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
  );
};

export const getAllCategories = (): EmojiCategory[] => {
  return Object.values(EmojiCategory).filter(cat => cat !== EmojiCategory.RECENT);
};

export default emojis;
