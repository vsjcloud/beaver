import {useAuthAxios} from "./axios";
import {useGRPCClient} from "./grpc";

import {PhotoAndID} from "../generated/proto/model/photo_pb";
import {
  BulkGetPhotosRequest,
  BulkGetPhotosResponse,
  GetPhotoRequest,
  GetPhotoResponse,
} from "../generated/proto/rpc/photo/photo_pb";
import {PhotoService} from "../generated/proto/rpc/photo/photo_pb_service";

export type PhotoClient = {
  getPhoto(request: GetPhotoRequest): Promise<GetPhotoResponse>;
  bulkGetPhotos(request: BulkGetPhotosRequest): Promise<BulkGetPhotosResponse>;
  uploadPhoto(photo: File): Promise<PhotoAndID>;
};

export function usePhotoClient(): PhotoClient {
  const grpcClient = useGRPCClient();
  const authAxios = useAuthAxios();

  function getPhoto(request: GetPhotoRequest): Promise<GetPhotoResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: PhotoService.getPhoto,
      request: request,
    });
  }

  function bulkGetPhotos(request: BulkGetPhotosRequest): Promise<BulkGetPhotosResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: PhotoService.bulkGetPhotos,
      request: request,
    });
  }

  async function uploadPhoto(photo: File): Promise<PhotoAndID> {
    const formData = new FormData();
    formData.append("photo", photo);
    const response = await authAxios.post<ArrayBuffer>("/photo/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "arraybuffer",
    });
    return PhotoAndID.deserializeBinary(new Uint8Array(response.data));
  }

  return {
    getPhoto,
    bulkGetPhotos,
    uploadPhoto,
  };
}
