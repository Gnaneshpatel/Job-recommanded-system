import React from 'react';
import Base from './Base';
import Certificate2 from './Certificate2';
import Education2 from './Education2';
import ProfileCard2 from "./ProfileCard2";
import Skills2 from './Skills2';

const StudentProfile2 = () => {
    return (
        <Base>
            <ProfileCard2 />
            <Certificate2 />
            <Education2 />
            <Skills2 />
        </Base>
    );
}

export default StudentProfile2;
