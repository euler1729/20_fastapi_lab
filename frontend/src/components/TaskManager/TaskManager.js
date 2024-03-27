import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Card, CardContent } from '@mui/material';

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [editedTasks, setEditedTasks] = useState({});
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    const handleTitleInputChange = (event) => {
        setNewTaskTitle(event.target.value);
    };

    const handleDescriptionInputChange = (event) => {
        setNewTaskDescription(event.target.value);
    };

    const addTask = () => {
        if (newTaskTitle.trim() !== '' && newTaskDescription.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), title: newTaskTitle, description: newTaskDescription }]);
            setNewTaskTitle('');
            setNewTaskDescription('');
        }
    };

    const handleEditClick = (id) => {
        setEditedTasks({ ...editedTasks, [id]: true });
    };

    const handleEdit = (id) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    title: editedTasks[id]?.title || task.title,
                    description: editedTasks[id]?.description || task.description
                };
            }
            return task;
        });
        setTasks(updatedTasks);
        setEditedTasks({});
    };

    const handleDelete = (id) => {
        const filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks);
    };

    return (
        <div style={{ padding: 20 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        value={newTaskTitle}
                        onChange={handleTitleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        value={newTaskDescription}
                        onChange={handleDescriptionInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" onClick={addTask} fullWidth>
                        Add Task
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {tasks.map((task) => (
                    <Grid item xs={12} key={task.id} style={{margin:'20px'}}>
                        <Card>
                            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {editedTasks[task.id] ? (
                                    <>
                                        <TextField
                                            label="Title"
                                            variant="outlined"
                                            value={editedTasks[task.id]?.title || task.title}
                                            onChange={(e) => setEditedTasks({ ...editedTasks, [task.id]: { ...editedTasks[task.id], title: e.target.value } })}
                                        />
                                        <TextField
                                            label="Description"
                                            variant="outlined"
                                            value={editedTasks[task.id]?.description || task.description}
                                            onChange={(e) => setEditedTasks({ ...editedTasks, [task.id]: { ...editedTasks[task.id], description: e.target.value } })}
                                        />
                                    </>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                                        <Typography variant="h5" component="h2" style={{ textAlign: 'left' }}>
                                            {task.title}
                                        </Typography>
                                        <Typography color="textSecondary" style={{ textAlign: 'left' }}>
                                            {task.description}
                                        </Typography>
                                    </div>
                                )}
                                <div>
                                    <Button
                                        style={{margin:'20px'}}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            if (editedTasks[task.id]) {
                                                handleEdit(task.id);
                                            } else {
                                                handleEditClick(task.id);
                                            }
                                        }}
                                    >
                                        {editedTasks[task.id] ? 'Save' : 'Edit'}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default TaskManager;
