import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  ListRenderItemInfo,
  Image
} from "react-native";
import { ListRenderItem } from "react-native";
import NavigateButton from "../../components/NavigateButton";
import Styles from "../../constants/Styles";

const dummyDrivers = [
  {
    key: "shaggy",
    name: "Shaggy",
    rating: 4.2,
    home: require("../../assets/images/h-s1.png"),
    class: require("../../assets/images/h-l1.png"),
    work: require("../../assets/images/h-w1.png"),
    homeDirs: [
      {
        key: "1",
        time: "1 min",
        desc: "Walk to  4689 Holladay Blvd E",
        addr: "4689 Holladay Blvd E"
      },
      { key: "2", time: "16 mins", desc: "Drive to 2000 1100 E" },
      { key: "3", time: "5 mins", desc: "Walk to 2011 1100 E" }
    ],
    workDirs: [
      {
        key: "1",
        time: "5 mins",
        desc: "Walk to 4501 2565 E",
        addr: "4501 2565 E"
      },
      { key: "2", time: "15 mins", desc: "Drive to 290 1500 E" },
      { key: "3", time: "2 mins", desc: "Walk to 295 1500 E" }
    ],
    classDirs: [
      {
        key: "1",
        time: "5 mins",
        desc: "Walk to 4501 2565 E",
        addr: "4501 2565 E"
      },
      { key: "2", time: "15 mins", desc: "Drive to 70 Central Campus Drive" },
      { key: "3", time: "2 mins", desc: "Walk to 72 Central Campus Dr" }
    ],
    profilePic: require("../../assets/images/shaggy.jpg")
  },
  {
    key: "fred",
    name: "Fred",
    rating: 3.4,
    home: require("../../assets/images/h-s2.png"),
    class: require("../../assets/images/h-l2.png"),
    work: require("../../assets/images/h-w2.png"),
    homeDirs: [
      {
        key: "1",
        time: "6 mins",
        desc: "Walk to 2301 E Sky Pines Ct",
        addr: "2301 E Sky Pines Ct"
      },
      { key: "2", time: "16 mins", desc: "Drive to 2000 1100 E" },
      { key: "3", time: "2 mins", desc: "Walk to 2011 1100 E" }
    ],
    workDirs: [
      {
        key: "1",
        time: "1 min",
        desc: "Walk to 4689 Holladay Blvd E",
        addr: "4689 Holladay Blvd E"
      },
      { key: "2", time: "15 mins", desc: "Drive to 290 1500 E" },
      { key: "3", time: "2 mins", desc: "Walk to 295 1500 E" }
    ],
    classDirs: [
      {
        key: "2",
        time: "5 mins",
        desc: "Walk to 4501 2565 E",
        addr: "4501 2565 E"
      },
      { key: "2", time: "15 mins", desc: "Drive to 70 Central Campus Drive" },
      { key: "3", time: "2 mins", desc: "Walk to 72 Central Campus Dr" }
    ],
    profilePic: require("../../assets/images/fred.jpg")
  },
  {
    key: "daphne",
    name: "Daphne",
    rating: 4.8,
    home: require("../../assets/images/h-s3.png"),
    class: require("../../assets/images/h-l3.png"),
    work: require("../../assets/images/h-w3.png"),
    homeDirs: [
      {
        key: "1",
        time: "5 mins",
        desc: "Walk to 4501 2565 E",
        addr: "4501 2565 E"
      },
      { key: "2", time: "16 mins", desc: "Drive to 2000 1100 E" },
      { key: "3", time: "2 mins", desc: "Walk to 2011 1100 E" }
    ],
    workDirs: [
      {
        key: "1",
        time: "6 mins",
        desc: "Walk to 2301 E Sky Pines Ct",
        addr: "2301 E Sky Pines Ct"
      },
      { key: "2", time: "15 mins", desc: "Drive to 290 1500 E" },
      { key: "3", time: "2 mins", desc: "Walk to 295 1500 E" }
    ],
    classDirs: [
      {
        key: "1",
        time: "1 min",
        desc: "Walk to 4689 Holladay Blvd E",
        addr: "4689 Holladay Blvd E"
      },
      { key: "2", time: "15 mins", desc: "Drive to 70 Central Campus Drive" },
      { key: "3", time: "2 mins", desc: "Walk to 72 Central Campus Dr" }
    ],
    profilePic: require("../../assets/images/daphne.jpg")
  }
];

export default class PassengerPickerScreen extends React.Component<{
  navigation: any;
}> {
  state = {
    address: this.props.navigation.getParam("address", {
      name: "Not Found",
      address: "Work"
    })
  };

  // private chooseDriver = (item: any) => {
  //   this.props.navigation.push("DriverDetails", {
  //     address: this.state.address,
  //     driver: item
  //   });
  // };
  private addPassenger = (item: any) => {};
  private clearFromList = (item: any) => {};
  render() {
    let image = this.state.address.preview;

    return (
      <View style={styles.container}>
        <Text style={Styles.paragraphText}>Your Drive To BLANK:</Text>

        <Image
          style={{ flex: 2, width: undefined, height: undefined }}
          resizeMode="cover"
          source={image}
        />

        <View style={{ flex: 2 }}>
          <Text style={Styles.paragraphText}>Passengers:</Text>

          <FlatList
            style={styles.searchResultsList}
            data={dummyDrivers}
            renderItem={({ item, separators }: any) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={item.profilePic}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={styles.searchResultsName}>{item.name}</Text>
                <Text style={styles.searchResultsAddress}>
                  {item.rating} stars
                </Text>
                <Button title="Accept" onPress={this.addPassenger} />
                <Button title="Reject" onPress={this.clearFromList} />
              </View>
            )}
          />
          <NavigateButton dest={""} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  queryBox: {
    borderColor: "#c3c3c3",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 36
  },
  searchResultsList: {
    marginTop: 10,
    marginBottom: 10
  },
  searchResultsItem: {
    borderColor: "#c3c3c3",
    borderBottomWidth: 1
  },
  searchResultsName: {
    fontSize: 20,
    marginRight: 10
  },
  searchResultsAddress: {
    fontSize: 20,
    color: "grey"
  }
});
