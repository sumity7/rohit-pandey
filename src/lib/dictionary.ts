import type { Locale } from "./i18n";

/**
 * All copy lives here. Facts come only from the client brief / profile.
 * Anything unknown is expressed as a content slot (see `slot` strings),
 * never invented.
 */

const en = {
  person: {
    name: "Rohit Pandey",
    first: "Rohit",
    last: "Pandey",
    role: "Advocate & Social-Political Worker",
    roleLine: "Advocate | Social-Political Worker",
    place: "Khalilabad • Sant Kabir Nagar",
    placeLong: "Khalilabad, Sant Kabir Nagar, Uttar Pradesh",
    altName: "रोहित पांडेय",
  },
  meta: {
    home: {
      title: "Rohit Pandey — Advocate & Social-Political Worker, Khalilabad",
      description:
        "Official website of Rohit Pandey, advocate and social-political worker from Khalilabad, Sant Kabir Nagar, Uttar Pradesh. Samajwadi Party member since March 2026.",
    },
    about: {
      title: "About & Political Journey",
      description:
        "Profile and political journey of Rohit Pandey — advocate, University of Delhi alumnus and social-political worker from Khalilabad, Sant Kabir Nagar, who joined the Samajwadi Party in March 2026.",
    },
    publicLife: {
      title: "Public Life",
      description:
        "Rohit Pandey's public engagement in Sant Kabir Nagar — visits, party organisational work and ways to connect.",
    },
    khalilabad: {
      title: "Khalilabad, Sant Kabir Nagar",
      description:
        "Khalilabad Assembly Constituency (No. 313), headquarters of Sant Kabir Nagar district, Uttar Pradesh — the centre of Rohit Pandey's public work.",
    },
    media: {
      title: "Media & Photographs",
      description:
        "A curated archive of photographs and creatives from Rohit Pandey's public and political life.",
    },
    updates: {
      title: "Updates",
      description:
        "Recent updates from Rohit Pandey's public and political work in Khalilabad and Sant Kabir Nagar.",
    },
    contact: {
      title: "Contact",
      description:
        "Write to the office of Rohit Pandey for meetings, invitations, media requests or matters of public concern.",
    },
    privacy: {
      title: "Privacy Policy",
      description: "How this website handles the information you share with it.",
    },
    terms: {
      title: "Terms of Use",
      description: "Terms governing the use of the website of Rohit Pandey.",
    },
  },
  nav: {
    home: "Home",
    about: "About & Journey",
    publicLife: "Public Life",
    khalilabad: "Khalilabad",
    media: "Media",
    updates: "Updates",
    contact: "Contact",
    connect: "Connect",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
    primary: "Primary navigation",
    language: "Language",
    breadcrumb: "Breadcrumb",
    backHome: "Back to home",
  },
  slot: {
    label: "Content slot",
  },
  hero: {
    eyebrow: "Samajwadi Party · Khalilabad, Sant Kabir Nagar",
    values: ["Public service", "Development", "Justice", "An empowered society"],
    intro: "Advocate and social-political worker from Khalilabad, the district headquarters of Sant Kabir Nagar.",
    joined: "He joined the Samajwadi Party in March 2026.",
    ctaProfile: "About Rohit Pandey",
    ctaContact: "Contact the Office",
    party: "Samajwadi Party",
    state: "Uttar Pradesh",
  },
  about: {
    label: "About",
    title: "An advocate from Khalilabad",
    bio: [
      "Rohit Pandey is an advocate and social-political worker from Khalilabad in Sant Kabir Nagar district, Uttar Pradesh. He studied at the University of Delhi.",
      "His public profile lists him as a former Lok Sabha candidate from Sant Kabir Nagar. He joined the Samajwadi Party in March 2026 and his political work is now focused on the Khalilabad assembly area.",
    ],
    facts: [
      { k: "Profession", v: "Advocate" },
      { k: "Education", v: "University of Delhi" },
      { k: "Based in", v: "Khalilabad, Sant Kabir Nagar" },
      { k: "Languages", v: "Hindi, English" },
      { k: "Party", v: "Samajwadi Party, since March 2026" },
    ],
    portraitAlt: "Rohit Pandey standing with arms folded",
    readMore: "Read the full profile",
    slotLegal:
      "Legal career — courts, areas of practice and years at the bar — to be provided by the office.",
    slotEducation: "Degree and year of study at the University of Delhi — to be confirmed.",
  },
  journey: {
    label: "Political journey",
    title: "Key milestones",
    intro: "Dates appear only where they are confirmed.",
    milestones: "Milestones",
    prev: "Previous milestone",
    next: "Next milestone",
    viewJourney: "View the journey",
    items: [
      {
        id: "earlier",
        era: "Before 2026",
        title: "Before joining the Samajwadi Party",
        body: "Rohit Pandey was active in public life before he joined the Samajwadi Party. His public profile lists him as a former Lok Sabha candidate from Sant Kabir Nagar.",
      },
      {
        id: "joining",
        era: "March 2026",
        title: "Joins the Samajwadi Party",
        body: "In March 2026 he joined the Samajwadi Party, led by national president Akhilesh Yadav. His political work has continued with the party since then.",
        alt: "Rohit Pandey greeting Samajwadi Party national president Akhilesh Yadav",
        caption: "With Samajwadi Party national president Akhilesh Yadav.",
      },
      {
        id: "visit",
        era: "2026",
        title: "Welcomed in Sant Kabir Nagar",
        body: "After joining the party he visited Sant Kabir Nagar, where party workers gathered to welcome him.",
      },
      {
        id: "organisation",
        era: "September 2026",
        title: "Organisational work in Khalilabad",
        body: "News reports in September 2026 noted his part in Samajwadi Party organisational activity in the Khalilabad assembly area.",
      },
    ],
  },
  location: {
    label: "Khalilabad",
    name: "Khalilabad",
    otherScript: "खलीलाबाद",
    sub: "Sant Kabir Nagar, Uttar Pradesh",
    intro:
      "Khalilabad is the headquarters of Sant Kabir Nagar district. Its assembly constituency is one of five that make up the Sant Kabir Nagar Lok Sabha seat.",
    connectionLabel: "Local connection",
    connection:
      "Rohit Pandey is based in Khalilabad. Since joining the Samajwadi Party, his political work has been focused on this assembly area.",
    facts: [
      { k: "Assembly constituency", v: "No. 313 · Khalilabad" },
      { k: "District", v: "Sant Kabir Nagar" },
      { k: "Lok Sabha seat", v: "Sant Kabir Nagar (No. 62)" },
      { k: "State", v: "Uttar Pradesh" },
    ],
    segmentsLabel: "Assembly segments of the Sant Kabir Nagar Lok Sabha seat",
    segments: ["Alapur (SC)", "Menhdawal", "Khalilabad", "Dhanghata (SC)", "Khajani (SC)"],
    current: "Khalilabad",
    more: "More on Khalilabad",
  },
  publicLife: {
    label: "Public life",
    title: "Recent public activity",
    intro:
      "Since joining the Samajwadi Party, Rohit Pandey's public activity has centred on Sant Kabir Nagar district. Each entry below is based on published reports.",
    photoAlt: "Rohit Pandey in a white kurta with an angavastram",
    more: "All updates",
  },
  connect: {
    label: "Stay in touch",
    quote: "I am Rohit Pandey — an advocate and a social-political worker.",
    attribution: "Rohit Pandey, on his public profile",
    body: "Rohit Pandey posts about his public work on Facebook, Instagram and X. Messages sent through this website go to his office.",
    cta: "Write to the office",
    alt: "Portrait of Rohit Pandey",
  },
  latest: {
    title: "Latest updates",
    all: "All updates",
    featured: "Featured",
    readMore: "Read more",
  },
  videos: {
    label: "Videos",
    title: "Featured video",
    featured: "Featured",
    all: "All media",
    play: "Play video",
    readMore: "Read the full update",
    more: "More videos",
  },
  social: {
    label: "Social media",
    title: "Latest from social media",
    facebook: "Facebook",
    openFacebook: "Open the Facebook page",
    latest: "Latest from this website",
    open: "Read",
    all: "All updates",
  },
  media: {
    label: "Media",
    title: "Photographs",
    intro: "Photographs from Samajwadi Party meetings, and creatives shared on social media.",
    viewAll: "View all photographs",
    archive: "Archive",
    open: "Open image",
    close: "Close",
    prev: "Previous image",
    next: "Next image",
    of: "of",
    dialog: "Image viewer",
    items: {
      "sp-office-group-01": {
        alt: "Rohit Pandey with Akhilesh Yadav and party colleagues at the Samajwadi Party office",
        caption: "With national president Akhilesh Yadav and party colleagues at the Samajwadi Party office.",
        tag: "Party office",
      },
      "sp-felicitation": {
        alt: "Akhilesh Yadav receiving a memento at the Samajwadi Party office",
        caption: "A memento is presented to Akhilesh Yadav during a meeting at the party office.",
        tag: "Party office",
      },
      "sp-office-group-02": {
        alt: "Group photograph with Akhilesh Yadav holding a memento at the party office",
        caption: "A group photograph from the same meeting.",
        tag: "Party office",
      },
      "akhilesh-yadav-sp-office": {
        alt: "Rohit Pandey standing with Akhilesh Yadav at the Samajwadi Party office",
        caption: "With Akhilesh Yadav at the Samajwadi Party office.",
        tag: "Party office",
      },
      "shivpal-singh-yadav-lucknow": {
        alt: "Rohit Pandey with Shri Shivpal Singh Yadav in Lucknow",
        caption: "A courtesy meeting with Shri Shivpal Singh Yadav, National General Secretary of the Samajwadi Party, in Lucknow.",
        tag: "Meeting",
      },
      "campaign-graphic": {
        alt: "Social media creative with the line साथ आयें, संतकबीरनगर सजायें",
        caption: "Social media creative: “साथ आयें, संतकबीरनगर सजायें” (Come together, let us make Sant Kabir Nagar shine).",
        tag: "Social media",
      },
    },
  },
  updates: {
    label: "Updates",
    title: "News and updates",
    intro: "Short notes based on published reports.",
    readMore: "Read",
    all: "All updates",
    back: "All updates",
    more: "More updates",
    noteLabel: "Note",
    note: "This update summarises publicly reported information. Photographs and further details will be added by the office.",
    published: "Published on this website",
  },
  contact: {
    label: "Contact",
    title: "Write to the office",
    intro:
      "For meetings, invitations, media requests or matters of public concern, send a message here. You can also reach Rohit Pandey on his social channels.",
    strip: "Write to Rohit Pandey's office",
    namasteAlt: "Rohit Pandey greeting with folded hands",
    slot: "Office address, phone number and email — to be provided by the office.",
    channels: "On social media",
    form: {
      name: "Full name",
      phone: "Mobile number",
      phoneHint: "10-digit Indian mobile number",
      email: "Email",
      contactHint: "Give a mobile number or an email — at least one.",
      topic: "Subject",
      topics: [
        "General enquiry",
        "Meeting request",
        "Event invitation",
        "Media",
        "Matter of public concern",
      ],
      message: "Message",
      consent: "I agree that the office may use these details to respond to me.",
      submit: "Send message",
      sending: "Sending…",
      optional: "optional",
      errors: {
        name: "Please enter your name (at least 2 characters).",
        contact: "Please give a mobile number or an email address.",
        phone: "Please enter a valid 10-digit Indian mobile number.",
        email: "Please enter a valid email address.",
        message: "Please write a message of at least 20 characters.",
        consent: "Please confirm that the office may contact you.",
        summary: "Please correct the highlighted fields.",
      },
      success: "Thank you. Your message has reached the office.",
      successSub: "The office will respond on the details you provided.",
      failure:
        "Your message could not be sent right now. Please try again later, or reach Rohit Pandey on Facebook, Instagram or X.",
      again: "Send another message",
    },
  },
  footer: {
    navigate: "Navigate",
    follow: "Follow",
    language: "Language",
    privacy: "Privacy",
    terms: "Terms",
    partner: "Digital Experience Partner",
    newTab: "opens in a new tab",
    disclaimer:
      "Personal website of Rohit Pandey. Not an official website of the Samajwadi Party.",
  },
  legal: {
    updated: "Last updated: 2 October 2026",
    privacy: [
      {
        h: "What we collect",
        p: "This website collects only what you choose to send through the contact form: your name, mobile number and/or email, subject and message.",
      },
      {
        h: "How it is used",
        p: "Your details are used only to respond to your message. They are not sold, rented or shared for marketing.",
      },
      {
        h: "Technical information",
        p: "Like most websites, the hosting provider may keep standard server logs (such as IP address and browser type) for security and reliability.",
      },
      {
        h: "Your choices",
        p: "You may ask for your message and details to be deleted by writing to the office through the contact page.",
      },
    ],
    terms: [
      {
        h: "About this website",
        p: "This is the personal website of Rohit Pandey. It is not an official website of the Samajwadi Party, and views expressed here are his own.",
      },
      {
        h: "Content and photographs",
        p: "Text and photographs on this website are provided for information. Please do not reuse photographs without permission.",
      },
      {
        h: "Accuracy",
        p: "Information is published in good faith and updated as it is confirmed. If you notice an error, please let the office know.",
      },
      {
        h: "External links",
        p: "Links to social media and other websites are provided for convenience; their content is governed by their own terms.",
      },
    ],
  },
  notFound: {
    title: "This page could not be found",
    body: "The link may be out of date, or the page may have moved.",
  },
};

