import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getTable from "app/tables/queries/getTable"
import updateTable from "app/tables/mutations/updateTable"
import { TableForm, FORM_ERROR } from "app/tables/components/TableForm"

export const EditTable = () => {
  const router = useRouter()
  const tableId = useParam("tableId", "number")
  const [table, { setQueryData }] = useQuery(
    getTable,
    { id: tableId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTableMutation] = useMutation(updateTable)

  return (
    <>
      <Head>
        <title>Edit Table {table.id}</title>
      </Head>

      <div>
        <h1>Edit Table {table.id}</h1>
        <pre>{JSON.stringify(table, null, 2)}</pre>

        <TableForm
          submitText="Update Table"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTable}
          initialValues={table}
          onSubmit={async (values) => {
            try {
              const updated = await updateTableMutation({
                id: table.id,
                ...values,
              })
              await setQueryData(updated)
              await router.push(Routes.ShowTablePage({ tableId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditTablePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTable />
      </Suspense>

      <p>
        <Link href={Routes.TablesPage()}>
          <a>Tables</a>
        </Link>
      </p>
    </div>
  )
}

EditTablePage.authenticate = true
EditTablePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTablePage
