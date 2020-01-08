import React from "react";

import {Photo, PhotoUploader} from "../photouploader/PhotoUploader";

export interface ProjectBuilderState {
  photos: Photo[];
}

export default class ProjectBuilder extends React.PureComponent<{}, ProjectBuilderState> {
  public state: ProjectBuilderState = {
    photos: [
      {
        id: "photo1",
        name: "Photo 1",
        description: "Description of Photo 1",
        preview: this.randomPhotoPreview(),
      },
      {
        id: "photo2",
        name: "Photo 2",
        preview: this.randomPhotoPreview(),
      },
      {
        id: "photo3",
        name: "Photo 3",
        description: "Description of Photo 3",
        preview: this.randomPhotoPreview(),
      },
    ],
  };

  public render(): React.ReactNode {
    const {photos} = this.state;
    return (
      <div className="mx-auto py-5" style={{width: "500px"}}>
        <PhotoUploader photos={photos} onUpdatePhotos={this.onUpdatePhotos}/>
      </div>
    );
  }

  private onUpdatePhotos = (photos: Photo[]): void => {
    this.setState({
      photos: photos,
    });
  };

  private randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private randomPhotoPreview(): string {
    // const width = this.randomBetween(200, 300);
    // const height = this.randomBetween(200, 300);
    // const noise = Math.random().toString(36).substring(7);
    // return `https://picsum.photos/${width}/${height}?noise=${noise}`;
    return "https://picsum.photos/200/200";
  }
}
