import { Provider } from "react-redux";
import "./App.css";
import SideNavComponent from "./Components/SideNavComponent";
import store from "./Store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SideNavComponent />
      </div>
    </Provider>
  );
}

export default App;
