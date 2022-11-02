import Link from "next/link"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import Layout from "app/core/layouts/Layout"

const Home = () => {
  return (
    <Layout title="W&D">
      <Container fluid="md">
        <Row className="text-center">
          <h4>Bienvenue au Nanjah</h4>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="6" xs="12" className="text-center">
            <Card bg="info">
              <Card.Img variant="top" src="/participants.png" />
              <Card.Body>
                <Link href="/guest">
                  <Button variant="primary">Vous êtes un invité</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6" xs="12" className="text-center">
            <Card bg="danger">
              <Card.Img variant="top" src="/protocol.png" />
              <Card.Body>
                <Link href="/auth/login">
                  <Button variant="primary">Vous êtes du protocole</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Home
