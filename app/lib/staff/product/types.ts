import { z } from 'zod';

/* ===========================
 * Enums
 * =========================== */

export const ProductTypeEnum = z.enum([
  'digital_course',
  'ebook',
  'membership',
  'software',
  'service',
  'bundle',
]);
export type ProductType = z.infer<typeof ProductTypeEnum>;

export const VisibilityStateEnum = z.enum([
  'draft',
  'private',
  'unlisted',
  'public',
]);
export type VisibilityState = z.infer<typeof VisibilityStateEnum>;

export const ComplianceFlagEnum = z.enum([
  'requires_age_verification',
  'contains_adult_content',
  'requires_legal_disclaimer',
  'region_restricted',
  'tax_exempt',
]);
export type ComplianceFlag = z.infer<typeof ComplianceFlagEnum>;

export const ClassificationLevelEnum = z.enum([
  'primary',
  'secondary',
  'tertiary',
]);
export type ClassificationLevel = z.infer<typeof ClassificationLevelEnum>;

/* ===========================
 * Complex Types
 * =========================== */

export const ProductTagSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string().optional(),
});
export type ProductTag = z.infer<typeof ProductTagSchema>;

export const MarketSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  region: z.string(),
});
export type Market = z.infer<typeof MarketSchema>;

export const InternalClassificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: ClassificationLevelEnum,
});
export type InternalClassification = z.infer<
  typeof InternalClassificationSchema
>;

/* ===========================
 * Product Draft
 * =========================== */

export const ProductDraftSchema = z.object({
  // Core Identity
  internalName: z.string(),
  publicName: z.string(),
  productType: ProductTypeEnum.nullable(),
  visibility: VisibilityStateEnum,
  summary: z.string(),

  // Classifications
  tags: z.array(ProductTagSchema),
  markets: z.array(MarketSchema),
  classifications: z.array(InternalClassificationSchema),

  // Secondary Attributes
  internalNotes: z.string(),
  complianceFlags: z.array(ComplianceFlagEnum),

  // Advanced
  customMetadata: z.record(z.string(), z.unknown()),
});
export type ProductDraft = z.infer<typeof ProductDraftSchema>;

/* ===========================
 * Illustrated boilerplate-type
 * =========================== */

export const AnySampleEnum = z.enum(['ACTION_PAYLOAD']);

export const AnySampleSchema = z.object({
  intent: z.string(),
  body: z.object({
    command: z.any(),
  }),
});
export type AnySample = z.infer<typeof AnySampleSchema>;
