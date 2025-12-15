import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center bg-yellow-950">
      <View className="h-3/5 w-full bg-gray-400">
        {/* Marquee Component */}
      </View>

      <View className="flex-1 justify-center gap-4 p-4">
        <Text className="text-center text-xl text-white/60 font-bold">
          Welcome to
        </Text>
        <Text className="text-white text-center font-bold text-5xl">
          Invites
        </Text>
        <Text className="text-center text-lg text-white/60 font-bold mb-5">
          Create beautiful invitatons for your events. Anyone can receive
          invitations.
        </Text>

        <Pressable className="bg-white py-4 px-10 items-center rounded-full self-center">
          <Text className="text-lg font-semibold">Create an Event</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
