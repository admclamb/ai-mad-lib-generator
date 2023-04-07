import React from "react";

import MadLibReactions from "../MadLibReactions/MadLibReactions";
const MadLibViewer = ({ madLib, questions }) => {
  const { text } = madLib;
  const regex = /\[(.*?)\]/g;
  let index = 0;
  console.log(madLib, questions);

  return text ? (
    <div>
      <div className="mb-3">
        {
          <p className="text-lg">
            {text.split(" ").map((word, i) => {
              if (word.includes("[") && word.includes("]")) {
                const replaced = word.replace(regex, questions[index].answer);
                index++;
                return <b className="rainbow">{replaced} </b>;
              }
              return word + " ";
            })}
          </p>
        }
      </div>

      <MadLibReactions prompt={prompt} lib={text} />
    </div>
  ) : null;
};

export default MadLibViewer;
