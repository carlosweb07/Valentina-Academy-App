import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useVideoPlayer, VideoView } from 'expo-video';

interface Props {
  onVideoSelected?: (video: any) => void;
  onImageSelected?: (image: any) => void;
  disabled?: boolean;
}

const VideoPickerPlayer: React.FC<Props> = ({ onVideoSelected, onImageSelected, disabled = false }) => {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const player = useVideoPlayer(
    videoUri ? { uri: videoUri } : { uri: '' }, // siempre se llama
    (player) => {
      if (videoUri) {
        player.play();
      }
    }
  );

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multimedia del Curso</Text>
      
      <Button 
        title="Seleccionar Imagen de Portada" 
        onPress={pickImageFile}
        disabled={disabled}
      />
      
      <Button 
        title="Seleccionar Video" 
        onPress={pickVideoFile}
        disabled={disabled}
      />
      
      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
      
      {imageUri && (
        <Text style={styles.selectedText}>Imagen seleccionada: {imageUri.split('/').pop()}</Text>
      )}
      
      {videoUri && (
        <View style={styles.videoContainer}>
          <VideoView
            player={player}
            style={styles.video}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  selectedText: {
    marginTop: 10,
    color: 'green',
    textAlign: 'center',
  },
  videoContainer: {
    marginTop: 20,
    width: '100%',
    height: 300,
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default VideoPickerPlayer;
