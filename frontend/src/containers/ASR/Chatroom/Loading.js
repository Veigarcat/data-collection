import React,{ useState } from "react";
import { css } from "@emotion/react";
import {BeatLoader} from "react-spinners";
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function Loading({loading}) {
  // let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ff4f5e");

  return (
    <div className="sweet-loading">
      {/*<input*/}
      {/*  value={color}*/}
      {/*  onChange={(input) => setColor(input.target.value)}*/}
      {/*  placeholder="Color of the loader"*/}
      {/*/>*/}
      {/*<p>Vui lòng chờ trong giây lát</p>*/}
      <BeatLoader color={color} loading={loading} css={override} size={15} />
    </div>
  );
}

export default Loading;
