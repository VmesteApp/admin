import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  Row,
} from "react-bootstrap";

import { useState } from "react";

const Auth = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true"; // Преобразуем строку в булевое значение
  });

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode)); // Сохраняем новое состояние в localStorage
  };

  const fontSize = 24; // Размер иконки
  const iconSize = 1.25 * fontSize; // Размер шрифта (в 1.25 раза больше иконки)
  return (
    <>
      <main
        className={`vh-100 ${
          isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
        data-bs-theme={`${isDarkMode ? "dark" : "light"}`}
      >
        <Navbar bg="primary">
          <Navbar.Brand className="ms-2">
            <Nav.Link
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto"
            >
              <Image
                src="src/assets/logoRect/logo-dark.png"
                height="100"
                className="dark-logo "
              />
            </Nav.Link>
          </Navbar.Brand>
          <Nav className="mx-auto me-4 d-flex align-items-center">
            <Button
              onClick={toggleDarkMode}
              className="button me-2"
              style={{
                color: "rgb(255,255,255)",
              }}
            >
              <i
                className={`fa-solid ${
                  isDarkMode ? "fa-sun text-light" : "fa-moon text-dark"
                } `}
                style={{ fontSize: ` ${fontSize}px` }}
              ></i>
            </Button>
            <span
              className="ms-2 me-2 text-light"
              style={{ fontSize: `${fontSize}px` }}
            >
              Неопознанный крекер
            </span>
            <Col
              className="d-flex flex-column justify-content-center 
        align-items-center ms-auto text-dark bg-light"
              style={{
                backgroundColor: "#FFFFFF", // Темный фон для иконки
                padding: "8px 12px", // Отступы для иконки
                borderRadius: "50%", // Скругление углов
                cursor: "pointer", // Указываем на то, что это кликабельно
              }}
            >
              <i
                className="fa-solid fa-user-slash"
                style={{ fontSize: ` ${iconSize}px` }}
              ></i>
            </Col>
          </Nav>
        </Navbar>
        <Container className="col-md-12 mx-auto text-light d-flex justify-content-center">
          <Row className="w-100 d-flex justify-content-center">
            <Col
              md={6}
              className={`p-5 rounded ${
                isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
              }`}
            >
              <Form>
                <h2 className="mb-4">Вход в аккаунт</h2>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Почта</Form.Label>
                  <Form.Control type="email" placeholder="Введите почту" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mt-2">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control type="password" placeholder="Введите пароль" />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Вход
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Auth;
