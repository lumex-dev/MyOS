import { useState } from 'react';
// import { createTask } from '../../hooks/useTasks.jsx';

function TaskForm({ onTaskCreated }) {
    //create Task import
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState(3);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const taskData = {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate).toISOString() : null,
                priority: parseInt(priority),
                tags: [],
            };
            await onTaskCreated(taskData);

            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority(3);
        } catch (err) {
            console.error('Error creating task:', err);
            alert('Failed to create task');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}
        >
            <h2>Create New Task</h2>

            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%' }}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%' }}
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{ display: 'block', marginBottom: '10px', padding: '5px', widht: '100%' }}
            >
                <option value={1}>Prio 1</option>
                <option value={2}>Prio 2</option>
                <option value={3}>Prio 3</option>
                <option value={4}>Prio 4</option>
                <option value={5}>Prio 5</option>
            </select>

            <input
                type="date"
                // placeholder="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button
                type="submit"
                disabled={loading}
                style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}
            />
        </form>
    );
}

export default TaskForm;
