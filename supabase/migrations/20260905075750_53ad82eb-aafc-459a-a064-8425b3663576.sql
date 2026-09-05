CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TYPE public.review_status AS ENUM ('pending','approved','rejected');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text text NOT NULL,
  avatar_url text,
  status public.review_status NOT NULL DEFAULT 'pending',
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon;
GRANT INSERT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved reviews are public" ON public.reviews FOR SELECT TO anon, authenticated USING (status = 'approved');
CREATE POLICY "Anyone can submit a pending review" ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (status = 'pending' AND featured = false);
CREATE POLICY "Admins can read all reviews" ON public.reviews FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can update reviews" ON public.reviews FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can delete reviews" ON public.reviews FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  display_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active faqs are public" ON public.faqs FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Admins can read all faqs" ON public.faqs FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can insert faqs" ON public.faqs FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can update faqs" ON public.faqs FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can delete faqs" ON public.faqs FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price text NOT NULL,
  tagline text,
  description text,
  features text[] NOT NULL DEFAULT '{}',
  display_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.packages TO authenticated;
GRANT ALL ON public.packages TO service_role;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active packages are public" ON public.packages FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Admins can read all packages" ON public.packages FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can insert packages" ON public.packages FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can update packages" ON public.packages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can delete packages" ON public.packages FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

INSERT INTO public.packages (name, price, tagline, description, features, display_order) VALUES
('Clarity Reading', '₹299', 'Questions • Answers • Guidance', 'A focused reading for the questions sitting closest to the surface.', ARRAY['Up to 3 questions','5–6 card focused spread','Clear answers + current energies','What you need to know','Practical tarot guidance'], 1),
('Deep Dive Reading', '₹499', 'Deep Insight • Understanding • Guidance', 'A thorough look into one situation, its energies and its openings.', ARRAY['Up to 5 questions about one situation','Detailed spread + current & hidden energies','Blocks, challenges & opportunities','Possible direction + what to release/focus on','Detailed personalized guidance'], 2),
('The Lunoir Experience', '₹999', 'Complete Reading • Multiple Areas • Personal Guidance', 'The complete reading, spanning the areas of your life that matter most.', ARRAY['Up to 8 questions across different areas','Complete current energy + hidden influences','Love, career, personal growth & life direction','Past patterns + what''s currently changing','Future themes, possibilities & personalized guidance'], 3);

INSERT INTO public.faqs (question, answer, display_order) VALUES
('What is a tarot reading?', 'A tarot reading is a guided reflection. The cards are used as a mirror for your current situation — offering perspective, language and insight for what you may already sense. It is a tool for clarity and self-understanding, not a prediction of fixed events.', 1),
('How do I book a reading?', 'Choose the reading you would like, then tap any “Book via Instagram” button on this site. It opens a direct message with @lunoir.oracle, where your session is arranged personally. Bookings are not processed on this website.', 2),
('How do I choose the right reading?', 'Choose Clarity for a few direct questions, Deep Dive for one situation you want to understand in depth, and The Lunoir Experience when you would like guidance across several areas of life. If you are unsure, message @lunoir.oracle.', 3),
('How many questions can I ask?', 'Each reading lists the number of questions it includes — up to 3 for Clarity, up to 5 for Deep Dive and up to 8 for The Lunoir Experience.', 4),
('How will I receive my reading?', '[To be confirmed by Lunoir Oracle] The delivery format is arranged directly with you on Instagram when you book.', 5),
('Can I ask about love and relationships?', 'Yes. Love, relationships, career, finances, personal growth and life direction are all welcome themes.', 6),
('Can tarot predict my future?', 'No. Tarot does not predict fixed outcomes. It reflects current energies, patterns and possibilities so you can make your own decisions with more clarity.', 7),
('Is my reading confidential?', 'Yes. Everything shared in a reading stays between you and Lunoir Oracle.', 8),
('How long does a reading take?', '[To be confirmed by Lunoir Oracle] Timings are confirmed with you directly when you book on Instagram.', 9),
('What should I prepare before my reading?', 'Bring your questions, and a sense of what you would like clarity on. Open, specific questions tend to invite the most useful guidance.', 10);