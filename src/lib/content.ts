import type { Locale } from "./i18n";

/**
 * Image registry — intrinsic sizes of the optimised files in /public/images.
 * Each image has one editorial job; see the usage notes per key.
 */
const img = (name: string, width: number, height: number) => ({ src: `/images/${name}.webp`, width, height });

export const images = {
  /** Home hero only. Transparent cutout. */
  hero: img("rohit-pandey-full-body-black-nehru-jacket", 604, 1100),
  /** About (home section + about page header). Transparent cutout. */
  about: img("rohit-pandey-arms-crossed-portrait", 755, 1100),
  /** Home About section only. Photograph, shown in a rounded frame. */
  aboutHome: img("rohit-pandey-speaking-podium", 1584, 1154),
  /** Stay-in-touch section. Transparent cutout. */
  portrait: img("rohit-pandey-portrait-closeup", 610, 610),
  /** Public life (home section + public-life page). Transparent cutout. */
  publicLife: img("rohit-pandey-white-kurta-scarf-portrait", 696, 833),
  /** Small avatar in the contact strip on inner pages. Transparent cutout. */
  namaste: img("rohit-pandey-namaste-portrait", 195, 249),
  /** Samajwadi Party milestone (journey) only. */
  joining: img("rohit-pandey-akhilesh-yadav-meeting", 764, 782),
} as const;

export type MediaId =
  | "sp-office-group-01"
  | "sp-office-group-02"
  | "sp-felicitation"
  | "akhilesh-yadav-sp-office"
  | "shivpal-singh-yadav-lucknow"
  | "campaign-graphic";

/**
 * `focus` (object-position) lets a portrait-format photograph fill a
 * landscape frame: the crop removes ceiling and floor, never faces or hands.
 */
export type MediaItem = { id: MediaId; src: string; width: number; height: number; focus?: string };

const media: Record<MediaId, MediaItem> = {
  "sp-office-group-01": { id: "sp-office-group-01", ...img("rohit-pandey-sp-office-group-photo-01", 1280, 853) },
  "sp-office-group-02": { id: "sp-office-group-02", focus: "50% 74%", ...img("rohit-pandey-sp-office-group-photo-02", 853, 1280) },
  "sp-felicitation": { id: "sp-felicitation", ...img("rohit-pandey-sp-felicitation-group-photo", 1280, 853) },
  "akhilesh-yadav-sp-office": { id: "akhilesh-yadav-sp-office", focus: "50% 36%", ...img("rohit-pandey-akhilesh-yadav-sp-office-01", 961, 1280) },
  "shivpal-singh-yadav-lucknow": {
    id: "shivpal-singh-yadav-lucknow",
    focus: "50% 30%",
    ...img("rohit-pandey-shivpal-singh-yadav-lucknow", 960, 1280),
  },
  "campaign-graphic": { id: "campaign-graphic", ...img("rohit-pandey-sant-kabir-nagar-campaign-graphic", 1600, 900) },
};

/** Homepage: a single feature photograph. */
export const homeGallery: MediaItem[] = [media["sp-office-group-01"]];

/**
 * Media page: feature, two supporting, then the archive. The journey's
 * milestone photograph is deliberately not repeated here.
 */
export const fullGallery: MediaItem[] = [
  media["sp-office-group-01"],
  media["akhilesh-yadav-sp-office"],
  media["sp-felicitation"],
  media["sp-office-group-02"],
  media["shivpal-singh-yadav-lucknow"],
  media["campaign-graphic"],
];

/** Journey milestones that carry a photograph. */
export const journeyImages: Partial<Record<string, { src: string; width: number; height: number }>> = {
  joining: images.joining,
};

type Localised<T> = Record<Locale, T>;

export type UpdateImage = { src: string; width: number; height: number; alt: Localised<string> };

export type Update = {
  slug: string;
  /** ISO date this note was published on the website (not the event date). */
  published: string;
  /** Event period, as precise as the source allows. */
  period: Localised<string>;
  category: Localised<string>;
  title: Localised<string>;
  summary: Localised<string>;
  body: Localised<string[]>;
  image?: UpdateImage;
  /** A video, shown in place of the lead photograph. */
  video?: { src: string; poster: string; width: number; height: number; label: Localised<string> };
  /** Further photographs, shown in a row beneath the article. */
  gallery?: UpdateImage[];
};

