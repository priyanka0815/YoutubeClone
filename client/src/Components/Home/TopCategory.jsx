import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from '../../utils/Icons';
import { TopCategories } from '../../utils/siteData';

const TopCategory = () => {
  const [currCategory, setCurrCategory] = useState('all');

  useEffect(() => {
    const topCategory = document.querySelector('#top_category'),
      scrollElem = topCategory.querySelector('#searches'),
      arrowLeft = topCategory.querySelector('.arrow.left'),
      arrowRight = topCategory.querySelector('.arrow.right'),
      scrollAmount = 200;

    var scrollDetector, leftArrowFn, rightArrowFn;

    function scrollTopCategory(e) {
      console.log(93024);
      if (!scrollElem) return;

      console.log(31);

      var scroll = scrollAmount * e;

      scrollElem.scrollLeft += scroll;
    }

    scrollElem.addEventListener(
      'scroll',
      (scrollDetector = function (e) {
        if (scrollElem.scrollLeft == 0) {
          arrowLeft.style.setProperty('display', 'none');
        } else if (scrollElem.scrollWidth - scrollElem.clientWidth <= scrollElem.scrollLeft) {
          arrowRight.style.setProperty('display', 'none');
        } else {
          arrowLeft.style.setProperty('display', 'block');
          arrowRight.style.setProperty('display', 'block');
        }
      })
    );

    arrowLeft.addEventListener('click', (leftArrowFn = () => scrollTopCategory(-1)));
    arrowRight.addEventListener('click', (rightArrowFn = () => scrollTopCategory(1)));

    return () => {
      scrollElem.removeEventListener('scroll', scrollDetector);
      arrowLeft.removeEventListener('click', leftArrowFn);
      arrowRight.removeEventListener('click', rightArrowFn);
    };
  }, []);

  return (
    <div id="top_category">
      <div
        className="arrow left"
        style={{
          display: 'none',
        }}
      >
        <ArrowLeft />
      </div>

      <div id="searches">
        <div className="infinity-scroll">
          {TopCategories.map((title, index) => (
            <div key={index} className={title.toLowerCase() == currCategory ? 'active' : ''} title={title}>
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
