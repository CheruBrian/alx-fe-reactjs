import { userState } from 'react';
function Counter() {
    const [count, setCount] = useState(0);

return (
    <div>
        <p>Cureent Count: {count}</p>
        <button onClick={()=> setCount(count + 1)}>Increamnt</button>
        <button onClick={()=> setCount(count - 1)}>Decreamnt</button>
        <button onClick={()=> setCount(0)}>Reset</button>
    </div>
);
}
export default Counter;