export const updates: Update[] = [
  {
    slug: "chiutna-chauraha-office-khalilabad",
    published: "2026-10-05",
    period: { en: "4 October 2026", hi: "4 अक्टूबर 2026" },
    category: { en: "Organisation", hi: "संगठन" },
    title: {
      en: "At the Chiutna Chauraha office: reviewing arrangements and meeting colleagues",
      hi: "चिउटना चौराहा स्थित कार्यालय पर व्यवस्थाओं का जायजा, साथियों से मुलाकात",
    },
    summary: {
      en: "Rohit Pandey visited his office at Chiutna Chauraha, Khalilabad (313), reviewed arrangements and met colleagues and residents to discuss public issues and strengthening the organisation.",
      hi: "खलीलाबाद विधानसभा-313 के चिउटना चौराहा स्थित कार्यालय पर पहुँचकर व्यवस्थाओं का जायजा लिया और साथियों एवं क्षेत्रवासियों से जनहित व संगठन को मजबूत करने पर चर्चा की।",
    },
    body: {
      en: [
        "Rohit Pandey visited his office at Chiutna Chauraha in the Khalilabad assembly area (No. 313), Sant Kabir Nagar, and reviewed the arrangements there.",
        "He warmly met respected colleagues and residents of the area, and had a meaningful discussion on issues of public interest, local problems and strengthening the organisation.",
        "Block Pramukh representative Shri Mumtaz Ahmad, along with respected colleagues and dignitaries of the area, was present. The affection, support and trust of colleagues is a constant inspiration to strengthen the socialist ideology.",
      ],
      hi: [
        "रोहित पांडेय ने खलीलाबाद विधानसभा-313, संत कबीर नगर के चिउटना चौराहा स्थित अपने कार्यालय पर पहुंचकर व्यवस्थाओं का जायजा लिया।",
        "इस दौरान क्षेत्र के सम्मानित साथियों एवं क्षेत्रवासियों से आत्मीय मुलाकात कर जनहित के मुद्दों, क्षेत्रीय समस्याओं एवं संगठन को मजबूत करने को लेकर सार्थक चर्चा हुई।",
        "ब्लॉक प्रमुख प्रतिनिधि श्री मुमताज अहमद सहित क्षेत्र के सम्मानित साथियों एवं गणमान्यजनों की उपस्थिति रही। साथियों का स्नेह, सहयोग और विश्वास समाजवादी विचारधारा को मजबूत करने की निरंतर प्रेरणा है।",
      ],
    },
    image: {
      ...img("rohit-pandey-chiutna-chauraha-office", 1600, 1069),
      alt: {
        en: "Rohit Pandey with colleagues and residents at his office at Chiutna Chauraha, Khalilabad",
        hi: "खलीलाबाद के चिउटना चौराहा स्थित कार्यालय पर साथियों एवं क्षेत्रवासियों के साथ रोहित पांडेय",
      },
    },
    gallery: [
      {
        ...img("rohit-pandey-chiutna-chauraha-office-02", 1280, 854),
        alt: {
          en: "Meeting with colleagues and residents at the Chiutna Chauraha office",
          hi: "चिउटना चौराहा कार्यालय पर साथियों एवं क्षेत्रवासियों के साथ बैठक",
        },
      },
    ],
  },
  {
    slug: "organisational-meeting-khalilabad-313",
    published: "2026-10-05",
    period: { en: "Khalilabad (313)", hi: "खलीलाबाद (313)" },
    category: { en: "Organisation", hi: "संगठन" },
    title: {
      en: "Organisational meeting in Vidhan Sabha 313, Sant Kabir Nagar",
      hi: "विधानसभा 313, संत कबीर नगर में महत्वपूर्ण संगठनात्मक बैठक",
    },
    summary: {
      en: "Rohit Pandey took part in an important organisational meeting in Vidhan Sabha 313, discussing party strength, local development and strategy ahead.",
      hi: "विधानसभा 313, संत कबीर नगर में आयोजित महत्वपूर्ण संगठनात्मक बैठक में सहभागिता कर संगठन की मजबूती, क्षेत्र के विकास और आगामी रणनीतियों पर चर्चा की।",
    },
    body: {
      en: [
        "Rohit Pandey took part in an important organisational meeting in Vidhan Sabha 313, Sant Kabir Nagar, where strengthening the organisation, the overall development of the area, matters of public interest, upcoming political and social strategy, and the Special Intensive Revision were discussed in detail.",
        "Together with office-bearers, senior leaders and dedicated workers, the basic problems of the area and the expectations and struggles of the people were considered seriously. Special emphasis was laid on making the organisation more active and stronger, so that the Samajwadi Party's public-welfare policies, its ideology of social justice and constitutional values reach every household.",
        "Under the leadership of National President Shri Akhilesh Yadav ji, all present resolved to keep raising the voice of farmers, youth, women, backward classes, Dalits and the underprivileged, and to carry forward the work for the area's development and the fight for social justice.",
        "The people's trust is our greatest strength — and on that trust, the work of taking socialist ideals to every home will continue.",
      ],
      hi: [
        "विधानसभा 313, संत कबीर नगर में आयोजित महत्वपूर्ण संगठनात्मक बैठक में सहभागिता कर संगठन की मजबूती, क्षेत्र के समग्र विकास, जनहित से जुड़े महत्वपूर्ण विषयों तथा आगामी राजनीतिक, सामाजिक रणनीतियों एवं विशेष गहन पुनरावलोकन से सम्बंधित विषयों पर विस्तृत चर्चा की।",
        "बैठक में उपस्थित सम्मानित पदाधिकारियों, वरिष्ठ नेताओं एवं समर्पित कार्यकर्ताओं के साथ क्षेत्र की मूलभूत समस्याओं, जनता की अपेक्षाओं एवं संघर्षों पर गंभीर विचार-विमर्श किया गया। साथ ही समाजवादी पार्टी की जनहितकारी नीतियों, सामाजिक न्याय की विचारधारा एवं संविधानिक मूल्यों को जन-जन तक पहुँचाने हेतु संगठन को और अधिक सक्रिय एवं सशक्त बनाने पर विशेष बल दिया गया।",
        "हम सभी ने संकल्प लिया कि समाजवादी पार्टी के राष्ट्रीय अध्यक्ष आदरणीय श्री अखिलेश यादव जी के नेतृत्व में जनता के अधिकारों, किसानों, नौजवानों, महिलाओं, पिछड़ों, दलितों एवं वंचित वर्गों की आवाज को मजबूती से उठाते हुए क्षेत्र के विकास और सामाजिक न्याय की लड़ाई को निरंतर आगे बढ़ाया जाएगा।",
        "जनता का विश्वास ही हमारी सबसे बड़ी शक्ति है और उसी विश्वास को आधार बनाकर समाजवादी विचारधारा को घर-घर तक पहुँचाने का कार्य निरंतर जारी रहेगा।",
      ],
    },
  },
  {
    slug: "courtesy-visit-kushal-tiwari-gorakhpur",
    published: "2026-10-05",
    period: { en: "24 September 2026", hi: "24 सितंबर 2026" },
    category: { en: "Party", hi: "पार्टी" },
    title: {
      en: "A courtesy visit to former MP Shri Kushal Tiwari in Gorakhpur",
      hi: "गोरखपुर में पूर्व सांसद श्री कुशल तिवारी जी से शिष्टाचार भेंट",
    },
    summary: {
      en: "Rohit Pandey called on former Sant Kabir Nagar MP Shri Bhishma Shankar Tiwari (Kushal Tiwari) at Tiwari Hata, Gorakhpur, and discussed the 2027 Assembly election strategy.",
      hi: "संत कबीर नगर के पूर्व सांसद श्री भीष्म शंकर तिवारी उर्फ कुशल तिवारी जी के आवास “तिवारी हाता”, गोरखपुर पहुँचकर शिष्टाचार भेंट की।",
    },
    body: {
      en: [
        "Rohit Pandey paid a courtesy call on Shri Bhishma Shankar Tiwari, popularly known as Kushal Tiwari, former Member of Parliament from Sant Kabir Nagar, at his residence “Tiwari Hata” in Gorakhpur.",
        "During the visit they discussed strategies for the upcoming 2027 Assembly elections and various social issues.",
      ],
      hi: [
        "रोहित पांडेय ने संत कबीर नगर के पूर्व सांसद श्री भीष्म शंकर तिवारी उर्फ कुशल तिवारी जी के आवास “तिवारी हाता”, गोरखपुर पहुँचकर शिष्टाचार भेंट की।",
        "इस दौरान आगामी 2027 के विधानसभा चुनाव की रणनीतियों एवं सामाजिक विषयों पर चर्चा हुई।",
      ],
    },
    image: {
      ...img("rohit-pandey-kushal-tiwari-gorakhpur", 1504, 1004),
      alt: {
        en: "Rohit Pandey with former Sant Kabir Nagar MP Shri Kushal Tiwari at Tiwari Hata, Gorakhpur",
        hi: "गोरखपुर के तिवारी हाता में पूर्व सांसद श्री कुशल तिवारी जी के साथ रोहित पांडेय",
      },
    },
  },
  {
    slug: "among-residents-khalilabad",
    published: "2026-10-05",
    period: { en: "18 September 2026", hi: "18 सितंबर 2026" },
    category: { en: "Public life", hi: "जनजीवन" },
    title: {
      en: "Among the people of the Khalilabad assembly area",
      hi: "खलीलाबाद विधानसभा क्षेत्र में देवतुल्य क्षेत्रवासियों के बीच",
    },
    summary: {
      en: "A video from Rohit Pandey's visit among the residents of the Khalilabad assembly area.",
      hi: "खलीलाबाद विधानसभा क्षेत्र में क्षेत्रवासियों के बीच रोहित पांडेय के दौरे का वीडियो।",
    },
    body: {
      en: ["Rohit Pandey among the people of the Khalilabad assembly area. Watch the video of the visit."],
      hi: ["अपने खलीलाबाद विधानसभा क्षेत्र में देवतुल्य क्षेत्रवासियों के बीच।"],
    },
    video: {
      src: "/videos/rohit-pandey-khalilabad-18-september.mp4",
      poster: "/videos/rohit-pandey-khalilabad-18-september-poster.webp",
      width: 720,
      height: 1280,
      label: {
        en: "Rohit Pandey among residents of the Khalilabad assembly area, 18 September 2026",
        hi: "खलीलाबाद विधानसभा क्षेत्र में क्षेत्रवासियों के बीच रोहित पांडेय, 18 सितंबर 2026",
      },
    },
  },
  {
    slug: "kekarhwa-chauraha-khalilabad",
    published: "2026-10-05",
    period: { en: "18 September 2026", hi: "18 सितंबर 2026" },
    category: { en: "Public life", hi: "जनजीवन" },
    title: {
      en: "Meeting residents at Kekarhwa Chauraha, Thurunda Road, Khalilabad",
      hi: "खलीलाबाद के थूरंडा रोड स्थित केकरहवा चौराहे पर क्षेत्रवासियों से भेंट",
    },
    summary: {
      en: "Rohit Pandey met residents at Kekarhwa Chauraha, asked after their well-being and discussed the 2027 Assembly elections and local concerns.",
      hi: "केकरहवा चौराहे पर क्षेत्रवासियों से आत्मीय भेंट कर उनका कुशल-क्षेम जाना एवं विधानसभा चुनाव-2027 सहित क्षेत्र के विषयों पर चर्चा की।",
    },
    body: {
      en: [
        "Rohit Pandey visited Kekarhwa Chauraha on Thurunda Road in the Khalilabad assembly area and met the people of the area warmly, asking after their well-being. He held a meaningful discussion on the upcoming 2027 Assembly elections.",
        "He discussed the development of the area, the problems faced by the public and various matters of public interest in detail, and listened to the suggestions and views of residents.",
      ],
      hi: [
        "रोहित पांडेय ने खलीलाबाद विधानसभा क्षेत्र के थूरंडा रोड स्थित केकरहवा चौराहे पर पहुँचकर देवतुल्य क्षेत्रवासियों से आत्मीय भेंट कर उनका कुशल-क्षेम जाना एवं आगामी विधानसभा चुनाव-2027 को लेकर सार्थक चर्चा की।",
        "इस दौरान क्षेत्र के विकास, जनसमस्याओं एवं जनहित से जुड़े विभिन्न विषयों पर विस्तारपूर्वक चर्चा करते हुए क्षेत्रवासियों के सुझावों एवं विचारों को सुना।",
      ],
    },
    image: {
      ...img("rohit-pandey-kekarhwa-chauraha-khalilabad", 1280, 854),
      alt: {
        en: "Rohit Pandey with residents and party workers at Kekarhwa Chauraha, Khalilabad",
        hi: "खलीलाबाद के केकरहवा चौराहे पर क्षेत्रवासियों एवं कार्यकर्ताओं के साथ रोहित पांडेय",
      },
    },
    gallery: [
      {
        ...img("rohit-pandey-kekarhwa-chauraha-closeup", 1280, 854),
        alt: {
          en: "Rohit Pandey in conversation with a resident at Kekarhwa Chauraha",
          hi: "केकरहवा चौराहे पर एक क्षेत्रवासी से बातचीत करते रोहित पांडेय",
        },
      },
      {
        ...img("rohit-pandey-kekarhwa-chauraha-group-02", 1280, 854),
        alt: {
          en: "Rohit Pandey listening to residents at Kekarhwa Chauraha",
          hi: "केकरहवा चौराहे पर क्षेत्रवासियों की बात सुनते रोहित पांडेय",
        },
      },
      {
        ...img("rohit-pandey-kekarhwa-chauraha-group-03", 1280, 854),
        alt: {
          en: "Rohit Pandey with residents and party workers at Kekarhwa Chauraha",
          hi: "केकरहवा चौराहे पर क्षेत्रवासियों एवं कार्यकर्ताओं के साथ रोहित पांडेय",
        },
      },
    ],
  },
  {
    slug: "rajbhar-samaj-meeting-mohanbara",
    published: "2026-10-05",
    period: { en: "17 September 2026", hi: "17 सितंबर 2026" },
    category: { en: "Public life", hi: "जनजीवन" },
    title: {
      en: "Meeting with the Rajbhar community at Mohanbara (Bayara)",
      hi: "ग्रामसभा मोहनबरा (बयारा) में राजभर समाज के साथियों के साथ बैठक",
    },
    summary: {
      en: "Rohit Pandey met members of the Rajbhar community at Gram Sabha Mohanbara (Bayara) and appealed for a Samajwadi Party vote in the 2027 Assembly elections.",
      hi: "ग्रामसभा मोहनबरा (बयारा) में राजभर समाज के साथियों के साथ बैठक कर आगामी विधानसभा चुनाव 2027 में समाजवादी पार्टी को वोट देने की अपील की।",
    },
    body: {
      en: [
        "In Gram Sabha Mohanbara (Bayara) of the Khalilabad assembly area, Rohit Pandey held a meeting with respected members of the Rajbhar community. He made them aware of the injustice under the BJP government and the violation of their rights.",
        "He appealed to them to vote for the Samajwadi Party in the 2027 Assembly elections and make Shri Akhilesh Yadav ji Chief Minister, so that Uttar Pradesh moves ahead on the path of progress and good governance.",
        "The members of the Rajbhar community present resolved in one voice to make the Samajwadi Party victorious and to make Shri Akhilesh Yadav ji the Chief Minister of Uttar Pradesh.",
      ],
      hi: [
        "रोहित पांडेय ने खलीलाबाद विधानसभा क्षेत्र के ग्रामसभा मोहनबरा (बयारा) में राजभर समाज के सम्मानित साथियों के साथ बैठक कर भाजपा सरकार में हो रहे अन्याय तथा उनके हक़-हुकूक के हनन के ख़िलाफ़ जागरूक किया।",
        "उत्तर प्रदेश को तरक्की एवं सुशासन के रास्ते पर आगे ले चलने हेतु आगामी 2027 के विधानसभा चुनाव में समाजवादी पार्टी को वोट देकर श्री अखिलेश यादव जी को मुख्यमंत्री बनाने की अपील की।",
        "उपस्थित राजभर समाज के साथियों ने एकसुर में समाजवादी पार्टी को विजयी बनाने तथा श्री अखिलेश यादव जी को उत्तर प्रदेश का मुख्यमंत्री बनाने का संकल्प लिया।",
      ],
    },
    image: {
      ...img("rohit-pandey-mohanbara-rajbhar-samaj-meeting", 1504, 1004),
      alt: {
        en: "Rohit Pandey at a meeting with the Rajbhar community at Mohanbara (Bayara), Khalilabad",
        hi: "ग्रामसभा मोहनबरा (बयारा) में राजभर समाज के साथियों की बैठक में रोहित पांडेय",
      },
    },
    gallery: [
      {
        ...img("rohit-pandey-mohanbara-rajbhar-samaj-welcome", 1504, 1004),
        alt: {
          en: "Rohit Pandey being welcomed by community members at Mohanbara (Bayara)",
          hi: "मोहनबरा (बयारा) में साथियों के बीच रोहित पांडेय",
        },
      },
    ],
  },
  {
    slug: "booth-sector-review-meeting-khalilabad",
    published: "2026-10-05",
    period: { en: "8 September 2026", hi: "8 सितंबर 2026" },
    category: { en: "Organisation", hi: "संगठन" },
    title: {
      en: "Review meeting of booth presidents and sector in-charges, Khalilabad",
      hi: "बूथ अध्यक्षों एवं सेक्टर प्रभारियों की समीक्षा बैठक, खलीलाबाद",
    },
    summary: {
      en: "Rohit Pandey attended the Samajwadi Party's review meeting of booth presidents and sector in-charges at Shakahari Marriage Hall, Badhgo–Khalilabad.",
      hi: "शाकाहारी मैरिज हॉल, बढ़गो–खलीलाबाद में समाजवादी पार्टी के बूथ अध्यक्षों एवं सेक्टर प्रभारी/अध्यक्षों की समीक्षा बैठक में सम्मिलित हुए।",
    },
    body: {
      en: [
        "Rohit Pandey attended the Samajwadi Party's review meeting of booth presidents and sector in-charges/presidents held at Shakahari Marriage Hall, Badhgo–Khalilabad, Sant Kabir Nagar.",
        "The meeting held important discussion and deliberation on strengthening the organisation down to the booth level, activating workers and taking socialist ideology to every person.",
        "All colleagues resolved together to strengthen the organisation and carry the voice of PDA to every village, and pledged to make National President Shri Akhilesh Yadav ji the Chief Minister of Uttar Pradesh in the 2027 Assembly elections.",
      ],
      hi: [
        "शाकाहारी मैरिज हॉल, बढ़गो–खलीलाबाद, संत कबीर नगर में आयोजित समाजवादी पार्टी के बूथ अध्यक्षों एवं सेक्टर प्रभारी/अध्यक्षों की समीक्षा बैठक में रोहित पांडेय सम्मिलित हुए।",
        "बैठक में बूथ स्तर तक संगठन को मजबूत करने, कार्यकर्ताओं को सक्रिय करने एवं समाजवादी विचारधारा को जन-जन तक पहुंचाने को लेकर महत्वपूर्ण चर्चा एवं मंथन हुआ।",
        "सभी साथियों ने एकजुट होकर संगठन को मजबूत करने और PDA की आवाज़ को गांव-गांव तक पहुंचाने का संकल्प लिया एवं आगामी 2027 के विधानसभा चुनाव में समाजवादी पार्टी के माननीय राष्ट्रीय अध्यक्ष श्री अखिलेश यादव जी को उत्तर प्रदेश का मुख्यमंत्री बनाने का संकल्प लिया।",
      ],
    },
    video: {
      src: "/videos/rohit-pandey-booth-sector-review-8-september.mp4",
      poster: "/videos/rohit-pandey-booth-sector-review-8-september-poster.webp",
      width: 720,
      height: 1280,
      label: {
        en: "Rohit Pandey addressing the booth presidents and sector in-charges review meeting, 8 September 2026",
        hi: "बूथ अध्यक्षों एवं सेक्टर प्रभारियों की समीक्षा बैठक में संबोधित करते रोहित पांडेय, 8 सितंबर 2026",
      },
    },
    gallery: [
      {
        ...img("rohit-pandey-booth-sector-review-speech", 1568, 1154),
        alt: {
          en: "Rohit Pandey addressing the review meeting at Shakahari Marriage Hall, Badhgo–Khalilabad",
          hi: "शाकाहारी मैरिज हॉल, बढ़गो–खलीलाबाद में समीक्षा बैठक को संबोधित करते रोहित पांडेय",
        },
      },
    ],
  },
  {
    slug: "meeting-shivpal-singh-yadav-lucknow",
    published: "2026-10-03",
    period: { en: "Lucknow", hi: "लखनऊ" },
    category: { en: "Party", hi: "पार्टी" },
    title: {
      en: "A courtesy meeting with Shri Shivpal Singh Yadav in Lucknow",
      hi: "लखनऊ में श्री शिवपाल सिंह यादव जी से शिष्टाचार भेंट",
    },
    summary: {
      en: "In Lucknow, Rohit Pandey called on Shri Shivpal Singh Yadav, National General Secretary of the Samajwadi Party, and received his affection and guidance.",
      hi: "रोहित पांडेय ने लखनऊ में समाजवादी पार्टी के राष्ट्रीय महासचिव श्री शिवपाल सिंह यादव जी से शिष्टाचार भेंट कर उनका स्नेह एवं मार्गदर्शन प्राप्त किया।",
    },
    body: {
      en: [
        "In Lucknow, Rohit Pandey paid a courtesy call on Shri Shivpal Singh Yadav ji — affectionately known as “Chacha” — National General Secretary of the Samajwadi Party, former Cabinet Minister and the respected MLA from the Etawah–Jaswantnagar assembly constituency. He was grateful to receive his warmth and guidance.",
        "The two held a meaningful discussion on making the Samajwadi Party stronger and more effective at every level, from the booth upwards.",
        "On the occasion, Rohit Pandey also reaffirmed his firm resolve to work for a full-majority Samajwadi Party government in Uttar Pradesh in the 2027 Assembly elections, with Shri Akhilesh Yadav ji as Chief Minister once again.",
      ],
      hi: [
        "रोहित पांडेय ने लखनऊ में समाजवादी पार्टी के राष्ट्रीय महासचिव, पूर्व कैबिनेट मंत्री एवं इटावा-जसवंतनगर विधानसभा क्षेत्र से माननीय लोकप्रिय विधायक श्री शिवपाल सिंह यादव (चाचा) जी से शिष्टाचार भेंट की और उनका स्नेह एवं मार्गदर्शन प्राप्त किया।",
        "इस अवसर पर समाजवादी पार्टी को बूथ स्तर से लेकर उच्च स्तर तक और अधिक मज़बूत एवं प्रभावशाली बनाने को लेकर सार्थक चर्चा हुई।",
        "साथ ही, आगामी विधानसभा चुनाव 2027 में प्रदेश में समाजवादी पार्टी की पूर्ण बहुमत की सरकार बनाने और माननीय श्री अखिलेश यादव जी को पुनः मुख्यमंत्री बनाने का दृढ़ संकल्प लिया।",
      ],
    },
    image: {
      ...img("rohit-pandey-shivpal-singh-yadav-lucknow", 960, 1280),
      alt: {
        en: "Rohit Pandey with Shri Shivpal Singh Yadav, National General Secretary of the Samajwadi Party, in Lucknow",
        hi: "लखनऊ में समाजवादी पार्टी के राष्ट्रीय महासचिव श्री शिवपाल सिंह यादव जी के साथ रोहित पांडेय",
      },
    },
  },
  {
    slug: "organisational-activity-khalilabad",
    published: "2026-10-02",
    period: { en: "September 2026", hi: "सितंबर 2026" },
    category: { en: "Organisation", hi: "संगठन" },
    title: {
      en: "Party organisational work in the Khalilabad assembly area",
      hi: "खलीलाबाद विधानसभा क्षेत्र में संगठनात्मक कार्य",
    },
    summary: {
      en: "Reporting in September 2026 mentioned Rohit Pandey's participation in Samajwadi Party organisational activity around Khalilabad.",
      hi: "सितंबर 2026 की रिपोर्टों में खलीलाबाद क्षेत्र में समाजवादी पार्टी की संगठनात्मक गतिविधि में रोहित पांडेय की भागीदारी का उल्लेख हुआ।",
    },
    body: {
      en: [
        "Reporting in September 2026 mentioned Rohit Pandey's participation in Samajwadi Party organisational activity around the Khalilabad assembly area.",
        "Khalilabad (assembly constituency No. 313) is the headquarters of Sant Kabir Nagar district and one of the five assembly segments of the Sant Kabir Nagar Lok Sabha seat.",
      ],
      hi: [
        "सितंबर 2026 की रिपोर्टों में खलीलाबाद विधानसभा क्षेत्र में समाजवादी पार्टी की संगठनात्मक गतिविधियों में रोहित पांडेय की भागीदारी का उल्लेख हुआ।",
        "खलीलाबाद (विधानसभा क्षेत्र संख्या 313) संत कबीर नगर ज़िले का मुख्यालय है और संत कबीर नगर लोकसभा सीट के पाँच विधानसभा क्षेत्रों में से एक है।",
      ],
    },
  },
  {
    slug: "welcomed-in-sant-kabir-nagar",
    published: "2026-10-02",
    period: { en: "2026, after joining", hi: "2026, पार्टी में आने के बाद" },
    category: { en: "Public life", hi: "जनजीवन" },
    title: {
      en: "Welcomed by party workers in Sant Kabir Nagar",
      hi: "संत कबीर नगर में पार्टी कार्यकर्ताओं ने किया स्वागत",
    },
    summary: {
      en: "After joining the Samajwadi Party, Rohit Pandey made a public visit to Sant Kabir Nagar, where party workers welcomed him.",
      hi: "समाजवादी पार्टी में शामिल होने के बाद रोहित पांडेय ने संत कबीर नगर का सार्वजनिक दौरा किया, जहाँ पार्टी कार्यकर्ताओं ने उनका स्वागत किया।",
    },
    body: {
      en: [
        "After joining the Samajwadi Party, Rohit Pandey made a public visit to Sant Kabir Nagar.",
        "Party workers gathered to welcome him during the visit — one of the first public moments of his new political chapter in the district.",
      ],
      hi: [
        "समाजवादी पार्टी में शामिल होने के बाद रोहित पांडेय ने संत कबीर नगर का सार्वजनिक दौरा किया।",
        "दौरे के दौरान पार्टी कार्यकर्ताओं ने एकत्र होकर उनका स्वागत किया — ज़िले में उनके नए राजनीतिक अध्याय के शुरुआती सार्वजनिक क्षणों में से एक।",
      ],
    },
  },
  {
    slug: "joins-samajwadi-party",
    published: "2026-10-02",
    period: { en: "March 2026", hi: "मार्च 2026" },
    category: { en: "Party", hi: "पार्टी" },
    title: {
      en: "Rohit Pandey joins the Samajwadi Party",
      hi: "रोहित पांडेय समाजवादी पार्टी में शामिल",
    },
    summary: {
      en: "The advocate and social-political worker from Khalilabad joined the Samajwadi Party in March 2026.",
      hi: "खलीलाबाद के अधिवक्ता एवं सामाजिक-राजनीतिक कार्यकर्ता मार्च 2026 में समाजवादी पार्टी में शामिल हुए।",
    },
    body: {
      en: [
        "Rohit Pandey, an advocate and social-political worker from Khalilabad, joined the Samajwadi Party in March 2026.",
        "His public profile describes him as a former Lok Sabha candidate from Sant Kabir Nagar. His political work now continues with the Samajwadi Party, with a focus on the Khalilabad assembly area of Sant Kabir Nagar district.",
      ],
      hi: [
        "खलीलाबाद के अधिवक्ता एवं सामाजिक-राजनीतिक कार्यकर्ता रोहित पांडेय मार्च 2026 में समाजवादी पार्टी में शामिल हुए।",
        "उनके सार्वजनिक प्रोफ़ाइल में उन्हें संत कबीर नगर से पूर्व लोकसभा प्रत्याशी बताया गया है। अब उनका राजनीतिक कार्य समाजवादी पार्टी के साथ, संत कबीर नगर ज़िले के खलीलाबाद विधानसभा क्षेत्र पर केंद्रित है।",
      ],
    },
    image: {
      ...images.joining,
      alt: {
        en: "Rohit Pandey greeting Samajwadi Party national president Akhilesh Yadav",
        hi: "समाजवादी पार्टी के राष्ट्रीय अध्यक्ष अखिलेश यादव से भेंट करते रोहित पांडेय",
      },
    },
  },
];

export function getUpdate(slug: string): Update | undefined {
  return updates.find((u) => u.slug === slug);
}
