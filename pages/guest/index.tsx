import { Suspense, useEffect, useMemo, useState } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import { Button, Container, Form, Pagination, Table } from "react-bootstrap"
import { Participant, Table as TableType } from "@prisma/client"
import filterParticipants from "app/participants/queries/filterParticipants"
import ParticipantModal from "app/participants/components/ParticipantModal"

const ITEMS_PER_PAGE = 20

export const ParticipantsList = ({ filter }) => {
  const router = useRouter()
  const [data, setData] = useState<(Participant & { table: TableType })[]>([])
  const [showParticipant, setShowParticipant] = useState<boolean>(false)
  const [participant, setParticipant] = useState<Participant & { table: TableType }>()
  // const [page, setPage] = useState<number>(0)
  const page = useMemo(() => {
    if (Number(router.query.page) && filter.length < 3) {
      return Number(router.query.page)
    }
    if (filter.length > 3) {
      return 0
    }
    return 0
  }, [filter.length, router.query.page])

  console.log("page", page)
  const handleParticipantModal = (participant) => {
    setParticipant(participant)
    setShowParticipant(true)
  }

  // const page = Number(router.query.page) || 0
  const [{ participants, hasMore }] = usePaginatedQuery(filterParticipants, {
    orderBy: { id: "asc" },
    where: {
      OR: [
        {
          name: {
            contains: filter,
          },
        },
        { surname: { contains: filter } },
      ],
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  console.log("participant", { participants })
  useEffect(() => {
    setData(participants)
  }, [participants])

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  return (
    <div>
      <Table hover responsive>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Présent</th>
            <th>table</th>
          </tr>
        </thead>
        <tbody>
          {data.map((participant) => (
            <>
              <tr key={participant.id} onClick={() => handleParticipantModal(participant)}>
                <td>{participant.name}</td>
                <td>{participant.surname}</td>
                <td>{participant.status === true ? "oui" : "non"}</td>
                <td>{participant.table.name}</td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
      <div>
        <Pagination size="sm">
          <Pagination.Prev disabled={page === 0} onClick={goToPreviousPage}>
            Précédent
          </Pagination.Prev>
          <Pagination.Next disabled={!hasMore} onClick={goToNextPage}>
            Suivant
          </Pagination.Next>
        </Pagination>
      </div>
    </div>
  )
}

const GuestsPage = () => {
  const [filter, setFilter] = useState<string>("")
  const handleFilter = (value) => {
    if (value.length >= 3) {
      setFilter(value)
    }
    if (value.length < 3) setFilter("")
  }

  return (
    <Layout>
      <Head>
        <title>Participants</title>
      </Head>
      <Container fluid="md">
        <div>
          <p>
            <Link href={Routes.NewParticipantPage()}>
              <Button className="primary">Ajouter un invité</Button>
            </Link>
          </p>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Entrez un nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Chercher un invité"
                onChange={(e) => handleFilter(e.target.value)}
              />
              <Form.Text className="text-muted">
                Entrez un nom ou un prénom (3 caractères minimum)
              </Form.Text>
            </Form.Group>
          </Form>
          <Suspense fallback={<div>Loading...</div>}>
            <ParticipantsList filter={filter} />
          </Suspense>
        </div>
      </Container>
    </Layout>
  )
}

export default GuestsPage
