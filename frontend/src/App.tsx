import TaskForm from "./components/TaskForm.js";
import TaskList from "./components/TaskList.js";
import Card from "./components/ui/Card.js";
import Button from "./components/ui/Button.js";
import useDarkMode from "./hooks/useDarkMode.js";
import useTasks from "./hooks/useTasks.js";
import LoadingSpinner from "./components/ui/LoadingSpinner.js";
import ErrorMessage from "./components/ui/ErrorMessage.js";
import { User } from "./types";
import { useAuth } from "./contexts/AuthContext";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const { isDark, toggle: toggleDark } = useDarkMode();
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (!user) {
    return showLogin ? (
      <Login onToggleForm={() => setShowLogin(false)} />
    ) : (
      <Register onToggleForm={() => setShowLogin(true)} />
    );
  }

  return (
    <AuthenticatedApp
      user={user}
      logout={logout}
      isDark={isDark}
      toggle={toggleDark}
    />
  );
};

type AuthenticatedAppProps = {
  user: User;
  logout: () => void;
  isDark: boolean;
  toggle: () => void;
};
const AuthenticatedApp = ({
  user,
  logout,
  isDark,
  toggle
}: AuthenticatedAppProps) => {
  const { tasks, loading, error, addTask, toggleTask, deleteTask, refetch } =
    useTasks();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="bg-blue-500 dark:bg-blue-600 text-white p-6 transition-colors">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Task Manager</h1>
            <p className="text-sm mt-1">Welcome, {user.name}!</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={toggle}>
              {isDark ? "☀️" : "🌙"}
            </Button>
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-2xl mx-auto my-8 px-4">
        <TaskForm onSubmit={addTask} />

        <Card>
          <h2 className="text-xl font-bold mb-4 dark:text-white flex gap-2">
            My Tasks {!loading && `(${tasks.length})`}
            <a className="cursor-pointer" onClick={refetch}>
              🔄
            </a>
          </h2>
          {error ? <ErrorMessage message={error} /> : null}
          {loading ? (
            <LoadingSpinner message="Loading tasks..." />
          ) : tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No tasks yet. Add one above!</p>
            </div>
          )}
        </Card>
      </main>
      <footer className="bg-gray-800 text-white p-2 text-center">
        Copyright &copy; {new Date().getFullYear()}. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
