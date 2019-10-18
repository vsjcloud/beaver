import React from "react";

import {Intent} from "../../../base/core/common/intent";
import Button from "../../../base/core/components/button/Button";
import {Icon} from "../../../base/core/components/icon/Icon";
import {IconName} from "../../../base/icons";

export interface Photo {
  id: string;
  name: string;
  description?: string;
  preview: string;
}

export interface PhotoUploaderProps {
  photos: Photo[];
  onUpdatePhotos: (photos: Photo[]) => void;
}

export class PhotoUploader extends React.PureComponent<PhotoUploaderProps, {}> {
  public render(): React.ReactNode {
    return (
      <div className="bg-light-gray-4 shadow-elevation-1 rounded">
        {this.renderToolbar()}
        {this.renderPhotos()}
      </div>
    )
  }

  private renderToolbar(): React.ReactNode {
    const {photos} = this.props;

    return (
      <div className="flex">
        <div className="flex-grow">{photos.length} ảnh</div>
        <div>
          <Button/>
        </div>
      </div>
    )
  }

  private renderPhotoCard(photo: Photo): React.ReactNode {
    return (
      <div className="flex border-b border-gray-5 bg-white py-2" key={photo.id}>
        <div className="flex items-center ml-2 mr-3">
          <Icon intent={Intent.Primary} icon={IconName.DragHandleVertical}/>
        </div>
        <div className="shadow-elevation-0">
          <img src={photo.preview} style={{height: "60px", width: "60px"}} alt="thumbnail"/>
        </div>
        <div>
          {photo.name}
          {photo.description}
        </div>
      </div>
    )
  }

  private renderPhotos(): React.ReactNode {
    const {photos} = this.props;
    const photoCards = photos.map(this.renderPhotoCard);
    return (
      <div>
        {photoCards}
      </div>
    )
  }
}
