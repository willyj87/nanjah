import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getTables from "app/tables/queries/getTables"

const ITEMS_PER_PAGE = 100

export const TablesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ tables, hasMore }] = usePaginatedQuery(getTables, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {tables.map((table) => (
          <li key={table.id}>
            <Link href={Routes.ShowTablePage({ tableId: table.id })}>
              <a>{table.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TablesPage = () => {
  return (
    <Layout>
      <Head>
        <title>Tables</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTablePage()}>
            <a>Create Table</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TablesList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default TablesPage
