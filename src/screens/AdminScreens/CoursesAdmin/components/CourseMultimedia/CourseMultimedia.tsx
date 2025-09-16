import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video'
import { FontAwesome5 } from '@expo/vector-icons'
import { COLORS } from '../../../../../constants/colors'
import { Course } from '../../../../../interfaces/Models'
import styles from './styles'

interface CourseMultimediaProps {
  course: Course,
  
}

export default function CourseMultimedia({ course }: {  }) {
  return (
    <View key={course.id} style={styles.card}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{course.title}</Text>
        <View style={styles.cardActions}>
          <TouchableOpacity
            onPress={() => {
              setSelectedId(course.id)
              setShowEdit(true)
            }}
          >
            <FontAwesome5
              name="pen-to-square"
              size={20}
              color={COLORS.primary}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedId(course.id)
              setShowDelete(true)
            }}
          >
            <FontAwesome5
              name="trash"
              size={20}
              color={COLORS.error}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleExpand(course.id)}>
            <FontAwesome5
              name="caret-right"
              size={20}
              color={COLORS.primary}
              style={[
                styles.icon,
                expanded.has(course.id) && styles.caretRotated,
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Expanded Info */}
      {expanded.has(course.id) && (
        <View style={styles.cardBody}>
          <View style={styles.infoSection}>
            <View style={styles.infoDetails}>
              <Text style={styles.subheading}>Detalles del curso</Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Descripción: </Text>
                {course.description}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Duración: </Text>
                {course.duration}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Categoría: </Text>
                {course.category.name}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Autor: </Text>
                {course.user.username}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Precio: </Text>
                {course.price}$
              </Text>
            </View>

            <View style={styles.infoDetails}>
              <Text style={styles.subheading}>Receta</Text>
              <Text style={styles.text}>{course.recipe.name}</Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Descripción: </Text>
                {course.recipe.description}
              </Text>
              <View style={styles.recipeLists}>
                <View style={styles.recipePart}>
                  <Text style={styles.listHeading}>Ingredientes</Text>
                  {course.recipe.ingredient.map(i => (
                    <Text key={i.id} style={styles.text}>
                      • {i.name}
                    </Text>
                  ))}
                </View>
                <View style={styles.recipePart}>
                  <Text style={styles.listHeading}>Pasos</Text>
                  {course.recipe.steps.map((s, idx) => (
                    <Text key={idx} style={styles.text}>
                      {idx + 1}. {s}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.mediaSection}>
            <Text style={styles.subheading}>Contenido multimedia</Text>
            <View style={styles.media}>
              <Image
                source={{ uri: course.media.url_cover }}
                style={styles.cover}
              />
              <Video
                source={{ uri: course.media.url_video }}
                resizeMode={ResizeMode.COVER}
                style={styles.video}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
