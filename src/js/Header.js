import './css/Header.css';

function Header({ total, completed }) {
  return (
    <h1 className="TodoCounter">
      <span>
        Has completado <span>{completed}</span> de <span>{total}</span> tareas
      </span>
    </h1>
  );
}

export { Header };