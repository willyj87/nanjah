import { Table } from "@prisma/client"
import { useState } from "react"
import { Button, Form, ListGroup } from "react-bootstrap"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function ParticipantForm({ tables, onSubmit }) {
  const [results, setResults] = useState<Table[]>([])
  const [tableName, setTableName] = useState("")
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    tableId: null,
    couple: false,
  })

  const handleTableFilter = (value) => {
    if (value.length >= 3) {
      setResults(tables.filter((table) => table.name.includes(value)))
    }
    if (value.length === 0) {
      setResults([])
    }
    setTableName(value)
  }

  const handleOnClick = (value) => {
    setFormValues({ ...formValues, tableId: value.id })
    setTableName(value.name)
    setResults([])
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formValues)
  }
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nom"
          required
          onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Prenom</Form.Label>
        <Form.Control
          type="text"
          placeholder="Prenom"
          onChange={(e) => setFormValues({ ...formValues, surname: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Table</Form.Label>
        <Form.Control
          type="text"
          placeholder="Table"
          onChange={(e) => handleTableFilter(e.target.value)}
          value={tableName}
        />
        <ListGroup>
          {results.map((result) => (
            <ListGroup.Item key={result.id} onClick={() => handleOnClick(result)} action>
              {result.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Form.Text className="text-muted">
          Entrez le nom d'une table (3 caractères minimum)
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Billet couple"
          onChange={(e) => setFormValues({ ...formValues, couple: e.target.checked })}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Valider
      </Button>
    </Form>
  )
}
