import {
  ReasonItem,
  QuizQuestion,
  OpenWhenEnvelope,
  BucketListItem,
  TravelDestination,
  AppreciationItem,
  VoiceTrack,
  MemoryItem,
  TimelineMilestone,
  UserPersonalization,
} from '../types';

export const defaultPersonalization: UserPersonalization = {
  herName: 'Beautiful',
  herNickname: 'My Angel',
  hisName: 'Walter',
  // Default anniversary set to ~245 days before current time, customizable anytime
  anniversaryDate: '2026-03-08T00:00:00',
  nextDate: '2026-11-14T19:00:00',
  nextDateTitle: 'Candlelight Dinner & Stargazing',
};

export const reasonsData: ReasonItem[] = [
  {
    id: 1,
    title: 'Your Radiant Smile',
    description: "I love your smile, especially when you don't even realise you're smiling. It brightens my entire world.",
    icon: 'Sparkles',
  },
  {
    id: 2,
    title: 'Making Ordinary Magic',
    description: 'I love how you make even an ordinary, mundane day feel like the most extraordinary adventure.',
    icon: 'Sun',
  },
  {
    id: 3,
    title: 'The Sound of Your Voice',
    description: 'I love the soothing cadence of your voice. Just hearing you say hello melts away all my exhaustion.',
    icon: 'Music',
  },
  {
    id: 4,
    title: 'Your Natural Beauty',
    description: 'I love how breathtakingly beautiful you are, especially in cozy moments when you think otherwise.',
    icon: 'Heart',
  },
  {
    id: 5,
    title: 'Your Golden Heart & Personality',
    description: 'I love your magnetic personality — the warmth, wit, and kindness you radiate to everyone around you.',
    icon: 'Gem',
  },
  {
    id: 6,
    title: 'The Way You Make Me Laugh',
    description: 'I love the effortless way you make me laugh until my stomach hurts. You are my favourite comedian.',
    icon: 'Smile',
  },
  {
    id: 7,
    title: 'How Deeply You Care',
    description: 'I love how you care about people, the gentle empathy you show, and your big, generous heart.',
    icon: 'HeartHandshake',
  },
  {
    id: 8,
    title: 'Talking About Everything & Nothing',
    description: 'I love talking with you for hours on end, even when we have absolutely nothing important to discuss.',
    icon: 'MessageCircleHeart',
  },
  {
    id: 9,
    title: 'Your Adorable Little Habits',
    description: 'I love the little subconscious things you do — the way you tuck your hair, laugh, or hold my hand.',
    icon: 'Coffee',
  },
  {
    id: 10,
    title: 'How You Make Me Miss You',
    description: "I love how even ten minutes after saying goodbye, my heart is already counting the minutes until I see you again.",
    icon: 'Clock',
  },
  {
    id: 11,
    title: 'Your Quiet Inner Strength',
    description: 'I love your courage, resilience, and grace under pressure. You inspire me every single day.',
    icon: 'ShieldCheck',
  },
  {
    id: 12,
    title: 'Your Beautiful Imperfections',
    description: 'I love your quirks and imperfections because they make you authentic, unique, and purely you.',
    icon: 'Flower2',
  },
  {
    id: 13,
    title: 'The Comfort of Your Presence',
    description: 'I love the profound peace I feel whenever I am with you. In your arms, I am always home.',
    icon: 'Home',
  },
  {
    id: 14,
    title: 'How You Challenge Me',
    description: 'I love how you challenge me to be a better man, to grow, and to believe in our grandest dreams.',
    icon: 'TrendingUp',
  },
  {
    id: 15,
    title: 'Our Sweet Little Moments',
    description: 'I love the quiet, unscripted pauses — sharing glances across a room, silent hugs, and shared smiles.',
    icon: 'Flame',
  },
  {
    id: 16,
    title: 'Your Contagious Laugh',
    description: 'I love your genuine, unrestrained laugh. It is hands down the sweetest symphony I have ever heard.',
    icon: 'BellRing',
  },
  {
    id: 17,
    title: 'How Appreciated You Make Me Feel',
    description: 'I love how you notice my efforts, celebrate my wins, and always make me feel treasured and valued.',
    icon: 'Award',
  },
  {
    id: 18,
    title: 'The Memories We Are Creating',
    description: 'I love looking back at where we started, knowing that each chapter with you is richer than the last.',
    icon: 'BookmarkHeart',
  },
  {
    id: 19,
    title: 'Imagining Our Future Adventures',
    description: 'I love picturing all the cities we will explore, meals we will cook, and milestones we will conquer together.',
    icon: 'Compass',
  },
  {
    id: 20,
    title: 'Simply Because You Are You',
    description: "I don't love you for any single condition. I love you wholly, unconditionally, simply because you are you.",
    icon: 'Infinity',
  },
];

