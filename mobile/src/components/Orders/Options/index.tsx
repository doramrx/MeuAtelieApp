import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import { styles } from "./styles";

type OptionStates = "Pending" | "Finished";

export function Options() {
  const [activeOption, setActiveOption] = useState<OptionStates>("Pending");

  function changeActiveOption(option: OptionStates) {
    setActiveOption(option);
  }

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
            activeOption === "Pending" && styles.activeOption,
          ]}
          onPress={() => changeActiveOption("Pending")}
        >
          <Text
            style={[
              styles.optionText,
              activeOption === "Pending" &&
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
            activeOption === "Finished" && styles.activeOption,
          ]}
          onPress={() => changeActiveOption("Finished")}
        >
          <Text
            style={[
              styles.optionText,
              activeOption === "Finished" &&
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
