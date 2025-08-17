import { strapiApi } from "./strapi";
import { ContactFormData } from "@/components/ContactForm/ContactForm.types";

export const submitContactForm = async (data: ContactFormData) => {
  try {
    const response = await strapiApi.post("/contact-forms", {
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};
