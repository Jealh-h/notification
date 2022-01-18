import React, { Suspense } from 'react';
import { Spin } from '@douyinfe/semi-ui';
import Main from './pages/index';
import ModalContext from './layout/context'
import './App.css'

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