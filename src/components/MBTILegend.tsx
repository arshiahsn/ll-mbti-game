import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import "./MBTILegend.css";

type MBTIType = {
  label: string;
  color: string;
  description: string;
  link: string;
  summary: string;
};

interface MBTILegendProps {
  title: string;
  types: MBTIType[];
}

const MBTILegend: React.FC<MBTILegendProps> = ({ title, types }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  return (
    <div className="mbti-legend">
      <div className="mbti-legend-header">
        <h3 className="mbti-legend-title">{title}</h3>
        <button className="mbti-legend-toggle" onClick={toggleVisibility}>
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>
      {isVisible && (
        <>
          <button
            className="mbti-legend-toggle"
            onClick={toggleInfoVisibility}
          >
            {isInfoVisible
              ? "Hide Breakdown"
              : "Show Breakdown"}
          </button>
          {isInfoVisible && (
            <div className="mbti-legend-info">
              <h4>MBTI Letter Meanings:</h4>
              <div className="mbti-legend-info-grid">
                <div>
                  <strong>I</strong> – Introversion
                </div>
                <div>
                  <strong>E</strong> – Extraversion
                </div>
                <div>
                  <strong>S</strong> – Sensing
                </div>
                <div>
                  <strong>N</strong> – Intuition
                </div>
                <div>
                  <strong>T</strong> – Thinking
                </div>
                <div>
                  <strong>F</strong> – Feeling
                </div>
                <div>
                  <strong>J</strong> – Judging
                </div>
                <div>
                  <strong>P</strong> – Perceiving
                </div>
              </div>
            </div>
          )}
          <ul className="mbti-legend-list">
            {types.map((type, index) => (
              <li key={index} className="mbti-legend-item">
                <span
                  className="mbti-legend-color"
                  style={{ backgroundColor: type.color }}
                  id={`tooltip-${type.label}`} // Unique id for each tooltip
                  data-tooltip-content={type.summary} // Tooltip content
                ></span>
                <span className="mbti-legend-label">{type.label}</span>
                <p className="mbti-legend-description">
                  {type.description}{" "}
                  <a
                    href={type.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mbti-legend-link"
                  >
                    Read more
                  </a>
                </p>
                <Tooltip
                  anchorId={`tooltip-${type.label}`} // Connect tooltip to element by id
                  place="top"
                  content={type.summary} // Tooltip content
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MBTILegend;
