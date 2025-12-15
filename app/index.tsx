import { Redirect } from "expo-router";

export default function HomeScreen() {
  return <Redirect href="/welcome" />;

  // return (
  //   <View className="flex-1 items-center justify-center p-5">
  //     <Text className="text-red-500 text-4xl font-bold">Home Screen</Text>
  //   </View>
  // );
}
