import { useState, useEffect } from "react";
import { BoardHeading } from "../components/Board/BoardComponents/BoardHeading";
import Icons from "../components/Icons";
import Navbar from "../components/Navbar";
import { BoardProvider } from "../context/BoardContext";
import { NavbarProvider, useNavbar } from "../context/NavbarContext";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { ChildrenProp } from "../types/generalTypes";

const LOCAL_STORAGE_KEY = "rolesData";
const ROLES_PER_PAGE = 5;

interface Role {
  id: number;
  name: string;
}

const defaultRoles: Role[] = [
  { id: 1, name: "Super Admin" },
  { id: 2, name: "Supervising Editor" },
  { id: 3, name: "Program Manager" },
  { id: 4, name: "Segment Producer" },
  { id: 5, name: "Editor" },
];

export default function ManageUserRolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [currentPage, setCurrentPage] = useState(1); // Pagination

  useEffect(() => {
    const storedRoles = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    } else {
      setRoles(defaultRoles);
    }
  }, []);

  useEffect(() => {
    if (roles.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(roles));
    }
  }, [roles]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<Role | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSaveRole = (role: Role) => {
    if (!role.name) {
      setErrorMessage("Role name is required.");
      return;
    }

    if (isEditing) {
      setRoles(roles.map((r) => (r.id === role.id ? role : r)));
    } else {
      setRoles([...roles, { ...role, id: roles.length + 1 }]);
    }
    setShowModal(false);
    setCurrentRole(null);
    setIsEditing(false);
    setErrorMessage("");
  };

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter((role) => role.id !== id));
    setShowDeleteModal(null);
  };

  const openModal = (role: Role | null = null) => {
    setCurrentRole(role);
    setIsEditing(Boolean(role));
    setShowModal(true);
    setErrorMessage("");
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRole = currentPage * ROLES_PER_PAGE;
  const indexOfFirstRole = indexOfLastRole - ROLES_PER_PAGE;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);

  const totalPages = Math.ceil(filteredRoles.length / ROLES_PER_PAGE);

  return (
    <BoardProvider>
      <NavbarProvider>
        <RolesLayout>
          <ShowSidebar />
          <BoardHeading />
          <div className="p-6 bg-white rounded-lg shadow-md mx-6 mt-4 overflow-x-auto">
            <h1 className="text-xl font-semibold mb-4 text-center">
              Manage User Roles
            </h1>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by role name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 p-2 border w-full"
            />

            {/* Table */}
            <table className="table-auto w-full mb-4 overflow-x-auto min-w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Role Name</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRoles.map((role) => (
                  <tr key={role.id}>
                    <td className="border px-4 py-2">{role.name}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-yellow-500 text-white px-4 py-1 mr-2 rounded flex items-center gap-2"
                        onClick={() => openModal(role)}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-1 rounded flex items-center gap-2"
                        onClick={() => setShowDeleteModal(role)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center my-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded mx-1 ${
                    currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : ""
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 border rounded mx-1 ${
                        page === currentPage ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded mx-1 ${
                    currentPage === totalPages
                      ? "bg-gray-200 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Next
                </button>
              </div>
            )}

            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => openModal()}
            >
              Add Role
            </button>

            {showModal && (
              <RoleModal
                onClose={() => setShowModal(false)}
                onSave={handleSaveRole}
                role={currentRole}
                errorMessage={errorMessage} // Pass error message
              />
            )}

            {showDeleteModal && (
              <ConfirmationModal
                onClose={() => setShowDeleteModal(null)}
                onConfirm={() => handleDeleteRole(showDeleteModal.id)}
                title="Delete Role"
                message={`Are you sure you want to delete ${showDeleteModal.name}?`}
              />
            )}
          </div>
        </RolesLayout>
      </NavbarProvider>
    </BoardProvider>
  );
}

function RolesLayout({ children }: ChildrenProp) {
  const { showSidebar } = useNavbar();
  const { screenType } = useViewportWidth();
  return (
    <>
      <div
        className={`grid ${
          showSidebar && screenType === "desktop"
            ? "grid-cols-[18.75rem_minmax(0_,1fr)]"
            : "grid-cols-[minmax(0_,1fr)]"
        } min-h-screen overflow-hidden h-full`}
      >
        {showSidebar && <Navbar />}
        <main className="flex flex-col h-full w-full">{children}</main>
      </div>
    </>
  );
}

// Modal for adding/editing role details
function RoleModal({
  onClose,
  onSave,
  role,
  errorMessage,
}: {
  onClose: () => void;
  onSave: (role: Role) => void;
  role: Role | null;
  errorMessage: string | null;
}) {
  const [name, setName] = useState(role?.name || "");

  const handleSubmit = () => {
    onSave({
      id: role?.id || 0,
      name,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[40%]">
        <h2 className="text-xl mb-4">{role ? "Edit Role" : "Add Role"}</h2>
        {errorMessage && (
          <p className="text-custom-red text-center mb-4">{errorMessage}</p>
        )}
        <div className="mb-4">
          <label className="block text-sm mb-1">Role Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal for delete confirmation
function ConfirmationModal({
  onClose,
  onConfirm,
  title,
  message,
}: {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">{title}</h2>
        <p>{message}</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function ShowSidebar() {
  const { screenType } = useViewportWidth();
  const { toggleSidebar, showSidebar } = useNavbar();

  if (showSidebar || screenType !== "desktop") return null;

  return (
    <div
      className="absolute left-0 bottom-[3%] group cursor-pointer"
      onClick={() => toggleSidebar()}
    >
      <div className="bg-purple p-5 pl-3 rounded-tr-[6.25rem] rounded-br-[6.25rem] group-hover:bg-purplehover">
        <Icons iconType="showSidebar" className="fill-white" />
      </div>
    </div>
  );
}
