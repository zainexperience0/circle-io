import { communityType } from "@prisma/client";
import { z } from "zod";


export const communitySchema = z.object({
    name: z.string().min(1, "Community name is required"),
    url: z.string().min(1, "URL is required"),
    type: z.enum([communityType.PRIVATE, communityType.PUBLIC]),
    logo: z.string().min(1, "logo is required").optional(),
    coverImage: z.string().min(1, "Cover Image is required").optional(),
    icon: z.string().min(1, "Icon is required").optional(),
    inviteCode: z.string().min(1, "Invite Code is required").uuid(),
    enableFeed: z.boolean().default(true),
    enableGettingStarted: z.boolean().default(true),
  });