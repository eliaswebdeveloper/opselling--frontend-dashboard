import { z } from 'zod';

/* ============================================
 * Enums
 * ============================================ */

export const StructureCategoryEnum = z.enum([
    'educational',
    'entertainment',
    'service',
    'membership',
    'resource',
]);
export type StructureCategory = z.infer<typeof StructureCategoryEnum>;

export const StructureNatureEnum = z.enum([
    'online_course',
    'ebook',
    'audiobook',
    'membership',
    'subscription',
    'mentorship',
    'coaching',
    'workshop',
    'webinar',
    'podcast',
    'video_series',
    'software_access',
    'community_access',
    'downloadable_bundle',
    'live_event',
    'hybrid',
]);
export type StructureNature = z.infer<typeof StructureNatureEnum>;

export const StructureStatusEnum = z.enum([
    'draft',
    'active',
    'deprecated',
    'archived',
]);
export type StructureStatus = z.infer<typeof StructureStatusEnum>;

export const DeliveryMethodEnum = z.enum([
    'streaming',
    'download',
    'scheduled_access',
    'live_delivery',
    'drip_content',
    'instant_access',
    'hybrid',
]);
export type DeliveryMethod = z.infer<typeof DeliveryMethodEnum>;

export const AccessModelEnum = z.enum([
    'lifetime',
    'time_limited',
    'subscription',
    'pay_per_view',
    'metered',
]);
export type AccessModel = z.infer<typeof AccessModelEnum>;

/* ============================================
 * Core Entity Schemas
 * ============================================ */

export const ProductStructureSchema = z.object({
    structure_id: z.string(),
    tenant_id: z.string(),

    internal_code: z.string(),
    display_name: z.string(),
    description: z.string().nullable(),

    category: StructureCategoryEnum,
    nature: StructureNatureEnum,

    status: StructureStatusEnum,
    version: z.number(),

    delivery_method: DeliveryMethodEnum,
    access_model: AccessModelEnum,
    default_access_duration_days: z.number().nullable(),

    requires_modules: z.boolean(),
    min_modules: z.number().nullable(),
    max_modules: z.number().nullable(),
    allowed_unit_types: z.array(z.string()),
    requires_completion_tracking: z.boolean(),
    supports_certificates: z.boolean(),

    allows_bundling: z.boolean(),
    allows_affiliates: z.boolean(),
    requires_approval: z.boolean(),
    max_entitlements_per_product: z.number().nullable(),

    products_count: z.number(),
    active_products_count: z.number(),

    created_at: z.string(),
    updated_at: z.string(),
    created_by: z.string(),
    updated_by: z.string().nullable(),

    metadata: z.record(z.string(), z.unknown()).nullable(),
});
export type ProductStructure = z.infer<typeof ProductStructureSchema>;

export const ProductStructureAssignmentSchema = z.object({
    assignment_id: z.string(),
    structure_id: z.string(),
    product_id: z.string(),

    assigned_at: z.string(),
    assigned_by: z.string(),

    access_duration_override: z.number().nullable(),
    delivery_method_override: DeliveryMethodEnum.nullable(),

    is_active: z.boolean(),
    deactivated_at: z.string().nullable(),
    deactivated_by: z.string().nullable(),
    deactivation_reason: z.string().nullable(),
});
export type ProductStructureAssignment = z.infer<
    typeof ProductStructureAssignmentSchema
>;

export const StructureTemplateSchema = z.object({
    template_id: z.string(),
    name: z.string(),
    description: z.string(),
    category: StructureCategoryEnum,
    nature: StructureNatureEnum,
    suggested_delivery_method: DeliveryMethodEnum,
    suggested_access_model: AccessModelEnum,
    suggested_unit_types: z.array(z.string()),
    is_system_template: z.boolean(),
});
export type StructureTemplate = z.infer<typeof StructureTemplateSchema>;

/* ============================================
 * Draft / Form Schemas
 * ============================================ */

export const ProductStructureDraftSchema = z.object({
    internal_code: z.string(),
    display_name: z.string(),
    description: z.string(),

    category: StructureCategoryEnum.nullable(),
    nature: StructureNatureEnum.nullable(),
    delivery_method: DeliveryMethodEnum.nullable(),
    access_model: AccessModelEnum.nullable(),
    default_access_duration_days: z.number().nullable(),

    requires_modules: z.boolean(),
    min_modules: z.number().nullable(),
    max_modules: z.number().nullable(),
    allowed_unit_types: z.array(z.string()),
    requires_completion_tracking: z.boolean(),
    supports_certificates: z.boolean(),

    allows_bundling: z.boolean(),
    allows_affiliates: z.boolean(),
    requires_approval: z.boolean(),
    max_entitlements_per_product: z.number().nullable(),

    metadata: z.record(z.string(), z.unknown()),
});
export type ProductStructureDraft = z.infer<
    typeof ProductStructureDraftSchema
>;

/* ============================================
 * View Model Schemas
 * ============================================ */

export const ProductStructureListItemSchema = z.object({
    structure_id: z.string(),
    internal_code: z.string(),
    display_name: z.string(),
    category: StructureCategoryEnum,
    nature: StructureNatureEnum,
    status: StructureStatusEnum,
    version: z.number(),
    products_count: z.number(),
    active_products_count: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});
export type ProductStructureListItem = z.infer<
    typeof ProductStructureListItemSchema
>;

export const AssignableStructureSchema = z.object({
    structure_id: z.string(),
    internal_code: z.string(),
    display_name: z.string(),
    category: StructureCategoryEnum,
    nature: StructureNatureEnum,
    delivery_method: DeliveryMethodEnum,
    access_model: AccessModelEnum,
});
export type AssignableStructure = z.infer<
    typeof AssignableStructureSchema
>;
