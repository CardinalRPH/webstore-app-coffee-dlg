import z from "zod";

const envSchema = z.object({
    ENV: z
        .union([
            z.literal('development'),
            z.literal('testing'),
            z.literal('production'),
        ])
        .default('development'),
    DATABASE_URL: z.url()
})

const processEnv = envSchema.parse(process.env)

export default processEnv