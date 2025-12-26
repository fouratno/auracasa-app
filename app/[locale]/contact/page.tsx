"use client";

import { useState } from "react";
import Link from "next/link";

type InquiryType = "collaboration" | "press" | "partnership" | "general";

const faqs = [
  {
    question: "Do you offer traditional interior design services?",
    answer: "No. Auracasa is a conceptual design studio focused on creating imaginary interiors and visual narratives. We don't provide construction consultation, furniture sales, or traditional interior design services.",
  },
  {
    question: "What types of collaborations are you interested in?",
    answer: "We collaborate with brands, design studios, and editorial platforms on projects exploring future interiors, brand world-building, and atmospheric storytelling. We're particularly interested in work that bridges imagination and reality.",
  },
  {
    question: "How do affiliate partnerships work?",
    answer: "We feature carefully selected products in our projects and journal articles. If you're a brand interested in affiliate partnerships, please select 'Brand Partnership' in the contact form and tell us about your products.",
  },
  {
    question: "Can I license your images?",
    answer: "Yes. For press inquiries and image licensing, please select 'Press & Media' in the contact form. We'll send you our press kit and licensing information.",
  },
  {
    question: "How long does it take to hear back?",
    answer: "We typically respond to inquiries within 2-3 business days. For urgent press requests, please mention this in your message.",
  },
];

