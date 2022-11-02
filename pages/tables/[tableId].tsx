import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getTable from "app/tables/queries/getTable"
import deleteTable from "app/tables/mutations/deleteTable"

export const Table = () => {
  const router = useRouter()
  const tableId = useParam("tableId", "number")
  const [deleteTableMutation] = useMutation(deleteTable)
  const [table] = useQuery(getTable, { id: tableId })

  return (
    <>
      <Head>
        <title>Table {table.id}</title>
      </Head>

      <div>
        <h1>Table {table.id}</h1>
        <pre>{JSON.stringify(table, null, 2)}</pre>

        <Link href={Routes.EditTablePage({ tableId: table.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTableMutation({ id: table.id })
              await router.push(Routes.TablesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowTablePage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TablesPage()}>
          <a>Tables</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Table />
      </Suspense>
    </div>
  )
}

ShowTablePage.authenticate = true
ShowTablePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTablePage
