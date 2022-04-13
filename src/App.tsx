import React from "react";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import MessageList from "./components/MessageList/MessageList";

function App() {
  return (
    <div className="App">
      <MessageList />
      <Footer />
    </div>
  );
}

export default App;
