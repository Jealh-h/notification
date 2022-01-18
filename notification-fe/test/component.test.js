import React from 'react';

export default function TC(props) {
    const { func } = props;
    let rest = props;
    const componet = {
        test: <SomeComp func={func} />
    }
    return React.cloneElement(componet["test"], Object.assign({}, rest));
}

function SomeComp(props) {
    const { func } = props;
    return <div>
        {func()}
    </div>
}