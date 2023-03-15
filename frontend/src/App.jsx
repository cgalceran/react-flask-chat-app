import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import useDarkMode from "./hooks/useDarkMode";
import { UserContextProvider } from "./contexts/UserContext";
import { BsSun, BsMoonFill } from "react-icons/bs";
import Bubble from "./components/Bubble";


import Login from './components/Login'
import Chat from "./components/Chat";
import Signup from "./components/Signup";

function App() {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  return (
    <main className="h-screen bg-[#e8e8e8] dark:bg-[#212121]">
      <div className="flex flex-row justify-end pr-4">
        <span
          className="mt-4 rounded-lg bg-[#e8e8e8] p-1 outline outline-1 drop-shadow-xl hover:bg-[#dbdbdb]"
          onClick={handleMode}
        >
          {darkTheme ? (
            <BsSun size="24" className="top-navigation-icon" />
          ) : (
            <BsMoonFill size="24" className="top-navigation-icon" />
          )}
        </span>
      </div>

      <section className="-mt-14 flex h-full items-center justify-center">
        <UserContextProvider>
          <BrowserRouter>
            <Routes>
              <Route>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/bubble" element={<Bubble />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContextProvider>
      </section>
    </main>
  );
}

export default App;
