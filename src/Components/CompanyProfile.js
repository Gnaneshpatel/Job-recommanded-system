import React from 'react';
import JobPost from './JobPost';
import Base from './Base';
import CompanyProfileCard from './CompanyProfileCard';
import JobsPosted from './JobsPosted';

const CompanyProfile = () => {
  return (
    <Base>
      <CompanyProfileCard />
      <JobPost />
      <JobsPosted />
    </Base>
  );
};

export default CompanyProfile;
