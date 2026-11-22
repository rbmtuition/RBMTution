export type Testimonial = {
  name: string;
  detail: string;
  rating: number;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rajesh Sharma",
    detail: "Class 10 · Mathematics",
    rating: 4.5,
    quote:
      "RBM Tuition is the best home tuition for students. Teachers explain everything in a very simple way, making concepts easy to understand. Highly recommended.",
  },
  {
    name: "Priya Verma",
    detail: "Class 12 · Physics",
    rating: 4.5,
    quote:
      "I joined RBM Tuition a few months ago and my grades improved a lot. The teachers are very supportive and the learning environment is great. Thank you for the help!",
  },
  {
    name: "Ankit Yadav",
    detail: "Class 12 · Chemistry",
    rating: 5,
    quote:
      "If you need a tuition centre that truly cares about students, RBM Tuition is perfect. The teaching style is great and all doubts are cleared properly.",
  },
];
