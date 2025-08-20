"use client";

import { useState } from "react";
import { CareerFormProps, CareerFormState } from "./CareerForm.types";
import { submitCareerForm } from "@/lib/career-api"; // Změněno
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { t } from "@/utils/i18n";

// Odstraň starý submitCareerForm a použij import

export const CareerForm = ({ locale, className = "" }: CareerFormProps) => {
  const [state, setState] = useState<CareerFormState>({
    data: {
      name: "",
      email: "",
      phone: "",
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
      await submitCareerForm(state.data);
      setState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        data: { name: "", email: "", phone: "" }, // Reset form
      }));

      // Reset success message after 5 seconds
      setTimeout(() => {
        setState((prev) => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: t(locale, "forms.errorMessage"),
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
      {state.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-sm">
          {t(locale, "forms.successMessage")}
        </div>
      )}

      {state.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-sm">
          {state.error}
        </div>
      )}

      <Input
        name="name"
        type="text"
        label={t(locale, "careerForm.name")}
        required
        value={state.data.name}
        variant="large"
        onChange={handleInputChange}
        disabled={state.loading}
        placeholder={t(locale, "careerForm.namePlaceholder")}
      />

      <Input
        name="email"
        type="email"
        label={t(locale, "careerForm.email")}
        required
        value={state.data.email}
        variant="large"
        onChange={handleInputChange}
        disabled={state.loading}
        placeholder={t(locale, "careerForm.emailPlaceholder")}
      />

      <Input
        name="phone"
        type="tel"
        label={t(locale, "careerForm.phone")}
        required
        value={state.data.phone}
        variant="large"
        onChange={handleInputChange}
        disabled={state.loading}
        placeholder={t(locale, "careerForm.phonePlaceholder")}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={state.loading}
        disabled={state.loading}
        className="text-white"
      >
        {state.loading
          ? t(locale, "forms.submitting")
          : t(locale, "careerForm.submitButton")}
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
