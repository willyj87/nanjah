import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteTable = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteTable), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const table = await db.table.deleteMany({ where: { id } })

  return table
})
