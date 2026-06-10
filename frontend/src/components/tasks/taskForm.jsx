import { useState } from 'react';
import { getToken } from '../../utils/functions';

function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState(3);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const token = getToken();

        const response = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title,
                description,
                dueDate: dueDate ? new Date(dueDate).toISOString() : null,
                priority: parseInt(priority),
                tags: [],
            }),
        });

        if (response.ok) {
            const data = await response.json();
            onTaskCreated(data.task);
            //reset form
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority(3);
        } else {
            console.error('Failed to create task');
        }

        setLoading(false);
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
