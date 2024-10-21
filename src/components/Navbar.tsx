import logoDark from "/assets/logo-dark.png?url";
import logoLight from "/assets/logo-light.png?url";
import { useApp } from "../context/AppContext";
import { ChildrenProp } from "../types/generalTypes";
import { ToggleButton } from "./ToggleButton";
import Icons from "./Icons";
import { useBoard } from "../context/BoardContext";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { MouseEventHandler } from "react";
import { useNavbar } from "../context/NavbarContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface BoardItemType extends ChildrenProp {
  i?: number;
  active?: number;
  isAccent?: boolean;
}

export default function Navbar() {
  const { theme } = useApp();
  const { showSidebar, toggleSidebar } = useNavbar();
  const { screenType } = useViewportWidth();

  const onCloseNav: MouseEventHandler<HTMLDivElement> = (e) => {
    if ((e.target as HTMLElement).closest(".navbar-flag") !== null) return;
    if (screenType === "desktop") return;
    toggleSidebar("close");
  };

  const [roleId, setRoleId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch the roleId from localStorage
    const storedRoleId = localStorage.getItem("roleId");
    if (storedRoleId) {
      setRoleId(parseInt(storedRoleId));
    }
  }, []);

  return (
    <div
      className={`max-md:fixed left-0 right-0 top-0 bottom-0 z-10  max-md:grid max-md:items-start max-md:justify-items-center ${
        showSidebar ? "bg-black/50" : ""
      }`}
      onClick={onCloseNav}
    >
      <nav
        className={`navbar-flag bg-elements w-[18.8rem] px-[2rem] pt-[2rem] pb-[2rem] flex flex-col md:border-r-2 border-lines md:fixed min-h-screen max-md:w-[70%] max-md:min-h-fit max-md:gap-y-4 max-md:mt-24 max-md:py-6 max-md:shadow-nav max-md:rounded-xl`}
      >
        <div className="flex-1">
          {screenType === "desktop" && <Logo theme={theme} />}
          {}
          <BoardList roleId={roleId} />
        </div>
        <div>
          <ThemeToggle />
          {screenType === "desktop" && <HideSidebar />}
        </div>
      </nav>
    </div>
  );
}

function Logo({ theme }: { theme: string }) {
  return (
    <img
      src={theme === "dark" ? logoLight : logoDark}
      alt="Logo"
      className="mb-[3.5rem]"
    />
  );
}

function BoardList({ roleId }: { roleId: number | null }) {
  //const { boardDataAll, boardPage: active } = useBoard();
  const { boardDataAll } = useBoard();

  const location = useLocation();

  //const boardsCount = boardDataAll.length;

  return (
    <>
      <p className="text-custom-red tracking-[0.15rem] text-sm mb-8">MENU</p>

      <ul className="mb-6">
        {boardDataAll.map(({ name: boardTitle }, i) => {
          return (
            <BoardItem i={i} key={`${i}-boardtitle-${boardTitle}`}>
              <Link
                to="/home"
                className={location.pathname === "/home" ? "text-purple" : ""}
              >
                {boardTitle}
              </Link>
            </BoardItem>
          );
        })}
        {(roleId === 1 || roleId === 2) && (
          <BoardItem isAccent={false}>+ Create new Category</BoardItem>
        )}
        {}
        <br />
        {(roleId === 1 || roleId === 2) && (
          <p className="text-custom-red tracking-[0.15rem] text-sm mb-8">
            ADMINISTRATOR
          </p>
        )}
        {(roleId === 1 || roleId === 2) && (
          <BoardItem
            isAccent={false}
            i={-1}
            active={location.pathname === "/users" ? 1 : 0}
          >
            {}

            <Link
              to="/users"
              className={location.pathname === "/users" ? "text-purple" : ""}
            >
              Manage Users
            </Link>
          </BoardItem>
        )}

        {(roleId === 1 || roleId === 2) && (
          <BoardItem
            isAccent={false}
            i={-1}
            active={location.pathname === "/manage-roles" ? 1 : 0}
          >
            <Link
              to="/manage-roles"
              className={
                location.pathname === "/manage-roles" ? "text-purple" : ""
              }
            >
              Manage Roles
            </Link>
          </BoardItem>
        )}
      </ul>
    </>
  );
}

function ThemeToggle() {
  const { setTheme, theme } = useApp();

  const toggleTheme = (position: string) => {
    setTheme(position === "right" ? "light" : "dark");
  };

  return (
    <div className="flex w-full py-3 bg-bg rounded-6 items-center justify-center gap-5">
      <Icons iconType={"lightTheme"} />
      <ToggleButton
        onToggle={toggleTheme}
        initialPosition={theme === "light" ? "left" : "right"}
      />
      <Icons iconType="darkTheme" />
    </div>
  );
}

function HideSidebar() {
  const { toggleSidebar } = useNavbar();

  return (
    <div
      className="group flex items-center gap-4 mt-6 relative cursor-pointer"
      onClick={() => toggleSidebar()}
    >
      <div
        className={`absolute h-[3rem] -left-8 right-0 rounded-tr-[6.25rem] rounded-br-[6.25rem] group-hover:bg-white`}
      ></div>
      <Icons
        iconType="hideSidebar"
        className="fill-secondary relative z-10 group-hover:fill-purple"
      />
      <p className="font-bold text-secondary group-hover:text-purple relative z-10">
        Hide Sidebar
      </p>
    </div>
  );
}

function BoardItem({ children, i = -1, active = -2, isAccent }: BoardItemType) {
  const { switchToPage, dispatch } = useBoard();
  const isSelected = active === i;

  const handleClick = () => {
    if (!isAccent) {
      switchToPage(i);
    } else {
      dispatch({ type: "form/create/board" });
    }
  };
  return (
    <li
      key={`${i}-board-nav`}
      className="group flex py-3 items-center relative cursor-pointer "
      onClick={handleClick}
    >
      <div
        className={`${
          isSelected ? "bg-purple" : "bg-transparent"
        } absolute top-0 bottom-0 -left-8 right-0 rounded-tr-[6.25rem] rounded-br-[6.25rem] ${
          !isSelected ? "group-hover:bg-navhover group-hover:text-purple" : ""
        }`}
      ></div>
      <div className="flex items-center justify-center gap-4 py-0">
        <div>
          <Icons
            iconType="board"
            className={`${isAccent ? "fill-purple" : "fill-secondary"} ${
              isSelected ? "fill-white" : ""
            } ${isSelected ? "" : "group-hover:fill-purple"} relative z-10`}
          />
        </div>
        <p
          className={`font-bold min-[500px]:max-w-[10rem] ${
            isAccent
              ? "text-purple"
              : isSelected
              ? "text-white"
              : "text-secondary"
          }  ${!isSelected ? "group-hover:text-purple" : ""} relative z-10`}
        >
          {children}
        </p>
      </div>
    </li>
  );
}
