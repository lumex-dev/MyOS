import { useState } from 'react';

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    const toggleExpand = (taskId) => {
        setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
    };

    if (!tasks || tasks.length === 0) {
        return <p>No tasks found.</p>;
    }

    return (
        <div>
            <h2>Tasks ({tasks.length})</h2>
            {tasks.map((task) => (
                <div
                    key={task.id}
                    style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
                >
                    <div onClick={() => toggleExpand(task.id)} style={{ cursor: 'pointer' }}>
                        <h3>{task.title}</h3>
                        <p>
                            Status: {task.status} | Priority: {task.priority}
                        </p>
                    </div>

                    {expandedTaskId === task.id && (
                        <div
                            style={{
                                marginTop: '10px',
                                paddingTop: '10px',
                                borderTop: '1px solid #ddd',
                            }}
                        >
                            <p>
                                <strong>Description:</strong> {task.description}
                            </p>
                            <p>
                                <strong>Due Date:</strong>{' '}
                                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                            </p>
                            <p>
                                <strong>Next Step:</strong> {task.nextStep || 'N/A'}
                            </p>

                            <button onClick={() => onUpdateTask(task.id, { status: 'DONE' })}>
                                Mark as Done
                            </button>
                            <button
                                onClick={() => onDeleteTask(task.id)}
                                style={{ marginLeft: '10px', color: 'red' }}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default TaskList;
