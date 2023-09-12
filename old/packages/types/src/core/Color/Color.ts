import { z } from 'zod';

/** RGB values should be mapped 0 -> 1 instead of 0 -> 255 */
export const RGBNumberSchema = z.number().min(0).max(1);

export const RGBSchema = z.tuple([RGBNumberSchema, RGBNumberSchema, RGBNumberSchema]);
export const RGBASchema = z.tuple([RGBNumberSchema, RGBNumberSchema, RGBNumberSchema, RGBNumberSchema]);
