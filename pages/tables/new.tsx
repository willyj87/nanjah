import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createTable from "app/tables/mutations/createTable"
import { TableForm, FORM_ERROR } from "app/tables/components/TableForm"

const NewTablePage = () => {
  const router = useRouter()
  const [createTableMutation] = useMutation(createTable)

  return (
    <Layout title={"Create New Table"}>
      <h1>Create New Table</h1>

      <TableForm
        submitText="Create Table"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTable}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const table = await createTableMutation(values)
            await router.push(Routes.ShowTablePage({ tableId: table.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.TablesPage()}>
          <a>Tables</a>
        </Link>
      </p>
    </Layout>
  )
}

NewTablePage.authenticate = true

export default NewTablePage
