import { Text, View, Image, TouchableOpacity } from "react-native";

import { styles } from "./styles";

import HamburguerIcon from "../../assets/Hamburguer_icon.png";
import SearchIcon from "../../assets/Search_icon.png";
import ImageExample from "../../assets/Image_example.png";

export function Home() {
  return (
    <View style={styles.container}>

        <View style={styles.navigator}>
          <TouchableOpacity>
            <Image source={HamburguerIcon} style={styles.navigatorIcons}/>   
          </TouchableOpacity>  
          <Text style={styles.navigatorText}>Pedidos</Text>
          <TouchableOpacity>
            <Image source={SearchIcon} style={styles.navigatorIcons}/>
          </TouchableOpacity>
        </View>


        <View style={styles.sectionBar}>
          <View>
            <Text style={[styles.sectionBarText, styles.sectionBarNumber]}>0</Text>
            <Text style={styles.sectionBarText}>Pendente</Text>
          </View>

          <View>
            <Text style={[styles.sectionBarText, styles.sectionBarNumber]}>0</Text>
            <Text style={styles.sectionBarText}>Finalizado</Text>
          </View>
        </View>

        <View>
          <View style={styles.listServices}>
            <Image source={ImageExample}/>
            <View style={styles.listServicesTextGroup}>

              <Text style={styles.listServicesText}>Nome</Text>
              <Text style={styles.listServicesText}>Tipo serviço</Text>
              <Text style={styles.listServicesText}>Data entrega</Text>

            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerAddButton}>
            <Text style={styles.footerAddButtonText}>+</Text>
          </TouchableOpacity>
        </View>

    </View>
  );
}
