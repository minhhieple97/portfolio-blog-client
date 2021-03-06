import React, { useEffect, useRef, useState } from "react";
import BaseLayout from "@/components/layouts/BaseLayout";
import { Col, Container, Row } from "reactstrap";
import Typed from "react-typed";
import { useGetUser } from "../actions/user";
import BasePage from "components/BasePage";
const ROLES = ["Coder", "Bloger", "Badminton players"];
const Index = () => {
  const { data, loading } = useGetUser();
  const [isFlipping, setIsFlipping] = useState(false);
  const flipInterval = useRef();
  useEffect(() => {
    startAnimation();
    return () => flipInterval.current && clearInterval(flipInterval.current);
  }, []);
  const startAnimation = () => {
    flipInterval.current = setInterval(() => {
      setIsFlipping((preFlipping) => !preFlipping);
    }, 5000);
  };
  return (
    <BaseLayout
      className={`cover ${isFlipping ? "cover-orange" : "cover-blue"}`}
      user={data}
      loading={loading}
      navClass="transparent"
    >
      <BasePage indexPage title="Portfolio - Minh Hiep Le">
        <div className="main-section">
          <div className="background-image">
            <img src="/images/background-index.png" />
          </div>
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div
                    className={`flipper ${isFlipping ? "isFlipping" : null}`}
                  >
                    <div className="front">
                      <div className="image image-1">
                        <div className="hero-section-content">
                          <h2> Web Development </h2>
                          <div className="hero-section-content-intro">
                            Have a look at my portfolio and job history.
                          </div>
                        </div>
                      </div>

                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="image image-2">
                        <div className="hero-section-content">
                          <h2> Web Development </h2>
                          <div className="hero-section-content-intro">
                            Have a look at my portfolio and job history.
                          </div>
                        </div>
                      </div>
                      <div className="shadow-custom shadow-custom-orange">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    Welcome to the portfolio website of Minh Hiep Le. Get
                    informed, collaborate and discover projects I was working on
                    through the years!
                  </h1>
                </div>
                <Typed
                  loop
                  typeSpeed={70}
                  backSpeed={70}
                  strings={ROLES}
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  className="self-typed"
                  cursorChar="|"
                />
                <div className="hero-welcome-bio">
                  <h1>Let's take a look on my work.</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BasePage>
    </BaseLayout>
  );
};
export default Index;
