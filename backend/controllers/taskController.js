import * as taskQueries from '../data/taskQueries.js';

async function createTask(req, res) {
    try {
        const {
            title,
            description,
            priority,
            dueDate,
            waitUntil,
            remindPeriodDays,
            estimatedDurationMinutes,
            tags,
        } = req.body;
        const userId = req.user.id; // ← Kommt aus jwtAuth Middleware!
        if (!title || title.trim() === '') {
            return res.status(400).json({ message: 'title is required' });
        }
        if ((priority && priority < 1) || priority > 5) {
            return res.status(400).json({ message: 'priority must be a number between 1 and 5' });
        }

        const task = await taskQueries.createTask(userId, {
            title: title.trim(),
            description,
            priority,
            dueDate,
            waitUntil,
            remindPeriodDays,
            estimatedDurationMinutes,
            tags: tags || [],
        });

        res.status(201).json({ message: 'task created', task });
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ message: 'internal server error' });
    }
}

async function getTasksByUserId(req, res) {
    try {
        const userId = req.user.id; // ← Kommt aus jwtAuth Middleware!
        const filters = req.query; // Hier können Filter wie status, priority, etc. übergeben werden

        const tasks = await taskQueries.getTasksByUserId(userId, filters);
        res.status(200).json({
            message: ' tasks retrieved successfully',
            count: tasks.length,
            tasks,
        });
    } catch (err) {
        console.error('Error retrieving tasks:', err);
        res.status(500).json({ message: 'internal server error' });
    }
}
async function getTaskById(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id; // ← Kommt aus jwtAuth Middleware!

        const task = await taskQueries.getTaskById(id, userId);
        if (!task) {
            return res.status(404).json({ message: 'task not found' });
        }

        res.status(200).json({
            message: 'task retrieved successfully',
            task,
        });
    } catch (err) {
        console.error('Error retrieving task:', err);
        res.status(500).json({ message: 'internal server error' });
    }
}

async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id; // ← Kommt aus jwtAuth Middleware!
        const updateData = req.body;

        const task = await taskQueries.updateTask(id, userId, updateData);
        if (!task) {
            return res.status(404).json({ message: 'task not found' });
        }

        res.status(200).json({
            message: 'task updated successfully',
            task,
        });
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ message: 'internal server error' });
    }
}

async function updateTaskTags(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { tags } = req.body;

        if (!Array.isArray(tags)) {
            return res.status(400).json({ message: 'tags must be an array of strings' });
        }

        const task = await taskQueries.updateTaskTags(id, userId, tags);
        if (!task) {
            return res.status(404).json({ message: 'task not found' });
        }

        res.status(200).json({
            message: 'task tags updated successfully',
            task,
        });
    } catch (err) {
        console.error('Error updating task tags:', err);
        res.status(500).json({ message: 'internal server error' });
    }
}

async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id; // ← Kommt aus jwtAuth Middleware!

        const task = await taskQueries.deleteTask(id, userId);

        if (!task) {
            return res.status(404).json({ message: 'task not found' });
        }

        res.status(200).json({
            message: 'task deleted successfully',
            task,
        });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ message: 'internal server error' });
    }
}

export { createTask, getTasksByUserId, getTaskById, updateTask, updateTaskTags, deleteTask };
