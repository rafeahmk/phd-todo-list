import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { TodoContext } from "./contexts/TodoContext";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { AuthContext } from "./contexts/AuthContex";
import RequireAuth from "./components/RequireAuth";
import logo from './assets/tec-logo.png';

function Layout() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container >
          <Navbar.Brand href="/">
            <img
              src={logo}
              alt="Logo The EAGLE Center"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <strong>Navigate your PhD!</strong>
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/dashboard">
              <i className="bi bi-list-check" style={{ fontSize: "22px" }} ></i>
            </Nav.Link>
            <Nav.Link href="/add">
              <i className="bi bi-plus-square" style={{ fontSize: "22px" }} ></i>
            </Nav.Link>
            <Nav.Link href="/logout">
              <i className="bi bi-x-square-fill" style={{  fontSize: "22px" }} ></i>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar >
      <Outlet />
    </>
  );
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [token, setToken] = useLocalStorage("token", null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <TodoContext.Provider value={{ todos, setTodos }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route path="add"
                element={
                  <RequireAuth>
                    <AddTodo />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/edit/:id" element={<EditTodo />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TodoContext.Provider>
    </AuthContext.Provider>
  );
}