export const memoriesData: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'That First Time I Saw You',
    date: 'Day One',
    location: 'Where Our Story Began',
    story: "I remember looking over and thinking: 'She is out of this world.' My heart did that nervous flutter that I will never forget.",
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    tags: ['First Sight', 'Spark'],
  },
  {
    id: 'mem-2',
    title: 'Our First Endless Conversation',
    date: 'Late Night Talks',
    location: 'Under the Neon City Glow',
    story: 'We meant to talk for just a few minutes, but hours flew by like seconds. Time simply stood still when it was just you and me.',
    imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
    tags: ['Deep Talk', 'Connection'],
  },
  {
    id: 'mem-3',
    title: 'Sunset & Hand Holding',
    date: 'Golden Hour',
    location: 'The Scenic Overlook',
    story: 'The sky was bathed in shades of lavender, gold, and rose. But truth be told, I was mostly looking at your side profile.',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    tags: ['Golden Hour', 'Romance'],
  },
  {
    id: 'mem-4',
    title: 'Uncontrollable Laughter in the Rain',
    date: 'A Spontaneous Afternoon',
    location: 'Downtown Sidewalk',
    story: 'We were completely unprepared for the storm, soaking wet, running under an awning laughing until we had tears in our eyes.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    tags: ['Spontaneous', 'Rain', 'Joy'],
  },
  {
    id: 'mem-5',
    title: 'Coffee, Pastries & Quiet Comfort',
    date: 'Sunday Morning',
    location: 'Our Favourite Cozy Corner',
    story: 'Nothing dramatic happened, and that was the beauty of it. Warm cups, sweet treats, your hand in mine, and soft jazz playing.',
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    tags: ['Cozy', 'Peace'],
  },
  {
    id: 'mem-6',
    title: 'When I Knew I Was In Love',
    date: 'The Epiphany',
    location: 'A Quiet Drive Home',
    story: "You fell asleep with your head leaning against the seat, holding my right hand. I looked at you and whispered in my head: 'I'm done. She has my whole heart.'",
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    tags: ['Falling In Love', 'Milestone'],
  },
];

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: 'tl-1',
    yearOrDate: 'Chapter 01',
    title: 'The Day We First Crossed Paths',
    subtitle: 'Where destiny took over',
    description: 'The universe somehow aligned all its stars so that two strangers could meet. You caught my attention from the very first second.',
    iconName: 'Sparkles',
    highlight: 'A spark was born',
  },
  {
    id: 'tl-2',
    yearOrDate: 'Chapter 02',
    title: 'Our First Real Conversation',
    subtitle: 'Losing track of time',
    description: 'I remember thinking how effortlessly you talked and how refreshing your humor was. I didn’t want the conversation to ever end.',
    iconName: 'MessageCircleHeart',
    highlight: 'Hours felt like minutes',
  },
  {
    id: 'tl-3',
    yearOrDate: 'Chapter 03',
    title: 'The First Time You Made Me Smile',
    subtitle: 'That contagious chuckle',
    description: 'You made that cheeky remark and that cute little grin appeared on your face. Right then, I knew you were something extraordinary.',
    iconName: 'Smile',
    highlight: 'Irresistible charm',
  },
  {
    id: 'tl-4',
    yearOrDate: 'Chapter 04',
    title: 'Our First Official Date',
    subtitle: 'Butterflies in full flight',
    description: 'I rehearsed what I was going to wear three times. All the nervous tension vanished the moment you looked at me with that warm greeting.',
    iconName: 'HeartHandshake',
    highlight: 'Butterflies & warmth',
  },
  {
    id: 'tl-5',
    yearOrDate: 'Chapter 05',
    title: 'Our Favourite Adventure Together',
    subtitle: 'Exploring hand in hand',
    description: 'New sights, delicious food, silly inside jokes, and sharing memories that are permanently etched into my mind.',
    iconName: 'Compass',
    highlight: 'Unforgettable moments',
  },
  {
    id: 'tl-6',
    yearOrDate: 'Chapter 06',
    title: 'The Realization Moment',
    subtitle: 'You are my person',
    description: 'Not a sudden lightning bolt, but a steady, profound quiet truth: in this crowded world of billions, it’s you I want to do life with.',
    iconName: 'Infinity',
    highlight: 'Forever decided',
  },
  {
    id: 'tl-7',
    yearOrDate: 'Today & Beyond',
    title: 'Still Choosing You, Every Single Day',
    subtitle: 'Our story continues',
    description: 'Every morning I wake up grateful for your existence, your love, and the beautiful chapters we still get to write together.',
    iconName: 'Heart',
    highlight: 'Always yours',
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What was the first thing that attracted Walter to you?',
    options: [
      'Your unforgettable radiant smile',
      'The breathtaking sparkle in your eyes',
      'Your stunning style and elegance',
      'Literally all of the above and more',
    ],
    correctIndex: 3,
    explanation: "Tricked you with sweetness! Everything about you captivated me, but your radiant smile and eyes took my breath away.",
    romanticNote: "You had me mesmerized before you even said a single word.",
  },
  {
    id: 2,
    question: 'Who said "I love you" first?',
    options: [
      'Walter, without any hesitation!',
      'You did, with that cute blushing face',
      'We both practically blurted it at the same moment',
      'Our eyes said it long before our lips did',
    ],
    correctIndex: 0,
    explanation: "Walter couldn't hold back the feeling any longer! Though in truth, both our hearts had agreed long before.",
    romanticNote: "Saying those three words to you was the easiest, most honest truth of my life.",
  },
  {
    id: 3,
    question: 'What is Walter’s absolute favourite thing about you?',
    options: [
      'How caring and affectionate you are',
      'Your adorable laugh when you find something funny',
      'The way you make ordinary days feel like fairy tales',
      'Every single little piece of who you are',
    ],
    correctIndex: 3,
    explanation: "Impossible to pick just one! Every facet of who you are is cherished.",
    romanticNote: "You are my favourite person in the entire universe.",
  },
  {
    id: 4,
    question: 'What does Walter miss most whenever you are not around?',
    options: [
      'Your hugs and the warmth of holding you',
      'Hearing your sweet voice throughout the day',
      'The calm peace that comes whenever you enter the room',
      'All of the above — missing you is my least favourite hobby',
    ],
    correctIndex: 3,
    explanation: "All of the above! Being away from you just makes the room feel too quiet and my heart a little impatient.",
    romanticNote: "Even when we are apart, you never really leave my thoughts.",
  },
  {
    id: 5,
    question: 'What is our signature couple superpower?',
    options: [
      'Turning simple grocery runs into comedy shows',
      'Understanding what the other is thinking with just a glance',
      'Eating ridiculous amounts of good food together',
      'Creating endless inside jokes nobody else understands',
    ],
    correctIndex: 1,
    explanation: "That secret glance! One look across the room and we already know what the other is laughing about.",
    romanticNote: "We have our own silent language, and I adore it.",
  },
  {
    id: 6,
    question: 'Where would Walter love to take you most?',
    options: [
      'A dreamy seaside villa overlooking turquoise waters',
      'A cozy wooden cabin with a fireplace and starry skies',
      'Exploring romantic historic cobblestone streets in Europe',
      'Anywhere in the world, as long as your hand is in mine',
    ],
    correctIndex: 3,
    explanation: "The destination doesn't matter nearly as much as the girl sitting next to me.",
    romanticNote: "With you, even sitting on the living room floor feels like paradise.",
  },
  {
    id: 7,
    question: 'What is one thing Walter will NEVER get tired of doing with you?',
    options: [
      'Holding you close and kissing your forehead',
      'Listening to you talk passionately about your day',
      'Teasing you gently until you smile that cute pouty smile',
      'Loving you more and more every single day',
    ],
    correctIndex: 3,
    explanation: "Loving you is effortless, eternal, and my sweetest privilege.",
    romanticNote: "A thousand lifetimes would still not be enough time with you.",
  },
  {
    id: 8,
    question: 'What title do you officially hold in Walter’s life?',
    options: [
      'The Most Beautiful Girl in the World',
      'His Peace, His Happiness & His Partner in Crime',
      'The Official, Undisputed Owner of His Heart',
      'All of the above, sealed for eternity! ❤️',
    ],
    correctIndex: 3,
    explanation: "Certified, stamped, sealed! You own every single heartbeat.",
    romanticNote: "Forever yours, no return policy, no expiration date! ❤️",
  },
];

