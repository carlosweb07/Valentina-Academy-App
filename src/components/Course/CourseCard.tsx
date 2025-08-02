import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ImageSourcePropType
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import type { RootStackParamList } from '../../navigation/types'
import styles from './styles'

interface Props {
  id: string
  img: string
  title: string
  description: string
}

export default function CourseCard({
  id,
  img,
  title,
  description,
}: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const words = description.split(' ')
  const truncated = words.length > 20
  const preview = words.slice(0, 20).join(' ')
  
  const handlePress = () => {
    navigation.navigate('Course', { id })
  }

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <ImageBackground
        source={{ uri: img }}
        style={styles.image}
        imageStyle={styles.imageRounded}
      >
        {/* Si quieres overlay o badge, va aquí */}
      </ImageBackground>

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          {truncated ? (
            <>
              {preview}
              <Text style={styles.more} onPress={handlePress}>
                … ver más
              </Text>
            </>
          ) : (
            description
          )}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
