// Delete.tsx
import { useParams } from 'react-router-dom';

function Delete() {
  const { id } = useParams();

  // Implemente a lógica para deletar um dado pelo ID aqui
  return <div>Delete Component</div>;
}

export default Delete;