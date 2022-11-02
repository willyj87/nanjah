import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Button, Form } from "react-bootstrap"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function ParticipantForm<S extends z.ZodType<any, any>>({ tables }) {
  console.log("tables", tables)
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" placeholder="nom" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>prénom</Form.Label>
        <Form.Control type="text" placeholder="prénom" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Billet couple" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Envoyyé
      </Button>
    </Form>
  )
}
