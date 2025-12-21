import { HomeIcon, Sparkles, MessageSquare, PartyPopper } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Step {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const steps: Step[] = [
  {
    step: 1,
    icon: HomeIcon,
    title: "Find the Right Property",
    description: "Browse large group houses and cottages across the UK and choose the property that suits your group.",
  },
  {
    step: 2,
    icon: MessageSquare,
    title: "Enquire or Book Direct",
    description: "Send your enquiry or booking request directly to the property owner and discuss availability, pricing and terms.",
  },
  {
    step: 3,
    icon: Sparkles,
    title: "Confirm With the Owner",
    description: "Payments, deposits and booking terms are agreed and handled directly with the property owner.",
  },
  {
    step: 4,
    icon: PartyPopper,
    title: "Enjoy Your Stay",
    description: "Arrive and enjoy your group getaway, with all arrangements managed directly with the owner.",
  },
];

export const faqs: FAQ[] = [
  {
    question: "How do I book a property?",
    answer: "Once you find a property you like, you can send an enquiry directly to the owner through our platform. They will then contact you to discuss availability, pricing, and their specific booking terms.",
  },
  {
    question: "Who do I pay for my booking?",
    answer: "All payments, including deposits and final balances, are handled directly between you and the property owner. Group Escape Houses does not take payments or handle booking contracts.",
  },
  {
    question: "What are the payment terms?",
    answer: "Payment terms, including deposit percentages and balance due dates, are set by individual house owners. You will agree these directly with the owner when confirming your booking.",
  },
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking 3-6 months in advance, especially for peak dates like bank holiday weekends and summer. Popular properties can book up to a year ahead for prime dates.",
  },
  {
    question: "Are pets allowed?",
    answer: "Some properties are pet-friendly. Look for the 'Pet Friendly' badge on property listings. Pet policies and any additional fees are managed by the property owner.",
  },
  {
    question: "What happens if I need to cancel?",
    answer: "Cancellation policies are set by the individual property owner and will be part of your contract with them. We recommend discussing this with the owner before confirming your booking.",
  },
];
