const symbols = [
  {
    decimal: 128176,
    hex: 0x1F4B0,
    category: "money",
    name: "Money bag",
    symbol: "💰",
    keywords: ["money", "bag", "dollar", "yellow", "green"]
  },
  {
    decimal: 128177,
    hex: 0x1F4B1,
    category: "money",
    name: "Currency exchange",
    symbol: "💱",
    keywords: ["currency", "exchange", "yen", "dollar"]
  },
  {
    decimal: 128183,
    hex: 0x1F4B7,
    category: "money",
    name: "Banknote pound",
    symbol: "💷",
    keywords: ["bank", "note", "pound", "£"]
  },
  {
    decimal: 128178,
    hex: 0x1F4B2,
    category: "money",
    name: "Dollar sign",
    symbol: "💲",
    keywords: ["dollar", "sign", "$", "green"]
  },
  {
    decimal: 128179,
    hex: 0x1F4B3,
    category: "money",
    name: "Credit card",
    symbol: "💳",
    keywords: ["credit", "card", "cc", "master", "visa", "yellow", "gold"]
  },
  {
    decimal: 128180,
    hex: 0x1F4B4,
    category: "money",
    name: "Banknote yen",
    symbol:"💴",
    keywords: ["bank", "note", "yen"]
  },
  {
    decimal: 128181,
    hex: 0x1F4B5,
    category: "money",
    name: "Banknote dollar",
    symbol: "💵",
    keywords: ["bank", "note", "dollar", "$"]
  },
  {
    decimal: 128182,
    hex: 0x1F4B6,
    category: "money",
    name: "Banknote euro",
    symbol: "💶",
    keywords: ["bank", "note", "euro", "€"]
  },
  {
    decimal: 128183,
    hex: 0x1F4B7,
    category: "money",
    name: "Banknote pound",
    symbol: "💷",
    keywords: ["bank", "note", "pound", "£"]
  },
  {
    decimal: 128184,
    hex: 0x1F4B8,
    category: "money",
    name: "Money with wings",
    symbol: "💸",
    keywords: ["money", "wings", "lose", "loss", "fly"]
  },
  {
    decimal: 128185,
    hex: 0x1F4B9,
    category: "money",
    name: "Upward trend yen",
    symbol: "💹",
    keywords: ["money", "upward", "trend", "yen", "positive", "chart", "green"]
  },
  {
    decimal: 9962,
    hex: 0x26EA,
    category: "religion",
    name: "Church",
    symbol: "⛪",
    keywords: ["church", "religion", "worship", "god", "faith", "christian", "christianity", "holy", "white", "red"]
  },
  {
    decimal: 128255,
    hex: 0x1F4FF,
    category: "religion",
    name: "Prayer Beads",
    symbol: "📿",
    keywords: ["religion", "prayer", "beads", "necklace", "faith", "holy", "red"]
  },
  {
    decimal: 128331,
    hex: 0x1F54B,
    category: "religion",
    name: "Kaaba",
    symbol: "🕋",
    keywords: ["religion", "prayer", "faith", "black", "yellow"]
  },
  {
    decimal: 128332,
    hex: 0x1F54C,
    category: "religion",
    name: "Mosque",
    symbol: "🕌",
    keywords: ["religion", "prayer", "faith", "islam", "muslim", "holy", "white", "green"]
  },
  {
    decimal: 128333,
    hex: 0x1F54D,
    category: "religion",
    name: "Synagogue",
    symbol: "🕍",
    keywords: ["religion", "prayer", "faith", "judaism", "jewish", "israel", "zion", "holy", "white", "red"]
  },
  {
    decimal: 128334,
    hex: 0x1F54E,
    category: "religion",
    name: "Menorah",
    symbol: "🕎",
    keywords: ["religion", "prayer", "faith", "judaism", "jewish", "israel", "zion", "holy", "purple"]
  },
  {
    decimal: 128725,
    hex: 0x1F6D5,
    category: "religion",
    name: "Hindu temple",
    symbol: "🛕",
    keywords: ["religion", "prayer", "faith", "hindu", "holy", "yellow", "gold"]
  },
  {
    decimal: 128303,
    hex: 0x1F52F,
    category: "religion",
    name: "Six pointed star",
    symbol: "🔯",
    keywords: ["religion", "prayer", "faith", "judaism", "david", "jewish", "israel", "zion", "holy", "purple"]
  },
  {
    decimal: 128269,
    hex: 0x1F50D,
    category: "tools",
    name: "Left magnifying glass",
    symbol: "🔍",
    keywords: ["lens", "investigate", "enlarge", "study", "blue"]
  },
  {
    decimal: 128270,
    hex: 0x1F50E,
    category: "tools",
    name: "Right magnifying glass",
    symbol: "🔎",
    keywords: ["lens", "investigate", "enlarge", "study", "blue"]
  },
  {
    decimal: 128271,
    hex: 0x1F50F,
    category: "tools",
    name: "Lock with pen",
    symbol: "🔏",
    keywords: ["padlock", "write", "protect", "yellow", "gold", "orange"]
  },
  {
    decimal: 128272,
    hex: 0x1F510,
    category: "tools",
    name: "Lock with key",
    symbol: "🔐",
    keywords: ["padlock", "protect", "closed", "yellow", "gold", "orange"]
  },
  {
    decimal: 128273,
    hex: 0x1F511,
    category: "tools",
    name: "Key",
    symbol: "🔑",
    keywords: ["protect", "closed", "yellow", "gold", "orange"]
  },
  {
    decimal: 128274,
    hex: 0x1F512,
    category: "tools",
    name: "Lock",
    symbol: "🔒",
    keywords: ["protect", "closed", "yellow", "gold", "orange"]
  },
  {
    decimal: 128275,
    hex: 0x1F513,
    category: "tools",
    name: "Open lock",
    symbol: "🔓",
    keywords: ["protect", "open", "unlocked", "yellow", "gold", "orange"]
  },
  {
    decimal: 128294,
    hex: 0x1F526,
    category: "tools",
    name: "Electric torch",
    symbol: "🔦",
    keywords: ["light", "illuminate", "portable", "battery", "grey"]
  },
  {
    decimal: 128295,
    hex: 0x1F527,
    category: "tools",
    name: "Wrench",
    symbol: "🔧",
    keywords: ["nut", "repair", "tighten", "loosen", "metal", "hard", "silver"]
  },
  {
    decimal: 128296,
    hex: 0x1F528,
    category: "tools",
    name: "Hammer",
    symbol: "🔨",
    keywords: ["repair", "smash", "mc", "metal", "hard", "hit", "nail"]
  },
  {
    decimal: 128297,
    hex: 0x1F529,
    category: "tools",
    name: "Nut and bolt",
    symbol: "🔩",
    keywords: ["tighten", "loosen", "screw", "thread", "metal", "links", "repair", "machine", "silver"]
  },
  {
    decimal: 128300,
    hex: 0x1F52C,
    category: "tools",
    name: "Microscope",
    symbol: "🔬",
    keywords: ["enlarge", "study", "miniscule", "tiny", "medical", "micro", "small", "machine"]
  },
  {
    decimal: 128301,
    hex: 0x1F52D,
    category: "tools",
    name: "Telescope",
    symbol: "🔭",
    keywords: ["enlarge", "study", "space", "planets", "stars", "galaxy", "machine"]
  },
  {
    decimal: 129517,
    hex: 0x1F9ED,
    category: "tools",
    name: "Compass",
    symbol: "🧭",
    keywords: ["navigate", "needle", "magnetic", "north", "south", "east", "west", "find", "map"]
  },
  {
    decimal: 129520,
    hex: 0x1F9F0,
    category: "tools",
    name: "Toolbox",
    symbol: "🧰",
    keywords: ["container", "box", "lid", "handle", "red"]
  },
  {
    decimal: 129522,
    hex: 0x1F9F2,
    category: "tools",
    name: "Magnet",
    symbol: "🧲",
    keywords: ["magnetic", "metal", "north", "south", "attract", "repel"]
  },
{
  decimal: 128306,
  hex: "0x1F532",
  category: "Circles and Squares",
  name: "Black square button",
  symbol: "🔲",
  keywords: ["square","black","white"]
},
{
  decimal: 128307,
  hex: "0x1F533",
  category: "Circles and Squares",
  name: "White square button",
  symbol: "🔳",
  keywords: ["square","black","white"]
},
{
  decimal: 128308,
  hex: "0x1F534",
  category: "Circles and Squares",
  name: "Large red circle",
  symbol: "🔴",
  keywords: ["red"]
},
{
  decimal: 128309,
  hex: "0x1F535",
  category: "Circles and Squares",
  name: "Large blue circle",
  symbol: "🔵",
  keywords: ["blue"]
},
{
  decimal: 128310,
  hex: "0x1F536",
  category: "Circles and Squares",
  name: "Large orange diamond",
  symbol: "🔶",
  keywords: ["square"]
},
{
  decimal: 128311,
  hex: "0x1F537",
  category: "Circles and Squares",
  name: "Large blue diamond",
  symbol: "🔷",
  keywords: ["square"]
},
{
  decimal: 128312,
  hex: "0x1F538",
  category: "Circles and Squares",
  name: "Small orange diamond",
  symbol: "🔸",
  keywords: ["square"]
},
{
  decimal: 128313,
  hex: "0x1F539",
  category: "Circles and Squares",
  name: "Small blue diamond",
  symbol: "🔹",
  keywords: ["square"]
},
{
  decimal: 128314,
  hex: "0x1F53A",
  category: "Circles and Squares",
  name: "Up red triangle",
  symbol: "🔺",
  keywords: ["trekant"]
},
{
  decimal: 128315,
  hex: "0x1F53B",
  category: "Circles and Squares",
  name: "Down red triangle",
  symbol: "🔻",
  keywords: ["trekant"]
},
{
  decimal: 128512,
  hex: "0x1F600",
  category: "Smileys",
  name: "GRINNING FACE",
  symbol: "😀",
  keywords: ["happy","glad","excited","enthusiast","teeth","tounge"]
},
{
  decimal: 128513,
  hex: "0x1F601",
  category: "Smileys",
  name: "GRINNING FACE WITH SMILING EYES",
  symbol: "😁",
  keywords: ["happy","glad","excited","proud","teeth","tounge"]
},
{
  decimal: 128514,
  hex: "0x1F602",
  category: "Smileys",
  name: "FACE WITH TEARS OF JOY",
  symbol: "😂",
  keywords: ["happy","excited","teeth","tounge","lol","lmao","crying"]
},
{
  decimal: 128515,
  hex: "0x1F603",
  category: "Smileys",
  name: "SMILING FACE WITH OPEN MOUTH",
  symbol: "😃",
  keywords: ["happy","excited","teeth","tounge"]
},
{
  decimal: 128516,
  hex: "0x1F604",
  category: "Smileys",
  name: "SMILING FACE WITH OPEN MOUTH AND SMILING EYES",
  symbol: "😄",
  keywords: ["happy","excited","teeth","tounge"]
},
{
  decimal: 128517,
  hex: "0x1F605",
  category: "Smileys",
  name: "SMILING FACE WITH OPEN MOUTH AND COLD SWEAT",
  symbol: "😅",
  keywords: ["happy","teeth","tounge","close","call","work","big","job"]
},
{
  decimal: 128518,
  hex: "0x1F606",
  category: "Smileys",
  name: "SMILING FACE WITH OPEN MOUTH AND TIGHTLY-CLOSED EYES",
  symbol: "😆",
  keywords: ["teeth","tounge","oh","no","shit","doh","whack"]
},
{
  decimal: 128520,
  hex: "0x1F608",
  category: "Smileys",
  name: "SMILING FACE WITH HORNS",
  symbol: "😈",
  keywords: ["happy","devil","shadenfreude","skadefryd", "dominant", "bdsm", "sadist"]
},
{
  decimal: 128521,
  hex: "0x1F609",
  category: "Smileys",
  name: "WINKING FACE",
  symbol: "😉",
  keywords: ["happy","flirt","suggest","hint"]
},
{
  decimal: 128522,
  hex: "0x1F60A",
  category: "Smileys",
  name: "SMILING FACE WITH SMILING EYES",
  symbol: "😊",
  keywords: ["happy","content","love"]
},
{
  decimal: 128523,
  hex: "0x1F60B",
  category: "Smileys",
  name: "FACE SAVOURING DELICIOUS FOOD",
  symbol: "😋",
  keywords: ["happy","content","tounge","flirt","ironic","good","food","hungry"]
},
{
  decimal: 128524,
  hex: "0x1F60C",
  category: "Smileys",
  name: "RELIEVED FACE",
  symbol: "😌",
  keywords: ["happy","content","submissive","subordinate"]
},
{
  decimal: 128525,
  hex: "0x1F60D",
  category: "Smileys",
  name: "SMILING FACE WITH HEART-SHAPED EYES",
  symbol: "😍",
  keywords: ["happy","content","in","love","like","enjoy","adore"]
},
{
  decimal: 128526,
  hex: "0x1F60E",
  category: "Smileys",
  name: "SMILING FACE WITH SUNGLASSES",
  symbol: "😎",
  keywords: ["happy","content","enjoy","cool","shades"]
},
{
  decimal: 128527,
  hex: "0x1F60F",
  category: "Smileys",
  name: "SMIRKING FACE",
  symbol: "😏",
  keywords: ["happy","flirt","suggest","insiuate","glance","right","smug"]
},
{
  decimal: 128528,
  hex: "0x1F610",
  category: "Smileys",
  name: "NEUTRAL FACE",
  symbol: "😐",
  keywords: ["flat","discontent","resign","give","up"]
},
{
  decimal: 128529,
  hex: "0x1F611",
  category: "Smileys",
  name: "EXPRESSIONLESS FACE",
  symbol: "😑",
  keywords: ["flat","discontent","resign","give","up","annoyed","hopeless"]
},
{
  decimal: 128530,
  hex: "0x1F612",
  category: "Smileys",
  name: "UNAMUSED FACE",
  symbol: "😒",
  keywords: ["flat","discontent","resign","give","up","annoyed","glance","right"]
},
{
  decimal: 128531,
  hex: "0x1F613",
  category: "Smileys",
  name: "FACE WITH COLD SWEAT",
  symbol: "😓",
  keywords: ["discontent","resign","give","up","load","work","heavy","bad"]
},
{
  decimal: 128532,
  hex: "0x1F614",
  category: "Smileys",
  name: "PENSIVE FACE",
  symbol: "😔",
  keywords: ["discontent","resign","disappointed","sad","submissive"]
},
{
  decimal: 128533,
  hex: "0x1F615",
  category: "Smileys",
  name: "CONFUSED FACE",
  symbol: "😕",
  keywords: ["discontent","disappointed","unamused","unhappy"]
},
{
  decimal: 128534,
  hex: "0x1F616",
  category: "Smileys",
  name: "CONFOUNDED FACE",
  symbol: "😖",
  keywords: ["discontent","disgust","unhappy","cringe"]
},
{
  decimal: 128535,
  hex: "0x1F617",
  category: "Smileys",
  name: "KISSING FACE",
  symbol: "😗",
  keywords: ["pucker","up","lips","neutral"]
},
{
  decimal: 128536,
  hex: "0x1F618",
  category: "Smileys",
  name: "KISSING FACE THROWING A KISS",
  symbol: "😘",
  keywords: ["pucker","up","lips","wink","heart","love"]
},
{
  decimal: 128537,
  hex: "0x1F619",
  category: "Smileys",
  name: "KISSING FACE WITH SMILING EYES",
  symbol: "😙",
  keywords: ["pucker","up","lips","content","happy"]
},
{
  decimal: 128538,
  hex: "0x1F61A",
  category: "Smileys",
  name: "KISSING FACE WITH CLOSED EYES",
  symbol: "😚",
  keywords: ["pucker","up","lips","content","blush"]
},
{
  decimal: 128539,
  hex: "0x1F61B",
  category: "Smileys",
  name: "FACE WITH STUCK-OUT TONGUE",
  symbol: "😛",
  keywords: ["hungry","excited","wound","up","happy","content","horny", "fun"]
},
{
  decimal: 128540,
  hex: "0x1F61C",
  category: "Smileys",
  name: "FACE WITH STUCK-OUT TONGUE AND WINKING EYE",
  symbol: "😜",
  keywords: ["happy","excited","wound","up","content","horny","crazy","wild","fun"]
},
{
  decimal: 128541,
  hex: "0x1F61D",
  category: "Smileys",
  name: "FACE WITH STUCK-OUT TONGUE AND TIGHTLY-CLOSED EYES",
  symbol: "😝",
  keywords: ["happy","excited","wound","up","icky","cringe","fun"]
},
{
  decimal: 128542,
  hex: "0x1F61E",
  category: "Smileys",
  name: "DISAPPOINTED FACE",
  symbol: "😞",
  keywords: ["sad", "unhappy", "worried","down","depressed"]
},
{
  decimal: 128543,
  hex: "0x1F61F",
  category: "Smileys",
  name: "WORRIED FACE",
  symbol: "😟",
  keywords: ["worried","unhappy","down","depressed"]
},
{
  decimal: 128544,
  hex: "0x1F620",
  category: "Smileys",
  name: "ANGRY FACE",
  symbol: "😠",
  keywords: ["unhappy","angry","mad","aggressive"]
},
{
  decimal: 128545,
  hex: "0x1F621",
  category: "Smileys",
  name: "POUTING FACE",
  symbol: "😡",
  keywords: ["unhappy","angry","raging","mad","aggressive","red","flush","blush"]
},
{
  decimal: 128546,
  hex: "0x1F622",
  category: "Smileys",
  name: "CRYING FACE",
  symbol: "😢",
  keywords: ["unhappy","sad","tear","down"]
},
{
  decimal: 128547,
  hex: "0x1F623",
  category: "Smileys",
  name: "PERSEVERING FACE",
  symbol: "😣",
  keywords: ["determined","effort","struggle","mad","angry"]
},
{
  decimal: 128548,
  hex: "0x1F624",
  category: "Smileys",
  name: "FACE WITH LOOK OF TRIUMPH",
  symbol: "😤",
  keywords: ["huff","blow","mad","miffed","offended"]
},
{
  decimal: 128549,
  hex: "0x1F625",
  category: "Smileys",
  name: "DISAPPOINTED BUT RELIEVED FACE",
  symbol: "😥",
  keywords: ["sad","tear","too","late"]
},
{
  decimal: 128550,
  hex: "0x1F626",
  category: "Smileys",
  name: "FROWNING FACE WITH OPEN MOUTH",
  symbol: "😦",
  keywords: ["shock","awe","disbelief"]
},
{
  decimal: 128551,
  hex: "0x1F627",
  category: "Smileys",
  name: "ANGUISHED FACE",
  symbol: "😧",
  keywords: ["shock","awe","worry","helpless","disbelief"]
},
{
  decimal: 128552,
  hex: "0x1F628",
  category: "Smileys",
  name: "FEARFUL FACE",
  symbol: "😨",
  keywords: ["shock","awe","worry","helpless","cold","freeze","pale","clammy","disbelief"]
},
{
  decimal: 128553,
  hex: "0x1F629",
  category: "Smileys",
  name: "WEARY FACE",
  symbol: "😩",
  keywords: ["worry","helpless","tired","resigned","teeth","unhappy","devastated","disbelief"]
},
{
  decimal: 128554,
  hex: "0x1F62A",
  category: "Smileys",
  name: "SLEEPY FACE",
  symbol: "😪",
  keywords: ["worry","helpless","tired","resigned","sad","unhappy","weary","tear"]
},
{
  decimal: 128555,
  hex: "0x1F62B",
  category: "Smileys",
  name: "TIRED FACE",
  symbol: "😫",
  keywords: ["tired","resigned","sad","unhappy","weary","teeth","disbelief"]
},
{
  decimal: 128556,
  hex: "0x1F62C",
  category: "Smileys",
  name: "GRIMACING FACE",
  symbol: "😬",
  keywords: ["unhappy","teeth","cringe","close","call","disbelief"]
},
{
  decimal: 128557,
  hex: "0x1F62D",
  category: "Smileys",
  name: "LOUDLY CRYING FACE",
  symbol: "😭",
  keywords: ["unhappy","sobbing","tears","flowing","river"]
},
{
  decimal: 128558,
  hex: "0x1F62E",
  category: "Smileys",
  name: "FACE WITH OPEN MOUTH",
  symbol: "😮",
  keywords: ["shock","awe","staring","disbelief"]
},
{
  decimal: 128559,
  hex: "0x1F62F",
  category: "Smileys",
  name: "HUSHED FACE",
  symbol: "😯",
  keywords: ["shock","awe","sad","worried","disbelief"]
},
{
  decimal: 128560,
  hex: "0x1F630",
  category: "Smileys",
  name: "FACE WITH OPEN MOUTH AND COLD SWEAT",
  symbol: "😰",
  keywords: ["shock","sad","worried","disbelief","clammy","pale","tear","cry"]
},
{
  decimal: 128561,
  hex: "0x1F631",
  category: "Smileys",
  name: "FACE SCREAMING IN FEAR",
  symbol: "😱",
  keywords: ["shock","disbelief","clammy","pale","munch","hands"]
},
{
  decimal: 128562,
  hex: "0x1F632",
  category: "Smileys",
  name: "ASTONISHED FACE",
  symbol: "😲",
  keywords: ["shock","disbelief","teeth"]
},
{
  decimal: 128563,
  hex: "0x1F633",
  category: "Smileys",
  name: "FLUSHED FACE",
  symbol: "😳",
  keywords: ["shock","disbelief","embarrassed","blush"]
},
{
  decimal: 128564,
  hex: "0x1F634",
  category: "Smileys",
  name: "SLEEPING FACE",
  symbol: "😴",
  keywords: ["tired","zzz","snore"]
},
{
  decimal: 128565,
  hex: "0x1F635",
  category: "Smileys",
  name: "DIZZY FACE",
  symbol: "😵",
  keywords: ["spinning","disoriented","vertigo","high","stoned"]
},
{
  decimal: 128566,
  hex: "0x1F636",
  category: "Smileys",
  name: "FACE WITHOUT MOUTH",
  symbol: "😶",
  keywords: ["silence","shut","up","don't","talk","speak"]
},
{
  decimal: 128567,
  hex: "0x1F637",
  category: "Smileys",
  name: "FACE WITH MEDICAL MASK",
  symbol: "😷",
  keywords: ["sick","infectious","contagious","sweat","sleep"]
},
{
  decimal: 128577,
  hex: "0x1F641",
  category: "Smileys Supplements",
  name: "Sad face",
  symbol: "🙁",
  keywords: ["frown"]
},
{
  decimal: 128578,
  hex: "0x1F642",
  category: "Smileys Supplements",
  name: "Happy face",
  symbol: "🙂",
  keywords: ["glad","content"]
},
{
  decimal: 128579,
  hex: "0x1F643",
  category: "Smileys Supplements",
  name: "Upside down face",
  symbol: "🙃",
  keywords: ["glad","content","tumble"]
},
{
  decimal: 128580,
  hex: "0x1F644",
  category: "Smileys Supplements",
  name: "Roll eyes face",
  symbol: "🙄",
  keywords: ["give","up","dumb","stupid","lame","resign","hopeless"]
},
{
  decimal: 129296,
  hex: "0x1F910",
  category: "Smileys Supplements",
  name: "Mouth zipped face",
  symbol: "🤐",
  keywords: ["silence","secret","safe","closed"]
},
{
  decimal: 129297,
  hex: "0x1F911",
  category: "Smileys Supplements",
  name: "Money face",
  symbol: "🤑",
  keywords: ["money","excited","dollar","adore","cha","ching"]
},
{
  decimal: 129298,
  hex: "0x1F912",
  category: "Smileys Supplements",
  name: "Sick face",
  symbol: "🤒",
  keywords: ["sick","temperature","thermometer","fever"]
},
{
  decimal: 129299,
  hex: "0x1F913",
  category: "Smileys Supplements",
  name: "Happy nerd face",
  symbol: "🤓",
  keywords: ["nerd","geek","glasses"]
},
{
  decimal: 129300,
  hex: "0x1F914",
  category: "Smileys Supplements",
  name: "Thinking face",
  symbol: "🤔",
  keywords: ["skeptic","questioning","distrust","hand","contemplating","thinking"]
},
{
  decimal: 129301,
  hex: "0x1F915",
  category: "Smileys Supplements",
  name: "Face with head-bandage",
  symbol: "🤕",
  keywords: ["unhappy","injured","trauma","pain"]
},
{
  decimal: 129303,
  hex: "0x1F917",
  category: "Smileys Supplements",
  name: "Smiling face with open hands",
  symbol: "🤗",
  keywords: ["happy","smile","love","warm","affection","hug"]
},
{
  decimal: 129312,
  hex: "0x1F920",
  category: "Smileys Supplements",
  name: "Smiling face with cowboy hat",
  symbol: "🤠",
  keywords: ["happy","smile","exuberance","whimsy","confidence","adventure","country","western"]
},
{
  decimal: 129314,
  hex: "0x1F922",
  category: "Smileys Supplements",
  name: "Nauseated face",
  symbol: "🤢",
  keywords: ["unhappy","illness","discomfort","disgust","vomit","frown","green","distaste","aversion"]
},
{
  decimal: 129315,
  hex: "0x1F923",
  category: "Smileys Supplements",
  name: "Rolling on the floor laughing",
  symbol: "🤣",
  keywords: ["lol","roflmao","tilt","left","funny"]
},
{
  decimal: 129316,
  hex: "0x1F924",
  category: "Smileys Supplements",
  name: "Drooling face",
  symbol: "🤤",
  keywords: ["drool","tempted","happy","delicious","desire","flirt","lust","longing","stupidity","hungry"]
},
{
  decimal: 129317,
  hex: "0x1F925",
  category: "Smileys Supplements",
  name: "Lying face",
  symbol: "🤥",
  keywords: ["frown","lie","pinocchio","deceit","dishonest","sit","on","face"]
},
{
  decimal: 129319,
  hex: "0x1F927",
  category: "Smileys Supplements",
  name: "Sneezing face",
  symbol: "🤧",
  keywords: ["unhappy","sick","blow","nose","hankerchief"]
},
{
  decimal: 129320,
  hex: "0x1F928",
  category: "Smileys Supplements",
  name: "Face with Raised Eyebrow",
  symbol: "🤨",
  keywords: ["suspicion","skeptic","disbelief","disapproval","doubt","unsure"]
},
{
  decimal: 129321,
  hex: "0x1F929",
  category: "Smileys Supplements",
  name: "Star-Struck face",
  symbol: "🤩",
  keywords: ["stars","adore","teeth","happy","celebrity","impressive","amazing","exciting"]
},
{
  decimal: 129322,
  hex: "0x1F92A",
  category: "Smileys Supplements",
  name: "Zany face",
  symbol: "🤪",
  keywords: ["grin","tounge","cockeyed","silly","goofy","fun","happy"]
},
{
  decimal: 129323,
  hex: "0x1F92B",
  category: "Smileys Supplements",
  name: "Shushing face",
  symbol: "🤫",
  keywords: ["silent","finger","over","lips","quiet","secret","confidential","shh"]
},
{
  decimal: 129325,
  hex: "0x1F92D",
  category: "Smileys Supplements",
  name: "Face with Hand over Mouth",
  symbol: "🤭",
  keywords: ["amused","laugh","cozy","compliment","charmed"]
},
{
  decimal: 129326,
  hex: "0x1F92E",
  category: "Smileys Supplements",
  name: "Vomiting face",
  symbol: "🤮",
  keywords: ["disgust","illness","green","queasy","hang","hung","over","gross","ugly","repulsive","nasty"]
},
{
  decimal: 129327,
  hex: "0x1F92F",
  category: "Smileys Supplements",
  name: "Exploding Head",
  symbol: "🤯",
  keywords: ["mind","blown","shock","disbelief","amazing"]
},
{
  decimal: 129392,
  hex: "0x1F970",
  category: "Smileys Supplements",
  name: "Smiling Face with Hearts",
  symbol: "🥰",
  keywords: ["love","adore","cozy","feel","warm","fuzzy","affection","romance","infatuation"]
},
{
  decimal: 129393,
  hex: "0x1F971",
  category: "Smileys Supplements",
  name: "Yawning Face",
  symbol: "🥱",
  keywords: ["sleepy","tired","bored","effortless","easy"]
},
{
  decimal: 129395,
  hex: "0x1F973",
  category: "Smileys Supplements",
  name: "Partying Face",
  symbol: "🥳",
  keywords: ["hat","flute","horn","confetti","enjoy","good","time","happy","celebrate","birthday"]
},
{
  decimal: 129396,
  hex: "0x1F974",
  category: "Smileys Supplements",
  name: "Woozy Face",
  symbol: "🥴",
  keywords: ["orgasm","cum","drunk","tipsy","party","high","stoned","intoxicated"]
},
{
  decimal: 129397,
  hex: "0x1F975",
  category: "Smileys Supplements",
  name: "Hot Face",
  symbol: "🥵",
  keywords: ["sweat","droplet","tounge","red","temperature","warm","over","heated","fever","spicy"]
},
{
  decimal: 129398,
  hex: "0x1F976",
  category: "Smileys Supplements",
  name: "Cold Face",
  symbol: "🥶",
  keywords: ["freezing","ice","blue","icicle","cool","frost"]
},
{
  decimal: 129402,
  hex: "0x1F97A",
  category: "Smileys Supplements",
  name: "Pleading Face",
  symbol: "🥺",
  keywords: ["puppy","dog","eyes","begging","yearning","want","adoration","submissive"]
},
{
  decimal: 129488,
  hex: "0x1F9D0",
  category: "Smileys Supplements",
  name: "Face With Monocle",
  symbol: "🧐",
  keywords: ["smile","happy","pondering","sarcasm","scrutiny"]
},
{
  decimal: 128584,
  hex: "0x1F648",
  category: "Animals",
  name: "See No Evil Monkey",
  symbol: "🙈",
  keywords: ["monkey","covering","eyes","embarrassed"]
},
{
  decimal: 128585,
  hex: "0x1F649",
  category: "Animals",
  name: "Hear No Evil Monkey",
  symbol: "🙉",
  keywords: ["monkey","covering","ears","la-la-la"]
},
{
  decimal: 128586,
  hex: "0x1F64A",
  category: "Animals",
  name: "Speak No Evil Monkey",
  symbol: "🙊",
  keywords: ["monkey","covering","mouth","oops","should","not","say","said","there"]
},
{
  decimal: 128127,
  hex: "0x1F47F",
  category: "Negative",
  name: "Angry Face with Horns",
  symbol: "👿",
  keywords: ["devil","angry","horns","red"]
},
{
  decimal: 128128,
  hex: "0x1F480",
  category: "Negative",
  name: "Smileys",
  symbol: "💀",
  keywords: ["death","dead","danger","white","dying"]
},
{
  decimal: 129324,
  hex: "0x1F92C",
  category: "Negative",
  name: "Face with Symbols on Mouth",
  symbol: "🤬",
  keywords: ["angry","swear","cuss","curse","red","grawlixes","obscenities","rage","profanity"]
},
{
  decimal: 128110,
  hex: "0x1F46E",
  category: "Person Roles",
  name: "Police",
  symbol: "👮",
  keywords: ["officer","man","cop"]
},
{
  decimal: 128111,
  hex: "0x1F46F",
  category: "Person Roles",
  name: "Bunnies",
  symbol: "👯",
  keywords: ["playboy","girls","costume"]
},
{
  decimal: 128112,
  hex: "0x1F470",
  category: "Person Roles",
  name: "Bride",
  symbol: "👰",
  keywords: ["wedding","woman","marriage","marry"]
},
{
  decimal: 128114,
  hex: "0x1F472",
  category: "Person Roles",
  name: "Man Gua pi mao",
  symbol: "👲",
  keywords: ["china","asian","male","hat","cap"]
},
{
  decimal: 128115,
  hex: "0x1F473",
  category: "Person Roles",
  name: "Man turban",
  symbol: "👳",
  keywords: ["white","beard"]
},
{
  decimal: 128119,
  hex: "0x1F477",
  category: "Person Roles",
  name: "Construction worker",
  symbol: "👷",
  keywords: ["hard","hat","builder","bob","dozer"]
},
{
  decimal: 128120,
  hex: "0x1F478",
  category: "Person Roles",
  name: "Princess",
  symbol: "👸",
  keywords: ["royalty", "pretty","tiara","woman","girl"]
},
{
  decimal: 128372,
  hex: "0x1F574",
  category: "Person Roles",
  name: "Business suit",
  symbol: "🕴",
  keywords: ["hat","spy","tie","shirt","jacket"]
},
{
  decimal: 128373,
  hex: "0x1F575",
  category: "Person Roles",
  name: "Detective or Spy",
  symbol: "🕵",
  keywords: ["man","hat","spy","tie","shirt","jacket","magnify","glass","trench","coat","frock"]
},
{
  decimal: 128129,
  hex: "0x1F481",
  category: "Person Roles",
  name: "Helpdesk",
  symbol: "💁",
  keywords: ["woman","person","tipping","hand","purple","sassy","sarcasm","help"]
},
{
  decimal: 128131,
  hex: "0x1F483",
  category: "Person Roles",
  name: "Dancer",
  symbol: "💃",
  keywords: ["woman","dancing","red","dress","sexy","sassy"]
},
{
  decimal: 128130,
  hex: "0x1F482",
  category: "Person Roles",
  name: "Guardsman",
  symbol: "💂",
  keywords: ["guard","military","british","red","coat","black","hat"]
},
{
  decimal: 129332,
  hex: "0x1F934",
  category: "Person Roles",
  name: "Prince",
  symbol: "🤴",
  keywords: ["royalty","crown","man"]
},
{
  decimal: 129333,
  hex: "0x1F935",
  category: "Person Roles",
  name: "Man in tuxedo",
  symbol: "🤵",
  keywords: ["white","shirt","suit","black","jacket"]
},
{
  decimal: 128106,
  hex: "0x1F46A",
  category: "Family",
  name: "Family",
  symbol: "👪",
  keywords: ["man","woman","child","boy","husband","wife"]
},
{
  decimal: 128107,
  hex: "0x1F46B",
  category: "Family",
  name: "Man and woman",
  symbol: "👫",
  keywords: ["man","woman","husband","wife","couple","pair","friends"]
},
{
  decimal: 128108,
  hex: "0x1F46C",
  category: "Family",
  name: "Two men",
  symbol: "👬",
  keywords: ["husband","couple","pair","friends"]
},
{
  decimal: 128109,
  hex: "0x1F46D",
  category: "Family",
  name: "Two women",
  symbol: "👭",
  keywords: ["wife","couple","pair","friends"]
},
{
  decimal: 128143,
  hex: "0x1F48F",
  category: "Family",
  name: "Kiss",
  symbol: "💏",
  keywords: ["couple","pair","friends","heart","love"]
},
{
  decimal: 128145,
  hex: "0x1F491",
  category: "Family",
  name: "Love",
  symbol: "💑",
  keywords: ["couple","pair","friends","heart","affection"]
},
{
  decimal: 129328,
  hex: "0x1F930",
  category: "Family",
  name: "Pregnant",
  symbol: "🤰",
  keywords: ["woman","girl","baby"]
},
{
  decimal: 129329,
  hex: "0x1F931",
  category: "Family",
  name: "Breast feeding",
  symbol: "🤱",
  keywords: ["woman","girl","milk","baby"]
},
{
  decimal: 128100,
  hex: "0x1F464",
  category: "Persons",
  name: "Bust",
  symbol: "👤",
  keywords: ["statue","person","man"]
},
{
  decimal: 128101,
  hex: "0x1F465",
  category: "Persons",
  name: "Busts",
  symbol: "👥",
  keywords: ["statues","men"]
},
{
  decimal: 128102,
  hex: "0x1F466",
  category: "Persons",
  name: "Boy",
  symbol: "👦",
  keywords: ["face","smile"]
},
{
  decimal: 128103,
  hex: "0x1F467",
  category: "Persons",
  name: "Girl",
  symbol: "👧",
  keywords: ["face","smile"]
},
{
  decimal: 128104,
  hex: 0x1F468,
  category: "Persons",
  name: "Man",
  symbol: "👨",
  keywords: ["face","happy"]
},
{
  decimal: 128105,
  hex: 0x1F469,
  category: "Persons",
  name: "Woman",
  symbol: "👩",
  keywords: ["face","happy"]
},
{
  decimal: 128113,
  hex: 0x1F471,
  category: "Persons",
  name: "Person blond",
  symbol: "👱",
  keywords: ["face","happy"]
},
{
  decimal: 128116,
  hex: 0x1F474,
  category: "Persons",
  name: "Older man",
  symbol: "👴",
  keywords: ["face","happy","glasses"]
},
{
  decimal: 128117,
  hex: 0x1F475,
  category: "Persons",
  name: "Older woman",
  symbol: "👵",
  keywords: ["face","happy","glasses"]
},
{
  decimal: 128118,
  hex: 0x1F476,
  category: "Persons",
  name: "Baby",
  symbol: "👶",
  keywords: ["face","happy","pacifier"]
},
{
  decimal: 128378,
  hex: 0x1F57A,
  category: "Persons",
  name: "Man dancing",
  symbol: "🕺",
  keywords: ["happy"]
},
{
  decimal: 129485,
  hex: 0x1F9CD,
  category: "Persons",
  name: "Person standing",
  symbol: "🧍",
  keywords: ["green"]
},
{
  decimal: 129486,
  hex: 0x1F9CE,
  category: "Persons",
  name: "Person kneeling",
  symbol: "🧎",
  keywords: ["sitting"]
},
{
  decimal: 129489,
  hex: 0x1F9D1,
  category: "Persons",
  name: "Adult",
  symbol: "🧑",
  keywords: ["happy","face","man"]
},
{
  decimal: 129490,
  hex: 0x1F9D2,
  category: "Persons",
  name: "Child",
  symbol: "🧒",
  keywords: ["happy","boy","face"]
},
{
  decimal: 129491,
  hex: 0x1F9D3,
  category: "Persons",
  name: "Older adult",
  symbol: "🧓",
  keywords: ["happy","face","white","hair","glasses"]
},
{
  decimal: 129492,
  hex: 0x1F9D4,
  category: "Persons",
  name: "Bearded man",
  symbol: "🧔",
  keywords: ["happy","face"]
},
{
  decimal: 129493,
  hex: 0x1F9D5,
  category: "Persons",
  name: "Headsharf",
  symbol: "🧕",
  keywords: ["happy","face","hijab"]
},
{
  decimal: 129494,
  hex: 0x1F9D6,
  category: "Persons",
  name: "Steamy room",
  symbol: "🧖",
  keywords: ["happy","face","woman","sauna","bath"]
},
{
  decimal: 129495,
  hex: 0x1F9D7,
  category: "Persons",
  name: "Climbing",
  symbol: "🧗",
  keywords: ["man","harness","helmet","boulder","rock","wall"]
},
{
  decimal: 129496,
  hex: 0x1F9D8,
  category: "Persons",
  name: "Lotus position",
  symbol: "🧘",
  keywords: ["woman","yoga","legs","crossed"]
},
{
  decimal: 128134,
  hex: 0x1F486,
  category: "Gestures",
  name: "Face massage",
  symbol: "💆",
  keywords: ["woman","relaxed","enjoy"]
},
{
  decimal: 128135,
  hex: 0x1F487,
  category: "Gestures",
  name: "Haircut",
  symbol: "💇",
  keywords: ["woman","enjoy","scissors"]
},
{
  decimal: 128581,
  hex: 0x1F645,
  category: "Gestures",
  name: "No good",
  symbol: "🙅",
  keywords: ["woman","arms","crossed"]
},
{
  decimal: 128582,
  hex: 0x1F646,
  category: "Gestures",
  name: "OK",
  symbol: "🙆",
  keywords: ["woman","arms","over","head"]
},
{
  decimal: 128583,
  hex: 0x1F647,
  category: "Gestures",
  name: "Bowing deeply",
  symbol: "🙇",
  keywords: ["boy","kneeling"]
},
{
  decimal: 128587,
  hex: 0x1F64B,
  category: "Gestures",
  name: "Raised hand",
  symbol: "🙋",
  keywords: ["woman","arm","up"]
},
{
  decimal: 128588,
  hex: 0x1F64C,
  category: "Gestures",
  name: "Celebration",
  symbol: "🙌",
  keywords: ["hands","up"]
},
{
  decimal: 128591,
  hex: 0x1F64F,
  category: "Gestures",
  name: "Folded hands",
  symbol: "🙏",
  keywords: ["plead","please","thank","you"]
},
{
  decimal: 129318,
  hex: 0x1F926,
  category: "Gestures",
  name: "Face palm",
  symbol: "🤦",
  keywords: ["woman","resign"]
},
{
  decimal: 129335,
  hex: 0x1F937,
  category: "Gestures",
  name: "Shrug",
  symbol: "🤷",
  keywords: ["woman","give","up","don't","know","no","idea"]
},
{
  decimal: 128173,
  hex: 0x1F4AD,
  category: "Speak Bubbles",
  name: "Thought Ballon",
  symbol: "💭",
  keywords: ["think","cartoon"]
},
{
  decimal: 127877,
  hex: 0x1F385,
  category: "Fantasy Figures",
  name: "Father Christmas",
  symbol: "🎅",
  keywords: ["santa","claus","xmas","white","beard"]
},
{
  decimal: 128121,
  hex: 0x1F479,
  category: "Fantasy Figures",
  name: "Japanese Ogre",
  symbol: "👹",
  keywords: ["red","face","devil","horns"]
},
{
  decimal: 128123,
  hex: 0x1F47B,
  category: "Fantasy Figures",
  name: "Ghost",
  symbol: "👻",
  keywords: ["white","tounge","happy","spectre"]
},
{
  decimal: 128124,
  hex: 0x1F47C,
  category: "Fantasy Figures",
  name: "Baby angel",
  symbol: "👼",
  keywords: ["halo","wings","happy","innocent"]
},
{
  decimal: 128125,
  hex: 0x1F47D,
  category: "Fantasy Figures",
  name: "Extraterrestrial",
  symbol: "👽",
  keywords: ["alien","green","black","eyes","happy"]
},
{
  decimal: 129302,
  hex: 0x1F916,
  category: "Fantasy Figures",
  name: "Robot",
  symbol: "🤖",
  keywords: ["metal","antennae"]
},
{
  decimal: 129313,
  hex: 0x1F921,
  category: "Fantasy Figures",
  name: "Clown",
  symbol: "🤡",
  keywords: ["face","white","red","nose","happy"]
},
{
  decimal: 129464,
  hex: 0x1F9B8,
  category: "Fantasy Figures",
  name: "Superhero",
  symbol: "🦸",
  keywords: ["mask","cape","woman"]
},
{
  decimal: 129465,
  hex: 0x1F9B9,
  category: "Fantasy Figures",
  name: "Supervillain",
  symbol: "🦹",
  keywords: ["mask","cape","woman"]
},
{
  decimal: 129497,
  hex: 0x1F9D9,
  category: "Fantasy Figures",
  name: "Mage",
  symbol: "🧙",
  keywords: ["wizard","magic","staff","pointy","hat","gandalf"]
},
{
  decimal: 129498,
  hex: 0x1F9DA,
  category: "Fantasy Figures",
  name: "Fairy",
  symbol: "🧚",
  keywords: ["magic","wings","wand","girl"]
},
{
  decimal: 129499,
  hex: 0x1F9DB,
  category: "Fantasy Figures",
  name: "Vampire",
  symbol: "🧛",
  keywords: ["blood","sucking","fangs"]
},
{
  decimal: 129501,
  hex: 0x1F9DD,
  category: "Fantasy Figures",
  name: "Elf",
  symbol: "🧝",
  keywords: ["legolas","pointy","ears"]
},
{
  decimal: 129502,
  hex: 0x1F9DE,
  category: "Fantasy Figures",
  name: "Genie",
  symbol: "🧞",
  keywords: ["djinn","bottle","lamp"]
},
{
  decimal: 129503,
  hex: 0x1F9DF,
  category: "Fantasy Figures",
  name: "Zombie",
  symbol: "🧟",
  keywords: ["green","brain","reanimated","horror","man","undead","monster"]
},
{
  decimal: 128064,
  hex: 0x1F440,
  category: "Body Parts",
  name: "Eyes",
  symbol: "👀",
  keywords: ["comic","see","behold","interest","read","look"]
},
{
  decimal: 128067,
  hex: 0x1F443,
  category: "Body Parts",
  name: "Nose",
  symbol: "👃",
  keywords: ["sniff","smell"]
},
{
  decimal: 128068,
  hex: 0x1F444,
  category: "Body Parts",
  name: "Mouth",
  symbol: "👄",
  keywords: ["lips","teeth","red","taste"]
},
{
  decimal: 128069,
  hex: 0x1F445,
  category: "Body Parts",
  name: "Tongue",
  symbol: "👅",
  keywords: ["lick","taste"]
},
{
  decimal: 128170,
  hex: 0x1F4AA,
  category: "Body Parts",
  name: "Flexed Biceps",
  symbol: "💪",
  keywords: ["strong","arm"]
},
{
  decimal: 129463,
  hex: 0x1F9B7,
  category: "Body Parts",
  name: "Tooth",
  symbol: "🦷",
  keywords: ["grinder","white"]
},
{
  decimal: 129504,
  hex: 0x1F9E0,
  category: "Body Parts",
  name: "Brain",
  symbol: "🧠",
  keywords: ["pink","think","head","smart","wise"]
},
{
  decimal: 129505,
  hex: 0x1F9E1,
  category: "Body Parts",
  name: "Heart",
  symbol: "🧡",
  keywords: ["red","love","affection"]
},
{
  decimal: 128140,
  hex: 0x1F48C,
  category: "Heart Symbols",
  name: "Love letter",
  symbol: "💌",
  keywords: ["heart","envelope"]
},
{
  decimal: 128147,
  hex: 0x1F493,
  category: "Heart Symbols",
  name: "Beating heart",
  symbol: "💓",
  keywords: ["heart","pulse"]
},
{
  decimal: 128148,
  hex: 0x1F494,
  category: "Heart Symbols",
  name: "Broken heart",
  symbol: "💔",
  keywords: ["ache","break","up"]
},
{
  decimal: 128150,
  hex: 0x1F496,
  category: "Heart Symbols",
  name: "Sparkling heart",
  symbol: "💖",
  keywords: ["glitter","shine"]
},
{
  decimal: 128132,
  hex: 0x1F484,
  category: "Miscellaneous",
  name: "Lipstick",
  symbol: "💄",
  keywords: ["red","mouth"]
},
{
  decimal: 128137,
  hex: 0x1F489,
  category: "Miscellaneous",
  name: "Syringe",
  symbol: "💉",
  keywords: ["red","blood","sample","needle"]
},
{
  decimal: 128138,
  hex: 0x1F48A,
  category: "Miscellaneous",
  name: "Pill",
  symbol: "💊",
  keywords: ["medicine","swallow","capsule"]
},
{
  decimal: 128139,
  hex: 0x1F48B,
  category: "Miscellaneous",
  name: "Kiss mark",
  symbol: "💋",
  keywords: ["lips","mouth"]
},
{
  decimal: 128141,
  hex: 0x1F48D,
  category: "Miscellaneous",
  name: "Ring",
  symbol: "💍",
  keywords: ["diamond","ring","engagement","marry"]
},
{
  decimal: 128142,
  hex: 0x1F48E,
  category: "Miscellaneous",
  name: "Gem stone",
  symbol: "💎",
  keywords: ["diamond","brilliant","cut"]
},
{
  decimal: 128164,
  hex: 0x1F4A4,
  category: "Miscellaneous",
  name: "Sleeping",
  symbol: "💤",
  keywords: ["zzz","snore","bored"]
},
{
  decimal: 128169,
  hex: 0x1F4A9,
  category: "Miscellaneous",
  name: "Pile of poo",
  symbol: "💩",
  keywords: ["happy","sarcasm","foobar"]
},
{
  decimal: 128171,
  hex: 0x1F4AB,
  category: "Miscellaneous",
  name: "Dizzy",
  symbol: "💫",
  keywords: ["stars"]
},
{
  decimal: 127814,
  hex: 0x1F346,
  category: "Vegetables",
  name: "Aubergine",
  symbol: "🍆",
  keywords: ["eggplant","purple","penis"]
},
{
  decimal: 127825,
  hex: 0x1F351,
  category: "Fruit",
  name: "Peach",
  symbol: "🍑",
  keywords: ["butt","pussy"]
},
{
  decimal: 128000,
  hex: 0x1F400,
  category: "Animals",
  name: "Rat",
  symbol: "🐀",
  keywords: ["mouse","tail","ears"]
},
{
  decimal: 128001,
  hex: 0x1F401,
  category: "Animals",
  name: "Mouse",
  symbol: "🐁",
  keywords: ["rat","tail","ears","white","albino"]
},
{
  decimal: 128002,
  hex: 0x1F402,
  category: "Animals",
  name: "Ox",
  symbol: "🐂",
  keywords: ["bull","beef","horns","tail","brown"]
},
{
  decimal: 128003,
  hex: 0x1F403,
  category: "Animals",
  name: "Water buffalo",
  symbol: "🐃",
  keywords: ["bull","beef","horns","tail","grey","ox"]
},
{
  decimal: 128004,
  hex: 0x1F404,
  category: "Animals",
  name: "Cow",
  symbol: "🐄",
  keywords: ["milk","beef","tail","white","black"]
},
{
  decimal: 128005,
  hex: 0x1F405,
  category: "Animals",
  name: "Tiger",
  symbol: "🐅",
  keywords: ["claws","fangs","stripes"]
},
{
  decimal: 128007,
  hex: 0x1F407,
  category: "Animals",
  name: "Rabbit",
  symbol: "🐇",
  keywords: ["ears","white","jump"]
},
{
  decimal: 129440,
  hex: 0x1F9A0,
  category: "Animals",
  name: "Microbe",
  symbol: "🦠",
  keywords: ["amoeba"]
},
{
  decimal: 127756,
  hex: 0x1F30C,
  category: "Earth and Sky",
  name: "Milky way",
  symbol: "🌌",
  keywords: ["galaxy"]
},
{
  decimal: 127761,
  hex: 0x1F311,
  category: "Earth and Sky",
  name: "New moon",
  symbol: "🌑",
  keywords: ["dark","side"]
},
{
  decimal: 127762,
  hex: 0x1F312,
  category: "Earth and Sky",
  name: "Waxing cresent moon",
  symbol: "🌒",
  keywords: ["dark","side"]
},
{
  decimal: 127763,
  hex: 0x1F313,
  category: "Earth and Sky",
  name: "First quarter moon",
  symbol: "🌓",
  keywords: ["light"]
},
{
  decimal: 127764,
  hex: 0x1F314,
  category: "Earth and Sky",
  name: "Waxing gibbous moon",
  symbol: "🌔",
  keywords: ["light"]
},
{
  decimal: 127765,
  hex: 0x1F315,
  category: "Earth and Sky",
  name: "Full moon",
  symbol: "🌕",
  keywords: ["light"]
},
{
  decimal: 127766,
  hex: 0x1F316,
  category: "Earth and Sky",
  name: "Waining gibbous moon",
  symbol: "🌖",
  keywords: ["light"]
},
{
  decimal: 127767,
  hex: 0x1F317,
  category: "Earth and Sky",
  name: "Last quarter moon",
  symbol: "🌗",
  keywords: ["light"]
},
{
  decimal: 127768,
  hex: 0x1F318,
  category: "Earth and Sky",
  name: "Waining cresent moon",
  symbol: "🌘",
  keywords: ["light"]
},
{
  decimal: 127769,
  hex: 0x1F319,
  category: "Earth and Sky",
  name: "Cresent moon",
  symbol: "🌙",
  keywords: ["light"]
},
{
  decimal: 127770,
  hex: 0x1F31A,
  category: "Earth and Sky",
  name: "New moon face",
  symbol: "🌚",
  keywords: ["dark","side"]
},
{
  decimal: 127771,
  hex: 0x1F31B,
  category: "Earth and Sky",
  name: "First quarter moon face",
  symbol: "🌛",
  keywords: ["light"]
},
{
  decimal: 127772,
  hex: 0x1F31C,
  category: "Earth and Sky",
  name: "Last quarter moon face",
  symbol: "🌜",
  keywords: ["light"]
},
{
  decimal: 127773,
  hex: 0x1F31D,
  category: "Earth and Sky",
  name: "Full moon face",
  symbol: "🌝",
  keywords: ["light"]
},
{
  decimal: 127774,
  hex: 0x1F31E,
  category: "Earth and Sky",
  name: "Sun with face",
  symbol: "🌞",
  keywords: ["light"]
},
{
  decimal: 127775,
  hex: 0x1F31F,
  category: "Earth and Sky",
  name: "Glowing star",
  symbol: "🌟",
  keywords: ["light"]
},
{
  decimal: 127776,
  hex: 0x1F320,
  category: "Earth and Sky",
  name: "Shooting star",
  symbol: "🌠",
  keywords: ["light"]
},
{
  decimal: 9924,
  hex: 0x26C4,
  category: "Weather",
  name: "Snowman",
  symbol: "⛄",
  keywords: ["frosty","hat","scarf"]
},
{
  decimal: 9925,
  hex: 0x26C5,
  category: "Weather",
  name: "Sun behind cloud",
  symbol: "⛅",
  keywords: ["partly"]
},
{
  decimal: 9748,
  hex: 0x2614,
  category: "Weather",
  name: "Umbrella",
  symbol: "☔",
  keywords: ["rain","drops","purple","open"]
},
{
  decimal: 127744,
  hex: 0x1F300,
  category: "Weather",
  name: "Cyclone",
  symbol: "🌀",
  keywords: ["whirl","wind","tornado"]
},
{
  decimal: 127745,
  hex: 0x1F301,
  category: "Weather",
  name: "Foggy",
  symbol: "🌁",
  keywords: ["city","dark"]
},
{
  decimal: 127746,
  hex: 0x1F302,
  category: "Weather",
  name: "Umbrella",
  symbol: "🌂",
  keywords: ["rain","red","closed"]
},
{
  decimal: 127747,
  hex: 0x1F303,
  category: "Weather",
  name: "Night with stars",
  symbol: "🌃",
  keywords: ["city","dark","moon"]
},
{
  decimal: 127748,
  hex: 0x1F304,
  category: "Weather",
  name: "Sunrise",
  symbol: "🌄",
  keywords: ["scenic","green"]
},
{
  decimal: 127749,
  hex: 0x1F305,
  category: "Weather",
  name: "Sunrise",
  symbol: "🌅",
  keywords: ["scenic","ocean","blue"]
},
{
  decimal: 127750,
  hex: 0x1F306,
  category: "Weather",
  name: "Cityscape at dusk",
  symbol: "🌆",
  keywords: ["red","orange","sky"]
},
{
  decimal: 127751,
  hex: 0x1F307,
  category: "Weather",
  name: "Sunset over buildings",
  symbol: "🌇",
  keywords: ["city","dark"]
},
{
  decimal: 127752,
  hex: 0x1F308,
  category: "Weather",
  name: "Rainbow",
  symbol: "🌈",
  keywords: ["pride","rogbif"]
},
{
  decimal: 127753,
  hex: 0x1F309,
  category: "Weather",
  name: "Bridge at night",
  symbol: "🌉",
  keywords: ["water","blue","moon","dark"]
},
{
  decimal: 127872,
  hex: 0x1F380,
  category: "Celebration",
  name: "Ribbon",
  symbol: "🎀",
  keywords: ["pink","bowtie"]
},
{
  decimal: 127873,
  hex: 0x1F381,
  category: "Celebration",
  name: "Wrapped present",
  symbol: "🎁",
  keywords: ["yellow","red","ribbon","box","gift"]
},
{
  decimal: 127874,
  hex: 0x1F382,
  category: "Celebration",
  name: "Birthday cake",
  symbol: "🎂",
  keywords: ["brown","chocolate","lie","candle"]
},
{
  decimal: 127875,
  hex: 0x1F383,
  category: "Celebration",
  name: "Jack-O lantern",
  symbol: "🎃",
  keywords: ["halloween","pumpkin","face","scary"]
},
{
  decimal: 127876,
  hex: 0x1F384,
  category: "Celebration",
  name: "Christmas tree",
  symbol: "🎄",
  keywords: ["star","green"]
},
{
  decimal: 127878,
  hex: 0x1F386,
  category: "Celebration",
  name: "Fireworks",
  symbol: "🎆",
  keywords: ["star","spark"]
},
{
  decimal: 127879,
  hex: 0x1F387,
  category: "Celebration",
  name: "Firework sparkler",
  symbol: "🎇",
  keywords: ["star"]
},
{
  decimal: 127880,
  hex: 0x1F388,
  category: "Celebration",
  name: "Ballon",
  symbol: "🎈",
  keywords: ["red","party"]
},
{
  decimal: 127881,
  hex: 0x1F389,
  category: "Celebration",
  name: "Party popper",
  symbol: "🎉",
  keywords: ["confetti","announce","celebrate"]
},
{
  decimal: 127882,
  hex: 0x1F38A,
  category: "Celebration",
  name: "Confetti ball",
  symbol: "🎊",
  keywords: ["party"]
},
{
  decimal: 127891,
  hex: 0x1F393,
  category: "Celebration",
  name: "Graduation cap",
  symbol: "🎓",
  keywords: ["scholar","university","college"]
},
{
  decimal: 129512,
  hex: 0x1F9E8,
  category: "Celebration",
  name: "Firecracker",
  symbol: "🧨",
  keywords: ["explosion","boom","blow","up","red"]
},
{
  decimal: 127906,
  hex: 0x1F3A2,
  category: "Entertainment",
  name: "Roller coaster",
  symbol: "🎢",
  keywords: ["amusement","park","ride"]
},
{
  decimal: 127912,
  hex: 0x1F3A8,
  category: "Entertainment",
  name: "Artist Palette",
  symbol: "🎨",
  keywords: ["paint","color","picker"]
},
{
  decimal: 127914,
  hex: 0x1F3AA,
  category: "Entertainment",
  name: "Circus",
  symbol: "🎪",
  keywords: ["tent"]
},
{
  decimal: 127915,
  hex: 0x1F3AB,
  category: "Entertainment",
  name: "Ticket",
  symbol: "🎫",
  keywords: ["blue","entrance","fee","allow","ride"]
},
{
  decimal: 127917,
  hex: 0x1F3AD,
  category: "Entertainment",
  name: "Performing art",
  symbol: "🎭",
  keywords: ["masks","sad","happy","theatre"]
},
{
  decimal: 128175,
  hex: 0x1F4AF,
  category: "Entertainment",
  name: "Hundred points",
  symbol: "💯",
  keywords: ["one","percent","full","all","perfect","score"]
},
{
  decimal: 128747,
  hex: 0x1F6EB,
  category: "Transport",
  name: "Airplane",
  symbol: "🛫",
  keywords: ["plane","takeoff","sky","skies","blue","aero"]
},
{
  decimal: 128748,
  hex: 0x1F6EC,
  category: "Transport",
  name: "Airplane",
  symbol: "🛬",
  keywords: ["plane","landing","sky","skies","blue","aero"]
},
{
  decimal: 129482,
  hex: 0x1F9CA,
  category: "Food",
  name: "Ice cube",
  symbol: "🧊",
  keywords: ["glass","melt","water"]
},


]
