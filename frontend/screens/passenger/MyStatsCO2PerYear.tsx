import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator
} from "react-native";

import { fetchAPI } from "../../network/Backend";
import UserSession from "../../network/UserSession";
import StatsChart from "../../components/StatsChart";

export default class MyStatsCO2PerYear extends React.Component<{
  navigation: any;
}> {
  constructor(props: any) {
    super(props);
  }

  state = {
    year: this.props.navigation.getParam("year"),
    meId: 0,
    totalCO2PerYear: 0,
    co2PerYearChart: null,
    co2PearYearList: null,
    isLoadingCO2PerMonthChart: true
  };

  componentDidMount() {
    this.bootstrap();
  }

  bootstrap = async () => {
    let userDetails = await UserSession.get();
    if (userDetails == null) return;

    this.setState({ meId: userDetails.id });

    this.getCO2PerMonthData();
  };

  getCO2PerMonthData() {
    fetchAPI(
      `/getCO2PerMonthData?meId=${this.state.meId}&year=${this.state.year}`
    ).then(async response => {
      if (response.status === 200) {
        const responseJson = await response.json();

        const data = responseJson.co2PerMonth;

        var tickValuesXAxis: any = [];
        var tickFormatXAxis: any = [];
        var tickFormatYAxis: any = [];

        var co2PerYearText: any = [];

        var totalCO2PerYear = 0;

        data.map((row: any, index: number) => {
          tickValuesXAxis.push(row.month);
          tickFormatXAxis.push(row.month);

          totalCO2PerYear += row.co2;
          var roundCO2 = Math.round(row.co2 * 100) / 100;
          tickFormatYAxis.push(roundCO2);

          co2PerYearText.push(
            <Text
              key={index.toString()}
              style={{ fontWeight: "bold", color: "rgb(66, 109, 183)" }}
            >
              {row.month}:{" "}
              <Text style={{ fontWeight: "normal" }}>{roundCO2} kg</Text>
            </Text>
          );
        });

        var co2PerMonthBarGraph = (
          <StatsChart
            tickValuesXAxis={tickValuesXAxis}
            tickFormatXAxis={tickFormatXAxis}
            tickFormatYAxis={tickFormatYAxis}
            style={{ data: { fill: "rgb(18, 194, 196)" } }}
            data={data}
            x="month"
            y="co2"
          />
        );

        totalCO2PerYear = Math.round(totalCO2PerYear * 100) / 100;

        this.setState({
          totalCO2PerYear: totalCO2PerYear,
          co2PerYearChart: co2PerMonthBarGraph,
          co2PearYearList: co2PerYearText,
          isLoadingCO2PerMonthChart: false
        });
      }
    });
  }

  render() {
    if (this.state.isLoadingCO2PerMonthChart) {
      return <ActivityIndicator />;
    }
    return (
      <ScrollView>
        <View>
          <Text style={styles.pageHeading}>
            CO2 Savings for Year{"\n"}
            {this.state.year}
          </Text>

          <Text style={styles.subHeading}>kg per Month</Text>
        </View>

        <View>{this.state.co2PerYearChart}</View>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.totalCO2}>
            Total {this.state.totalCO2PerYear} kg!
          </Text>
        </View>
        <View style={{ marginLeft: 55 }}>{this.state.co2PearYearList}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  pageHeading: {
    marginTop: 15,
    fontSize: 30,
    textAlign: "center",
    color: "rgb(13, 138, 145)",
    fontWeight: "bold"
  },

  subHeading: {
    fontSize: 23,
    fontStyle: "italic",
    textAlign: "center",
    color: "rgb(66, 109, 183)" //"rgb(54, 146, 190)"
  },

  totalCO2: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    fontStyle: "italic",
    color: "rgb(13, 138, 145)"
  }
});
