import React from "react";
import { Link } from "react-router-dom";
import { PlayIcon } from "../../../utils/Icons";

const Section = (props) => {
  if (props.cardData.length == 0) return;

  return (
    <section className={`channel-home-section ${props.className ?? ""}`}>
      <div className="section-header">
        {props.sectionTitleLink ? (
          <Link to={props.sectionTitleLink}>
            <h2 className="section-title">{props.sectionTitle}</h2>
          </Link>
        ) : (
          <h2 className="section-title">{props.sectionTitle}</h2>
        )}

        {props.titlePlayAllLink && (
          <Link to={props.titlePlayAllLink} className="play-all btn">
            <span className="icon">
              <PlayIcon />
            </span>
            <span>Play all</span>
          </Link>
        )}
      </div>

      <div className="card-container">
        <div className="infinite">
          {props.Card && props.cardData?.map((card, idx) => <props.Card {...card} key={idx} />)}
        </div>
      </div>
    </section>
  );
};

export default Section;