export type Dict = typeof en;

const hi: Dict = {
  person: {
    name: "रोहित पांडेय",
    first: "रोहित",
    last: "पांडेय",
    role: "अधिवक्ता एवं सामाजिक-राजनीतिक कार्यकर्ता",
    roleLine: "अधिवक्ता | सामाजिक-राजनीतिक कार्यकर्ता",
    place: "खलीलाबाद • संत कबीर नगर",
    placeLong: "खलीलाबाद, संत कबीर नगर, उत्तर प्रदेश",
    altName: "Rohit Pandey",
  },
  meta: {
    home: {
      title: "रोहित पांडेय — अधिवक्ता एवं सामाजिक-राजनीतिक कार्यकर्ता, खलीलाबाद",
      description:
        "रोहित पांडेय की आधिकारिक वेबसाइट — खलीलाबाद, संत कबीर नगर (उत्तर प्रदेश) से अधिवक्ता एवं सामाजिक-राजनीतिक कार्यकर्ता। मार्च 2026 से समाजवादी पार्टी के सदस्य।",
    },
    about: {
      title: "परिचय एवं राजनीतिक यात्रा",
      description:
        "रोहित पांडेय का परिचय और राजनीतिक यात्रा — अधिवक्ता, दिल्ली विश्वविद्यालय के पूर्व छात्र और खलीलाबाद, संत कबीर नगर के सामाजिक-राजनीतिक कार्यकर्ता, जो मार्च 2026 में समाजवादी पार्टी में शामिल हुए।",
    },
    publicLife: {
      title: "जनजीवन",
      description:
        "संत कबीर नगर में रोहित पांडेय की सार्वजनिक सक्रियता — दौरे, पार्टी का संगठनात्मक कार्य और जुड़ने के माध्यम।",
    },
    khalilabad: {
      title: "खलीलाबाद, संत कबीर नगर",
      description:
        "खलीलाबाद विधानसभा क्षेत्र (संख्या 313), संत कबीर नगर ज़िले का मुख्यालय — रोहित पांडेय के सार्वजनिक कार्य का केंद्र।",
    },
    media: {
      title: "मीडिया एवं तस्वीरें",
      description:
        "रोहित पांडेय के सार्वजनिक और राजनीतिक जीवन की चुनी हुई तस्वीरों और रचनाओं का संग्रह।",
    },
    updates: {
      title: "अपडेट",
      description:
        "खलीलाबाद और संत कबीर नगर में रोहित पांडेय के सार्वजनिक एवं राजनीतिक कार्य से जुड़ी हालिया जानकारी।",
    },
    contact: {
      title: "संपर्क",
      description:
        "मुलाक़ात, आमंत्रण, मीडिया अनुरोध या जनहित के विषयों के लिए रोहित पांडेय के कार्यालय को लिखें।",
    },
    privacy: {
      title: "गोपनीयता नीति",
      description: "यह वेबसाइट आपकी साझा की गई जानकारी का उपयोग कैसे करती है।",
    },
    terms: {
      title: "उपयोग की शर्तें",
      description: "रोहित पांडेय की वेबसाइट के उपयोग से जुड़ी शर्तें।",
    },
  },
  nav: {
    home: "मुखपृष्ठ",
    about: "परिचय एवं यात्रा",
    publicLife: "जनजीवन",
    khalilabad: "खलीलाबाद",
    media: "मीडिया",
    updates: "अपडेट",
    contact: "संपर्क",
    connect: "संपर्क करें",
    menu: "मेन्यू",
    close: "बंद करें",
    skip: "मुख्य सामग्री पर जाएँ",
    primary: "मुख्य नेविगेशन",
    language: "भाषा",
    breadcrumb: "ब्रेडक्रंब",
    backHome: "मुखपृष्ठ पर लौटें",
  },
  slot: {
    label: "सामग्री स्थान",
  },
  hero: {
    eyebrow: "समाजवादी पार्टी · खलीलाबाद, संत कबीर नगर",
    values: ["जनसेवा", "विकास", "न्याय", "सशक्त समाज"],
    intro: "संत कबीर नगर ज़िले के मुख्यालय खलीलाबाद से अधिवक्ता एवं सामाजिक-राजनीतिक कार्यकर्ता।",
    joined: "मार्च 2026 में समाजवादी पार्टी में शामिल हुए।",
    ctaProfile: "रोहित पांडेय के बारे में",
    ctaContact: "कार्यालय से संपर्क करें",
    party: "समाजवादी पार्टी",
    state: "उत्तर प्रदेश",
  },
  about: {
    label: "परिचय",
    title: "खलीलाबाद के अधिवक्ता",
    bio: [
      "रोहित पांडेय उत्तर प्रदेश के संत कबीर नगर ज़िले में खलीलाबाद के अधिवक्ता एवं सामाजिक-राजनीतिक कार्यकर्ता हैं। उन्होंने दिल्ली विश्वविद्यालय से पढ़ाई की है।",
      "उनके सार्वजनिक प्रोफ़ाइल के अनुसार वे संत कबीर नगर से लोकसभा प्रत्याशी रह चुके हैं। मार्च 2026 में वे समाजवादी पार्टी में शामिल हुए और अब उनका राजनीतिक कार्य खलीलाबाद विधानसभा क्षेत्र पर केंद्रित है।",
    ],
    facts: [
      { k: "पेशा", v: "अधिवक्ता" },
      { k: "शिक्षा", v: "दिल्ली विश्वविद्यालय" },
      { k: "कार्यक्षेत्र", v: "खलीलाबाद, संत कबीर नगर" },
      { k: "भाषाएँ", v: "हिंदी, अंग्रेज़ी" },
      { k: "दल", v: "समाजवादी पार्टी, मार्च 2026 से" },
    ],
    portraitAlt: "हाथ बाँधे खड़े रोहित पांडेय",
    readMore: "पूरा परिचय पढ़ें",
    slotLegal:
      "विधि क्षेत्र का अनुभव — न्यायालय, प्रैक्टिस के क्षेत्र और वर्ष — कार्यालय द्वारा जोड़ा जाएगा।",
    slotEducation: "दिल्ली विश्वविद्यालय से प्राप्त उपाधि और वर्ष — पुष्टि के बाद जोड़ा जाएगा।",
  },
  journey: {
    label: "राजनीतिक यात्रा",
    title: "प्रमुख पड़ाव",
    intro: "तिथियाँ केवल वहीं दी गई हैं जहाँ उनकी पुष्टि है।",
    milestones: "पड़ाव",
    prev: "पिछला पड़ाव",
    next: "अगला पड़ाव",
    viewJourney: "पूरी यात्रा देखें",
    items: [
      {
        id: "earlier",
        era: "2026 से पहले",
        title: "समाजवादी पार्टी से पहले",
        body: "समाजवादी पार्टी में शामिल होने से पहले भी रोहित पांडेय सार्वजनिक जीवन में सक्रिय थे। उनके सार्वजनिक प्रोफ़ाइल के अनुसार वे संत कबीर नगर से लोकसभा प्रत्याशी रह चुके हैं।",
      },
      {
        id: "joining",
        era: "मार्च 2026",
        title: "समाजवादी पार्टी में शामिल",
        body: "मार्च 2026 में वे राष्ट्रीय अध्यक्ष अखिलेश यादव के नेतृत्व वाली समाजवादी पार्टी में शामिल हुए। तब से उनका राजनीतिक कार्य पार्टी के साथ जारी है।",
        alt: "समाजवादी पार्टी के राष्ट्रीय अध्यक्ष अखिलेश यादव से भेंट करते रोहित पांडेय",
        caption: "समाजवादी पार्टी के राष्ट्रीय अध्यक्ष अखिलेश यादव के साथ।",
      },
      {
        id: "visit",
        era: "2026",
        title: "संत कबीर नगर में स्वागत",
        body: "पार्टी में शामिल होने के बाद वे संत कबीर नगर पहुँचे, जहाँ पार्टी कार्यकर्ताओं ने एकत्र होकर उनका स्वागत किया।",
      },
      {
        id: "organisation",
        era: "सितंबर 2026",
        title: "खलीलाबाद में संगठनात्मक कार्य",
        body: "सितंबर 2026 की समाचार रिपोर्टों में खलीलाबाद विधानसभा क्षेत्र में समाजवादी पार्टी की संगठनात्मक गतिविधियों में उनकी भागीदारी का उल्लेख हुआ।",
      },
    ],
  },
  location: {
    label: "खलीलाबाद",
    name: "खलीलाबाद",
    otherScript: "Khalilabad",
    sub: "संत कबीर नगर, उत्तर प्रदेश",
    intro:
      "खलीलाबाद संत कबीर नगर ज़िले का मुख्यालय है। यहाँ का विधानसभा क्षेत्र संत कबीर नगर लोकसभा सीट के पाँच विधानसभा क्षेत्रों में से एक है।",
    connectionLabel: "स्थानीय जुड़ाव",
    connection:
      "रोहित पांडेय खलीलाबाद में रहते हैं। समाजवादी पार्टी में शामिल होने के बाद से उनका राजनीतिक कार्य इसी विधानसभा क्षेत्र पर केंद्रित है।",
    facts: [
      { k: "विधानसभा क्षेत्र", v: "संख्या 313 · खलीलाबाद" },
      { k: "ज़िला", v: "संत कबीर नगर" },
      { k: "लोकसभा सीट", v: "संत कबीर नगर (संख्या 62)" },
      { k: "राज्य", v: "उत्तर प्रदेश" },
    ],
    segmentsLabel: "संत कबीर नगर लोकसभा सीट के विधानसभा क्षेत्र",
    segments: ["आलापुर (अ.जा.)", "मेंहदावल", "खलीलाबाद", "धनघटा (अ.जा.)", "खजनी (अ.जा.)"],
    current: "खलीलाबाद",
    more: "खलीलाबाद के बारे में और",
  },
  publicLife: {
    label: "जनजीवन",
    title: "हाल की सार्वजनिक गतिविधियाँ",
    intro:
      "समाजवादी पार्टी में शामिल होने के बाद से रोहित पांडेय की सार्वजनिक गतिविधियाँ संत कबीर नगर ज़िले पर केंद्रित रही हैं। नीचे दी गई हर जानकारी प्रकाशित रिपोर्टों पर आधारित है।",
    photoAlt: "सफ़ेद कुर्ता और अंगवस्त्र में रोहित पांडेय",
    more: "सभी अपडेट",
  },
  connect: {
    label: "जुड़े रहें",
    quote: "मैं रोहित पांडेय हूँ — एक अधिवक्ता और सामाजिक-राजनीतिक कार्यकर्ता।",
    attribution: "रोहित पांडेय, अपने सार्वजनिक प्रोफ़ाइल पर",
    body: "रोहित पांडेय अपने सार्वजनिक कार्य की जानकारी फ़ेसबुक, इंस्टाग्राम और X पर साझा करते हैं। इस वेबसाइट से भेजे गए संदेश उनके कार्यालय तक पहुँचते हैं।",
    cta: "कार्यालय को लिखें",
    alt: "रोहित पांडेय का चित्र",
  },
  latest: {
    title: "ताज़ा अपडेट",
    all: "सभी अपडेट",
    featured: "विशेष",
    readMore: "और पढ़ें",
  },
  videos: {
    label: "वीडियो",
    title: "चुना हुआ वीडियो",
    featured: "विशेष",
    all: "सभी मीडिया",
    play: "वीडियो चलाएँ",
    readMore: "पूरा अपडेट पढ़ें",
    more: "और वीडियो",
  },
  social: {
    label: "सोशल मीडिया",
    title: "सोशल मीडिया से ताज़ा",
    facebook: "फ़ेसबुक",
    openFacebook: "फ़ेसबुक पेज खोलें",
    latest: "इस वेबसाइट से ताज़ा",
    open: "पढ़ें",
    all: "सभी अपडेट",
  },
  media: {
    label: "मीडिया",
    title: "तस्वीरें",
    intro: "समाजवादी पार्टी की बैठकों की तस्वीरें और सोशल मीडिया पर साझा की गई रचनाएँ।",
    viewAll: "सभी तस्वीरें देखें",
    archive: "संग्रह",
    open: "तस्वीर खोलें",
    close: "बंद करें",
    prev: "पिछली तस्वीर",
    next: "अगली तस्वीर",
    of: "में से",
    dialog: "तस्वीर दर्शक",
    items: {
      "sp-office-group-01": {
        alt: "समाजवादी पार्टी कार्यालय में अखिलेश यादव और पार्टी सहयोगियों के साथ रोहित पांडेय",
        caption: "समाजवादी पार्टी कार्यालय में राष्ट्रीय अध्यक्ष अखिलेश यादव और पार्टी सहयोगियों के साथ।",
        tag: "पार्टी कार्यालय",
      },
      "sp-felicitation": {
        alt: "समाजवादी पार्टी कार्यालय में स्मृति-चिह्न ग्रहण करते अखिलेश यादव",
        caption: "पार्टी कार्यालय में एक बैठक के दौरान अखिलेश यादव को स्मृति-चिह्न भेंट किया गया।",
        tag: "पार्टी कार्यालय",
      },
      "sp-office-group-02": {
        alt: "पार्टी कार्यालय में स्मृति-चिह्न थामे अखिलेश यादव के साथ समूह चित्र",
        caption: "उसी बैठक का एक समूह चित्र।",
        tag: "पार्टी कार्यालय",
      },
      "akhilesh-yadav-sp-office": {
        alt: "समाजवादी पार्टी कार्यालय में अखिलेश यादव के साथ खड़े रोहित पांडेय",
        caption: "समाजवादी पार्टी कार्यालय में अखिलेश यादव के साथ।",
        tag: "पार्टी कार्यालय",
      },
      "shivpal-singh-yadav-lucknow": {
        alt: "लखनऊ में श्री शिवपाल सिंह यादव जी के साथ रोहित पांडेय",
        caption: "लखनऊ में समाजवादी पार्टी के राष्ट्रीय महासचिव श्री शिवपाल सिंह यादव जी से शिष्टाचार भेंट।",
        tag: "भेंट",
      },
      "campaign-graphic": {
        alt: "सोशल मीडिया रचना — साथ आयें, संतकबीरनगर सजायें",
        caption: "सोशल मीडिया रचना: “साथ आयें, संतकबीरनगर सजायें”।",
        tag: "सोशल मीडिया",
      },
    },
  },
  updates: {
    label: "अपडेट",
    title: "समाचार और अपडेट",
    intro: "प्रकाशित रिपोर्टों पर आधारित संक्षिप्त जानकारी।",
    readMore: "पढ़ें",
    all: "सभी अपडेट",
    back: "सभी अपडेट",
    more: "अन्य अपडेट",
    noteLabel: "टिप्पणी",
    note: "यह अपडेट सार्वजनिक रूप से उपलब्ध जानकारी का सार है। तस्वीरें और अन्य विवरण कार्यालय द्वारा जोड़े जाएँगे।",
    published: "इस वेबसाइट पर प्रकाशित",
  },
  contact: {
    label: "संपर्क",
    title: "कार्यालय को लिखें",
    intro:
      "मुलाक़ात, आमंत्रण, मीडिया अनुरोध या जनहित से जुड़े विषयों के लिए यहाँ संदेश भेजें। आप रोहित पांडेय से उनके सोशल मीडिया माध्यमों पर भी जुड़ सकते हैं।",
    strip: "रोहित पांडेय के कार्यालय को लिखें",
    namasteAlt: "हाथ जोड़कर अभिवादन करते रोहित पांडेय",
    slot: "कार्यालय का पता, फ़ोन नंबर और ईमेल — कार्यालय द्वारा जोड़ा जाएगा।",
    channels: "सोशल मीडिया पर",
    form: {
      name: "पूरा नाम",
      phone: "मोबाइल नंबर",
      phoneHint: "10 अंकों का भारतीय मोबाइल नंबर",
      email: "ईमेल",
      contactHint: "मोबाइल नंबर या ईमेल — कम से कम एक दें।",
      topic: "विषय",
      topics: [
        "सामान्य जानकारी",
        "मुलाक़ात का अनुरोध",
        "कार्यक्रम आमंत्रण",
        "मीडिया",
        "जनहित का विषय",
      ],
      message: "संदेश",
      consent: "मैं सहमत हूँ कि कार्यालय उत्तर देने के लिए इन विवरणों का उपयोग कर सकता है।",
      submit: "संदेश भेजें",
      sending: "भेजा जा रहा है…",
      optional: "वैकल्पिक",
      errors: {
        name: "कृपया अपना नाम लिखें (कम से कम 2 अक्षर)।",
        contact: "कृपया मोबाइल नंबर या ईमेल पता दें।",
        phone: "कृपया 10 अंकों का सही भारतीय मोबाइल नंबर लिखें।",
        email: "कृपया सही ईमेल पता लिखें।",
        message: "कृपया कम से कम 20 अक्षरों का संदेश लिखें।",
        consent: "कृपया पुष्टि करें कि कार्यालय आपसे संपर्क कर सकता है।",
        summary: "कृपया चिह्नित जानकारी ठीक करें।",
      },
      success: "धन्यवाद। आपका संदेश कार्यालय तक पहुँच गया है।",
      successSub: "कार्यालय आपके दिए गए विवरण पर उत्तर देगा।",
      failure:
        "अभी आपका संदेश नहीं भेजा जा सका। कृपया थोड़ी देर बाद पुनः प्रयास करें, या फ़ेसबुक, इंस्टाग्राम अथवा X पर रोहित पांडेय से जुड़ें।",
      again: "एक और संदेश भेजें",
    },
  },
  footer: {
    navigate: "पृष्ठ",
    follow: "जुड़ें",
    language: "भाषा",
    privacy: "गोपनीयता",
    terms: "शर्तें",
    partner: "डिजिटल अनुभव सहयोगी",
    newTab: "नए टैब में खुलता है",
    disclaimer:
      "रोहित पांडेय की व्यक्तिगत वेबसाइट। यह समाजवादी पार्टी की आधिकारिक वेबसाइट नहीं है।",
  },
  legal: {
    updated: "अंतिम अद्यतन: 2 अक्टूबर 2026",
    privacy: [
      {
        h: "हम क्या जानकारी लेते हैं",
        p: "यह वेबसाइट केवल वही जानकारी लेती है जो आप संपर्क फ़ॉर्म के माध्यम से भेजते हैं: आपका नाम, मोबाइल नंबर और/या ईमेल, विषय और संदेश।",
      },
      {
        h: "जानकारी का उपयोग",
        p: "आपकी जानकारी का उपयोग केवल आपके संदेश का उत्तर देने के लिए होता है। इसे बेचा, किराये पर दिया या प्रचार के लिए साझा नहीं किया जाता।",
      },
      {
        h: "तकनीकी जानकारी",
        p: "अधिकांश वेबसाइटों की तरह, होस्टिंग सेवा सुरक्षा और विश्वसनीयता के लिए सामान्य सर्वर लॉग (जैसे IP पता और ब्राउज़र का प्रकार) रख सकती है।",
      },
      {
        h: "आपके विकल्प",
        p: "संपर्क पृष्ठ के माध्यम से कार्यालय को लिखकर आप अपने संदेश और विवरण हटाने का अनुरोध कर सकते हैं।",
      },
    ],
    terms: [
      {
        h: "इस वेबसाइट के बारे में",
        p: "यह रोहित पांडेय की व्यक्तिगत वेबसाइट है। यह समाजवादी पार्टी की आधिकारिक वेबसाइट नहीं है, और यहाँ व्यक्त विचार उनके अपने हैं।",
      },
      {
        h: "सामग्री और तस्वीरें",
        p: "इस वेबसाइट की सामग्री और तस्वीरें जानकारी के लिए हैं। कृपया अनुमति के बिना तस्वीरों का पुनः उपयोग न करें।",
      },
      {
        h: "सटीकता",
        p: "जानकारी सद्भाव से प्रकाशित की जाती है और पुष्टि होने पर अद्यतन की जाती है। कोई त्रुटि दिखे तो कृपया कार्यालय को सूचित करें।",
      },
      {
        h: "बाहरी लिंक",
        p: "सोशल मीडिया और अन्य वेबसाइटों के लिंक सुविधा के लिए दिए गए हैं; उनकी सामग्री उनकी अपनी शर्तों के अधीन है।",
      },
    ],
  },
  notFound: {
    title: "यह पृष्ठ नहीं मिला",
    body: "हो सकता है लिंक पुराना हो, या पृष्ठ कहीं और चला गया हो।",
  },
};

const dictionaries: Record<Locale, Dict> = { en, hi };

export function getDictionary(lang: Locale): Dict {
  return dictionaries[lang];
}
