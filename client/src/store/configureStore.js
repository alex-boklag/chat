import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from '../rootReducer';
import rootSaga from '../rootSaga';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

    const store = createStore(rootReducer,
        composeEnhancers(
            applyMiddleware(sagaMiddleware)
        )
    );

    sagaMiddleware.run(rootSaga);

    return store;
}