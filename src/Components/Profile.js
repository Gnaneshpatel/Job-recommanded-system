import React from 'react';
import Base from './Base';
import ProfileCard from './ProfileCard';
import Education from './Education';
import Skill from './Skill';
import Certificate from './Certificate';

const Profile = () => {
    return (
        <Base>
            <ProfileCard />
            <Education />
            <Certificate />
            <Skill />
        </Base>
    );
}

export default Profile;
