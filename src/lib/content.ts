import { byNewest } from "./dates";
import type { Locale } from "./i18n";

/**
 * Image registry: intrinsic sizes of the optimised files in /public/images.
 * Each image has one editorial job; see the usage notes per key.
 */
const img = (name: string, width: number, height: number) => ({ src: `/images/${name}.webp`, width, height });

export const images = {
  /** Home hero only. Transparent cutout. */
  hero: img("rohit-pandey-full-body-black-nehru-jacket", 604, 1100),
  /** Small avatar in the contact strip on inner pages. Transparent cutout. */
  namaste: img("rohit-pandey-namaste-portrait", 195, 249),
  /** Home About section only. Photograph, shown in a rounded frame beside the text. */
  aboutHome: img("rohit-pandey-speaking-podium", 943, 669),
  /** Samajwadi Party milestone (journey) and the joining and Sant Kabir Nagar welcome updates. */
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

/** The campaign graphic, also used beside the About page title. */
export const campaignGraphic = media["campaign-graphic"];

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

/**
 * `date` is an ISO date at the precision that is known: "2026-10-04",
 * "2026-09" (month only) or "2026" (year only). Never guess a day.
 */
export type Update = {
  slug: string;
  date: string;
  /** Where it happened. Shown as a separate tag, never in place of the date. */
  location?: Localised<string>;
  category: Localised<string>;
  title: Localised<string>;
  summary: Localised<string>;
  body: Localised<string[]>;
  image?: UpdateImage;
  /** A video, shown in place of the lead photograph. */
  video?: { src: string; poster: string; blur: string; width: number; height: number; label: Localised<string> };
  /** Further photographs, shown in a row beneath the article. */
  gallery?: UpdateImage[];
};

const rawUpdates: Update[] = [
  {
    slug: "chiutna-chauraha-office-khalilabad",
    date: "2026-10-04",
    location: { en: "Chiutna Chauraha, Khalilabad", hi: "चिउटना चौराहा, खलीलाबाद" },
    category: { en: "Organisation", hi: "संगठन" },
    title: {
      en: "At the Chiutna Chauraha office: reviewing arrangements and meeting colleagues",
      hi: "चिउटना चौराहा स्थित कार्यालय पर व्यवस्थाओं का जायजा, साथियों से मुलाकात",
    },
    summary: {
      en: "Rohit Pandey visited his office at Chiutna Chauraha, reviewed the arrangements and met colleagues and residents to discuss public issues and strengthening the organisation.",
      hi: "खलीलाबाद विधानसभा-313 के चिउटना चौराहा स्थित कार्यालय पर पहुँचकर व्यवस्थाओं का जायजा लिया और साथियों एवं क्षेत्रवासियों से जनहित व संगठन को मजबूत करने पर चर्चा की।",
    },
    body: {
      en: [
        "Rohit Pandey visited his office at Chiutna Chauraha in the Khalilabad assembly area (No. 313), Sant Kabir Nagar, and reviewed the arrangements there.",
        "He met colleagues and residents of the area and discussed issues of public interest, local problems and how to strengthen the organisation.",
        "Block Pramukh representative Shri Mumtaz Ahmad, along with colleagues and dignitaries of the area, was present. The affection, support and trust of colleagues keeps the work of the socialist movement going.",
        "The office at Chiutna Chauraha is the base for Rohit Pandey's work in Khalilabad. Residents can visit to meet him and raise their concerns, or write to the office through the contact page of this website.",
      ],
      hi: [
        "रोहित पाण्डेय ने खलीलाबाद विधानसभा-313, संत कबीर नगर के चिउटना चौराहा स्थित अपने कार्यालय पर पहुंचकर व्यवस्थाओं का जायजा लिया।",
        "इस दौरान क्षेत्र के सम्मानित साथियों एवं क्षेत्रवासियों से आत्मीय मुलाकात कर जनहित के मुद्दों, क्षेत्रीय समस्याओं एवं संगठन को मजबूत करने को लेकर सार्थक चर्चा हुई।",
        "ब्लॉक प्रमुख प्रतिनिधि श्री मुमताज अहमद सहित क्षेत्र के सम्मानित साथियों एवं गणमान्यजनों की उपस्थिति रही। साथियों का स्नेह, सहयोग और विश्वास समाजवादी विचारधारा को मजबूत करने की निरंतर प्रेरणा है।",
        "चिउटना चौराहा स्थित यह कार्यालय खलीलाबाद में रोहित पाण्डेय के कार्य का केंद्र है। क्षेत्रवासी यहाँ आकर मिल सकते हैं और अपनी बात रख सकते हैं, या वेबसाइट के संपर्क पृष्ठ से कार्यालय को लिख सकते हैं।",
      ],
    },
    image: {
      ...img("rohit-pandey-chiutna-chauraha-office", 1600, 1069),
      alt: {
        en: "Rohit Pandey with colleagues and residents at his office at Chiutna Chauraha, Khalilabad",
        hi: "खलीलाबाद के चिउटना चौराहा स्थित कार्यालय पर साथियों एवं क्षेत्रवासियों के साथ रोहित पाण्डेय",
      },
    },
  },
  {
    slug: "courtesy-visit-kushal-tiwari-gorakhpur",
    date: "2026-09-24",
    location: { en: "Gorakhpur", hi: "गोरखपुर" },
    category: { en: "Party", hi: "पार्टी" },
    title: {
      en: "A courtesy visit to former MP Shri Bhishma Shankar Tiwari (Kushal Tiwari) in Gorakhpur",
      hi: "गोरखपुर में पूर्व सांसद श्री भीष्म शंकर तिवारी (कुशल तिवारी) जी से शिष्टाचार भेंट",
    },
    summary: {
      en: "Rohit Pandey called on former Sant Kabir Nagar MP Shri Tiwari at Tiwari Hata, Gorakhpur, and discussed the 2027 Assembly election strategy.",
      hi: "संत कबीर नगर के पूर्व सांसद श्री तिवारी जी के आवास “तिवारी हाता”, गोरखपुर पहुँचकर शिष्टाचार भेंट की और 2027 के विधानसभा चुनाव की रणनीति पर चर्चा की।",
    },
    body: {
      en: [
        "Rohit Pandey paid a courtesy call on Shri Bhishma Shankar Tiwari, popularly known as Kushal Tiwari, former Member of Parliament from Sant Kabir Nagar, at his residence “Tiwari Hata” in Gorakhpur.",
        "He and Shri Tiwari discussed strategy for the 2027 Assembly election and social issues.",
        "Shri Tiwari has represented Sant Kabir Nagar in the Lok Sabha. It is the same seat (No. 62) from which Rohit Pandey has contested, and its five assembly segments include Khalilabad, where his own work is now focused.",
      ],
      hi: [
        "रोहित पाण्डेय ने संत कबीर नगर के पूर्व सांसद श्री भीष्म शंकर तिवारी उर्फ कुशल तिवारी जी के आवास “तिवारी हाता”, गोरखपुर पहुँचकर शिष्टाचार भेंट की।",
        "श्री तिवारी जी के साथ आगामी 2027 के विधानसभा चुनाव की रणनीतियों एवं सामाजिक विषयों पर चर्चा हुई।",
        "श्री तिवारी जी लोकसभा में संत कबीर नगर का प्रतिनिधित्व कर चुके हैं। रोहित पाण्डेय भी इसी सीट (संख्या 62) से चुनाव लड़ चुके हैं, और इसके पाँच विधानसभा क्षेत्रों में खलीलाबाद भी है, जहाँ अब उनका कार्य केंद्रित है।",
      ],
    },
    image: {
      ...img("rohit-pandey-kushal-tiwari-gorakhpur", 1504, 1004),
      alt: {
        en: "Rohit Pandey with former Sant Kabir Nagar MP Shri Tiwari at Tiwari Hata, Gorakhpur",
        hi: "गोरखपुर के तिवारी हाता में पूर्व सांसद श्री तिवारी जी के साथ रोहित पाण्डेय",
      },
    },
  },
  {
    slug: "kekarhwa-chauraha-khalilabad",
    date: "2026-09-18",
    location: { en: "Kekarhwa Chauraha, Thurunda Road, Khalilabad", hi: "केकरहवा चौराहा, थूरंडा रोड, खलीलाबाद" },
    category: { en: "Public life", hi: "जनजीवन" },
    title: {
      en: "Meeting residents at Kekarhwa Chauraha, Thurunda Road",
      hi: "थूरंडा रोड स्थित केकरहवा चौराहे पर क्षेत्रवासियों से भेंट",
    },
    summary: {
      en: "Rohit Pandey met residents at Kekarhwa Chauraha, asked after their well-being and discussed the 2027 Assembly election and local concerns.",
      hi: "केकरहवा चौराहे पर क्षेत्रवासियों से आत्मीय भेंट कर उनका कुशल-क्षेम जाना एवं विधानसभा चुनाव-2027 सहित क्षेत्र के विषयों पर चर्चा की।",
    },
    body: {
      en: [
        "Rohit Pandey visited Kekarhwa Chauraha on Thurunda Road in the Khalilabad assembly area and met the people of the area, asking after their well-being. He held a useful discussion on the 2027 Assembly election.",
        "He talked through the development of the area, the problems residents face and other matters of public interest, and listened to their suggestions and views.",
        "The conversation took place in the open, outside the shops at the chauraha, with residents and party workers seated together.",
        "On the same day, 18 September, he also spent time among residents elsewhere in the Khalilabad assembly area. A video of that visit is in Public Life.",
      ],
      hi: [
        "रोहित पाण्डेय ने खलीलाबाद विधानसभा क्षेत्र के थूरंडा रोड स्थित केकरहवा चौराहे पर पहुँचकर देवतुल्य क्षेत्रवासियों से आत्मीय भेंट कर उनका कुशल-क्षेम जाना एवं आगामी विधानसभा चुनाव-2027 को लेकर सार्थक चर्चा की।",
        "इस दौरान क्षेत्र के विकास, जनसमस्याओं एवं जनहित से जुड़े विभिन्न विषयों पर विस्तारपूर्वक चर्चा करते हुए क्षेत्रवासियों के सुझावों एवं विचारों को सुना।",
        "यह बातचीत चौराहे की दुकानों के बाहर खुले में हुई, जहाँ क्षेत्रवासी और पार्टी कार्यकर्ता साथ बैठे।",
        "उसी दिन, 18 सितंबर को, वे खलीलाबाद विधानसभा क्षेत्र में अन्य जगहों पर भी क्षेत्रवासियों के बीच पहुँचे। उस दौरे का वीडियो जनजीवन में देखा जा सकता है।",
      ],
    },
    image: {
      ...img("rohit-pandey-kekarhwa-chauraha-khalilabad", 1280, 854),
      alt: {
        en: "Rohit Pandey with residents and party workers at Kekarhwa Chauraha, Khalilabad",
        hi: "खलीलाबाद के केकरहवा चौराहे पर क्षेत्रवासियों एवं कार्यकर्ताओं के साथ रोहित पाण्डेय",
      },
    },
    gallery: [
      {
        ...img("rohit-pandey-kekarhwa-chauraha-closeup", 1280, 854),
        alt: {
          en: "Rohit Pandey in conversation with a resident at Kekarhwa Chauraha",
          hi: "केकरहवा चौराहे पर एक क्षेत्रवासी से बातचीत करते रोहित पाण्डेय",
        },
      },
    ],
  },
  {
    slug: "among-residents-khalilabad",
    date: "2026-09-18",
    location: { en: "Khalilabad", hi: "खलीलाबाद" },
    category: { en: "Public life", hi: "जनजीवन" },
    title: {
      en: "Among the people of the Khalilabad assembly area",
      hi: "खलीलाबाद विधानसभा क्षेत्र में देवतुल्य क्षेत्रवासियों के बीच",
    },
    summary: {
      en: "A video from Rohit Pandey's visit among the residents of the Khalilabad assembly area.",
      hi: "खलीलाबाद विधानसभा क्षेत्र में क्षेत्रवासियों के बीच रोहित पाण्डेय के दौरे का वीडियो।",
    },
    body: {
      en: [
        "On 18 September 2026 Rohit Pandey spent time among the people of the Khalilabad assembly area (No. 313), Sant Kabir Nagar. The video shows the visit.",
        "On the same day he met residents at Kekarhwa Chauraha on Thurunda Road, asked after their well-being and discussed the development of the area, local problems and the 2027 Assembly election.",
        "The visit came a day after his meeting with the Rajbhar community at Gram Sabha Mohanbara (Bayara), also in the Khalilabad assembly area.",
      ],
      hi: [
        "18 सितंबर 2026 को रोहित पाण्डेय अपने खलीलाबाद विधानसभा क्षेत्र (संख्या 313), संत कबीर नगर में देवतुल्य क्षेत्रवासियों के बीच पहुँचे। वीडियो में यही दौरा है।",
        "उसी दिन उन्होंने थूरंडा रोड स्थित केकरहवा चौराहे पर क्षेत्रवासियों से भेंट कर उनका कुशल-क्षेम जाना और क्षेत्र के विकास, जनसमस्याओं एवं विधानसभा चुनाव-2027 पर चर्चा की।",
        "यह दौरा ग्रामसभा मोहनबरा (बयारा) में राजभर समाज के साथियों के साथ हुई बैठक के अगले दिन हुआ, जो खलीलाबाद विधानसभा क्षेत्र में ही है।",
      ],
    },
    video: {
      src: "/videos/rohit-pandey-khalilabad-18-september.mp4",
      poster: "/videos/rohit-pandey-khalilabad-18-september-poster.webp",
      blur: "data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAADwAwCdASoQABwAPu1iqk2ppaQiMAgBMB2JagCdAGt7trcdoIhkZNlYAP7xBBsB9zNEUzVWa13D7NTdOUTg/q24z9fk/1B7XHaqequPU4dq3jAtHwndWLvAn0+RUDphq25i2O5O4VA4UPTVCByivJaYb4zm2ZcUL8Z3QPN695atMD5ppDKhWNigAAA=",
      width: 720,
      height: 1280,
      label: {
        en: "Rohit Pandey among residents of the Khalilabad assembly area, 18 September 2026",
        hi: "खलीलाबाद विधानसभा क्षेत्र में क्षेत्रवासियों के बीच रोहित पाण्डेय, 18 सितंबर 2026",
      },
    },
  },
  {
    slug: "rajbhar-samaj-meeting-mohanbara",
    date: "2026-09-17",
    location: { en: "Mohanbara (Bayara), Khalilabad", hi: "मोहनबरा (बयारा), खलीलाबाद" },
    category: { en: "Public life", hi: "जनजीवन" },
    title: {
      en: "Meeting with the Rajbhar community at Mohanbara (Bayara)",
      hi: "ग्रामसभा मोहनबरा (बयारा) में राजभर समाज के साथियों के साथ बैठक",
    },
    summary: {
      en: "Rohit Pandey met members of the Rajbhar community at Gram Sabha Mohanbara (Bayara) and appealed for a Samajwadi Party vote in the 2027 Assembly election.",
      hi: "ग्रामसभा मोहनबरा (बयारा) में राजभर समाज के साथियों के साथ बैठक कर आगामी विधानसभा चुनाव 2027 में समाजवादी पार्टी को वोट देने की अपील की।",
    },
    body: {
      en: [
        "In Gram Sabha Mohanbara (Bayara) of the Khalilabad assembly area, Rohit Pandey held a meeting with members of the Rajbhar community. He spoke to them about the injustice under the BJP government and the violation of their rights.",
        "He appealed to them to vote for the Samajwadi Party in the 2027 Assembly election and make Shri Akhilesh Yadav ji Chief Minister, so that Uttar Pradesh moves ahead on the path of progress and good governance.",
        "The members of the Rajbhar community present resolved in one voice to make the Samajwadi Party victorious and to make Shri Akhilesh Yadav ji the Chief Minister of Uttar Pradesh.",
      ],
      hi: [
        "रोहित पाण्डेय ने खलीलाबाद विधानसभा क्षेत्र के ग्रामसभा मोहनबरा (बयारा) में राजभर समाज के सम्मानित साथियों के साथ बैठक कर भाजपा सरकार में हो रहे अन्याय तथा उनके हक़-हुकूक के हनन के ख़िलाफ़ जागरूक किया।",
        "उत्तर प्रदेश को तरक्की एवं सुशासन के रास्ते पर आगे ले चलने हेतु आगामी 2027 के विधानसभा चुनाव में समाजवादी पार्टी को वोट देकर श्री अखिलेश यादव जी को मुख्यमंत्री बनाने की अपील की।",
        "उपस्थित राजभर समाज के साथियों ने एकसुर में समाजवादी पार्टी को विजयी बनाने तथा श्री अखिलेश यादव जी को उत्तर प्रदेश का मुख्यमंत्री बनाने का संकल्प लिया।",
      ],
    },
    image: {
      ...img("rohit-pandey-mohanbara-rajbhar-samaj-meeting", 1504, 1004),
      alt: {
        en: "Rohit Pandey at a meeting with the Rajbhar community at Mohanbara (Bayara), Khalilabad",
        hi: "ग्रामसभा मोहनबरा (बयारा) में राजभर समाज के साथियों की बैठक में रोहित पाण्डेय",
      },
    },
    gallery: [
      {
        ...img("rohit-pandey-mohanbara-rajbhar-samaj-welcome", 1504, 1004),
        alt: {
          en: "Rohit Pandey being welcomed by community members at Mohanbara (Bayara)",
          hi: "मोहनबरा (बयारा) में साथियों के बीच रोहित पाण्डेय",
        },
      },
    ],
  },
  {
    slug: "booth-sector-review-meeting-khalilabad",
    date: "2026-09-08",
    location: { en: "Shakahari Marriage Hall, Badhgo, Khalilabad", hi: "शाकाहारी मैरिज हॉल, बढ़गो, खलीलाबाद" },
    category: { en: "Organisation", hi: "संगठन" },
    title: {
      en: "Review meeting of booth presidents and sector in-charges",
      hi: "बूथ अध्यक्षों एवं सेक्टर प्रभारियों की समीक्षा बैठक",
    },
    summary: {
      en: "Rohit Pandey attended the Samajwadi Party's review meeting of booth presidents and sector in-charges at Shakahari Marriage Hall, Badhgo, Khalilabad.",
      hi: "शाकाहारी मैरिज हॉल, बढ़गो, खलीलाबाद में समाजवादी पार्टी के बूथ अध्यक्षों एवं सेक्टर प्रभारी/अध्यक्षों की समीक्षा बैठक में सम्मिलित हुए।",
    },
    body: {
      en: [
        "Rohit Pandey attended the Samajwadi Party's review meeting of booth presidents and sector in-charges and presidents at Shakahari Marriage Hall, Badhgo, Khalilabad, Sant Kabir Nagar.",
        "The meeting discussed strengthening the organisation down to the booth level, activating workers and taking socialist ideas to every person.",
        "All present resolved to strengthen the organisation and carry the voice of PDA to every village, and pledged to make National President Shri Akhilesh Yadav ji the Chief Minister of Uttar Pradesh in the 2027 Assembly election.",
      ],
      hi: [
        "शाकाहारी मैरिज हॉल, बढ़गो, खलीलाबाद, संत कबीर नगर में आयोजित समाजवादी पार्टी के बूथ अध्यक्षों एवं सेक्टर प्रभारी/अध्यक्षों की समीक्षा बैठक में रोहित पाण्डेय सम्मिलित हुए।",
        "बैठक में बूथ स्तर तक संगठन को मजबूत करने, कार्यकर्ताओं को सक्रिय करने एवं समाजवादी विचारधारा को जन-जन तक पहुंचाने को लेकर महत्वपूर्ण चर्चा एवं मंथन हुआ।",
        "सभी साथियों ने एकजुट होकर संगठन को मजबूत करने और PDA की आवाज़ को गांव-गांव तक पहुंचाने का संकल्प लिया एवं आगामी 2027 के विधानसभा चुनाव में समाजवादी पार्टी के माननीय राष्ट्रीय अध्यक्ष श्री अखिलेश यादव जी को उत्तर प्रदेश का मुख्यमंत्री बनाने का संकल्प लिया।",
      ],
    },
    video: {
      src: "/videos/rohit-pandey-booth-sector-review-8-september.mp4",
      poster: "/videos/rohit-pandey-booth-sector-review-8-september-poster.webp",
      blur: "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAAAQBACdASoQABwAPu1yrU+pp6QiMAgBMB2JbAC06GlaSdNxtpBGsIFYIAD+/OiEB5mGWy5oUvc7acQ/r7uVYJp1rpZ96O12keJFxtgP7YL4aKO7k/l/CDI3FlffOYqEYK2QzbNFoLelJsEVgId8CuEbYAA=",
      width: 720,
      height: 1280,
      label: {
        en: "Rohit Pandey addressing the booth presidents and sector in-charges review meeting, 8 September 2026",
        hi: "बूथ अध्यक्षों एवं सेक्टर प्रभारियों की समीक्षा बैठक में संबोधित करते रोहित पाण्डेय, 8 सितंबर 2026",
      },
    },
  },
  {
    slug: "organisational-meeting-khalilabad-313",
    date: "2026",
    location: { en: "Khalilabad (No. 313)", hi: "खलीलाबाद (संख्या 313)" },
    category: { en: "Organisation", hi: "संगठन" },
    title: {
      en: "Organisational meeting in Vidhan Sabha 313, Sant Kabir Nagar",
      hi: "विधानसभा 313, संत कबीर नगर में महत्वपूर्ण संगठनात्मक बैठक",
    },
    summary: {
      en: "Rohit Pandey took part in an organisational meeting in Vidhan Sabha 313 on party strength, local development and the strategy ahead.",
      hi: "विधानसभा 313, संत कबीर नगर में आयोजित महत्वपूर्ण संगठनात्मक बैठक में सहभागिता कर संगठन की मजबूती, क्षेत्र के विकास और आगामी रणनीतियों पर चर्चा की।",
    },
    body: {
      en: [
        "Rohit Pandey took part in an organisational meeting in Vidhan Sabha 313, Sant Kabir Nagar. The meeting covered strengthening the organisation, the overall development of the area, matters of public interest, upcoming political and social strategy and the Special Intensive Revision.",
        "With office-bearers, senior leaders and dedicated workers, he went through the basic problems of the area and the expectations and struggles of its people. The meeting stressed making the organisation more active and stronger, so that the Samajwadi Party's public-welfare policies, its ideology of social justice and constitutional values reach every household.",
        "Under the leadership of National President Shri Akhilesh Yadav ji, all present resolved to keep raising the voice of farmers, youth, women, backward classes, Dalits and the underprivileged, and to carry forward the work for the area's development and the fight for social justice.",
        "The people's trust is the party's greatest strength, and the work of taking socialist ideals to every home will continue on that trust.",
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
    slug: "meeting-shivpal-singh-yadav-lucknow",
    date: "2026",
    location: { en: "Lucknow", hi: "लखनऊ" },
    category: { en: "Party", hi: "पार्टी" },
    title: {
      en: "A courtesy meeting with Shri Shivpal Singh Yadav in Lucknow",
      hi: "लखनऊ में श्री शिवपाल सिंह यादव जी से शिष्टाचार भेंट",
    },
    summary: {
      en: "In Lucknow, Rohit Pandey called on Shri Shivpal Singh Yadav, National General Secretary of the Samajwadi Party, and received his affection and guidance.",
      hi: "रोहित पाण्डेय ने लखनऊ में समाजवादी पार्टी के राष्ट्रीय महासचिव श्री शिवपाल सिंह यादव जी से शिष्टाचार भेंट कर उनका स्नेह एवं मार्गदर्शन प्राप्त किया।",
    },
    body: {
      en: [
        "In Lucknow, Rohit Pandey paid a courtesy call on Shri Shivpal Singh Yadav ji, known to many as “Chacha”: National General Secretary of the Samajwadi Party, former Cabinet Minister and MLA from the Etawah-Jaswantnagar assembly constituency. He received his warmth and guidance.",
        "The two discussed making the Samajwadi Party stronger and more effective at every level, from the booth upwards.",
        "Rohit Pandey also reaffirmed his resolve to work for a full-majority Samajwadi Party government in Uttar Pradesh in the 2027 Assembly election, with Shri Akhilesh Yadav ji as Chief Minister once again.",
      ],
      hi: [
        "रोहित पाण्डेय ने लखनऊ में समाजवादी पार्टी के राष्ट्रीय महासचिव, पूर्व कैबिनेट मंत्री एवं इटावा-जसवंतनगर विधानसभा क्षेत्र से माननीय लोकप्रिय विधायक श्री शिवपाल सिंह यादव (चाचा) जी से शिष्टाचार भेंट की और उनका स्नेह एवं मार्गदर्शन प्राप्त किया।",
        "इस अवसर पर समाजवादी पार्टी को बूथ स्तर से लेकर उच्च स्तर तक और अधिक मज़बूत एवं प्रभावशाली बनाने को लेकर सार्थक चर्चा हुई।",
        "साथ ही, आगामी विधानसभा चुनाव 2027 में प्रदेश में समाजवादी पार्टी की पूर्ण बहुमत की सरकार बनाने और माननीय श्री अखिलेश यादव जी को पुनः मुख्यमंत्री बनाने का दृढ़ संकल्प लिया।",
      ],
    },
    image: {
      ...img("rohit-pandey-shivpal-singh-yadav-lucknow", 960, 1280),
      alt: {
        en: "Rohit Pandey with Shri Shivpal Singh Yadav, National General Secretary of the Samajwadi Party, in Lucknow",
        hi: "लखनऊ में समाजवादी पार्टी के राष्ट्रीय महासचिव श्री शिवपाल सिंह यादव जी के साथ रोहित पाण्डेय",
      },
    },
  },
  {
    slug: "organisational-activity-khalilabad",
    date: "2026-09",
    location: { en: "Khalilabad", hi: "खलीलाबाद" },
    category: { en: "Organisation", hi: "संगठन" },
    title: {
      en: "Party organisational work in the Khalilabad assembly area",
      hi: "खलीलाबाद विधानसभा क्षेत्र में संगठनात्मक कार्य",
    },
    summary: {
      en: "Through September 2026 Rohit Pandey worked on Samajwadi Party organisation in the Khalilabad assembly area, from a booth-level review to meetings in villages and chauraha.",
      hi: "सितंबर 2026 में रोहित पाण्डेय ने खलीलाबाद विधानसभा क्षेत्र में बूथ स्तर की समीक्षा से लेकर गाँवों और चौराहों पर बैठकों तक, समाजवादी पार्टी के संगठनात्मक कार्य में हिस्सा लिया।",
    },
    body: {
      en: [
        "Through September 2026 Rohit Pandey took part in Samajwadi Party organisational work in the Khalilabad assembly area.",
        "On 8 September he attended the review meeting of booth presidents and sector in-charges at Shakahari Marriage Hall, Badhgo, Khalilabad, where the focus was on strengthening the organisation down to the booth level and activating workers.",
        "On 17 September he met members of the Rajbhar community at Gram Sabha Mohanbara (Bayara). On 18 September he met residents at Kekarhwa Chauraha on Thurunda Road and heard about local problems and the development of the area.",
        "Khalilabad (assembly constituency No. 313) is the headquarters of Sant Kabir Nagar district and one of the five assembly segments of the Sant Kabir Nagar Lok Sabha seat.",
      ],
      hi: [
        "सितंबर 2026 में रोहित पाण्डेय ने खलीलाबाद विधानसभा क्षेत्र में समाजवादी पार्टी के संगठनात्मक कार्य में लगातार हिस्सा लिया।",
        "8 सितंबर को वे शाकाहारी मैरिज हॉल, बढ़गो, खलीलाबाद में बूथ अध्यक्षों एवं सेक्टर प्रभारियों की समीक्षा बैठक में सम्मिलित हुए, जहाँ बूथ स्तर तक संगठन को मजबूत करने और कार्यकर्ताओं को सक्रिय करने पर चर्चा हुई।",
        "17 सितंबर को उन्होंने ग्रामसभा मोहनबरा (बयारा) में राजभर समाज के साथियों के साथ बैठक की। 18 सितंबर को थूरंडा रोड स्थित केकरहवा चौराहे पर क्षेत्रवासियों से भेंट कर जनसमस्याओं और क्षेत्र के विकास पर उनकी बात सुनी।",
        "खलीलाबाद (विधानसभा क्षेत्र संख्या 313) संत कबीर नगर ज़िले का मुख्यालय है और संत कबीर नगर लोकसभा सीट के पाँच विधानसभा क्षेत्रों में से एक है।",
      ],
    },
    image: {
      ...img("rohit-pandey-mohanbara-rajbhar-samaj-meeting", 1504, 1004),
      alt: {
        en: "17 September 2026: meeting with the Rajbhar community at Mohanbara (Bayara), Khalilabad",
        hi: "17 सितंबर 2026: मोहनबरा (बयारा), खलीलाबाद में राजभर समाज के साथियों के साथ बैठक",
      },
    },
    gallery: [
      {
        ...img("rohit-pandey-kekarhwa-chauraha-khalilabad", 1280, 854),
        alt: {
          en: "18 September 2026: meeting residents at Kekarhwa Chauraha, Thurunda Road",
          hi: "18 सितंबर 2026: थूरंडा रोड स्थित केकरहवा चौराहे पर क्षेत्रवासियों से भेंट",
        },
      },
    ],
  },
  {
    slug: "welcomed-in-sant-kabir-nagar",
    date: "2026",
    location: { en: "Sant Kabir Nagar", hi: "संत कबीर नगर" },
    category: { en: "Public life", hi: "जनजीवन" },
    title: {
      en: "Welcomed by party workers in Sant Kabir Nagar",
      hi: "संत कबीर नगर में पार्टी कार्यकर्ताओं ने किया स्वागत",
    },
    summary: {
      en: "After joining the Samajwadi Party, Rohit Pandey visited Sant Kabir Nagar, where party workers welcomed him.",
      hi: "समाजवादी पार्टी में शामिल होने के बाद रोहित पाण्डेय ने संत कबीर नगर का दौरा किया, जहाँ पार्टी कार्यकर्ताओं ने उनका स्वागत किया।",
    },
    body: {
      en: [
        "In March 2026 Rohit Pandey joined the Samajwadi Party, led by national president Akhilesh Yadav. Soon after, he visited Sant Kabir Nagar.",
        "Party workers gathered to welcome him, one of his first public appearances in the district as a party member.",
        "Sant Kabir Nagar is familiar ground for him. He has contested the Lok Sabha election from the Sant Kabir Nagar seat before, and he is based in Khalilabad, the district headquarters. An advocate by profession, he studied at the University of Delhi.",
        "Khalilabad, assembly constituency No. 313, is one of the five assembly segments of the Sant Kabir Nagar Lok Sabha seat, along with Alapur, Menhdawal, Dhanghata and Khajani.",
        "Since the visit, his party work has centred on the Khalilabad assembly area, including Samajwadi Party organisational work there in September 2026. His office is at Chiutna Chauraha, Khalilabad.",
      ],
      hi: [
        "मार्च 2026 में रोहित पाण्डेय राष्ट्रीय अध्यक्ष अखिलेश यादव के नेतृत्व वाली समाजवादी पार्टी में शामिल हुए। इसके कुछ समय बाद उन्होंने संत कबीर नगर का दौरा किया।",
        "दौरे के दौरान पार्टी कार्यकर्ताओं ने एकत्र होकर उनका स्वागत किया। पार्टी सदस्य के रूप में ज़िले में यह उनकी शुरुआती सार्वजनिक उपस्थितियों में से एक थी।",
        "संत कबीर नगर उनके लिए जाना-पहचाना क्षेत्र है। वे संत कबीर नगर सीट से लोकसभा चुनाव लड़ चुके हैं और ज़िला मुख्यालय खलीलाबाद में रहते हैं। वे पेशे से अधिवक्ता हैं और उन्होंने दिल्ली विश्वविद्यालय से पढ़ाई की है।",
        "खलीलाबाद (विधानसभा क्षेत्र संख्या 313) संत कबीर नगर लोकसभा सीट के पाँच विधानसभा क्षेत्रों में से एक है। बाकी चार हैं आलापुर, मेंहदावल, धनघटा और खजनी।",
        "इस दौरे के बाद से उनका पार्टी कार्य खलीलाबाद विधानसभा क्षेत्र पर केंद्रित रहा है, जिसमें सितंबर 2026 में वहाँ समाजवादी पार्टी का संगठनात्मक कार्य भी शामिल है। उनका कार्यालय चिउटना चौराहा, खलीलाबाद में है।",
      ],
    },
    image: {
      ...images.joining,
      alt: {
        en: "Rohit Pandey with Samajwadi Party national president Akhilesh Yadav",
        hi: "समाजवादी पार्टी के राष्ट्रीय अध्यक्ष अखिलेश यादव के साथ रोहित पाण्डेय",
      },
    },
  },
  {
    slug: "joins-samajwadi-party",
    date: "2026-03",
    category: { en: "Party", hi: "पार्टी" },
    title: {
      en: "Rohit Pandey joins the Samajwadi Party",
      hi: "रोहित पाण्डेय समाजवादी पार्टी में शामिल",
    },
    summary: {
      en: "Rohit Pandey joined the Samajwadi Party in March 2026.",
      hi: "रोहित पाण्डेय मार्च 2026 में समाजवादी पार्टी में शामिल हुए।",
    },
    body: {
      en: [
        "Rohit Pandey, who is based in Khalilabad, joined the Samajwadi Party in March 2026.",
        "A former Lok Sabha candidate from Sant Kabir Nagar, he now works with the party in the Khalilabad assembly area of Sant Kabir Nagar district.",
        "He joined the party led by national president Shri Akhilesh Yadav ji. An advocate by profession, he studied at the University of Delhi.",
        "Since joining, his work has centred on Khalilabad: organisational meetings, a booth-level review, and meetings with residents across the assembly area. In Lucknow he has also called on Shri Shivpal Singh Yadav ji, National General Secretary of the party.",
      ],
      hi: [
        "खलीलाबाद में रहने वाले रोहित पाण्डेय मार्च 2026 में समाजवादी पार्टी में शामिल हुए।",
        "संत कबीर नगर से पूर्व लोकसभा प्रत्याशी रह चुके रोहित पाण्डेय अब संत कबीर नगर ज़िले के खलीलाबाद विधानसभा क्षेत्र में पार्टी के साथ काम कर रहे हैं।",
        "वे राष्ट्रीय अध्यक्ष श्री अखिलेश यादव जी के नेतृत्व वाली पार्टी में शामिल हुए। वे पेशे से अधिवक्ता हैं और उन्होंने दिल्ली विश्वविद्यालय से पढ़ाई की है।",
        "पार्टी में शामिल होने के बाद से उनका कार्य खलीलाबाद पर केंद्रित है: संगठनात्मक बैठकें, बूथ स्तर की समीक्षा और पूरे विधानसभा क्षेत्र में क्षेत्रवासियों से भेंट। लखनऊ में उन्होंने पार्टी के राष्ट्रीय महासचिव श्री शिवपाल सिंह यादव जी से भी शिष्टाचार भेंट की है।",
      ],
    },
    image: {
      ...images.joining,
      alt: {
        en: "Rohit Pandey greeting Samajwadi Party national president Akhilesh Yadav",
        hi: "समाजवादी पार्टी के राष्ट्रीय अध्यक्ष अखिलेश यादव से भेंट करते रोहित पाण्डेय",
      },
    },
  },
];

/** Every update, newest first. */
export const updates: Update[] = [...rawUpdates].sort(byNewest);

export function getUpdate(slug: string): Update | undefined {
  return updates.find((u) => u.slug === slug);
}

/** Used only if the live YouTube feed cannot be reached. Taken from the channel's own feed. */
export type YouTubeVideo = { id: string; title: string; published: string };

export const youtubeFallback: YouTubeVideo[] = [
  { id: "xBsdxyrPLBo", title: "Interview to The Freedom Voice | #RohitPandey", published: "2026-04-06" },
  { id: "n3hHiUXuadU", title: "Grand Welcome in Sant Kabir Nagar | #AbkiSamajwad | #SantKabirNagar | #Khalilabad", published: "2026-03-29" },
  { id: "pkWUT9ZVryg", title: "ब्रह्मशक्ति उठो | Bramhashakti Utho | Official Anthem | #BramhashaktiUtho", published: "2026-02-01" },
];

/** "Vision for Khalilabad": 4 to 6 local issues, supplied by the campaign. Empty until then. */
export type VisionItem = { id: string; title: Localised<string>; body: Localised<string> };
export const visionItems: VisionItem[] = [];

/** "In the news": real press reports only. Empty until the campaign supplies links. */
export type PressItem = { id: string; outlet: string; title: Localised<string>; date: string; url: string };
export const pressItems: PressItem[] = [];
