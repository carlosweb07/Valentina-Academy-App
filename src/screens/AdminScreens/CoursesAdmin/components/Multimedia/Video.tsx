import React from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../../../navigation/types'
import type { StackNavigationProp } from '@react-navigation/stack'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import ApiService from '../../../../../services/Api'
import { Course } from '../../../../../interfaces/Models'

type Props = {
    uri: string;
    onEnd: () => void;
  };
  
  const SoloVideo: React.FC<Props> = ({ uri, onEnd }) => {
    const player = useVideoPlayer(uri, (player) => {
      player.play();
      player.addListener('playToEnd', onEnd);
    });
    
const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
    return (
      <View>
        <VideoView
          style={{ width: '100%', height: 290 }}
          player={player}
          fullscreenOptions={{ enable: true, orientation: "landscape" }}
          allowsPictureInPicture
        />
      </View>
    );
  };
  
  
  export default SoloVideo;