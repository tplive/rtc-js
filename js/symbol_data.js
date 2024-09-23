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

]
