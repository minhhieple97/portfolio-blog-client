import React, { useEffect } from "react";
import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/layouts/BaseLayout";
import { useGetUser } from "../actions/user";
import { Col, Row } from "reactstrap";
export default function About() {
  const { data: user, loading } = useGetUser();
  useEffect(() => {
    return () => {
      window.__isAboutLoaded = true;
    };
  }, []);
  const createFadeInClass = () => {
    if (typeof window !== "undefined") {
      return window.__isAboutLoaded ? "" : "fadein";
    }
    return "fadein";
  };
  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage className="about-page" title="About Me - Minh Hiep Le">
        <Row className="mt-5">
          <Col md="6">
            <div className="left-side">
              <h1 className="title">Hello, Welcome</h1>
              <h4 className={`subtitle ${createFadeInClass()}`}>
                To About Page
              </h4>
              <p className={`subsubTitle ${createFadeInClass()}`}>
                Feel free to read short description about me.
              </p>
            </div>
          </Col>
          <Col md="6">
            <div className={`${createFadeInClass()}`}>
              <p className={`subsubTitle ${createFadeInClass()}`}>
                My name is Minh Hiep Le and I have experience in web
                development.
              </p>
              <p className={`subsubTitle ${createFadeInClass()}`}>
                It wasn't until college that I realized I had a special interest
                in programming, so even though I was a university student
                majoring in economics, I chose my job as a web programmer.
              </p>
              <p className={`subsubTitle ${createFadeInClass()}`}>
                I started learning programming in 2018, now I have experience
                working mainly with Javascript for backend web development using
                Node.js also I used to build simple UI using React. js.
              </p>
              <p className={`subsubTitle ${createFadeInClass()}`}>
                I am a calm person who quickly adapts to a new environment,
                eager to learn, not afraid of challenges at work, looking
                forward to cooperating with you in the future. Thanks for
                visiting my website!
              </p>
            </div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
}
