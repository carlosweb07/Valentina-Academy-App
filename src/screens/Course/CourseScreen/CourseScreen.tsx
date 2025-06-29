import React from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native'
import { Video, ResizeMode } from 'expo-av'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { BACKEND_ROUTES } from '../../../constants/routes'
import ApiService from '../../../services/Api'
import { Course } from '../../../interfaces/App'

// Ajusta los imports a tu estructura
import pdfIcon from '../../../../assets/pdf.png'
import userImg from '../../../../assets/usuario.png'

import styles from './styles'

interface Props {
  course: Course
  setCompleted: (done?: boolean) => void
}
type RootStackParamList = {
  Survey: { course_id: string }
  // ...add other routes as needed
}

export default function CoursePage({ course, setCompleted }: Props) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const onExportRecipe = async () => {
    const url = `${ApiService['baseUrl']}/${BACKEND_ROUTES.export_recipe}/${course.recipe.id}/`
    // Abre en navegador o gestor de descargas del dispositivo
    Linking.openURL(url).catch(console.error)
  }

  const onVideoEnd = () => {
    setCompleted(true)
    navigation.navigate('Survey', { course_id: course.id })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Video
      source={{ uri: course.media.url_video }}
      useNativeControls
      resizeMode={ResizeMode.COVER}
      style={styles.video}
      onPlaybackStatusUpdate={(status) => {
        if ('didJustFinish' in status && status.didJustFinish) {
          onVideoEnd()
        }
      }}
      />

      <View style={styles.detailsContainer}>
      {/* Info general */}
      <View style={styles.section}>
        <Text style={styles.heading}>{course.title}</Text>
        <Text style={styles.paragraph}>{course.description}</Text>

        <View style={styles.authorContainer}>
        <Image source={userImg} style={styles.authorImg} />
        <Text style={styles.authorName}>{course.user.username}</Text>
        </View>
      </View>

      {/* Descarga receta */}
      <View style={styles.section}>
        <Text style={styles.heading}>Descarga la receta</Text>
        <Text style={styles.paragraph}>
        Si necesitas la receta para analizarla y poder trabajar con ella,
        aquí tienes el PDF para que puedas usarlo más adelante!
        </Text>

        <TouchableOpacity
        style={styles.pdfContainer}
        onPress={onExportRecipe as () => void}
        activeOpacity={0.7}
        >
        <Image source={pdfIcon} style={styles.pdfIcon} />
        <Text style={styles.pdfText}>
          <Text style={styles.bold}>Descargar archivo PDF aquí</Text>
        </Text>
        </TouchableOpacity>
      </View>

      {/* Detalles de receta */}
      <View style={styles.section}>
        <Text style={styles.heading}>{course.recipe.name}</Text>
        <Text style={styles.paragraph}>{course.recipe.description}</Text>

        <View style={styles.recipeContainer}>
        <View style={styles.ingredients}>
          <Text style={styles.subheading}>Ingredientes:</Text>
          {course.recipe.ingredient.map((i: { id: string | number; name: string }) => (
          <Text key={i.id} style={styles.listItem}>
            • {i.name}
          </Text>
          ))}
        </View>

        <View style={styles.instructions}>
          <Text style={styles.subheading}>Instrucciones:</Text>
          {course.recipe.steps.map((s: string, idx: number) => (
          <Text key={idx} style={styles.listItem}>
            {idx + 1}. {s}
          </Text>
          ))}
        </View>
        </View>
      </View>
      </View>
    </ScrollView>
  )
}
