import React from 'react';

const styles = {
    tdWrapper: 'px-5 py-5 border-b border-gray-200 text-sm',
    tdValue: 'flex items-center',
    text: 'text-gray-900 whitespace-no-wrap'
}

const Cell =({children})=>(
    <td className={styles.tdWrapper}>
        <div className={styles.tdValue}>
            <p className={styles.text}>{children}</p>
        </div>
    </td>
)

export default Cell;