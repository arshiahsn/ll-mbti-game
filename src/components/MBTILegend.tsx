import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { Button, List, ListItem, Box } from "@mui/material";

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
    <Box className="mbti-legend">
      <Box className="mbti-legend-header">
        <h3 className="mbti-legend-title">{title}</h3>
        <Button className="mbti-legend-toggle" onClick={toggleVisibility}>
          {isVisible ? "Hide" : "Show"}
        </Button>
      </Box>
      {isVisible && (
        <>
          <Button className="mbti-legend-toggle" onClick={toggleInfoVisibility}>
            {isInfoVisible ? "Hide Breakdown" : "Show Breakdown"}
          </Button>
          {isInfoVisible && (
            <Box className="mbti-legend-info">
              <h4>MBTI Letter Meanings:</h4>
              <Box className="mbti-legend-info-grid">
                <Box>
                  <strong>I</strong> – Introversion
                </Box>
                <Box>
                  <strong>E</strong> – Extraversion
                </Box>
                <Box>
                  <strong>S</strong> – Sensing
                </Box>
                <Box>
                  <strong>N</strong> – Intuition
                </Box>
                <Box>
                  <strong>T</strong> – Thinking
                </Box>
                <Box>
                  <strong>F</strong> – Feeling
                </Box>
                <Box>
                  <strong>J</strong> – Judging
                </Box>
                <Box>
                  <strong>P</strong> – Perceiving
                </Box>
              </Box>
            </Box>
          )}
          <List className="mbti-legend-list">
            {types.map((type, index) => (
              <ListItem key={index} className="mbti-legend-item">
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
                  className="mbti-tooltip"
                  anchorId={`tooltip-${type.label}`} // Connect tooltip to element by id
                  place="top"
                  content={type.summary} // Tooltip content
                  clickable={true}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default MBTILegend;
