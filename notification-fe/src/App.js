import React, { Suspense, lazy } from 'react';
import { Spin } from '@douyinfe/semi-ui';
import ModalContext from './layout/context';
import Store from './models/index';
import './App.css'

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
            store: Store
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
        return <Suspense fallback={<Spin size="large" />}>
            <ModalContext.Provider value={this.state}>
                <Main />
            </ModalContext.Provider>
        </Suspense>
    }
}