import { useMutation } from "@blitzjs/rpc"
import { useEffect, useState } from "react"
import { Button, FormCheck, ListGroup, Modal } from "react-bootstrap"
import { toast, ToastContainer } from "react-toastify"
import confirmParticipant from "../mutations/confirmParticipant"

function ParticipantModal({
  id,
  name,
  surname,
  onHide,
  tableName,
  couple,
  status,
  showParticipant,
}) {
  const [confirmParticipantMutation, { isSuccess }] = useMutation(confirmParticipant)
  const [present, setPresent] = useState(status)
  console.log("participant", name)

  const handleClose = async () => {
    await confirmParticipantMutation({
      id: id,
      status: present,
    })
    toast.success("Invité confirmé !", {
      position: toast.POSITION.TOP_CENTER,
    })
    onHide()
  }
  return (
    <>
      {isSuccess && <ToastContainer autoClose={2000} />}
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        show={showParticipant}
        centered
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {name} {surname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Table</div>
              </div>
              <span> {tableName}</span>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Billet couple</div>
              </div>
              <span>{couple === true ? "oui" : "non"}</span>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Présent</div>
              </div>
              <FormCheck checked={present} onChange={() => setPresent(!present)} />
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleClose()}>Valider</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ParticipantModal
