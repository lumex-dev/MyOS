import { prisma } from '../data/prisma.js';

function buildDueDateFilter(dueDateFilter) {
    if (!dueDateFilter) return {};

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const weekEnd = new Date(today);
    const daysUntilSunday = 7 - today.getDay();
    weekEnd.setDate(weekEnd.getDate() + daysUntilSunday);

    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const monthEnd = new Date(today);
    monthEnd.setMonth(monthEnd.getMonth() + 1); // ← Gehe zum nächsten Monat
    monthEnd.setDate(1); // ← Setz auf 1. Tag des nächsten Monats
    monthEnd.setDate(monthEnd.getDate() - 1); // ← Gehe einen Tag zurück, um den letzten Tag des aktuellen Monats zu erhalten

    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    if (dueDateFilter === 'overdue') {
        return {
            dueDate: {
                lt: today,
            },
        };
    }

    if (dueDateFilter === 'today') {
        return {
            dueDate: {
                gte: today,
                lt: tomorrow,
            },
        };
    }

    if (dueDateFilter === 'thisWeek') {
        return {
            dueDate: {
                gte: today,
                lt: weekEnd,
            },
        };
    }

    if (dueDateFilter === 'sevenDaysFromNow') {
        return {
            dueDate: {
                gte: today,
                lt: sevenDaysFromNow,
            },
        };
    }

    if (dueDateFilter === 'thisMonth') {
        return {
            dueDate: {
                gte: today,
                lt: monthEnd,
            },
        };
    }

    if (dueDateFilter === 'thirtyDaysFromNow') {
        return {
            dueDate: {
                gte: today,
                lt: thirtyDaysFromNow,
            },
        };
    }
    if (dueDateFilter.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const date = new Date(dueDateFilter);
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        return {
            dueDate: {
                gte: date,
                lt: nextDay,
            },
        };
    }

    return {};
}

function buildPriorityFilter(priorityFilter) {
    console.log('buildPriorityFilter called with:', priorityFilter);
    if (!priorityFilter) return {};

    if (priorityFilter.includes('-')) {
        console.log('Parsing priority range:', priorityFilter);
        const [min, max] = priorityFilter.split('-').map(Number);
        return {
            priority: {
                gte: min,
                lte: max,
            },
        };
    }

    const priority = parseInt(priorityFilter);
    console.log('Parsed priority:', priority);
    return { priority };
}

function buildStatusFilter(statusFilter) {
    if (!statusFilter) return {};

    const statuses = statusFilter.split(',').map((s) => s.trim().toUpperCase());
    return {
        status: {
            in: statuses,
        },
    };
}

function buildTagFilter(tagFilter) {
    if (!tagFilter) return {};

    const tagIds = tagFilter.split(',').map((t) => t.trim());

    return {
        tags: {
            some: {
                tagId: {
                    in: tagIds,
                },
            },
        },
    };
}

function buildWaitUntilFilter(waitUntilFilter) {
    if (!waitUntilFilter) return {};

    if (waitUntilFilter === 'active') {
        return {
            waitUntil: { not: null },
        };
    }
}

async function createTask(userId, taskData) {
    const {
        title,
        description,
        priority,
        dueDate,
        waitUntil,
        remindPeriodDays,
        estimatedDurationMinutes,
        tags = [],
    } = taskData;

    return await prisma.task.create({
        data: {
            userId,
            title,
            description,
            priority,
            dueDate: dueDate ? new Date(dueDate) : null,
            waitUntil: waitUntil ? new Date(waitUntil) : null,
            remindPeriodDays,
            estimatedDurationMinutes,
            status: 'PUSH',
            tags: { create: tags.map((tagId) => ({ tagId })) },
        },
        include: {
            tags: {
                include: {
                    tag: {
                        include: {
                            category: true,
                        },
                    },
                },
            },
        },
    });
}

async function getTasksByUserId(userId, filters) {
    // 1. Where-Clause zusammenbauen
    const where = {
        userId,
        ...buildStatusFilter(filters.status),
        ...buildPriorityFilter(filters.priority),
        ...buildDueDateFilter(filters.dueDate),
        ...buildTagFilter(filters.tags),
        ...buildWaitUntilFilter(filters.waitUntil),
    };

    // 2. Order-By zusammenbauen

    const orderBy = [];

    if (filters.sort) {
        const sorts = filters.sort.split(',').map((s) => s.trim());

        sorts.forEach((sort) => {
            const [field, direction] = sort.split(':');
            if (field && direction) {
                orderBy.push({
                    [field]: direction.toLowerCase(),
                });
            }
        });
    }
    // 3. Query ausführen
    const tasks = await prisma.task.findMany({
        where,
        orderBy: orderBy.length > 0 ? orderBy : undefined,
        include: {
            tags: {
                include: {
                    tag: {
                        include: {
                            category: true,
                        },
                    },
                },
            },
        },
    });

    return tasks;
}

async function getTaskById(taskId, userId) {
    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: {
            tags: {
                include: {
                    tag: {
                        include: {
                            category: true,
                        },
                    },
                },
            },
        },
    });

    if (!task || task.userId !== userId) {
        return null;
    }

    return task;
}

async function updateTask(taskId, userId, updateData) {
    const task = await getTaskById(taskId, userId);
    if (!task) return null;

    const allowedFields = [
        'title',
        'description',
        'nextStep',
        'status',
        'priority',
        'dueDate',
        'waitUntil',
        'remindPeriodDays',
        'estimatedDurationMinutes',
        'completedAt',
    ];

    const sanitizedData = {};
    Object.keys(updateData).forEach((key) => {
        if (allowedFields.includes(key)) {
            if (
                (key === 'dueDate' || key === 'waitUntil' || key === 'completedAt') &&
                updateData[key]
            ) {
                sanitizedData[key] = new Date(updateData[key]);
            } else {
                sanitizedData[key] = updateData[key];
            }
        }
    });

    return await prisma.task.update({
        where: { id: taskId },
        data: sanitizedData,
        include: {
            tags: {
                include: {
                    tag: {
                        include: {
                            category: true,
                        },
                    },
                },
            },
        },
    });
}

async function updateTaskTags(taskId, userId, tagIds) {
    const task = await getTaskById(taskId, userId);
    if (!task) return null;

    await prisma.taskTag.deleteMany({
        where: { taskId },
    });

    if (tagIds && tagIds.length > 0) {
        await prisma.taskTag.createMany({
            data: tagIds.map((tagId) => ({
                taskId,
                tagId,
            })),
        });
    }

    return await getTaskById(taskId, userId);
}

async function deleteTask(taskId, userId) {
    const task = await getTaskById(taskId, userId);
    if (!task) return null;

    return await prisma.task.delete({
        where: { id: taskId },
    });
}

export { createTask, getTasksByUserId, getTaskById, updateTask, updateTaskTags, deleteTask };
