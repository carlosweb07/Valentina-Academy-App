import React, { useMemo, useState } from 'react';
import { View, Button, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
// import { useVideoPlayer, VideoView } from 'expo-video'; // ya no se usa si no vas a reproducir

interface Props {
  onVideoSelected?: (video: any) => void;
  onImageSelected?: (image: any) => void;
  disabled?: boolean;
}

const VideoPickerPlayer: React.FC<Props> = ({ onVideoSelected, onImageSelected, disabled = false }) => {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickVideoFile = async () => {
    if (disabled) return;
    
    try {
      setLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedVideo = result.assets[0];
        setVideoUri(selectedVideo.uri);
        
        console.log('🎥 Video seleccionado:', {
          uri: selectedVideo.uri,
          name: selectedVideo.name,
          size: selectedVideo.size,
          type: selectedVideo.mimeType
        });
        
        // Comunicar el video seleccionado al componente padre
        if (onVideoSelected) {
          onVideoSelected(selectedVideo);
        }
      } else {
        Alert.alert('Selección cancelada o sin archivo');
      }
    } catch (error) {
      Alert.alert('Error al seleccionar el video');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pickImageFile = async () => {
    if (disabled) return;
    
    try {
      setLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        quality: 0.7, // Comprimir imagen para reducir tamaño
        allowsEditing: true,
        aspect: [16, 9], // Proporción estándar
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setImageUri(selectedImage.uri);
        
        console.log('📷 Imagen seleccionada:', {
          uri: selectedImage.uri,
          width: selectedImage.width,
          height: selectedImage.height,
          fileSize: selectedImage.fileSize
        });
        
        // Comunicar la imagen seleccionada al componente padre
        if (onImageSelected) {
          onImageSelected(selectedImage);
        }
      } else {
        Alert.alert('Selección cancelada o sin archivo');
      }
    } catch (error) {
      Alert.alert('Error al seleccionar la imagen');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Nombre amigable para mostrar (prefiere name, si no usa la uri)
  const displayedVideoName = useMemo(() => {
    if (videoName) return videoName;
    if (videoUri) return videoUri.split('/').pop() ?? videoUri;
    return null;
  }, [videoName, videoUri]);

  const displayedImageName = useMemo(() => {
    if (imageName) return imageName;
    if (imageUri) return imageUri.split('/').pop() ?? imageUri;
    return null;
  }, [imageName, imageUri]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multimedia del Curso</Text>

      <View style={styles.buttonWrapper}>
        <Button
          title="Seleccionar Imagen de Portada"
          onPress={pickImageFile}
          disabled={disabled}
          color="#181212a9"
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Seleccionar Video"
          onPress={pickVideoFile}
          disabled={disabled}
          color="#181212a9"
        />
      </View>

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {displayedImageName ? (
        <View style={styles.videoInfo}>
          <Text style={styles.videoLabel}>Imagen seleccionada:
            <Text style={styles.videoName} numberOfLines={1} ellipsizeMode="middle">
            {displayedImageName}
          </Text>
          </Text>
        </View>
      ) : (
        <Text style={styles.noVideoText}>No hay Imagen seleccionado</Text>
      )}

      {videoUri ? (
        <View style={styles.videoInfo}>
          <Text style={styles.videoLabel}>Video seleccionado</Text>
          <Text style={styles.videoName} numberOfLines={1} ellipsizeMode="middle">
            {displayedVideoName}
          </Text>
        </View>
      ) : (
        <Text style={styles.noVideoText}>No hay video seleccionado</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    // si quieres alinearlo a la izquierda cambia a 'left'
    textAlign: 'center',
    color: '#ecd553',
  },
  buttonWrapper: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: '#f3dd6077',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  selectedText: {
    marginTop: 10,
    color: 'green',
    textAlign: 'center',
  },
  videoInfo: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 8,
  },
  videoLabel: {
    color: '#ecd553',
    fontSize: 14,
    marginBottom: 6,
  },
  videoName: {
    color: '#fff',
    fontSize: 13,
  },
  noVideoText: {
    marginTop: 12,
    color: '#888',
  },
});

export default VideoPickerPlayer;
