import { View, Text } from "react-native";
import { Button } from "@rneui/base";
import { Link, Redirect, Stack } from "expo-router";

export default function Index() {
  return <Redirect href={"/home"} />;
}
