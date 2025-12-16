import { BlurView } from "expo-blur";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const events = [
  {
    id: 1,
    image: require("../assets/images/1.jpg"),
  },
  {
    id: 2,
    image: require("../assets/images/2.jpg"),
  },
  {
    id: 3,
    image: require("../assets/images/3.jpg"),
  },
  {
    id: 4,
    image: require("../assets/images/4.jpg"),
  },
  {
    id: 5,
    image: require("../assets/images/5.jpg"),
  },
];

export default function WelcomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onButtonPress = () => {
    setActiveIndex(activeIndex + 1 >= events.length ? 0 : activeIndex + 1);
  };

  return (
    <View className="flex-1 items-center bg-yellow-950">
      <Animated.Image
        key={events[activeIndex].image}
        source={events[activeIndex].image}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(1000)}
      />
      <View className="absolute inset-0 bg-black/50" />

      <BlurView intensity={50}>
        <SafeAreaView>
          <View className="h-3/5 w-full">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {events.map((event) => (
                <View key={event.id} className="h-full w-96 p-4 shadow-sm">
                  <Image
                    source={event.image}
                    className="h-full w-full rounded-3xl"
                  />
                </View>
              ))}
            </ScrollView>
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

            <Pressable
              onPress={onButtonPress}
              className="bg-white py-4 px-10 items-center rounded-full self-center"
            >
              <Text className="text-lg font-semibold">Create an Event</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </BlurView>
    </View>
  );
}
