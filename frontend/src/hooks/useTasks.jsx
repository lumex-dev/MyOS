import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { getToken } from '../utils/functions';

export function useTasks() {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [tasksLoading, setTasksLoading] = useState(true);

    // Zentrale Funktion - lädt Tasks neu
    async function loadTasks() {
        const token = getToken();
        const response = await fetch('http://localhost:3000/api/tasks', {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            console.error('failed to fetch tasks');
            return;
        }
        const data = await response.json();
        setTasks(data.tasks);
        setTasksLoading(false);
    }

    useEffect(() => {
        if (!user) return;
        loadTasks();
    }, [user]);

    async function deleteTask(taskId) {
        const token = getToken();
        await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        loadTasks();
    }

    async function updateTask(taskId, updatedData) {
        const token = getToken();
        await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
        });
        loadTasks();
    }

    async function createTask(taskData) {
        const token = getToken();
        const response = await fetch(`http://localhost:3000/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(taskData),
        });
        if (response.ok) {
            loadTasks();
            return await response.json();
        } else {
            console.error('Failed to create task');
        }
    }
    return {
        tasks,
        tasksLoading,
        loadTasks,
        deleteTask,
        updateTask,
        createTask,
    };
}
