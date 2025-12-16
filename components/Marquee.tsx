import {
  Image,
  ImageSourcePropType,
  useWindowDimensions,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  interpolate,
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
  containerWidth: number;
  itemWidth: number;
}

function MarqueeItem({
  event,
  index,
  scroll,
  containerWidth,
  itemWidth,
}: EventItemProps) {
  const { width: screenWidth } = useWindowDimensions();

  const shift = (containerWidth - screenWidth) / 2;

  const initialPosition = itemWidth * index - shift;

  const animatedStyle = useAnimatedStyle(() => {
    const position =
      ((initialPosition - scroll.value) % containerWidth) + shift;

    const rotation = interpolate(
      position,
      [0, screenWidth - itemWidth],
      [-0.6, 0.6],
    );
    const translateY = interpolate(
      position,
      [0, (screenWidth - itemWidth) / 2, screenWidth - itemWidth],
      [2, 0, 2],
    );

    return {
      left: position,
      transform: [{ rotateZ: `${rotation}deg` }, { translateY }],
    };
  });

  return (
    <Animated.View
      className="absolute h-full p-1 shadow-sm"
      style={[{ width: itemWidth, transformOrigin: "bottom" }, animatedStyle]}
    >
      <Image source={event.image} className="h-full w-full rounded-3xl" />
    </Animated.View>
  );
}

export default function Marquee({ events }: { events: Event[] }) {
  const scroll = useSharedValue(0);
  const scrollSpeed = useSharedValue(50); // pixels per second
  const { width: screenWidth } = useWindowDimensions();

  const itemWidth = screenWidth * 0.7;

  const containerWidth = events.length * itemWidth;

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
            containerWidth={containerWidth}
            itemWidth={itemWidth}
          />
        ))}
      </View>
    </GestureDetector>
  );
}
