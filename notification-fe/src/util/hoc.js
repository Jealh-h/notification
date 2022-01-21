import React from 'react';
import store from '../models/index';

/**
 * 使用方式类似于react-redux里面的connect，都是利用高阶组件，绑定props只不过这个就像西科大彭于晏与真正彭于晏的差别
 * 
 * 绑定到组件的props上面
 */


export function connect(mapToprops) {
    console.log(store);
    return (Component) => {
        class Connect extends React.Component {
            constructor(props) {
                super(props)
            }
            render() {
                return (
                    <Component {...mapToprops(store)} />
                )
            }
        }
        return Connect;
    }
}