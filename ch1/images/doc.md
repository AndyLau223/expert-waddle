# Tic-Tac-Toe Tutorial 

## App.js

```js
export default function Square() {
    return <button className"square">X </button>
}
```

The second line of code returns a button as value to caller. `Button`
is a JAX element. A JSX element is a combination of JavaScript and HTML tags that describes what
you'd like to display. `className` tells that CSS how to style the button.


## index.js

In this tutorial, `index.js` is a bridge between the component you created in the `App.js` file and the web browser.
We won't be editing this file during this project.

```js
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
```
