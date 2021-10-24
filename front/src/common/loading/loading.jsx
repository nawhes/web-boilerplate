import React from 'react';

import style from './loading.module.scss';

const Loading = (props) => {
    return (
        <div className={style['wrapper']}>
            <div className={style['container']}>
                Loading...
            </div>
        </div>
    );
}

export default Loading;