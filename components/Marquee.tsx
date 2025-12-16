import { Image, ImageSourcePropType, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Event {
  id: number;
  image: ImageSourcePropType;
}

interface EventItemProps {
  event: Event;
  index: number;
  scroll: SharedValue<number>;
}

const itemWidth = 300;

function MarqueeItem({ event, index, scroll }: EventItemProps) {
  const initialPosition = itemWidth * index;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: initialPosition - scroll.value,
    };
  });

  return (
    <Animated.View
      className="absolute h-full p-4 shadow-sm"
      style={[{ width: itemWidth }, animatedStyle]}
    >
      <Image source={event.image} className="h-full w-full rounded-3xl" />
    </Animated.View>
  );
}

export default function Marquee({ events }: { events: Event[] }) {
  const scroll = useSharedValue(0);
  const scrollSpeed = useSharedValue(50); // pixels per second

  useFrameCallback((frameInfo) => {
    const deltaSeconds = (frameInfo.timeSincePreviousFrame ?? 0) / 1000;
    scroll.value = scroll.value + scrollSpeed.value * deltaSeconds;
  });

  const gesture = Gesture.Pan()
    .onBegin((e) => {
      scrollSpeed.value = 0;
    })
    .onChange((event) => {
      scroll.value = scroll.value - event.changeX;
    })
    .onFinalize((event) => {
      scrollSpeed.value = -event.velocityX;
      scrollSpeed.value = withTiming(50, {
        duration: 1000,
        easing: Easing.out(Easing.quad),
      });
    });

  return (
    <GestureDetector gesture={gesture}>
      <View className="flex-row h-full">
        {events.map((event, index) => (
          <MarqueeItem
            key={event.id}
            event={event}
            index={index}
            scroll={scroll}
          />
        ))}
      </View>
    </GestureDetector>
  );
}
