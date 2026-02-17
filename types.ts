
// Fix: Added React import to resolve missing namespace for ReactNode
import React from 'react';

export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  colSpan?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

export interface CartItem {
  name: string;
  price: number; // Preço numérico para cálculos
  formattedPrice: string; // Preço original formatado (R$ ...)
  image: string;
  quantity: number;
  stuffedRim?: string; // Borda Recheada
}
