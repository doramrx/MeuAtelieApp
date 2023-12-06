/* eslint-disable indent */
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { ModelPhotoView } from "../../../../entities/Order";
import { PhotoCard } from "../../PhotoCard";

interface Props {
  modelPhotos: ModelPhotoView[];
  shouldShowAddPhotoButton: boolean;
  onSelectPhoto: (index: number) => void;
  onAddMorePhotos?: () => void;
}

export function ModelPhotoList({
  modelPhotos,
  onSelectPhoto,
  shouldShowAddPhotoButton,
  onAddMorePhotos,
}: Props) {
  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        alignItems: "center",
      }}
      horizontal={true}
    >
      {modelPhotos.map((photo, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            onPress={() => onSelectPhoto(index)}
          >
            <Image
              key={index}
              source={{ uri: photo.uri, width: 100, height: 100 }}
              style={{
                marginRight: index < 2 ? 4 : 0,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        );
      })}

      {shouldShowAddPhotoButton && (
        <PhotoCard
          onPress={
            onAddMorePhotos
              ? onAddMorePhotos
              : // eslint-disable-next-line @typescript-eslint/no-empty-function
                () => {}
          }
        />
      )}
    </ScrollView>
  );
}
