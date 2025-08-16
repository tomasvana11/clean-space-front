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
};