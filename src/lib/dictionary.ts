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
    role: "Samajwadi Party Leader",
    roleLine: "Samajwadi Party | Khalilabad",
    place: "Khalilabad • Sant Kabir Nagar",
    placeLong: "Khalilabad, Sant Kabir Nagar, Uttar Pradesh",
    altName: "रोहित पाण्डेय",
  },
  meta: {
    home: {
      title: "Rohit Pandey | Samajwadi Party Leader, Khalilabad",
      description:
        "Rohit Pandey, Samajwadi Party leader in Khalilabad (Assembly Constituency No. 313), Sant Kabir Nagar, Uttar Pradesh. With the party since March 2026.",
    },
    about: {
      title: "About Rohit Pandey",
      description:
        "Rohit Pandey is a Samajwadi Party leader in Khalilabad, Sant Kabir Nagar, and a former Lok Sabha candidate. He joined the party in March 2026.",
    },
    socialService: {
      title: "Social Service in Khalilabad",
      description:
        "The issues residents raise most often and the work Rohit Pandey has done on the ground in Khalilabad, Sant Kabir Nagar.",
    },
    publicLife: {
      title: "Public Life",
      description: "Meetings, visits and party work by Rohit Pandey across Khalilabad and Sant Kabir Nagar, newest first.",
    },
    khalilabad: {
      title: "Khalilabad, Sant Kabir Nagar",
      description:
        "Khalilabad Assembly Constituency (No. 313), headquarters of Sant Kabir Nagar district, Uttar Pradesh. The centre of Rohit Pandey's public work.",
    },
    media: {
      title: "Photographs and Videos",
      description: "Photographs and videos from Rohit Pandey's public and political life.",
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
    socialService: "Social service",
    publicLife: "Public Life",
    khalilabad: "Khalilabad",
    media: "Media",
    mediaPhotos: "Photographs",
    mediaVideos: "Videos",
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
    line: "At work in Khalilabad, Assembly Constituency No. 313.",
    intro: "Based in Khalilabad, the district headquarters of Sant Kabir Nagar.",
    joined: "He joined the Samajwadi Party in March 2026.",
    ctaProfile: "About Rohit Pandey",
    ctaContact: "Contact the Office",
    party: "Samajwadi Party",
    state: "Uttar Pradesh",
  },
  about: {
    label: "About",
    title: "A leader from Khalilabad",
    bio: [
      "Rohit Pandey is a Samajwadi Party leader working in the Khalilabad assembly area (No. 313) of Sant Kabir Nagar district, Uttar Pradesh.",
      "A former Lok Sabha candidate from Sant Kabir Nagar, he joined the Samajwadi Party in March 2026. He is an advocate by profession and studied at the University of Delhi.",
    ],
    facts: [
      { k: "Party", v: "Samajwadi Party, since March 2026" },
      { k: "Based in", v: "Khalilabad, Sant Kabir Nagar" },
      { k: "Languages", v: "Hindi, English" },
      { k: "Education", v: "University of Delhi" },
      { k: "Profession", v: "Advocate" },
    ],
    portraitAlt: "Rohit Pandey standing with arms folded",
    readMore: "Read the full profile",
    slotLegal: "Legal career: courts, areas of practice and years at the bar. To be provided by the office.",
    slotEducation: "Degree and year of study at the University of Delhi. To be confirmed.",
  },
  journey: {
    label: "Political journey",
    title: "Key milestones",
    milestones: "Milestones",
    prev: "Previous milestone",
    next: "Next milestone",
    viewJourney: "View the journey",
    items: [
      {
        id: "joining",
        era: "March 2026",
        title: "Joins the Samajwadi Party",
        body: "In March 2026 he joined the Samajwadi Party, led by national president Akhilesh Yadav, and has worked with the party since.",
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
        body: "In September 2026 he took part in Samajwadi Party organisational work in the Khalilabad assembly area.",
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
    title: "Meetings, visits and party work",
    intro: "Across Khalilabad and Sant Kabir Nagar, newest first.",
    photoAlt: "Rohit Pandey in a white kurta with an angavastram",
    more: "All updates",
  },
  socialService: {
    label: "Social service",
    title: "Social service in Khalilabad",
    lead: "The issues residents raise most often at the office and in village meetings, and the work done on the ground.",
    seeAll: "See all updates",
    statTotal: "Updates since March 2026",
    statPeople: "Village and public meetings",
    statLatest: "Latest update",
    issuesTitle: "Issues he is working on",
    workTitle: "Recent work on the ground",
    countOne: "update",
    countMany: "updates",
    filterAll: "All",
    filterPeople: "Village meetings",
    filterOrg: "Organisation",
    filterParty: "Party",
    chipPeople: "Village meeting",
    chipOrg: "Organisation",
    chipOffice: "Office",
    chipParty: "Party",
    share: "Share",
    empty: "No updates in this category yet.",
    clear: "Clear filter",
    filterLabel: "Filter updates",
  },
  vision: {
    title: "Vision for Khalilabad",
    slot: "Four to six local issues for Khalilabad, each with a short title and two lines. To be supplied by the campaign.",
  },
  news: {
    title: "In the news",
    slot: "Links to press reports about Rohit Pandey, with outlet name and date. To be supplied by the campaign.",
  },
  videos: {
    title: "Featured video",
    play: "Play video",
    readMore: "Read the full update",
    more: "More videos",
  },
  social: {
    title: "Watch and follow",
    youtube: "YouTube",
    latestVideo: "Latest video",
    moreVideos: "More videos",
    openChannel: "Open the YouTube channel",
    play: "Play video",
    facebook: "Facebook",
    openFacebook: "Open the Facebook page",
  },
  media: {
    label: "Media",
    title: "Photographs",
    intro: "Photographs and videos from meetings, visits and campaign events.",
    videosTitle: "Videos",
    fieldVideos: "From the field",
    viewAll: "View all photographs",
    open: "Open image",
    close: "Close",
    prev: "Previous image",
    next: "Next image",
    of: "of",
    dialog: "Image viewer",
    items: {
      "sp-office-group-01": {
        alt: "Rohit Pandey with Akhilesh Yadav and party colleagues at the Samajwadi Party office",
        caption: "Rohit Pandey with Akhilesh Yadav, national president of the Samajwadi Party, and colleagues.",
      },
      "sp-felicitation": {
        alt: "Akhilesh Yadav receiving a memento at the Samajwadi Party office",
        caption: "A memento is presented to Akhilesh Yadav during the meeting.",
      },
      "sp-office-group-02": {
        alt: "Group photograph with Akhilesh Yadav holding a memento",
        caption: "Group photograph after the memento was presented.",
      },
      "akhilesh-yadav-sp-office": {
        alt: "Rohit Pandey standing with Akhilesh Yadav",
        caption: "Rohit Pandey with Akhilesh Yadav.",
      },
      "shivpal-singh-yadav-lucknow": {
        alt: "Rohit Pandey with Shri Shivpal Singh Yadav in Lucknow",
        caption: "With Shri Shivpal Singh Yadav, National General Secretary of the Samajwadi Party, in Lucknow.",
      },
      "campaign-graphic": {
        alt: "Campaign creative with the line साथ आयें, संतकबीरनगर सजायें",
        caption: "Campaign creative: “साथ आयें, संतकबीरनगर सजायें” (Come together, let us make Sant Kabir Nagar shine).",
      },
    },
  },
  updates: {
    readMore: "Read",
    back: "Public Life",
    more: "More updates",
  },
  contact: {
    label: "Contact",
    title: "Write to the office",
    intro:
      "For meetings, invitations, media requests or matters of public concern, send a message here. You can also reach Rohit Pandey on his social channels.",
    strip: "Write to Rohit Pandey's office",
    namasteAlt: "Rohit Pandey greeting with folded hands",
    slot: "Phone, WhatsApp, email and office hours. To be provided by the office.",
    channels: "Follow on social media",
    office: {
      label: "Office",
      address: "Chiutna Chauraha, Khalilabad, Sant Kabir Nagar, Uttar Pradesh",
      map: "Map: the office at Chiutna Chauraha, Khalilabad",
      openMap: "Open in Google Maps",
      phone: "Phone and WhatsApp",
      email: "Email",
      hours: "Office hours",
      call: "Call the office",
      whatsapp: "WhatsApp",
    },
    join: {
      title: "Join the campaign",
      body: "Volunteer with the team in Khalilabad. Send your name and mobile number and the office will get in touch.",
      cta: "Volunteer with us",
    },
    form: {
      name: "Full name",
      phone: "Mobile number",
      phoneHint: "10-digit Indian mobile number",
      email: "Email",
      contactHint: "Give a mobile number or an email. One is enough.",
      topic: "Subject",
      topics: [
        "General enquiry",
        "Meeting request",
        "Event invitation",
        "Media",
        "Matter of public concern",
        "Volunteer",
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
    name: "रोहित पाण्डेय",
    first: "रोहित",
    last: "पाण्डेय",
    role: "समाजवादी पार्टी के नेता",
    roleLine: "समाजवादी पार्टी | खलीलाबाद",
    place: "खलीलाबाद • संत कबीर नगर",
    placeLong: "खलीलाबाद, संत कबीर नगर, उत्तर प्रदेश",
    altName: "Rohit Pandey",
  },
  meta: {
    home: {
      title: "रोहित पाण्डेय | समाजवादी पार्टी के नेता, खलीलाबाद",
      description:
        "रोहित पाण्डेय, खलीलाबाद (विधानसभा क्षेत्र संख्या 313), संत कबीर नगर, उत्तर प्रदेश में समाजवादी पार्टी के नेता। मार्च 2026 से पार्टी के साथ।",
    },
    about: {
      title: "रोहित पाण्डेय का परिचय",
      description:
        "रोहित पाण्डेय खलीलाबाद, संत कबीर नगर में समाजवादी पार्टी के नेता और पूर्व लोकसभा प्रत्याशी हैं। मार्च 2026 में वे पार्टी में शामिल हुए।",
    },
    socialService: {
      title: "खलीलाबाद में समाज सेवा",
      description:
        "वे मुद्दे जो लोग सबसे ज़्यादा उठाते हैं और खलीलाबाद, संत कबीर नगर में रोहित पाण्डेय का ज़मीन पर किया काम।",
    },
    publicLife: {
      title: "जनजीवन",
      description: "खलीलाबाद और संत कबीर नगर में रोहित पाण्डेय की बैठकें, दौरे और पार्टी का काम, सबसे नया सबसे ऊपर।",
    },
    khalilabad: {
      title: "खलीलाबाद, संत कबीर नगर",
      description:
        "खलीलाबाद विधानसभा क्षेत्र (संख्या 313), संत कबीर नगर ज़िले का मुख्यालय। रोहित पाण्डेय के सार्वजनिक कार्य का केंद्र।",
    },
    media: {
      title: "तस्वीरें और वीडियो",
      description: "रोहित पाण्डेय के सार्वजनिक और राजनीतिक जीवन की तस्वीरें और वीडियो।",
    },
    contact: {
      title: "संपर्क",
      description:
        "मुलाक़ात, आमंत्रण, मीडिया अनुरोध या जनहित के विषयों के लिए रोहित पाण्डेय के कार्यालय को लिखें।",
    },
    privacy: {
      title: "गोपनीयता नीति",
      description: "यह वेबसाइट आपकी साझा की गई जानकारी का उपयोग कैसे करती है।",
    },
    terms: {
      title: "उपयोग की शर्तें",
      description: "रोहित पाण्डेय की वेबसाइट के उपयोग से जुड़ी शर्तें।",
    },
  },
  nav: {
    home: "मुखपृष्ठ",
    about: "परिचय एवं यात्रा",
    socialService: "समाज सेवा",
    publicLife: "जनजीवन",
    khalilabad: "खलीलाबाद",
    media: "मीडिया",
    mediaPhotos: "तस्वीरें",
    mediaVideos: "वीडियो",
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
    line: "खलीलाबाद, विधानसभा क्षेत्र संख्या 313 में सक्रिय।",
    intro: "संत कबीर नगर ज़िले के मुख्यालय खलीलाबाद में रहते हैं।",
    joined: "मार्च 2026 में समाजवादी पार्टी में शामिल हुए।",
    ctaProfile: "रोहित पाण्डेय के बारे में",
    ctaContact: "कार्यालय से संपर्क करें",
    party: "समाजवादी पार्टी",
    state: "उत्तर प्रदेश",
  },
  about: {
    label: "परिचय",
    title: "खलीलाबाद के नेता",
    bio: [
      "रोहित पाण्डेय समाजवादी पार्टी के नेता हैं और उत्तर प्रदेश के संत कबीर नगर ज़िले के खलीलाबाद विधानसभा क्षेत्र (संख्या 313) में काम कर रहे हैं।",
      "संत कबीर नगर से पूर्व लोकसभा प्रत्याशी रह चुके रोहित पाण्डेय मार्च 2026 में समाजवादी पार्टी में शामिल हुए। वे पेशे से अधिवक्ता हैं और उन्होंने दिल्ली विश्वविद्यालय से पढ़ाई की है।",
    ],
    facts: [
      { k: "दल", v: "समाजवादी पार्टी, मार्च 2026 से" },
      { k: "कार्यक्षेत्र", v: "खलीलाबाद, संत कबीर नगर" },
      { k: "भाषाएँ", v: "हिंदी, अंग्रेज़ी" },
      { k: "शिक्षा", v: "दिल्ली विश्वविद्यालय" },
      { k: "पेशा", v: "अधिवक्ता" },
    ],
    portraitAlt: "हाथ बाँधे खड़े रोहित पाण्डेय",
    readMore: "पूरा परिचय पढ़ें",
    slotLegal: "विधि क्षेत्र का अनुभव: न्यायालय, प्रैक्टिस के क्षेत्र और वर्ष। कार्यालय द्वारा जोड़ा जाएगा।",
    slotEducation: "दिल्ली विश्वविद्यालय से प्राप्त उपाधि और वर्ष। पुष्टि के बाद जोड़ा जाएगा।",
  },
  journey: {
    label: "राजनीतिक यात्रा",
    title: "प्रमुख पड़ाव",
    milestones: "पड़ाव",
    prev: "पिछला पड़ाव",
    next: "अगला पड़ाव",
    viewJourney: "पूरी यात्रा देखें",
    items: [
      {
        id: "joining",
        era: "मार्च 2026",
        title: "समाजवादी पार्टी में शामिल",
        body: "मार्च 2026 में वे राष्ट्रीय अध्यक्ष अखिलेश यादव के नेतृत्व वाली समाजवादी पार्टी में शामिल हुए और तब से पार्टी के साथ काम कर रहे हैं।",
        alt: "समाजवादी पार्टी के राष्ट्रीय अध्यक्ष अखिलेश यादव से भेंट करते रोहित पाण्डेय",
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
        body: "सितंबर 2026 में उन्होंने खलीलाबाद विधानसभा क्षेत्र में समाजवादी पार्टी के संगठनात्मक कार्य में हिस्सा लिया।",
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
      "रोहित पाण्डेय खलीलाबाद में रहते हैं। समाजवादी पार्टी में शामिल होने के बाद से उनका राजनीतिक कार्य इसी विधानसभा क्षेत्र पर केंद्रित है।",
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
    title: "बैठकें, दौरे और पार्टी का काम",
    intro: "खलीलाबाद और संत कबीर नगर में, सबसे नया सबसे ऊपर।",
    photoAlt: "सफ़ेद कुर्ता और अंगवस्त्र में रोहित पाण्डेय",
    more: "सभी अपडेट",
  },
  socialService: {
    label: "समाज सेवा",
    title: "खलीलाबाद में समाज सेवा",
    lead: "वे मुद्दे जो लोग कार्यालय और गाँव की बैठकों में सबसे ज़्यादा उठाते हैं, और ज़मीन पर हुआ काम।",
    seeAll: "सभी अपडेट देखें",
    statTotal: "मार्च 2026 से अपडेट",
    statPeople: "गाँव और जन बैठकें",
    statLatest: "नवीनतम अपडेट",
    issuesTitle: "किन मुद्दों पर काम कर रहे हैं",
    workTitle: "ज़मीन पर हाल का काम",
    countOne: "अपडेट",
    countMany: "अपडेट",
    filterAll: "सभी",
    filterPeople: "गाँव की बैठकें",
    filterOrg: "संगठन",
    filterParty: "पार्टी",
    chipPeople: "गाँव की बैठक",
    chipOrg: "संगठन",
    chipOffice: "कार्यालय",
    chipParty: "पार्टी",
    share: "साझा करें",
    empty: "इस श्रेणी में अभी कोई अपडेट नहीं।",
    clear: "फ़िल्टर हटाएँ",
    filterLabel: "अपडेट फ़िल्टर करें",
  },
  vision: {
    title: "खलीलाबाद के लिए संकल्प",
    slot: "खलीलाबाद के चार से छह स्थानीय मुद्दे, हर एक का छोटा शीर्षक और दो पंक्तियाँ। अभियान दल द्वारा दिया जाएगा।",
  },
  news: {
    title: "समाचारों में",
    slot: "रोहित पाण्डेय से जुड़ी समाचार रिपोर्टों के लिंक, अख़बार या चैनल के नाम और तारीख़ के साथ। अभियान दल द्वारा दिए जाएँगे।",
  },
  videos: {
    title: "चुना हुआ वीडियो",
    play: "वीडियो चलाएँ",
    readMore: "पूरा अपडेट पढ़ें",
    more: "और वीडियो",
  },
  social: {
    title: "देखें और जुड़ें",
    youtube: "यूट्यूब",
    latestVideo: "ताज़ा वीडियो",
    moreVideos: "और वीडियो",
    openChannel: "यूट्यूब चैनल खोलें",
    play: "वीडियो चलाएँ",
    facebook: "फ़ेसबुक",
    openFacebook: "फ़ेसबुक पेज खोलें",
  },
  media: {
    label: "मीडिया",
    title: "तस्वीरें",
    intro: "बैठकों, दौरों और अभियान कार्यक्रमों की तस्वीरें और वीडियो।",
    videosTitle: "वीडियो",
    fieldVideos: "मैदान से",
    viewAll: "सभी तस्वीरें देखें",
    open: "तस्वीर खोलें",
    close: "बंद करें",
    prev: "पिछली तस्वीर",
    next: "अगली तस्वीर",
    of: "में से",
    dialog: "तस्वीर दर्शक",
    items: {
      "sp-office-group-01": {
        alt: "समाजवादी पार्टी कार्यालय में अखिलेश यादव और पार्टी सहयोगियों के साथ रोहित पाण्डेय",
        caption: "समाजवादी पार्टी के राष्ट्रीय अध्यक्ष अखिलेश यादव और सहयोगियों के साथ रोहित पाण्डेय।",
      },
      "sp-felicitation": {
        alt: "समाजवादी पार्टी कार्यालय में स्मृति-चिह्न ग्रहण करते अखिलेश यादव",
        caption: "बैठक के दौरान अखिलेश यादव को स्मृति-चिह्न भेंट किया गया।",
      },
      "sp-office-group-02": {
        alt: "स्मृति-चिह्न थामे अखिलेश यादव के साथ समूह चित्र",
        caption: "स्मृति-चिह्न भेंट करने के बाद का समूह चित्र।",
      },
      "akhilesh-yadav-sp-office": {
        alt: "अखिलेश यादव के साथ खड़े रोहित पाण्डेय",
        caption: "अखिलेश यादव के साथ रोहित पाण्डेय।",
      },
      "shivpal-singh-yadav-lucknow": {
        alt: "लखनऊ में श्री शिवपाल सिंह यादव जी के साथ रोहित पाण्डेय",
        caption: "लखनऊ में समाजवादी पार्टी के राष्ट्रीय महासचिव श्री शिवपाल सिंह यादव जी के साथ।",
      },
      "campaign-graphic": {
        alt: "प्रचार सामग्री: साथ आयें, संतकबीरनगर सजायें",
        caption: "प्रचार सामग्री: “साथ आयें, संतकबीरनगर सजायें”।",
      },
    },
  },
  updates: {
    readMore: "पढ़ें",
    back: "जनजीवन",
    more: "अन्य अपडेट",
  },
  contact: {
    label: "संपर्क",
    title: "कार्यालय को लिखें",
    intro:
      "मुलाक़ात, आमंत्रण, मीडिया अनुरोध या जनहित से जुड़े विषयों के लिए यहाँ संदेश भेजें। आप रोहित पाण्डेय से उनके सोशल मीडिया माध्यमों पर भी जुड़ सकते हैं।",
    strip: "रोहित पाण्डेय के कार्यालय को लिखें",
    namasteAlt: "हाथ जोड़कर अभिवादन करते रोहित पाण्डेय",
    slot: "फ़ोन, व्हाट्सऐप, ईमेल और कार्यालय का समय। कार्यालय द्वारा जोड़ा जाएगा।",
    channels: "सोशल मीडिया पर जुड़ें",
    office: {
      label: "कार्यालय",
      address: "चिउटना चौराहा, खलीलाबाद, संत कबीर नगर, उत्तर प्रदेश",
      map: "नक्शा: चिउटना चौराहा, खलीलाबाद स्थित कार्यालय",
      openMap: "गूगल मैप में खोलें",
      phone: "फ़ोन और व्हाट्सऐप",
      email: "ईमेल",
      hours: "कार्यालय का समय",
      call: "कार्यालय को कॉल करें",
      whatsapp: "व्हाट्सऐप",
    },
    join: {
      title: "अभियान से जुड़ें",
      body: "खलीलाबाद में टीम के साथ स्वयंसेवक बनें। अपना नाम और मोबाइल नंबर भेजें, कार्यालय आपसे संपर्क करेगा।",
      cta: "हमारे साथ जुड़ें",
    },
    form: {
      name: "पूरा नाम",
      phone: "मोबाइल नंबर",
      phoneHint: "10 अंकों का भारतीय मोबाइल नंबर",
      email: "ईमेल",
      contactHint: "मोबाइल नंबर या ईमेल दें। एक ही काफ़ी है।",
      topic: "विषय",
      topics: [
        "सामान्य जानकारी",
        "मुलाक़ात का अनुरोध",
        "कार्यक्रम आमंत्रण",
        "मीडिया",
        "जनहित का विषय",
        "स्वयंसेवक",
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
        "अभी आपका संदेश नहीं भेजा जा सका। कृपया थोड़ी देर बाद पुनः प्रयास करें, या फ़ेसबुक, इंस्टाग्राम अथवा X पर रोहित पाण्डेय से जुड़ें।",
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
      "रोहित पाण्डेय की व्यक्तिगत वेबसाइट। यह समाजवादी पार्टी की आधिकारिक वेबसाइट नहीं है।",
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
        p: "यह रोहित पाण्डेय की व्यक्तिगत वेबसाइट है। यह समाजवादी पार्टी की आधिकारिक वेबसाइट नहीं है, और यहाँ व्यक्त विचार उनके अपने हैं।",
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