export const openWhenEnvelopes: OpenWhenEnvelope[] = [
  {
    id: 'ow-missing',
    title: "Open when you're missing me",
    tagline: 'When distance feels a little too far',
    mood: 'Longing & Affection',
    icon: 'HeartHandshake',
    color: 'from-rose-900/60 to-pink-950/70',
    letter: `My Love,

If you are reading this, chances are I am missing you just as fiercely right at this very moment. 

Close your eyes for three seconds. Take a deep, gentle breath. Imagine my arms wrapped securely around you, pulling you in close, my chin resting lightly on your head, whispering that everything is okay.

Distance is only a physical measurement; it has zero authority over how tightly my heart holds onto yours. You are in my thoughts when I wake up, in my mind during the busy hours, and in my quietest prayers before I sleep.

Send me a message right now. Tell me what you're doing. And remember: the wait to hold you again is always worth every single second.

With all my love, Walter ❤️`,
    quote: "Distance means so little when someone means so much.",
    suggestedAction: "Send Walter a text or selfie right now! 📸",
  },
  {
    id: 'ow-sad',
    title: 'Open when you are sad',
    tagline: 'When the world feels heavy and grey',
    mood: 'Comfort & Shelter',
    icon: 'CloudRain',
    color: 'from-blue-950/60 to-purple-950/70',
    letter: `Hey Sweetheart,

I wish I could be right there beside you to wipe away whatever brought this sadness to your eyes. I wish I could wrap you in the warmest blanket, bring you your favourite drink, and just let you rest your head on my shoulder without saying a word.

It is okay to not be okay today. You do not have to be strong all the time. You carry so much grace, but even the strongest hearts need a soft place to land.

Let me be that soft place for you. You are not facing this alone. Whatever made you heavy today will pass, but my love and devotion to you will never waver.

Take it slow today. Be kind to yourself. You are deeply, unconditionally loved.

Yours always, Walter ❤️`,
    quote: "Even the darkest storm eventually runs out of rain. I am right here with you.",
    suggestedAction: "Take 3 deep slow breaths and wrap your arms around yourself.",
  },
  {
    id: 'ow-angry',
    title: 'Open when you are angry with me',
    tagline: 'When we have had a misunderstanding',
    mood: 'Humility & Reassurance',
    icon: 'Flame',
    color: 'from-amber-950/60 to-rose-950/70',
    letter: `My Dearest,

First off: I am so sorry if I did or said something that hurt, frustrated, or disappointed you. Hurting you is genuinely the very last thing I ever want to do.

Sometimes I may stumble, say the wrong words, or fail to see things as clearly as I should. But please never doubt for a single millisecond how much you matter to me.

Our connection is bigger than any disagreement, argument, or frustrating moment. I don't care about 'winning' a discussion; I only care about understanding you, protecting what we have, and holding your hand again.

Whenever you are ready, talk to me. I am listening with an open heart.

I love you, even when you want to throw a pillow at my head. ❤️

Walter`,
    quote: "Us against the problem, never you against me.",
    suggestedAction: "Take a sip of water. When you're ready, let me know what you need.",
  },
  {
    id: 'ow-sleep',
    title: "Open when you can't sleep",
    tagline: 'For late-night restless thoughts',
    mood: 'Serenity & Sweet Dreams',
    icon: 'Moon',
    color: 'from-indigo-950/60 to-slate-950/70',
    letter: `Goodnight my Angel,

If your mind is racing and sleep is playing hard to get, let my words be a lullaby for your thoughts.

Lay your head back on your pillow. Let your shoulders drop. Unclench your jaw and let go of everything that happened today. Tomorrow is a brand new page, and tonight belongs to rest.

Imagine us laying side by side under a clear starry night. The room is cool, the sheets are soft, and you can hear the steady, rhythmic beat of my heart next to your ear.

You are safe. You are protected. You are loved beyond measure.

Close your eyes now. I'll meet you in our dreams.

Sweet dreams, beautiful. Walter ❤️`,
    quote: "May the stars watch over you tonight, as my heart always does.",
    suggestedAction: "Dim the screen, close your eyes, and listen to the gentle melody.",
  },
  {
    id: 'ow-doubt',
    title: "Open when you're doubting yourself",
    tagline: 'When you need a reminder of who you are',
    mood: 'Empowerment & Faith',
    icon: 'Sparkles',
    color: 'from-yellow-950/60 to-rose-950/70',
    letter: `Listen to me carefully, Beautiful:

Whatever imposter syndrome, self-doubt, or insecurity is whispering lies into your ear today — it is completely wrong.

You are brilliant, resilient, capable, and profoundly gifted. I see the quiet effort you put in, the hurdles you overcome, and the warmth you bring into every room you enter.

You have survived 100% of your hardest days up until now. You have overcome obstacles you once thought were impossible.

Never shrink yourself. Never second-guess your worth. I believe in you with every fiber of my soul, and I am so overwhelmingly proud of the woman you are.

Now lift your chin up, remember whose girl you are, and go conquer whatever is in your way.

With endless belief in you, Walter ❤️`,
    quote: "You are far stronger than you know, and more loved than you can imagine.",
    suggestedAction: "Look in the mirror, smile at that gorgeous face, and say: 'I got this.'",
  },
  {
    id: 'ow-happy',
    title: 'Open when you are happy',
    tagline: 'When life is smiling upon you',
    mood: 'Joy & Celebration',
    icon: 'SunMedium',
    color: 'from-pink-900/60 to-amber-950/70',
    letter: `YES! Look at you glowing!

Nothing brings me more joy than knowing that you are happy right now. Your happiness is infectious; when you smile, my entire world feels lighter and brighter.

Savour this feeling! Soak in the victory, the laughter, the sunshine, whatever blessing made today great. You deserve every ounce of joy life has to offer.

I can’t wait to hear all about it and celebrate with you in person.

Keep shining, my love. Walter ❤️`,
    quote: "Seeing you happy is my favourite view in the entire world.",
    suggestedAction: "Dance around the room for 30 seconds!",
  },
  {
    id: 'ow-hug',
    title: 'Open when you need a hug',
    tagline: 'When you need warmth right this second',
    mood: 'Warmth & Closeness',
    icon: 'Heart',
    color: 'from-rose-950/60 to-pink-900/70',
    letter: `Consider this letter an official, non-expiring voucher for the biggest, warmest, longest bear hug you have ever received.

Step 1: Wrap your arms across your chest.
Step 2: Squeeze firmly.
Step 3: Breathe in and know that this is me holding you, refusing to let go until you feel safe, cherished, and grounded.

You are precious to me. Hold onto this warmth until I can replace it with the real thing in my arms.

Hugging you tight, Walter ❤️`,
    quote: "In a world full of noise, your hug is my quiet sanctuary.",
    suggestedAction: "Click the Virtual Hug button below to feel the heartbeat!",
  },
  {
    id: 'ow-birthday',
    title: 'Open on your birthday',
    tagline: 'A celebration of the greatest day',
    mood: 'Gratitude & Celebration',
    icon: 'Cake',
    color: 'from-fuchsia-950/60 to-rose-950/70',
    letter: `Happy Birthday to the Queen of My Heart! 🎂✨

Today is the anniversary of the day the world was blessed with you. And selfishly, I am more grateful for today than anyone else on this planet, because without this day, I would not have you.

Thank you for being born. Thank you for growing into the breathtaking, kind, witty, incredible woman you are today.

May this new year of your life be filled with answered prayers, boundless laughter, thrilling adventures, and love that overflows at every turn.

I promise to make you feel loved not just today, but every day after.

All my love, today and always, Walter ❤️`,
    quote: "The world became infinitely brighter the day you arrived.",
    suggestedAction: "Make a big romantic wish right now!",
  },
  {
    id: 'ow-memories',
    title: 'Open when you miss our memories',
    tagline: 'A stroll down our golden lane',
    mood: 'Nostalgia & Sweetness',
    icon: 'Camera',
    color: 'from-emerald-950/60 to-rose-950/70',
    letter: `My Dearest,

Do you remember our first conversation? How nervous we both were? 
Do you remember that spontaneous burst of laughter when we couldn't stop?
Do you remember looking at each other and knowing, without words, that something rare had begun?

Every single memory we have built together is tucked safely in the vault of my heart. I cherish the silly ordinary moments just as much as the grand milestones.

And the best part? We are only in the opening chapters of our book. The adventures waiting for us in our future will be even more breathtaking than what we leave behind.

Always holding onto our story, Walter ❤️`,
    quote: "I loved you yesterday, I love you still, I always have, I always will.",
    suggestedAction: "Take a peek at Our Little Museum gallery below!",
  },
  {
    id: 'ow-forever',
    title: 'Open when you need to remember how much I love you',
    tagline: 'My most heartfelt truth',
    mood: 'Eternal Devotion',
    icon: 'Infinity',
    color: 'from-rose-950 to-red-950',
    letter: `My Love,

If ever a day comes where you feel forgotten, overlooked, or uncertain about where you stand in my heart, read this and tattoo it into your spirit:

I love you with an intention that does not expire.
I love you on the sunny, easy days.
I love you on the messy, chaotic, difficult days.
I love you when we are laughing until our faces hurt, and I love you when we are tired and quiet.

Out of 8 billion souls on this earth, my heart chose you. And it keeps choosing you, over and over, every sunrise, without a shadow of hesitation.

You are my home, my peace, and my greatest blessing.

Eternally yours, Walter ❤️`,
    quote: "You are my heart, my life, my one and only thought.",
    suggestedAction: "Feel this truth deep within your soul.",
  },
];

