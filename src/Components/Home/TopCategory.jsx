import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
} from '../../utils/Icons';
import { TopCategories } from '../../utils/siteData';

const TopCategory = () => {
  const [currCategory, setCurrCategory] =
    useState('all');
  return (
    <div id="top_category">
      <div className="arrow left">
        <ArrowLeft />
      </div>
      <div id="searches">
        <div className="infinity-scroll">
          {TopCategories.map((title, index) => (
            <div
              key={index}
              className={
                title.toLowerCase() ==
                currCategory
                  ? 'active'
                  : ''
              }
            >
              {title}
            </div>
          ))}
        </div>
      </div>
      <div className="arrow right">
        <ArrowRight />
      </div>
    </div>
  );
};

export default TopCategory;
