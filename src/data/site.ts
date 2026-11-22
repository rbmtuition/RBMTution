export const siteConfig = {
  name: "RBM Tuition",
  legalName: "RBM Home Tuition",
  url: "https://rbmtuition.com",
  tagline: "Right teacher. Right guidance. Bright future.",
  description:
    "Find verified home and online tutors in Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad and Faridabad. Personalised tuition for Nursery to Class 12, all boards, plus JEE, NEET and CUET preparation.",
  phone: "+91 92203 88165",
  phonePlain: "+919220388165",
  phoneHref: "tel:+919220388165",
  tutorPhone: "+91 92208 76901",
  tutorPhoneHref: "tel:+919220876901",
  email: "info@rbmtuition.com",
  emailHref: "mailto:info@rbmtuition.com",
  whatsapp:
    "https://wa.me/919220388165?text=Hi%20RBM%20Tuition%2C%20I%20am%20looking%20for%20a%20home%20tutor.%20Please%20share%20details.",
  hours: "Open 24 hours · 7 days a week",
  bank: {
    accountName: "RBM TUITION",
    bankName: "Slice Small Finance Bank",
    accountType: "Current account",
    accountNumber: "033311501038265",
    ifsc: "NESF0000333",
    branch: "Koramangala, Bangalore Branch",
    address:
      "Ground Floor, Ashford Park View, Indiqube, Bengaluru, Karnataka 560034",
  },
  address: {
    street: "A-116, First Floor, Tower A, Urbtech Trade Center",
    locality: "Sector 132, Noida",
    region: "Uttar Pradesh",
    postalCode: "201304",
    country: "IN",
    countryName: "India",
    full: "A-116, First Floor, Tower A, Urbtech Trade Center, Sector 132, Noida, Uttar Pradesh 201304, India",
  },
  socials: {
    instagram:
      "https://www.instagram.com/p/DR4oNX1kyMj/?igsh=MTV6NHpyamNxcWVtNg==",
    facebook: "https://www.facebook.com/share/16uZc5GGab/",
    youtube: "https://youtube.com/@rbmtuition?si=EfjBZOfWFAFxgdCl",
    linkedin:
      "https://www.linkedin.com/posts/rbm-home-tuition-21a530396_unlock-your-childs-potential-with-our-home-activity-7401671967927590912-1fuk?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAGFBEDYBnm5nOUJ4dYJhC20Xv-2XCSPzHMg&utm_campaign=whatsapp",
  },
  certifications: [
    {
      label: "ISO 9001:2015 Certified",
      detail: "Quality management · QMS260199",
    },
    {
      label: "UDYAM Registered",
      detail: "MSME · UDYAM-HR-10-0078219",
    },
    {
      label: "Trademark Protected",
      detail: "TM 7457673",
    },
  ],
  stats: [
    { value: "23,000+", label: "Registered tutors" },
    { value: "6", label: "Cities covered" },
    { value: "Nursery–XII", label: "Classes" },
    { value: "Free", label: "Demo class" },
  ],
} as const;

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses", menu: "courses" },
  { label: "Services", href: "/services", menu: "services" },
  { label: "Locations", href: "/locations", menu: "locations" },
  { label: "Subjects", href: "/subjects", menu: "subjects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
