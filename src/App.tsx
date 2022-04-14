import React from "react";
import Footer from "./components/Footer/Footer";
import MessageList from "./components/MessageList/MessageList";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <MessageList />
      <Footer />
    </div>
  );
}

export default App;
