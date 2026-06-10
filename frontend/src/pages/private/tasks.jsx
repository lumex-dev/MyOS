// import { useContext, useState, useEffect } from 'react';
// import { AuthContext } from '../../context/authContext';
// import { getToken } from '../../utils/functions';
import TaskList from '../../components/tasks/taskList.jsx';
import TaskForm from '../../components/tasks/taskForm.jsx';
import { useTasks } from '../../hooks/useTasks.jsx';

function Tasks() {
    const { tasks, tasksLoading, deleteTask, updateTask, createTask } = useTasks();

    if (tasksLoading) {
        return <p>Loading...</p>;
    }
    if (!tasks) {
        return <p>Please log in to view your tasks.</p>;
    }

    return (
        <div>
            <h1>My Tasks</h1>
            <p>Total: {tasks.length}</p>

            <TaskForm onTaskCreated={createTask} />

            <TaskList tasks={tasks} onDeleteTask={deleteTask} onUpdateTask={updateTask} />
        </div>
    );
}

export default Tasks;
