import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { getToken } from '../../utils/functions';
import TaskList from '../../components/tasks/taskList.jsx';
import TaskForm from '../../components/tasks/taskForm.jsx';

function Tasks() {
    const { user, loading } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [tasksLoading, setTasksLoading] = useState(true);

    async function fetchTasks() {
        const token = getToken();
        const response = await fetch('http://localhost:3000/api/tasks', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch tasks');
            return;
        }

        const data = await response.json();
        setTasks(data.tasks);
        setTasksLoading(false);
    }

    async function handleDeleteTask(taskId) {
        const token = getToken();
        await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchTasks();
    }

    async function handleUpdateTask(taskId, updatedData) {
        const token = getToken();
        await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
        });
        fetchTasks();
    }

    useEffect(() => {
        if (!user) return;
        fetchTasks();
    }, [user]);

    if (loading || tasksLoading) {
        return <p>Loading...</p>;
    }
    if (!user) {
        return <p>Please log in to view your tasks.</p>;
    }

    return (
        <div>
            <h1>My Tasks</h1>
            <p>Total: {tasks.length}</p>

            <TaskForm onTaskCreated={(newTask) => setTasks([...tasks, newTask])} />

            <TaskList
                tasks={tasks}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
            />
        </div>
    );
}

export default Tasks;
