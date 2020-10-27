import  React, { useState, useEffect } from 'react';
import './css/LeftNav.css';

function LeftNav() {

    const [menuArr, setmenuArr] = useState([]);

    useEffect(() => {

        const list = ["홈", "컨텐츠1", "컨텐츠2", "컨텐츠3"];
        setmenuArr(list);

    }, [])



    return (
        <aside className="leftNav">
            <nav className="leftNav--menu">
                { menuArr && 
                    menuArr.map((el, idx) => (
                        <React.Fragment key={ idx }>
                            <div className="leftNav--menu__icon">
                                {el}
                            </div>
                        </React.Fragment>
                    ))
                }
            </nav>
            {/* <div className="info" id="info">
                <ol className="info--contents" id="info--contents" style={{ overflow: 'auto' }} >
                </ol>
            </div> */}
        </aside>
    )
}

export default LeftNav
