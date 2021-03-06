import * as React from "react";
import { Modal, View, TouchableOpacity } from "react-native";
import { Text, Button } from "native-base";

import OnTheFlyDiscountComponent from "@components/OnTheFlyDiscountComponent";
import DiscountModalComponent from "@components/DiscountModalComponent";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class DiscountSelectionModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentageType: "percentage",
      onTheFlyDiscountValue: "0",
    };
  }

  onValueChange(value) {
    this.setState({
      percentageType: value,
    });
  }
  onNumberPress(text) {
    if (this.state.onTheFlyDiscountValue === "0") {
      this.setState({ onTheFlyDiscountValue: text });
    } else {
      this.setState({
        onTheFlyDiscountValue: this.state.onTheFlyDiscountValue.concat(text),
      });
    }
  }

  onDeletePress() {
    this.setState({
      onTheFlyDiscountValue: this.state.onTheFlyDiscountValue.slice(0, -1),
    });
  }
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.discountSelection}
        onRequestClose={() => {}}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000090",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ backgroundColor: "white", width: 350 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#bbb",
              }}
            >
              <Text style={{ color: "gray", fontWeight: "bold" }}>
                Discount
              </Text>
              <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={() => this.props.onClick()}
              >
                <Icon name="close" size={21} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#bbb",
              }}
            >
              <Button
                block
                success
                onPress={() => this.props.changeSelectionStatus(true)}
              >
                <Text>On The Fly Discount</Text>
              </Button>
              <Button
                block
                success
                onPress={() => this.props.changeSelectionStatus(false)}
              >
                <Text>Existing Discount</Text>
              </Button>
            </View>
            {this.props.discountSelectionStatus ? (
              <OnTheFlyDiscountComponent
                onTheFlyDiscountValue={this.state.onTheFlyDiscountValue}
                percentageType={this.state.percentageType}
                onValueChange={value => this.onValueChange(value)}
                onNumberPress={text => this.onNumberPress(text)}
                onDeletePress={() => this.onDeletePress()}
              />
            ) : (
              <DiscountModalComponent
                discountData={this.props.discountData}
                currentDiscount={this.props.currentDiscount}
                onCancelDiscount={value => this.props.onCancelDiscount(value)}
                onDiscountChange={(discount, index) =>
                  this.props.onDiscountChange(discount, index)
                }
                selectedDiscount={this.props.selectedDiscount}
              />
            )}
            <Button
              block
              success
              onPress={() => {
                const stateValue = this.state;
                this.setState({
                  percentageType: "percentage",
                  onTheFlyDiscountValue: "0",
                });
                this.props.onDiscountEdit(stateValue);
              }}
            >
              <Text>Set discount</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}
