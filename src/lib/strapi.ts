/*
import axios from 'axios';
import { StrapiResponse } from './types/strapi';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const apiToken = process.env.STRAPI_API_TOKEN;

export const strapiApi = axios.create({
  baseURL: `${strapiUrl}/api`,
  headers: {
    'Authorization': apiToken ? `Bearer ${apiToken}` : undefined,
    'Content-Type': 'application/json',
  },
});

export const getSingleType = async <T>(
  type: string, 
  locale: string = 'en'
): Promise<T | null> => {
  try {
    const response = await strapiApi.get<StrapiResponse<T>>(
      `/${type}?locale=${locale}`
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return null;
  }
};*/

import axios from "axios";
import { StrapiResponse } from "./types/strapi";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const apiToken = process.env.STRAPI_API_TOKEN;

export const strapiApi = axios.create({
  baseURL: `${strapiUrl}/api`,
  headers: {
    Authorization: apiToken ? `Bearer ${apiToken}` : undefined,
    "Content-Type": "application/json",
  },
});

export const getSingleType = async <T>(
  type: string,
  locale: string = "en"
): Promise<T | null> => {
  try {
    const response = await strapiApi.get<StrapiResponse<T>>(
      `/${type}?locale=${locale}`
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return null;
  }
};

// Nahraď svou getStrapiData funkci v lib/strapi.ts touto:

export const getStrapiData = async <T>(
  type: string,
  locale: string = "en",
  params?: { populate?: string; filters?: any }
): Promise<T[] | null> => {
  // <-- změna: T[] místo T
  try {
    let url = `/${type}?locale=${locale}`;

    if (params?.populate) {
      url += `&populate=${params.populate}`;
    }

    if (params?.filters) {
      Object.keys(params.filters).forEach((key) => {
        url += `&filters[${key}]=${params.filters[key]}`;
      });
    }

    console.log("🌐 Fetching:", url);
    const response = await strapiApi.get<StrapiResponse<T[]>>(url); // <-- změna: T[]
    console.log("📥 Raw response:", response.data);

    // Vrať jen data.data část
    return response.data.data;
  } catch (error) {
    console.error(`❌ Error fetching ${type}:`, error);
    return null;
  }
};
