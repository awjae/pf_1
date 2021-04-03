import React, { useState }from 'react';
import Profile from '../../image/profile.png';
import { CakeRounded } from '@material-ui/icons';
import './MyPage.css';

function MyPage() {

    const [skills, setSkills] = useState(["Javascript", "HTML", "CSS", "React.js", "Java", "Node.js", "jQeury", "웹개발", "eGov"
                                        , "OpenLayers", "Geoserver", "PostGIS", "Postgres", "gridStack.js Contributor", "ol-ext.js Contributor"])

    return (
        <section className="MyPage">
            <header>
                <div className="MyPage__header">
                    <img src={ Profile }></img>
                </div>
                <div className="MyPage__header--name">
                    <span>JAE SEUNG AW</span>
                </div>
            </header>
            <article>
                <div className="MyPage__body--title">
                    <p><CakeRounded /></p>
                    <p><span>프론트엔드 개발 2년차</span></p>    
                </div>    
                <div className="MyPage__body--contents">
                    { skills &&
                        skills.map(( skill, idx ) => (
                            <span key={ idx }>{ skill }</span>
                        ))}
                </div>
            </article>
        </section>
    )
}

export default MyPage
