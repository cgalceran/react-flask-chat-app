import React from "react";
import { Link } from 'react-router-dom'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import useDarkMode from "./hooks/useDarkMode";
import { UserContextProvider } from "./contexts/UserContext";
import { BsSun, BsMoonFill, BsGithub } from "react-icons/bs";
import Bubble from "./components/Bubble";


import Login from './components/Login'
import Chat from "./components/Chat";
import Signup from "./components/Signup";
import { Footer } from "./components/Footer";

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

      <section className="-mt-12 flex h-full flex-col items-center justify-center">
        <div className="m-10 mx-auto flex max-w-3xl flex-col">
          <h1 className="font-inter mt-1 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-center text-4xl font-black uppercase tracking-tighter text-transparent sm:text-5xl lg:text-7xl">
            #LETSChat!
          </h1>
        </div>
        <UserContextProvider>
          <BrowserRouter>
            <Routes>
              <Route>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/chat" element={<Chat />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContextProvider>
      </section>
      <Footer />
    </main>
  );
}

export default App;
