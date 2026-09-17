import { Product, InquiryItem } from '../types';
import { BUSINESS_INFO } from '../data/products';

export function getProductWhatsAppUrl(product: Product, variant?: string, quantity: number = 1): string {
  const variantText = variant ? ` (Variant/Flavor: ${variant})` : '';
  const message = `Hello ${BUSINESS_INFO.name}, I would like to inquire/order:
• Product: ${product.name}
• Brand: ${product.brand}${variantText}
• Quantity: ${quantity}

Please let me know availability and delivery details. Thank you!`;

  return `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppUrl(subject?: string): string {
  const text = subject
    ? `Hello ${BUSINESS_INFO.name}, I have a question about: ${subject}`
    : `Hello ${BUSINESS_INFO.name}, I am browsing your catalog and would like to inquire about trending products.`;
  return `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
}

export function getInquiryListWhatsAppUrl(items: InquiryItem[], note?: string): string {
  if (items.length === 0) {
    return getGeneralWhatsAppUrl();
  }

  const itemsList = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name} [Brand: ${item.product.brand}]${
          item.selectedVariant ? ` (${item.selectedVariant})` : ''
        } x ${item.quantity}`
    )
    .join('\n');

  const message = `Hello ${BUSINESS_INFO.name}, I would like to place an inquiry for the following items:

${itemsList}

${note ? `Note: ${note}\n` : ''}Please share availability and dispatch details for India delivery. Thank you!`;

  return `https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export function getCallUrl(): string {
  return `tel:${BUSINESS_INFO.phoneRaw}`;
}
