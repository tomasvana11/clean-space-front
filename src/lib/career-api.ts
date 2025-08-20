import { CareerFormData } from "@/components/CareerForm/CareerForm.types";

export const submitCareerForm = async (data: CareerFormData) => {
  try {
    const response = await fetch("/api/career", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit career application");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting career form:", error);
    throw error;
  }
};
