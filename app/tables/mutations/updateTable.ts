import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateTable = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateTable),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const table = await db.table.update({ where: { id }, data })

    return table
  }
)
