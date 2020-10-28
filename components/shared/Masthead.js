import { Container, Row, Button } from "reactstrap";
const Masthead = ({ imagePath, children }) => (
  <div className="masthead" style={{ backgroundImage: `url(${imagePath})` }}>
    <div className="overlay"></div>
    <Container>
      <Row>
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="site-heading">
            <h1>Blogs Dashboard</h1>
            {children}
          </div>
        </div>
      </Row>
    </Container>
  </div>
);

export default Masthead;
