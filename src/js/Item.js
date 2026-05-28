import './css/Item.css';

function Item(task) {
  return (
    <li className="TodoItem">
      <span
        className={`Icon Icon-Check ${task.completed && "Icon-Check--active"}`}
        onClick={task.onCompleted}
      >
        V
      </span>

      <p className={`TodoItem-p ${task.completed && "TodoItem-p--complete"}`}>
        {task.text}
      </p>

      <span
        className="Icon Icon-Delete"
        onClick={task.onDelete}
      >
        X
      </span>
    </li>
  );
}

export { Item };