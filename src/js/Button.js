import React from 'react';
import './css/Button.css';

function Button({ addTask }) {
  const [open, setOpen] = React.useState(false);
  const [newTask, setNewTask] = React.useState('');

  const handleAddTask = async () => {
    if (newTask.trim() === '') {
      alert('Escribe una tarea');
      return;
    }

    await addTask(newTask);

    setNewTask('');
    setOpen(false);
  };

  return (
    <>
      <button
        className="CreateTodoButton"
        onClick={() => setOpen(true)}
      >
        +
      </button>

      {open && (
        <div className="ButtonModalBackground">
          <div className="ButtonModal">
            <h2>Nueva tarea</h2>

            <textarea
              placeholder="Escribe tu tarea..."
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
            />

            <div className="ButtonModal-buttons">
              <button
                className="ButtonModal-cancel"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </button>

              <button
                className="ButtonModal-add"
                onClick={handleAddTask}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { Button };