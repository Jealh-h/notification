import React, { Suspense, lazy } from 'react';
import { Spin } from '@douyinfe/semi-ui';
import ModalContext from './layout/context';
import RootStore from './stores';
import ErrorBoundary from './components/ErrorBoundary/index.jsx';
import './App.css'

const rootStore = new RootStore();
const Main = lazy(() => import('./pages/index'))

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            toggleVisible: this.toggleVisible,
            loginVisble: false,
            toggleLoginVisible: this.toggleLoginVisible,
            isUpdate: false,
            toggleUpdateState: this.toggleUpdateState,
            store: rootStore
        }
    }
    toggleLoginVisible = () => {
        this.setState(state => ({
            loginVisble: !state.loginVisble
        }))
    }
    toggleVisible = () => {
        this.setState(state => ({
            visible: !state.visible
        }));
    }
    toggleUpdateState = () => {
        this.setState(state => ({
            isUpdate: !state.isUpdate
        }))
    }
    render() {
        return (
            <Suspense fallback={<Spin size="large" />}>
                <ErrorBoundary>
                    <ModalContext.Provider value={this.state}>
                        <Main />
                    </ModalContext.Provider>
                </ErrorBoundary>
            </Suspense>
        )
    }
}