export const bucketListItems: BucketListItem[] = [
  { id: 'b-1', title: 'Watch the sunset together on a quiet beach with a cozy blanket', category: 'romance' as any, completed: true },
  { id: 'b-2', title: 'Go on an unplanned, spontaneous road trip with our favourite playlist', category: 'adventure', completed: false },
  { id: 'b-3', title: 'Have a fancy candlelit dinner all dressed up just for each other', category: 'romance' as any, completed: true },
  { id: 'b-4', title: 'Travel across oceans and get lost in historic cobblestone alleys', category: 'travel', completed: false },
  { id: 'b-5', title: 'Take silly photo-booth pictures and keep the prints in our wallets', category: 'cozy', completed: true },
  { id: 'b-6', title: 'Cook an elaborate 3-course meal from scratch together (even if it gets messy!)', category: 'cozy', completed: false },
  { id: 'b-7', title: 'Spend an entire rainy Sunday in bed doing absolutely nothing together', category: 'cozy', completed: true },
  { id: 'b-8', title: 'Stargaze away from city lights and find shooting stars', category: 'adventure', completed: false },
  { id: 'b-9', title: 'Build our dream home library with our favourite books and a reading nook', category: 'milestone', completed: false },
  { id: 'b-10', title: 'Celebrate our 10th, 25th, and 50th anniversaries still deeply in love', category: 'milestone', completed: false },
];

