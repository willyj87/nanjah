import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetTablesInput
  extends Pick<Prisma.TableFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }: GetTablesInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: tables,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.table.count({ where }),
    query: (paginateArgs) => db.table.findMany({ ...paginateArgs, where, orderBy }),
  })

  return {
    tables,
    nextPage,
    hasMore,
    count,
  }
})
