
import { useState, useEffect } from 'react';

function Contador() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 1) {
      alert('¡El contador no puede ser mayor a 1!');
      setCount(1);
    }
  }, [count]);

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <button onClick={() => setCount(0)}>Reiniciar</button>
    </div>
  );
}

export default Contador;
