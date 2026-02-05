import { z } from 'zod';

/* ============================================
 * Enums
 * ============================================ */

export const MediaTypeEnum = z.enum([
    'video',
    'audio',
    'image',
    'document',
    'archive',
]);
export type MediaType = z.infer<typeof MediaTypeEnum>;

export const MediaStatusEnum = z.enum([
    'processing',
    'ready',
    'failed',
    'archived',
]);
export type MediaStatus = z.infer<typeof MediaStatusEnum>;

export const MediaVisibilityEnum = z.enum([
    'private',
    'internal',
    'published',
]);
export type MediaVisibility = z.infer<typeof MediaVisibilityEnum>;

export const ProcessingStageEnum = z.enum([
    'uploaded',
    'transcoding',
    'optimizing',
    'complete',
    'error',
]);
export type ProcessingStage = z.infer<typeof ProcessingStageEnum>;

export const MediaUploadStatusEnum = z.enum([
    'pending',
    'uploading',
    'processing',
    'complete',
    'failed',
]);
export type MediaUploadStatus = z.infer<typeof MediaUploadStatusEnum>;

export const MediaAuditActionEnum = z.enum([
    'file_uploaded',
    'file_deleted',
    'file_moved',
    'file_renamed',
    'file_visibility_changed',
    'file_published',
    'file_archived',
    'group_created',
    'group_updated',
    'group_deleted',
    'group_locked',
    'group_unlocked',
    'bulk_upload',
    'bulk_delete',
    'bulk_move',
]);
export type MediaAuditAction = z.infer<typeof MediaAuditActionEnum>;

export const BindingFilterEnum = z.enum([
    'all',
    'bound',
    'unbound',
]);
export type BindingFilter = z.infer<typeof BindingFilterEnum>;

/* ============================================
 * Core Entity Schemas
 * ============================================ */

export const MediaFileSchema = z.object({
    file_id: z.string(),
    tenant_id: z.string(),

    filename: z.string(),
    original_filename: z.string(),
    display_name: z.string(),
    description: z.string().nullable(),

    media_type: MediaTypeEnum,
    mime_type: z.string(),
    file_extension: z.string(),

    storage_path: z.string(),
    storage_bucket: z.string(),
    cdn_url: z.string().nullable(),
    thumbnail_url: z.string().nullable(),

    file_size_bytes: z.number(),
    duration_seconds: z.number().nullable(),
    width: z.number().nullable(),
    height: z.number().nullable(),
    bitrate: z.number().nullable(),

    status: MediaStatusEnum,
    processing_stage: ProcessingStageEnum,
    processing_progress: z.number(),
    processing_error: z.string().nullable(),

    visibility: MediaVisibilityEnum,
    is_drm_protected: z.boolean(),
    access_count: z.number(),

    group_ids: z.array(z.string()),

    uploaded_by: z.string(),
    uploaded_by_name: z.string(),
    uploaded_at: z.string(),
    updated_at: z.string(),

    metadata: z.record(z.string(), z.unknown()).nullable(),
    tags: z.array(z.string()),
});
export type MediaFile = z.infer<typeof MediaFileSchema>;

export const MediaGroupSchema = z.object({
    group_id: z.string(),
    tenant_id: z.string(),

    name: z.string(),
    description: z.string().nullable(),
    slug: z.string(),

    allowed_types: z.array(MediaTypeEnum),
    max_file_size_mb: z.number().nullable(),

    file_count: z.number(),
    total_size_bytes: z.number(),

    is_locked: z.boolean(),
    is_archived: z.boolean(),

    created_by: z.string(),
    created_by_name: z.string(),
    created_at: z.string(),
    updated_at: z.string(),

    metadata: z.record(z.string(), z.unknown()).nullable(),
});
export type MediaGroup = z.infer<typeof MediaGroupSchema>;

export const MediaUploadSchema = z.object({
    upload_id: z.string(),
    filename: z.string(),
    file_size_bytes: z.number(),
    media_type: MediaTypeEnum,
    status: MediaUploadStatusEnum,
    progress: z.number(),
    error: z.string().nullable(),
    started_at: z.string(),
    file: z.instanceof(File).optional(),
});
export type MediaUpload = z.infer<typeof MediaUploadSchema>;

export const MediaAuditEntrySchema = z.object({
    audit_id: z.string(),
    file_id: z.string().nullable(),
    group_id: z.string().nullable(),
    action: MediaAuditActionEnum,

    actor_id: z.string(),
    actor_name: z.string(),

    details: z.record(z.string(), z.unknown()),
    timestamp: z.string(),
});
export type MediaAuditEntry = z.infer<typeof MediaAuditEntrySchema>;

/* ============================================
 * View Model Schemas
 * ============================================ */

export const MediaFileListItemSchema = z.object({
    file_id: z.string(),
    display_name: z.string(),
    filename: z.string(),
    media_type: MediaTypeEnum,
    mime_type: z.string(),
    file_size_bytes: z.number(),
    duration_seconds: z.number().nullable(),
    status: MediaStatusEnum,
    visibility: MediaVisibilityEnum,
    thumbnail_url: z.string().nullable(),
    group_ids: z.array(z.string()),
    uploaded_at: z.string(),
    uploaded_by_name: z.string(),
    tags: z.array(z.string()),

    bound_version_ids: z.array(z.string()),
    binding_count: z.number(),
    is_bound: z.boolean(),
});
export type MediaFileListItem = z.infer<
    typeof MediaFileListItemSchema
>;

export const MediaGroupListItemSchema = z.object({
    group_id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    allowed_types: z.array(MediaTypeEnum),
    file_count: z.number(),
    total_size_bytes: z.number(),
    is_locked: z.boolean(),
    is_archived: z.boolean(),
    created_at: z.string(),
});
export type MediaGroupListItem = z.infer<
    typeof MediaGroupListItemSchema
>;

/* ============================================
 * Draft / Form Schemas
 * ============================================ */

export const MediaGroupDraftSchema = z.object({
    name: z.string(),
    description: z.string(),
    allowed_types: z.array(MediaTypeEnum),
    max_file_size_mb: z.number().nullable(),
});
export type MediaGroupDraft = z.infer<
    typeof MediaGroupDraftSchema
>;

export const MediaFileDraftSchema = z.object({
    display_name: z.string(),
    description: z.string(),
    visibility: MediaVisibilityEnum,
    group_ids: z.array(z.string()),
    tags: z.array(z.string()),
});
export type MediaFileDraft = z.infer<
    typeof MediaFileDraftSchema
>;

/* ============================================
 * Stats Schemas
 * ============================================ */

export const MediaStatsSchema = z.object({
    total_files: z.number(),
    total_size_bytes: z.number(),
    files_by_type: z.record(MediaTypeEnum, z.number()),
    files_by_status: z.record(MediaStatusEnum, z.number()),
    recent_uploads: z.number(),
    storage_limit_bytes: z.number(),
    storage_used_percent: z.number(),
    bound_files: z.number(),
    unbound_files: z.number(),
});
export type MediaStats = z.infer<typeof MediaStatsSchema>;
