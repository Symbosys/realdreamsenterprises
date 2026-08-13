import { prisma } from "@/config/prisma";

export async function getAllWebConfig(): Promise<Record<string, string>> {
  const rows = await prisma.webConfig.findMany();
  const map: Record<string, string> = {};
  for (const row of rows) {
    map[row.key] = row.value;
  }
  return map;
}

export async function getWebConfigByKey(key: string): Promise<string | null> {
  const row = await prisma.webConfig.findUnique({ where: { key } });
  return row?.value ?? null;
}

export async function bulkUpsertWebConfig(entries: { key: string; value: string }[]) {
  // Use Promise.all to run upserts concurrently and bypass transaction timeout limits in production
  const results = await Promise.all(
    entries.map((entry) =>
      prisma.webConfig.upsert({
        where: { key: entry.key },
        update: { value: entry.value },
        create: { key: entry.key, value: entry.value },
      })
    )
  );

  return { success: true, count: results.length };
}
