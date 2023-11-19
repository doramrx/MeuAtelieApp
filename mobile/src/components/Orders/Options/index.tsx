import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import { styles } from "./styles";

import { useViewController } from "./view-controller";

export function Options() {
  const viewController = useViewController();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.wrapper}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.option,
            styles.firstOption,
            viewController.activeOption === "Pending" && styles.activeOption,
          ]}
          onPress={() => viewController.onChangeOption("Pending")}
        >
          <Text
            style={[
              styles.optionText,
              viewController.activeOption === "Pending" &&
                styles.activeOptionText,
            ]}
          >
            Pendente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.option,
            styles.lastOption,
            viewController.activeOption === "Finished" && styles.activeOption,
          ]}
          onPress={() => viewController.onChangeOption("Finished")}
        >
          <Text
            style={[
              styles.optionText,
              viewController.activeOption === "Finished" &&
                styles.activeOptionText,
            ]}
          >
            Finalizado
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
