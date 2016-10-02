Redux Focus
===========

Handle auto-focus in your application.

Installation
------------

```
npm install --save redux-focus
```

Usage
-----

Setup Redux:

```js
import { focusReducer, createFocusMiddleware } from 'redux-focus';

const rootReducer = combineReducers({
  ...reducers,
  focus: focusReducer
});

const middleware = [
  thunk,
  logger(),
  createFocusMiddleware({
    isFocusEvent(event) {
      // by default
      // return !(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
    },
    getDefaultFocusState(state) {
      // by default
      // return state.focus;
    }
  })
];

const store = createStore(rootReducer, applyMiddleware(...middleware));
```

Some component:

```js
import { setFocus } from 'redux-focus';

class AppEditor extends Component {
  componentDidMount() {
    this.props.onFocusAvailable({
      focus: () => {
        if (this.textarea) {
          this.textarea.focus();
        }
      },
      blur: () => {
        console.log('AppEditor not in focus');
      }
    });
  }

  render() {
    return (
      <textarea
        ref={(textarea) => this.textarea = textarea}
      />
    )
  }
}

const mapActionsToProps = {
  onFocusAvailable: setFocus
};

export default connect(mapStateToProps, mapActionsToProps)(AppEditor);
```

License
-------

[MIT](LICENSE)
