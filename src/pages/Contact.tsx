import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Section } from "../components/Section";
import { PageHero } from "../components/PageHero";
import { PrimaryButton } from "../components/Buttons";
import { CheckIcon } from "../components/Icons";
import { supabase } from "../lib/supabase";
import type { DemoRequest } from "../lib/supabase";

type FormState = DemoRequest;

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  restaurant_name: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.restaurant_name.trim())
    errors.restaurant_name = "Please enter your restaurant name.";
  return errors;
}

const fieldClass =
  "w-full rounded-[10px] bg-canvas px-4 py-3 text-[17px] text-primary-ink placeholder:text-quiet-dot focus:outline-none focus:ring-2 focus:ring-electric-blue";

export function Contact() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState<string>("");

  const update = (field: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    const { error } = await supabase.from("demo_requests").insert({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      restaurant_name: values.restaurant_name.trim(),
      message: values.message.trim(),
    });

    if (error) {
      setStatus("error");
      setServerError(
        "Something went wrong sending your request. Please try again."
      );
      return;
    }

    setStatus("success");
    setValues(initialState);
  };

  return (
    <>
      <PageHero
        eyebrow="Request a Demo"
        title="Let's get in touch."
        subtitle="Tell us about your restaurant and we'll show you what Chefgaa can do."
        bg="gradient"
      />

      <Section bg="gray">
        <div className="mx-auto max-w-[640px]">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center rounded-[28px] bg-paper p-10 text-center md:p-14"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-paper">
                <CheckIcon width={28} height={28} />
              </span>
              <h2 className="mt-6 font-sf-pro-display text-[28px] font-semibold md:text-[32px]">
                Thanks — we&apos;ve got your request.
              </h2>
              <p className="mt-3 max-w-[420px] text-[17px] leading-[1.47] text-mid-gray">
                A member of our team will reach out shortly to schedule your demo.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 text-[17px] text-link-blue hover:underline"
              >
                Submit another request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <Field label="Name" error={errors.name}>
                <input
                  type="text"
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your full name"
                  className={fieldClass}
                  autoComplete="name"
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@restaurant.com"
                  className={fieldClass}
                  autoComplete="email"
                />
              </Field>

              <Field label="Phone" error={errors.phone}>
                <input
                  type="tel"
                  value={values.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="Optional"
                  className={fieldClass}
                  autoComplete="tel"
                />
              </Field>

              <Field label="Restaurant Name" error={errors.restaurant_name}>
                <input
                  type="text"
                  value={values.restaurant_name}
                  onChange={(e) => update("restaurant_name", e.target.value)}
                  placeholder="Your restaurant"
                  className={fieldClass}
                  autoComplete="organization"
                />
              </Field>

              <Field label="Message" error={errors.message}>
                <textarea
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us what you're looking for (optional)"
                  rows={4}
                  className={`${fieldClass} resize-none`}
                />
              </Field>

              {serverError && (
                <p className="text-[14px] text-ember">{serverError}</p>
              )}

              <div className="pt-2">
                <PrimaryButton type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending…" : "Request a Demo"}
                </PrimaryButton>
              </div>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[14px] font-medium text-deep-gray">{label}</span>
      {children}
      {error && <span className="text-[14px] text-ember">{error}</span>}
    </label>
  );
}
