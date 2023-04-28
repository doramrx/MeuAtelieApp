import { Text, View} from "react-native";
import { styles } from "./styles";

import DressMakerProfileIcon from "../../../assets/icons/dressmaker-user-icon.svg";
import MoreVerticalIcon from "../../../assets/icons/more-vertical-icon.svg";

interface Props{
  dressmakerName: string
}

export function Card(props: Props){
  return (
    <View style={styles.container}>

      <View style={styles.wrapper}>
        <DressMakerProfileIcon/>
        <Text style={styles.dressmakersName}>
          {props.dressmakerName}
        </Text>
      </View>
      <MoreVerticalIcon/>
    </View>
  )
}