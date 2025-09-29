import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { BACKEND_ROUTES } from '../../../constants/routes'
import ApiService from '../../../services/Api'
import { Course } from '../../../interfaces/Models'
import { RootStackParamList } from '../../../navigation/types'

import { shareAsync } from 'expo-sharing'
import { documentDirectory, writeAsStringAsync, EncodingType } from 'expo-file-system/legacy'

// Ajusta los imports a tu estructura
import pdfIcon from '../../../../assets/pdf.png'
import userImg from '../../../../assets/usuario.png'

import fondo from '../../../../assets/background.png'

import styles from './styles'

interface Props {
  course: Course
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CoursePage({ course, setCompleted }: Props) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [btnName, setBtnName] = useState<string>("Descargar archivo PDF aquí")

  const onExportRecipe = async () => {
    setBtnName("Descargando...")
    try {
      const blob = await ApiService.get<any>(
        `${BACKEND_ROUTES.export_recipe}/${course.recipe.id}`
      )
      
      const localUri = documentDirectory + "recipe_" + course.recipe.name.toLowerCase().replace(/ /g, "_") + ".pdf";

      const base64: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          const dataUrl = reader.result as string;
          const [, rawBase64] = dataUrl.split(',');
          resolve(rawBase64);
        };
        reader.readAsDataURL(blob);
      });

      await writeAsStringAsync(localUri, base64, {
        encoding: EncodingType.Base64,
      });

      await shareAsync(localUri);

    } catch (error) {
      console.error('Error al exportar receta:', error);
    } finally {
      setBtnName("Descargar archivo PDF aquí")
    }
  };

  const onVideoEnd = () => {
    setCompleted(true)
    navigation.navigate('Survey', { course_id: course.id })
  }

  const player = useVideoPlayer(course.media.url_video, player => {
    player.play()

    player.addListener("playToEnd", () => {
      onVideoEnd()
    })
  })

  return (
    <ScrollView>
      <ImageBackground
        source={fondo}
      >
        <VideoView 
          style={styles.video} 
          player={player} 
          fullscreenOptions={{ enable: true, orientation: "landscape" }}
          allowsPictureInPicture
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
            <Text style={styles.bold}>{btnName}</Text>
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
      </ImageBackground>
    </ScrollView>
  )
}