export const travelDestinations: TravelDestination[] = [
  {
    id: 'dest-1',
    name: 'Amalfi Coast',
    country: 'Italy',
    tagline: 'Clifftop lemon groves & pastel terraces',
    description: 'Winding cliffside roads, vintage convertibles, limoncello toasts at sunset, and holding hands while overlooking the Mediterranean sea.',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    dreamActivity: 'A private sunset boat ride along Positano with chilled Italian wine and you looking gorgeous.',
  },
  {
    id: 'dest-2',
    name: 'Kyoto in Cherry Blossom Season',
    country: 'Japan',
    tagline: 'Pink petal whispers & bamboo sanctuaries',
    description: 'Walking beneath tunnels of blooming sakura blossoms, exploring historic lantern-lit temples, and sipping warm matcha together.',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    dreamActivity: 'Renting a serene traditional machiya villa and strolling Gion at dusk under glowing paper lanterns.',
  },
  {
    id: 'dest-3',
    name: 'Swiss Alpine Chalet',
    country: 'Switzerland',
    tagline: 'Snow-capped peaks & crackling fires',
    description: 'A cozy wooden cabin tucked away in Zermatt with panoramic views of snow-dusted mountains, fondue, hot cocoa, and fuzzy blankets.',
    imageUrl: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',
    dreamActivity: 'Sitting by the fireplace wrapped in one large cashmere blanket while snow falls outside.',
  },
  {
    id: 'dest-4',
    name: 'Santorini Sunset Caldera',
    country: 'Greece',
    tagline: 'Cobalt domes & golden Aegean skies',
    description: 'Crisp white architecture against the deepest blue seas, private infinity pools, fresh Mediterranean seafood, and legendary sunsets.',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    dreamActivity: 'A cliffside terrace dinner under the stars watching the sun dip into the Aegean horizon.',
  },
  {
    id: 'dest-5',
    name: 'Northern Lights Glass Igloo',
    country: 'Lapland, Finland',
    tagline: 'Emerald auroras dancing in the night',
    description: 'Laying in a warm glass-domed igloo watching green and violet ribbons of celestial light dance across the arctic sky.',
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    dreamActivity: 'Cuddling under thick fur blankets while nature puts on its greatest light show just for the two of us.',
  },
];

