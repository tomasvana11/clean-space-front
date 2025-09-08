/*
// app/api/create-payment-intent/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'eur', orderData } = await request.json();

    // Validace částky
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Vytvoření Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe očekává částku v centech
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customerEmail: orderData?.email || '',
        customerName: orderData?.name || '',
        totalPrice: amount.toString(),
        rooms: orderData?.rooms?.toString() || '',
        bathrooms: orderData?.bathrooms?.toString() || '',
        property: orderData?.property || '',
        date: orderData?.date || '',
        timeSlot: orderData?.timeSlot || '',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { 
        error: 'Error creating payment intent',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
*/

// app/api/create-payment-intent/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'eur', orderData } = await request.json();

    // Validace částky
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Vytvoření Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe očekává částku v centech
      currency,
      payment_method_types: ['card'], // Jen karty, Apple Pay se přidá automaticky
      metadata: {
        customerEmail: orderData?.email || '',
        customerName: orderData?.name || '',
        totalPrice: amount.toString(),
        rooms: orderData?.rooms?.toString() || '',
        bathrooms: orderData?.bathrooms?.toString() || '',
        property: orderData?.property || '',
        date: orderData?.date || '',
        timeSlot: orderData?.timeSlot || '',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { 
        error: 'Error creating payment intent',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}