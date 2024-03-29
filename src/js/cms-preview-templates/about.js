import React from "react";
import { List } from 'immutable';
import ReactMarkdown from 'react-markdown';

import Jumbotron from "./components/jumbotron";

const MediaBlock = ({heading, body, imageUrlA, reverse}) => {
  const imageContainerClassName = reverse
    ? "ph3-m w-50-m"
    : "ph3-m w-50-m order-last-m";
  return <div className="flex-m mhn3-m mb4">
    <div className={imageContainerClassName}>
      <img src={imageUrlA} alt="" className="db mb2" />
    </div>
    <div className="ph3-m w-50-m">
      <h3 className="f3 b lh-title mb1">{heading}</h3>
      {body}
      {/* { widgetFor(body) } */}
    </div>
  </div>;
};

export default class ValuesPreview extends React.Component {
  render() {
    const {entry, widgetFor, getAsset} = this.props;

    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

    const entryValues = entry.getIn(["data", "about_entries"]);
    const values = entryValues ? entryValues.toJS() : [];

    return <div>
      <Jumbotron image={image} title={entry.getIn(["data", "title"])} />
      <div className="bg-off-white pv4">
        <div className="mw7 center ph3 pt4">
          {values.map(({body, heading, imageUrlA}, i) =>
            <MediaBlock key={i} body={body} heading={heading} imageUrlA={imageUrlA} reverse={i % 2 === 0} widgetFor={widgetFor} />
          )}
        </div>
      </div>
    </div>;
  }
}
