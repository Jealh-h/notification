import React from 'react';

/**
 * 使用方式类似于react-redux里面的connect，都是利用高阶组件，绑定props只不过这个就像西科大彭于晏与真正彭于晏的差别
 */


export function connect(mapToprops) {

    return (Component) => {
        class Connect extends React.Component {
            constructor(props) {
                super(props)
            }
            render() {
                return (
                    <Component {...mapToprops} />
                )
            }
        }
        return Connect;
    }
}