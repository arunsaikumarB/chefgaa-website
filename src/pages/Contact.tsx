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

type SubmitError = { message?: string; code?: string };

// Keep in sync with supabase/migrations/002_tighten_demo_requests.sql
const LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  restaurant_name: 200,
  message: 2000,
} as const;

const REQUEST_TIMEOUT_MS = 12_000;

const EMAIL_RATE_LIMIT_MESSAGE =
  "You have sent a few requests recently. Please wait a bit and try again.";
const GLOBAL_RATE_LIMIT_MESSAGE =
  "We cannot accept another request right now. Please try again later.";

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
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const restaurant = values.restaurant_name.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name)
    errors.name = `Name must be ${LIMITS.name} characters or fewer.`;

  if (!email) {
    errors.email = "Please enter your email.";
  } else if (email.length > LIMITS.email) {
    errors.email = `Email must be ${LIMITS.email} characters or fewer.`;
  } else if (!emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (phone.length > LIMITS.phone)
    errors.phone = `Phone must be ${LIMITS.phone} characters or fewer.`;

  if (!restaurant) errors.restaurant_name = "Please enter your restaurant name.";
  else if (restaurant.length > LIMITS.restaurant_name)
    errors.restaurant_name = `Restaurant name must be ${LIMITS.restaurant_name} characters or fewer.`;

  if (message.length > LIMITS.message)
    errors.message = `Message must be ${LIMITS.message} characters or fewer.`;

  return errors;
}

function looksLikeTimeout(error: SubmitError | null, thrown?: unknown): boolean {
  const thrownName = thrown instanceof Error ? thrown.name : "";
  const thrownMessage = thrown instanceof Error ? thrown.message : "";
  const text = `${thrownName} ${thrownMessage} ${error?.message ?? ""}`;
  return /AbortError|The user aborted a request|The operation was aborted|signal is aborted|statement timeout/i.test(
    text,
  );
}

function messageForSubmitError(error: SubmitError | null, thrown?: unknown): string {
  if (looksLikeTimeout(error, thrown)) {
    return "This is taking too long. Please check your connection and try again.";
  }

  const message = error?.message ?? "";
  if (
    error?.code === "P0001" &&
    (message === EMAIL_RATE_LIMIT_MESSAGE || message === GLOBAL_RATE_LIMIT_MESSAGE)
  ) {
    return message;
  }

  if (error?.code === "23514") {
    return "Some of the information doesn't look right. Please check the form and try again.";
  }

  return "Something went wrong sending your request. Please try again.";
}

const fieldClass =
  "w-full rounded-[10px] bg-canvas px-4 py-3 text-[17px] text-primary-ink placeholder:text-quiet-dot focus:outline-none focus:ring-2 focus:ring-electric-blue";

export function Contact() {
  const [values, setValues] = useState<FormState>(initialState);
  const [honeypot, setHoneypot] = useState("");
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

    // Bots that fill every field never reach Supabase. Show the same
    // success state so the trap is not obvious.
    if (honeypot.trim()) {
      setStatus("success");
      setValues(initialState);
      setHoneypot("");
      return;
    }

    setStatus("submitting");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const { error } = await supabase
        .from("demo_requests")
        .insert({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          restaurant_name: values.restaurant_name.trim(),
          message: values.message.trim(),
        })
        .abortSignal(controller.signal);

      if (error) {
        setStatus("error");
        setServerError(messageForSubmitError(error));
        return;
      }

      setStatus("success");
      setValues(initialState);
      setHoneypot("");
    } catch (err) {
      setStatus("error");
      setServerError(messageForSubmitError(null, err));
    } finally {
      window.clearTimeout(timer);
    }
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
              <div className="sr-only" aria-hidden="true">
                <label>
                  Fax
                  <input
                    type="text"
                    name="company_fax"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
              </div>

              <Field label="Name" error={errors.name}>
                <input
                  type="text"
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your full name"
                  className={fieldClass}
                  autoComplete="name"
                  maxLength={LIMITS.name}
                  required
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
                  maxLength={LIMITS.email}
                  required
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
                  maxLength={LIMITS.phone}
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
                  maxLength={LIMITS.restaurant_name}
                  required
                />
              </Field>

              <Field label="Message" error={errors.message}>
                <textarea
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us what you're looking for (optional)"
                  rows={4}
                  className={`${fieldClass} resize-none`}
                  maxLength={LIMITS.message}
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
