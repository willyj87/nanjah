import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createParticipant from "app/participants/mutations/createParticipant"
import { ParticipantForm, FORM_ERROR } from "app/participants/components/ParticipantForm"
import getTables from "app/tables/queries/getTables"
import { Container } from "react-bootstrap"

const NewParticipantPage = () => {
  const router = useRouter()
  const [{ tables }] = useQuery(getTables, {
    orderBy: { id: "asc" },
  })
  const [createParticipantMutation] = useMutation(createParticipant)

  return (
    <Layout title={"Ajouter un invité"}>
      <Container>
        <h3>Ajouter un invité</h3>

        <ParticipantForm
          tables={tables}
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={CreateParticipant}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const participant = await createParticipantMutation(values)
              await router.push(Routes.ShowParticipantPage({ participantId: participant.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Container>

      <p></p>
    </Layout>
  )
}

NewParticipantPage.authenticate = true

export default NewParticipantPage
