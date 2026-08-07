import { FAQItem, Testimonial } from "../types";

export const CUSTOMER_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Ananya Saxena",
    locality: "Arera Colony E-7, Bhopal",
    rating: 5,
    date: "August 2026",
    comment: "Extremely professional service! The Kabadiwala Bhopal pickup team arrived within 30 minutes with a digital weighing machine. Paid exact cash on the spot. Highly recommended for household scrap clearing.",
    scrapTypesSold: "Newspapers, Books, Old AC & Copper",
    verified: true,
  },
  {
    id: "t2",
    name: "Rajesh Agrawal (IT Firm Owner)",
    locality: "MP Nagar Zone II, Bhopal",
    rating: 5,
    date: "July 2026",
    comment: "We had over 250 kg of office paper records and old e-waste CPUs. Kabadiwala Bhopal gave us official e-waste recycling receipt and the best rate in the city. Very transparent and polite team.",
    scrapTypesSold: "Office Records, E-Waste, Monitors",
    verified: true,
  },
  {
    id: "t3",
    name: "Sunil Saini",
    locality: "Kolar Road, Fine Avenue",
    rating: 5,
    date: "July 2026",
    comment: "Booked pickup via WhatsApp at 10 AM, and by 11:30 AM my balcony scrap was completely cleaned up. Accurate digital scale and instant PhonePe payment!",
    scrapTypesSold: "Cardboard, Iron Grills, Old Fridge",
    verified: true,
  },
  {
    id: "t4",
    name: "Priyanka Mishra",
    locality: "Shahpura Sector C, Bhopal",
    rating: 5,
    date: "June 2026",
    comment: "Best Kabadiwala in Bhopal! No bargaining hassles or cheating on weights. The rates are updated live on their website. Very eco-friendly initiative.",
    scrapTypesSold: "Plastic Bottles, Aluminum Utensils, Books",
    verified: true,
  },
];

export const FREQUENTLY_ASKED_QUESTIONS: FAQItem[] = [
  {
    id: "f1",
    question: "Is doorstep scrap pickup completely free in Bhopal?",
    answer: "Yes, 100% free doorstep pickup service is provided across all areas of Bhopal including MP Nagar, Arera Colony, Kolar Road, Habibganj, Shahpura, Bairagarh, and Nariyalkheda. You do not pay any transportation fee.",
    category: "General",
  },
  {
    id: "f2",
    question: "How is scrap weighed? How do you ensure correct weight?",
    answer: "Our pickup executives carry certified digital electronic weighing scales. The weight is displayed transparently in front of you down to the exact gram, eliminating traditional manual scale errors.",
    category: "Rates & Weighing",
  },
  {
    id: "f3",
    question: "What is the minimum scrap weight required for booking?",
    answer: "For standard doorstep pickup, we recommend a minimum total scrap weight of around 15–20 kg (or 1 major appliance like AC, Fridge, or Washing Machine). For smaller quantities, you can aggregate with neighbors or book a convenient weekend slot.",
    category: "Pickup & Time",
  },
  {
    id: "f4",
    question: "How do I get paid for my scrap?",
    answer: "You get instant cash payment or direct UPI transfer (PhonePe, Google Pay, Paytm, Bank Transfer) as soon as the items are weighed on the spot.",
    category: "General",
  },
  {
    id: "f5",
    question: "Do you handle bulk commercial scrap or office dismantling in Bhopal?",
    answer: "Yes! We specialize in bulk commercial scrap disposal, office clearing, school/college library waste, IT firm e-waste recycling, and industrial factory metal scrap in MP Nagar, Govindpura, Mandideep, and across MP.",
    category: "Commercial",
  },
  {
    id: "f6",
    question: "How can I book a pickup fast in Bhopal?",
    answer: "You can click on the 'Call Now' button (88716 00497), send us a message on WhatsApp (88716 00497), or fill out the quick 1-minute Online Scrap Pickup Request form on this website.",
    category: "Pickup & Time",
  },
];