export const appreciationItems: AppreciationItem[] = [
  // Things I Notice
  {
    id: 'app-n1',
    category: 'notice',
    title: 'The Way You Smile Unconsciously',
    detail: 'When you are truly happy or amused, your eyes crinkle up in the sweetest way. It is genuine, pure, and captivates me completely.',
    icon: 'Sparkles',
  },
  {
    id: 'app-n2',
    category: 'notice',
    title: 'The Thoughtfulness in Little Things',
    detail: 'How you remember what people like, how you check up on those you love, and how you make small gestures with immense care.',
    icon: 'Heart',
  },
  {
    id: 'app-n3',
    category: 'notice',
    title: 'Your Quiet Determination',
    detail: 'Even when things are overwhelming, you push through with quiet poise. You have a lion’s heart inside your gentle soul.',
    icon: 'Shield',
  },
  {
    id: 'app-n4',
    category: 'notice',
    title: 'The Way You Express Yourself',
    detail: 'Your enthusiasm when talking about something you love, your animated hand gestures, and how your face lights up.',
    icon: 'Flame',
  },

  // Things I Appreciate
  {
    id: 'app-a1',
    category: 'appreciate',
    title: 'Your Precious Time',
    detail: 'In a busy world where everyone is rushed, you choose to share your most irreplaceable asset — your time — with me.',
    icon: 'Clock',
  },
  {
    id: 'app-a2',
    category: 'appreciate',
    title: 'Your Endless Patience',
    detail: 'For being gentle with me when I am tired, for understanding my flaws, and for meeting me with kindness instead of frustration.',
    icon: 'HandHeart',
  },
  {
    id: 'app-a3',
    category: 'appreciate',
    title: 'Your Tender Affection',
    detail: 'Every hand squeeze, every random hug, every sweet message out of nowhere. It anchors my entire day in happiness.',
    icon: 'HeartHandshake',
  },
  {
    id: 'app-a4',
    category: 'appreciate',
    title: 'Your Effort in Us',
    detail: 'Relationships don’t grow on autopilot. I see how you pour love, attention, and grace into our bond, and I value it with my life.',
    icon: 'Gem',
  },
  {
    id: 'app-a5',
    category: 'appreciate',
    title: 'Your Presence in My Life',
    detail: 'Simply knowing you exist, knowing you are mine, and knowing I get to love you makes my existence infinitely richer.',
    icon: 'Sun',
  },

  // Things I Never Want You to Forget
  {
    id: 'app-f1',
    category: 'never_forget',
    title: 'You Are Breathtakingly Beautiful',
    detail: 'Inside and out. Never let a mirror or a bad day deceive you into forgetting that you are a true masterpiece.',
    icon: 'Flower2',
  },
  {
    id: 'app-f2',
    category: 'never_forget',
    title: 'You Are Utterly Irreplaceable',
    detail: 'There has never been, nor will there ever be, another human soul who brings what you bring to this world and to me.',
    icon: 'Crown',
  },
  {
    id: 'app-f3',
    category: 'never_forget',
    title: 'You Deserve the Purest Happiness',
    detail: 'You deserve to be treated with tenderness, celebrated, respected, and cherished every single second of your life.',
    icon: 'Gift',
  },
  {
    id: 'app-f4',
    category: 'never_forget',
    title: 'You Are Deeply Appreciated',
    detail: 'I see you. I see your heart. None of your sweetness goes unnoticed or taken for granted. You are a treasure.',
    icon: 'Award',
  },
  {
    id: 'app-f5',
    category: 'never_forget',
    title: 'You Are Loved Beyond Words',
    detail: 'Today, tomorrow, and through every high and low life brings. My love for you is unconditional and permanent. ❤️',
    icon: 'Infinity',
  },
];

