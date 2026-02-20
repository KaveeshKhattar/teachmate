import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL ?? process.env.DIRECT_URL;

if (!connectionString) {
  throw new Error(
    "Missing DATABASE_URL (or DIRECT_URL fallback) environment variable for Prisma runtime client."
  );
}

const poolMaxRaw = Number(process.env.PGPOOL_MAX ?? "1");
const poolMax = Number.isFinite(poolMaxRaw) && poolMaxRaw > 0 ? poolMaxRaw : 1;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString,
    max: poolMax,
  });

  return new PrismaClient({ adapter });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
