import './App.css';
import {ErrorBoundary} from "./Components/ErrorBoundary/ErrorBoundary"
import { Navbar } from './Components/Navbar';
import { RouterWrapper } from './Features/Routes/AllRoutes';
import { Layout } from 'antd';
import { Content } from "antd/es/layout/layout";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
          <Layout style={{ minHeight: "100vh", width: "100%" }}>
            <Navbar />
            <Content
              style={{
                background: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
                flexDirection: "column",
              }}
            >
              <RouterWrapper />
            </Content>
          </Layout>
        </ErrorBoundary>
    </div>
  );
}

export default App;
