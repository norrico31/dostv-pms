import { MouseEventHandler, useEffect, useState } from "react";
import { useBoard } from "../../../context/BoardContext";
import { useNavbar } from "../../../context/NavbarContext";
import { useViewportWidth } from "../../../hooks/useViewportWidth";
import { Button } from "../../Button";
import Icons from "../../Icons";
import { KebabMenu } from "../../KebabMenu";
import { ConfirmationModal } from "../../ConfirmationModal";
import { useNavigate } from "react-router-dom";

export function BoardHeading() {
  return (
    <div className="bg-elements py-6 px-8 border-b-2 max-md:py-4 max-md:px-4 max-md:gap-4 border-lines flex justify-center items-center gap-x-6">
      <HeadingTitle />
      <HeadingButtons />
    </div>
  );
}

function HeadingTitle() {
  const { boardData } = useBoard();
  const { toggleSidebar } = useNavbar();
  const { screenType } = useViewportWidth();
  const onOpenNav = () => {
    if (screenType === "desktop") return;
    toggleSidebar("open");
  };
  return (
    <div
      className="flex flex-1 gap-x-3 max-md:cursor-pointer"
      onClick={onOpenNav}
    >
      <Icons iconType="logoMobile" className="md:hidden" />
      <h1 className="text-primary font-bold text-xl flex-1 max-md:text-lg flex items-center gap-x-3 ">
        {boardData?.name}
        {screenType === "desktop" || <Icons iconType="arrowDown" />}
      </h1>
    </div>
  );
}

function HeadingButtons() {
  const { screenType } = useViewportWidth();
  const { boardData, dispatch, showBoardDeleteConfirmation } = useBoard();
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // State to store the logged-in user's name and roleId
  const [userName, setUserName] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<number | null>(null); // Role ID state

  useEffect(() => {
    // Retrieve user details from localStorage
    const employeeId = localStorage.getItem("employeeId");
    const role = localStorage.getItem("roleId"); // Retrieve roleId from localStorage
    const users = JSON.parse(localStorage.getItem("usersData") || "[]");
    const loggedInUser = users.find(
      (user: any) => user.employeeId === employeeId
    );

    if (loggedInUser) {
      setUserName(`${loggedInUser.firstName} ${loggedInUser.lastName}`);
    }

    if (role) {
      setRoleId(parseInt(role)); // Set the roleId state
    }
  }, []); // Effect only runs once on mount

  const handleAction: MouseEventHandler = (e) => {
    const actionType = (e.target as HTMLButtonElement).dataset.action;

    switch (actionType) {
      case "delete":
        dispatch({ type: "form/delete/board/confirmation" });
        break;
      case "edit":
        dispatch({ type: "form/edit/board" });
        break;
      case "logout":
        // Clear session and redirect to login
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
        break;
      default:
        throw new Error("Invalid action type for kebab menu on board header");
    }
  };

  return (
    <>
      {showBoardDeleteConfirmation && <ConfirmationDeleteBoardModal />}
      <div className="flex items-center gap-4">
        {/* Show the Add New Task button only if roleId is 1 or 2 */}
        {roleId !== null && (roleId === 1 || roleId === 2) && (
          <Button
            buttonType="primary"
            disabled={!boardData}
            className="max-md:py-3"
            onClick={() => dispatch({ type: "form/create/task" })}
          >
            {screenType === "desktop" ? (
              "+ Add New Task"
            ) : (
              <>
                <Icons iconType="addTaskMobile" className="fill-white" />
              </>
            )}
          </Button>
        )}
        {userName && (
          <span className="font-semibold text-primary">{userName}</span>
        )}
      </div>
      <KebabMenu>
        {roleId !== null && (roleId === 1 || roleId === 2) && (
          <>
            <button
              className="text-secondary cursor-pointer hover:text-primary"
              data-action={"edit"}
              onClick={handleAction}
            >
              Edit Board
            </button>
            <button
              className="text-red cursor-pointer hover:text-redhover"
              data-action={"delete"}
              onClick={handleAction}
            >
              Delete Board
            </button>
          </>
        )}
        <button
          className="text-red cursor-pointer hover:text-redhover"
          data-action={"logout"} // Add logout action here
          onClick={handleAction}
        >
          Logout
        </button>
      </KebabMenu>
    </>
  );
}

function ConfirmationDeleteBoardModal() {
  const { dispatch, boardData } = useBoard();
  const handleReject = () =>
    dispatch({ type: "form/delete/board", payload: false });

  const handleAccept = () =>
    dispatch({ type: "form/delete/board", payload: true });

  return (
    <ConfirmationModal
      headingText="Delete this board?"
      paragraphText={`Are you sure you want to delete the '${boardData?.name}' task and its subtasks? This action cannot be reversed`}
      onAccept={handleAccept}
      onReject={handleReject}
    />
  );
}
