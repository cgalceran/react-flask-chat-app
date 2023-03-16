export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full  border-gray-800/75 p-2 shadow  md:flex md:items-center md:justify-between md:p-2">
      <ul className=" flex flex-row justify-between text-sm text-gray-500">
        <li>
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            {" "}
            Made with &#9829; by Carlos Galceran
          </span>
        </li>
        <li>
          <a
            href="https://www.carlosgalceran.dev/#contact"
            target="_blank"
            rel="noreferrer"
            className=" px-9 hover:underline"
          >
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
};
