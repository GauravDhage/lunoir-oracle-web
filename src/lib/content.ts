import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Package {
  id: string;
  name: string;
  price: string;
  tagline: string | null;
  description: string | null;
  features: string[];
  display_order: number;
  active: boolean;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  active: boolean;
}

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  name: string;
  rating: number;
  review_text: string;
  avatar_url: string | null;
  status: ReviewStatus;
  featured: boolean;
  created_at: string;
}

export const packagesQuery = queryOptions({
  queryKey: ["packages", "public"],
  queryFn: async (): Promise<Package[]> => {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Package[];
  },
});

export const faqsQuery = queryOptions({
  queryKey: ["faqs", "public"],
  queryFn: async (): Promise<Faq[]> => {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Faq[];
  },
});

export const approvedReviewsQuery = queryOptions({
  queryKey: ["reviews", "approved"],
  queryFn: async (): Promise<Review[]> => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("status", "approved")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Review[];
  },
});

/** Placeholder reviews shown until the client provides real ones. */
export const SAMPLE_REVIEWS: Array<Pick<Review, "name" | "rating" | "review_text">> = [
  {
    name: "Sample Client",
    rating: 5,
    review_text:
      "Placeholder review — replace with a real client testimonial once one has been received. This card shows how a five-star review will appear.",
  },
  {
    name: "Sample Client",
    rating: 5,
    review_text:
      "Placeholder review — sample content only. Approved reviews submitted through the site will appear here automatically.",
  },
  {
    name: "Sample Client",
    rating: 4,
    review_text:
      "Placeholder review — sample content only, no real client has been quoted. Edit or remove from the admin area at any time.",
  },
];
