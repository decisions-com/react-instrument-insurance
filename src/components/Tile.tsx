import * as React from "react";
import "./Tiles.css";

interface TileProps {
  image: string;
  title: string;
}

const Tile: React.FunctionComponent<TileProps> = ({
  image,
  title,
  children
}) => {
  return (
    <div className="mii-tile">
      <h3 className="mii-tile__title">{title}</h3>
      <img alt="Title" className="mii-tile__img" src={image} />
      <p>{children} →</p>
    </div>
  );
};

export default Tile;