export const voiceTracksData: VoiceTrack[] = [
  {
    id: 'vt-1',
    title: 'When You Miss Me',
    subtitle: 'A personal reminder from Walter',
    duration: '0:45',
    description: 'Listen whenever distance feels heavy and you need to hear my voice close to your ear.',
    speechText: "Hey beautiful. If you're listening to this right now, I just want you to know that someone is thinking about you. In fact, you're the only one on my mind. I hope you're smiling right now, because your smile is my favorite thing in this world. Close your eyes, take a breath, and know that I love you more than words could ever say.",
  },
  {
    id: 'vt-2',
    title: 'Goodnight, My Angel',
    subtitle: 'A sweet bedtime blessing',
    duration: '0:38',
    description: 'Play this right before you close your eyes and let sleep carry your worries away.',
    speechText: "Goodnight, my love. Let go of whatever made today heavy. You did wonderfully today, and I am so proud of you. Wrap yourself up tight, know that you are deeply loved and safe, and I will see you in our dreams. Sweet dreams, beautiful.",
  },
  {
    id: 'vt-3',
    title: 'Morning Sunshine',
    subtitle: 'Start your day with a smile',
    duration: '0:35',
    description: 'A morning reminder of how special you are before you face the world.',
    speechText: "Good morning, sunshine! Just wanted to make sure the first thing you heard today was a reminder of how gorgeous and capable you are. Go conquer your day, do your best, and remember that I am cheering for you always. I love you!",
  },
  {
    id: 'vt-4',
    title: 'Our Romantic Melody',
    subtitle: 'Soft chords crafted for you',
    duration: '1:10',
    description: 'A soothing polyphonic romantic ambient piano progression composed directly for your peace.',
    speechText: "This melody was created just for you. Whenever you listen, remember that every note represents a heartbeat that beats solely for you, my love.",
  },
];
