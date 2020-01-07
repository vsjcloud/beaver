import React from "react";

export type AlbumPhotoCardInfo = {
  preview: string;
  previewSet: string;
  description: string;
};

export type AlbumPhotoCardProps = {
  info: AlbumPhotoCardInfo;
};

export function AlbumPhotoCard({info}: AlbumPhotoCardProps): React.ReactElement {
  return (
    <div
      style={{
        height: "80vh",
      }}
    >
      <div
        style={{
          height: "70vh",
        }}
      >
        <img className="h-full object-contain mx-auto block" src={info.preview} srcSet={info.previewSet} alt={info.description}/>
      </div>
      <div className="text-gray-1 text-center italic p-3 w-full">
        {info.description}
      </div>
    </div>
  )
}
