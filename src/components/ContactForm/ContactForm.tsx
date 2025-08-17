"use client";

import { useState } from "react";
import {
  ContactFormProps,
  ContactFormState,
  ContactFormData,
} from "./ContactForm.types";
import { submitContactForm } from "@/lib/contact-api";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { t } from "@/utils/i18n";

export const ContactForm = ({ locale, className = "" }: ContactFormProps) => {
  const [state, setState] = useState<ContactFormState>({
    data: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    loading: false,
    success: false,
    error: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      data: { ...prev.data, [name]: value },
      error: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await submitContactForm(state.data);
      setState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        data: { name: "", email: "", phone: "", message: "" },
      }));

      // Reset success message after 20 seconds
      setTimeout(() => {
        setState((prev) => ({ ...prev, success: false }));
      }, 20000);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: t(locale, "contactForm.errorMessage"),
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
      {state.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-sm">
          {t(locale, "contactForm.successMessage")}
        </div>
      )}

      {state.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-sm">
          {state.error}
        </div>
      )}

      {/* Name field */}
      <Input
        name="name"
        type="text"
        label={t(locale, "contactForm.name")}
        required
        value={state.data.name}
        variant="large"
        onChange={handleInputChange}
        disabled={state.loading}
        placeholder={t(locale, "contactForm.namePlaceholder")}
      />

      {/* Email field */}
      <Input
        name="email"
        type="email"
        label={t(locale, "contactForm.email")}
        required
        value={state.data.email}
        variant="large"
        onChange={handleInputChange}
        disabled={state.loading}
        placeholder={t(locale, "contactForm.emailPlaceholder")}
      />

      {/* Phone field */}
      <Input
        name="phone"
        type="tel"
        label={t(locale, "contactForm.phone")}
        value={state.data.phone}
        variant="large"
        onChange={handleInputChange}
        disabled={state.loading}
        placeholder={t(locale, "contactForm.phonePlaceholder")}
      />

      {/* Message field */}
      <Input
        name="message"
        type="textarea"
        label={t(locale, "contactForm.message")}
        required
        value={state.data.message}
        variant="large"
        onChange={handleInputChange}
        disabled={state.loading}
        placeholder={t(locale, "contactForm.messagePlaceholder")}
        rows={5}
      />

      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={state.loading}
        disabled={state.loading}
      >
        {state.loading
          ? t(locale, "contactForm.submitting")
          : t(locale, "contactForm.submitButton")}
      </Button>
      <div>
        <span className="text-[#FF0800] mr-1">*</span>
        <span className="text-gray-700">
          {t(locale, "contactForm.requiredHelper")}
        </span>
      </div>
    </form>
  );
};