export default function Contact() {
  const [step, setStep] = useState(1);
  const [inquiryType, setInquiryType] = useState<InquiryType | "">("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    file: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
    if (!formId) {
      setIsSubmitting(false);
      setSubmitError("Form configuration is missing. Please try again later.");
      return;
    }

    const formElement = e.currentTarget as HTMLFormElement;
    const submission = new FormData(formElement);
    submission.append("inquiryType", inquiryType);

    if (formData.file) {
      submission.set("attachment", formData.file);
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: submission,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const payload = await response.json().catch(() => null);
        const errorMessage =
          payload?.errors?.[0]?.message ||
          payload?.error ||
          "Something went wrong. Please try again.";
        setSubmitError(errorMessage);
      }
    } catch (error) {
      setSubmitError("Unable to send your message right now. Please try again later.");
    }

    setIsSubmitting(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  if (isSubmitted) {
    return (
      <div className="container py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-serif font-semibold mb-4">Message Sent!</h1>
          <p className="text-lg text-text-muted dark:text-text-dark-muted mb-8">
            Thank you for reaching out. We'll review your inquiry and respond within 2-3 business days.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn btn-primary">
              Back to Home
            </Link>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
                setInquiryType("");
                setSubmitError(null);
                setFormData({
                  name: "",
                  email: "",
                  company: "",
                  website: "",
                  message: "",
                  file: null,
                });
              }}
              className="btn btn-outline"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
          Work with us
        </h1>
        <p className="text-lg text-text-muted dark:text-text-dark-muted">
          Auracasa collaborates with brands, design studios, and editorial platforms
          that value conceptual thinking and atmospheric storytelling.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="card p-8">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        step >= s
                          ? "bg-accent-500 text-white"
                          : "bg-surface-elevated dark:bg-surface-dark-elevated text-text-muted dark:text-text-dark-muted"
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 transition-colors ${
                          step > s
                            ? "bg-accent-500"
                            : "bg-surface-elevated dark:bg-surface-dark-elevated"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-text-muted dark:text-text-dark-muted">
                <span>Inquiry Type</span>
                <span>Details</span>
                <span>Submit</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Inquiry Type */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-serif font-semibold mb-4">
                      What brings you here?
                    </h2>
                    <p className="text-text-muted dark:text-text-dark-muted mb-6">
                      Select the type of inquiry that best describes your needs
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        value: "collaboration" as InquiryType,
                        icon: (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        ),
                        title: "Creative Collaboration",
                        description: "Design projects, brand work, editorial features",
                      },
                      {
                        value: "press" as InquiryType,
                        icon: (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        ),
                        title: "Press & Media",
                        description: "Press kit, image licensing, interviews",
                      },
                      {
                        value: "partnership" as InquiryType,
                        icon: (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        ),
                        title: "Brand Partnership",
                        description: "Affiliate programs, product features, sponsorships",
                      },
                      {
                        value: "general" as InquiryType,
                        icon: (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        ),
                        title: "General Inquiry",
                        description: "Questions, feedback, other topics",
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setInquiryType(option.value)}
                        className={`p-6 rounded-xl border-2 text-left transition-all ${
                          inquiryType === option.value
                            ? "border-accent-500 bg-accent-50 dark:bg-accent-900/20"
                            : "border-neutral-200 dark:border-border-dark hover:border-accent-300"
                        }`}
                      >
                        <div className={`mb-3 ${inquiryType === option.value ? "text-accent-500" : "text-text-muted dark:text-text-dark-muted"}`}>
                          {option.icon}
                        </div>
                        <h3 className="font-semibold mb-1">{option.title}</h3>
                        <p className="text-sm text-text-muted dark:text-text-dark-muted">
                          {option.description}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!inquiryType}
                      className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-serif font-semibold mb-2">
                      Tell us about your project
                    </h2>
                    <p className="text-text-muted dark:text-text-dark-muted">
                      The more details you provide, the better we can help
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Name <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input w-full"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email <span className="text-error">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input w-full"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="input w-full"
                        placeholder="Optional"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="input w-full"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message <span className="text-error">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input w-full"
                      placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                    />
                  </div>

                  {inquiryType === "partnership" && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Attach File (Optional)
                      </label>
                      <div className="border-2 border-dashed border-neutral-300 dark:border-border-dark rounded-xl p-6 text-center">
                        <input
                          type="file"
                          name="attachment"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <svg className="w-12 h-12 mx-auto mb-3 text-text-muted dark:text-text-dark-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-sm text-text-muted dark:text-text-dark-muted">
                            {formData.file ? formData.file.name : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-text-muted dark:text-text-dark-muted mt-1">
                            PDF, DOC, PPT (max 10MB)
                          </p>
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn btn-ghost"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="btn btn-primary"
                    >
                      Continue
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="text-2xl font-serif font-semibold mb-2">
                      Review your inquiry
                    </h2>
                    <p className="text-text-muted dark:text-text-dark-muted">
                      Please review your information before submitting
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-surface-elevated dark:bg-surface-dark-elevated">
                      <div className="text-sm text-text-muted dark:text-text-dark-muted mb-1">Inquiry Type</div>
                      <div className="font-medium capitalize">{inquiryType?.replace("-", " ")}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-elevated dark:bg-surface-dark-elevated">
                      <div className="text-sm text-text-muted dark:text-text-dark-muted mb-1">Contact Information</div>
                      <div className="space-y-1">
                        <div><strong>Name:</strong> {formData.name}</div>
                        <div><strong>Email:</strong> {formData.email}</div>
                        {formData.company && <div><strong>Company:</strong> {formData.company}</div>}
                        {formData.website && <div><strong>Website:</strong> {formData.website}</div>}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-elevated dark:bg-surface-dark-elevated">
                      <div className="text-sm text-text-muted dark:text-text-dark-muted mb-1">Message</div>
                      <div className="whitespace-pre-wrap">{formData.message}</div>
                    </div>

                    {formData.file && (
                      <div className="p-4 rounded-xl bg-surface-elevated dark:bg-surface-dark-elevated">
                        <div className="text-sm text-text-muted dark:text-text-dark-muted mb-1">Attachment</div>
                        <div>{formData.file.name}</div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-surface-elevated dark:bg-surface-dark-elevated border border-neutral-200 dark:border-border-dark">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required className="mt-1" />
                      <span className="text-sm">
                        I agree to the{" "}
                        <Link href="/legal/privacy" className="text-accent-500 hover:underline">
                          privacy policy
                        </Link>{" "}
                        and understand that my information will be used to respond to my inquiry.
                      </span>
                    </label>
                  </div>

                  {submitError && (
                    <div className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
                      {submitError}
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn btn-ghost"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Honeypot */}
              <input
                type="text"
                name="_gotcha"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* FAQ */}
          <div className="card p-6">
            <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-neutral-200 dark:border-border-dark last:border-0 pb-3 last:pb-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-start justify-between gap-3 text-left"
                  >
                    <span className="font-medium text-sm">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFaq === index && (
                    <p className="mt-2 text-sm text-text-muted dark:text-text-dark-muted animate-fade-in">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="card p-6">
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-elevated dark:hover:bg-surface-dark-elevated transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-sm">Instagram</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-elevated dark:hover:bg-surface-dark-elevated transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm">Pinterest</span>
              </a>
            </div>
          </div>

          {/* Press Kit */}
          <div className="card p-6 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 border-0">
            <h3 className="font-semibold mb-2">Press Kit</h3>
            <p className="text-sm text-text-muted dark:text-text-dark-muted mb-4">
              Download our press kit with high-res images, brand assets, and company information.
            </p>
            <button className="btn btn-outline w-full">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Press Kit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
