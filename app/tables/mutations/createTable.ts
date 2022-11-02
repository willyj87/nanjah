import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateTable = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTable), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const table = await db.table.create({ data: input })

  return table
})
