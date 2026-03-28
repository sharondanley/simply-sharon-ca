import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Static deployment mode — no backend required.
// tRPC and auth providers are omitted; all content is served as a pure static site.
createRoot(document.getElementById("root")!).render(<App />);
