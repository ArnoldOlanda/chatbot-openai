// import { StreamTest } from "./components/StreamTest";

import { MessageBox } from "./components/MessageBox";

function App() {
    return (
        <div className="p-4 bg-red-200">
            {/* <StreamTest /> */}
            <MessageBox type="user" text="Prueba" />
            <MessageBox type="assistant" text="Prueba" />
            <MessageBox type="user" text="Prueba" />
            <MessageBox type="assistant" text="Prueba" />
        </div>
    );
}

export default App;
