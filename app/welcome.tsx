import Marquee from "@/components/Marquee";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  SlideInUp,
  createAnimatedComponent,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedPressable = createAnimatedComponent(Pressable);

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
        {/* This is a quick fix of the SlideInUp bug not taking safe area padding in consideration  */}
        <SafeAreaView edges={["bottom"]}>
          {/* Top Part */}
          <Animated.View
            className="h-1/2 w-full mt-20"
            entering={SlideInUp.springify().damping(30).duration(1000)}
          >
            <Marquee events={events} />
          </Animated.View>

          <View className="flex-1 justify-center gap-4 p-4">
            <Animated.Text
              className="text-center text-xl text-white/60 font-bold"
              entering={FadeInUp.springify()
                .damping(30)
                .duration(800)
                .delay(200)}
            >
              Welcome to
            </Animated.Text>
            <Animated.Text
              className="text-white text-center font-bold text-5xl"
              entering={FadeIn.delay(500).duration(600)}
            >
              Invites
            </Animated.Text>
            <Animated.Text
              className="text-center text-lg text-white/60 font-bold mb-5"
              entering={FadeInUp.springify()
                .damping(30)
                .duration(800)
                .delay(200)}
            >
              Create beautiful invitatons for your events. Anyone can receive
              invitations.
            </Animated.Text>
            <AnimatedPressable
              onPress={onButtonPress}
              className="bg-white py-4 px-10 items-center rounded-full self-center"
              entering={FadeInUp.springify()
                .damping(30)
                .duration(800)
                .delay(200)}
            >
              <Text className="text-lg font-semibold">Create an Event</Text>
            </AnimatedPressable>
          </View>
        </SafeAreaView>
      </BlurView>
    </View>
  );
}
