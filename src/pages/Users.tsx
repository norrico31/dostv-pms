import { useState, useEffect } from "react";
import { BoardHeading } from "../components/Board/BoardComponents/BoardHeading";
import Icons from "../components/Icons";
import Navbar from "../components/Navbar";
import { BoardProvider } from "../context/BoardContext";
import { NavbarProvider, useNavbar } from "../context/NavbarContext";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { ChildrenProp } from "../types/generalTypes";
import { usersDb } from "../db/users-db";

const LOCAL_STORAGE_KEY = "usersData";
const USERS_PER_PAGE = 5;

interface User {
  id: number;
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  sex: string;
  dob: string;
  roleId: number;
}

const roles = [
  { id: 1, name: "Super Admin" },
  { id: 2, name: "Supervising Staff" },
  { id: 3, name: "Program Manager" },
  { id: 4, name: "Segment Producer" },
  { id: 5, name: "Employee" },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [currentPage, setCurrentPage] = useState(1); // Pagination

  useEffect(() => {
    const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(usersDb.users);
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    }
  }, [users]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<User | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSaveUser = (user: User) => {
    if (!user.employeeId || !user.dob || !user.email) {
      setErrorMessage("Employee ID, Date of Birth, and Email are required.");
      return;
    }

    if (isEditing) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    setShowModal(false);
    setCurrentUser(null);
    setIsEditing(false);
    setErrorMessage("");
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    setShowDeleteModal(null);
  };

  const openModal = (user: User | null = null) => {
    setCurrentUser(user);
    setIsEditing(Boolean(user));
    setShowModal(true);
    setErrorMessage("");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) // Added email to search
  );

  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  return (
    <BoardProvider>
      <NavbarProvider>
        <UsersLayout>
          <ShowSidebar />
          <BoardHeading />
          <div className="p-6 bg-white rounded-lg shadow-md mx-6 mt-4 overflow-x-auto">
            <h1 className="text-xl font-semibold mb-4 text-center">
              Manage Users
            </h1>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by name, employee ID, or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 p-2 border w-full"
            />

            {/* Table */}
            <table className="table-auto w-full mb-4 overflow-x-auto min-w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">First Name</th>
                  <th className="border px-4 py-2">Last Name</th>
                  <th className="border px-4 py-2">Employee ID</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Sex</th>
                  <th className="border px-4 py-2">Role</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.firstName}</td>
                    <td className="border px-4 py-2">{user.lastName}</td>
                    <td className="border px-4 py-2">{user.employeeId}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.sex}</td>
                    <td className="border px-4 py-2">
                      {roles.find((r) => r.id === user.roleId)?.name}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-yellow-500 text-white px-4 py-1 mr-2 rounded flex items-center gap-2"
                        onClick={() => openModal(user)}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-1 rounded flex items-center gap-2"
                        onClick={() => setShowDeleteModal(user)}
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
              Add User
            </button>

            {showModal && (
              <UserModal
                onClose={() => setShowModal(false)}
                onSave={handleSaveUser}
                user={currentUser}
                errorMessage={errorMessage} // Pass error message
              />
            )}

            {showDeleteModal && (
              <ConfirmationModal
                onClose={() => setShowDeleteModal(null)}
                onConfirm={() => handleDeleteUser(showDeleteModal.id)}
                title="Delete User"
                message={`Are you sure you want to delete ${showDeleteModal.firstName} ${showDeleteModal.lastName}?`}
              />
            )}
          </div>
        </UsersLayout>
      </NavbarProvider>
    </BoardProvider>
  );
}

function UsersLayout({ children }: ChildrenProp) {
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

// Modal for adding/editing user details
function UserModal({
  onClose,
  onSave,
  user,
  errorMessage,
}: {
  onClose: () => void;
  onSave: (user: User) => void;
  user: User | null;
  errorMessage: string | null;
}) {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [employeeId, setEmployeeId] = useState(user?.employeeId || "");
  const [email, setEmail] = useState(user?.email || ""); // Added email state
  const [sex, setSex] = useState(user?.sex || "Male");
  const [dob, setDob] = useState(user?.dob || "");
  const [roleId, setRoleId] = useState(user?.roleId || 1);

  const handleSubmit = () => {
    onSave({
      id: user?.id || 0,
      firstName,
      lastName,
      employeeId,
      email, // Save email field
      sex,
      dob,
      roleId,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[40%]">
        <h2 className="text-xl mb-4">{user ? "Edit User" : "Add User"}</h2>
        {errorMessage && (
          <p className="text-custom-red text-center mb-4">{errorMessage}</p>
        )}
        <div className="mb-4">
          <label className="block text-sm mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">
            Employee ID <span className="text-custom-red">*</span>
          </label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">
            {" "}
            Email Address <span className="text-custom-red">*</span>
          </label>{" "}
          {/* Email field */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Sex</label>
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="w-full p-2 border"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">
            Date of Birth <span className="text-custom-red">*</span>
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Role</label>
          <select
            value={roleId}
            onChange={(e) => setRoleId(parseInt(e.target.value))}
            className="w-full p-2 border"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
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
