import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { Picker } from '@react-native-picker/picker'
import Modal from '../../../../../components/Modal/Modal'
import Api from '../../../../../services/Api'
import { BACKEND_ROUTES } from '../../../../../constants/routes'
import { COLORS } from '../../../../../constants/colors'
import mime from 'mime'
import VideoPickerPlayer from '../Multimedia/SelectVideo'
import styles from './styles'


type Category = { id: number; name: string }
type User = { id: number; first_name: string; last_name: string }
type Recipe = { id: number; name: string }
type Course = any
type CourseMedia = { id: number }

interface Props {
  visible: boolean
  onClose: () => void      
  onSuccess?: () => void
  courseId: number | null
  categories: Category[]
  users: User[]
  recipes: Recipe[]
}

export type DurationNorm = {
  ok: true;
  value: string;    // "HH:MM:SS"
  seconds: number;
} | {
  ok: false;
  errors: string[];
};

export default function EditCourseModal({
  visible,
  onClose,
  onSuccess,
  courseId,
  categories,
  users,
  recipes,
}: Props) {
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [courseData, setCourseData] = useState<any>({
    title: '',
    description: '',
    duration: '00:00:00',
    price: '',
    category: '',
    user: '',
    recipe: '',
    mediaId: null,
  })
  const [cover, setCover] = useState<any>(null)
  const [video, setVideo] = useState<any>(null)
  
  // Normaliza un asset para FormData (asegura uri/file://, name y type)
  const normalizeFile = (f: any) => {
    if (!f) return null
    let uri = typeof f === 'string' ? f : f.uri
    if (!uri) return null

    if (Platform.OS === 'android') {
      if (uri.startsWith('content://')) {
        if (!uri.startsWith('file://')) uri = 'file://' + uri
      } else if (!uri.startsWith('file://')) {
        uri = 'file://' + uri
      }
    }

    const name = (f?.name || f?.fileName || uri.split('/').pop() || 'file').toString()
    const type =
      (f?.type ||
        f?.mimeType ||
        mime.getType(name) ||
        (name.endsWith('.mp4') ? 'video/mp4' : name.endsWith('.jpg') || name.endsWith('.jpeg') ? 'image/jpeg' : 'application/octet-stream')
      ).toString()

    return { uri, name, type }
  }

  // Normaliza duracion a HH:MM:SS (backend acepta hh:mm[:ss[.uuuuuu]])
  const normalizeDuration = (input: string): string | null => {
  if (!input || typeof input !== 'string') return null
  const s = input.trim()

  // HH:MM:SS with optional fractional seconds (fractions are stripped)
  const reHMS = /^([01]?\d|2[0-3]):([0-5]\d):([0-5]\d)(?:\.\d+)?$/
  const mHMS = s.match(reHMS)
  if (mHMS) {
    const hh = mHMS[1].padStart(2, '0')
    const mm = mHMS[2]
    const ss = mHMS[3]
    return `${hh}:${mm}:${ss}`
  }

  // HH:MM (seconds assumed 00) — hours 0-23, minutes 0-59
  const reHM = /^([01]?\d|2[0-3]):([0-5]\d)$/
  const mHM = s.match(reHM)
  if (mHM) {
    const hh = mHM[1].padStart(2, '0')
    const mm = mHM[2]
    return `${hh}:${mm}:00`
  }

  // MM:SS interpreted as 00:MM:SS (both 0-59)
  const reMS = /^([0-5]?\d):([0-5]\d)$/
  const mMS = s.match(reMS)
  if (mMS) {
    const mm = mMS[1].padStart(2, '0')
    const ss = mMS[2]
    return `00:${mm}:${ss}`
  }
  
  return null
}


  // Extrae el objeto course de respuestas con distintas formas
  const extractCourseFromResponse = (resp: any) => {
    if (!resp) return null
    if (typeof resp === 'object') {
      if ('course' in resp && resp.course) return resp.course
      if ('data' in resp && resp.data) return resp.data
      if ('id' in resp || 'title' in resp) return resp
    }
    return null
  }

  useEffect(() => {
    if (!visible || courseId == null) return
    let mounted = true

    ;(async () => {
      setLoading(true)
      setError('')
      try {
        console.log('GET course ->', `${BACKEND_ROUTES.courses}/${courseId}`)
        const resp = await Api.get<any>(`${BACKEND_ROUTES.courses}/${courseId}`)
        console.log('GET course response raw:', resp)
        if (!mounted) return

        let recipeVal = ''
        if (resp.recipe != null) {
          recipeVal = typeof resp.recipe === 'object' ? String(resp.recipe.id ?? '') : String(resp.recipe)
        }

        setCourseData({
          title: resp.title ?? '',
          description: resp.description ?? '',
          duration: resp.duration ?? '00:00:00',
          price: resp.price != null ? String(resp.price) : '',
          category: resp.category ? String(resp.category.id ?? resp.category) : '',
          user: resp.user ? String(resp.user.id ?? resp.user) : '',
          recipe: recipeVal,
          mediaId: resp.media ? (resp.media.id ?? resp.media) : null,
        })
      } catch (e: any) {
        console.error('Error loading course (EditCourseModal)', e)
        setError('Error cargando curso. Revisa URL, auth o wrapper Api.')
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [visible, courseId])

  const onImageSelected = (img: any) => {
    console.log('Parent received image raw:', img)
    const normalizedImage = {
      uri: img.uri,
      name: img.name || img.fileName || img.uri?.split('/').pop(),
      mimeType: img.mimeType || img.type || 'image/jpeg',
      width: img.width,
      height: img.height,
      fileSize: img.fileSize || img.size,
    }
    console.log('Parent received image normalized:', normalizedImage)
    setCover(normalizedImage)
  }

  const onVideoSelected = (vid: any) => {
    console.log('Parent received video raw:', vid)
    const normalizedVideo = {
      uri: vid.uri,
      name: vid.name || vid.fileName || vid.uri?.split('/').pop(),
      mimeType: vid.mimeType || vid.type || 'video/mp4',
      size: vid.size || vid.fileSize,
    }
    console.log('Parent received video normalized:', normalizedVideo)
    setVideo(normalizedVideo)
  }

  // Sube media usando Api.post (wrapper debe soportar FormData cuando se pasa true)
  const uploadMediaIfNeeded = async (): Promise<number | null> => {
    if (!cover && !video) {
      console.log('uploadMediaIfNeeded: nothing to upload')
      return null
    }

    const c = normalizeFile(cover)
    const v = normalizeFile(video)
    console.log('uploadMediaIfNeeded normalized files:', { cover: c, video: v })

    if (cover && !c) {
      console.error('uploadMediaIfNeeded: cover present but normalization failed', cover)
      throw setError('Error normalizando carátula')
    }
    if (video && !v) {
      console.error('uploadMediaIfNeeded: video present but normalization failed', video)
      throw setError('Error normalizando video')
    }

    const form = new FormData()
    if (c) form.append('cover', { uri: c.uri, name: c.name, type: c.type } as any)
    if (v) form.append('video', { uri: v.uri, name: v.name, type: v.type } as any)
    if (courseId) form.append('course', String(courseId))

    try {
      try {
        // @ts-ignore
        console.log('FormData parts (approx):', (form as any)._parts || 'not available')
      } catch (inspectErr) {
        console.warn('Could not inspect FormData parts', inspectErr)
      }

      console.log('Uploading media to', BACKEND_ROUTES.courses_media, { cover: c?.name, video: v?.name })
      const mediaResp = await Api.post<CourseMedia>(BACKEND_ROUTES.courses_media, form, true)
      console.log('Media upload response (edit):', mediaResp)

      if (!mediaResp || typeof mediaResp !== 'object') {
        console.error('Media upload returned unexpected value', mediaResp)
        throw setError('Respuesta inesperada al subir media')
      }
      const mediaId = (mediaResp as any).id ?? (mediaResp as any).media?.id ?? null
      if (!mediaId) {
        console.error('Media upload response missing id field', mediaResp)
        throw setError('No se devolvió id del media subido')
      }
      console.log('Media upload succeeded, id:', mediaId)
      return Number(mediaId)
    } catch (err: any) {
      console.error('uploadMediaIfNeeded error (using Api.post)', err)
      throw setError(err?.message || 'Error subiendo media')
    }
  }

  const onSubmit = async () => {
    setError('')
    const result = validateAndNormalizeDuration(courseData.duration);

    if (!result.ok) {
      setError(result.errors.join(' '));
      return;
    }

    const normalizedDuration = result.value; 
    console.log('Normalized duration ->', normalizedDuration);


    if (!courseData.title || !courseData.description || !courseData.duration || !courseData.price || !courseData.category || !courseData.user) {
      setError('Completa los campos obligatorios')
      return
    }
    setUpdating(true)
    try {
      const result = validateAndNormalizeDuration(courseData.duration);

      if (!result.ok) {
        setError(result.errors.join(' '));
        return;
      }
      const normalizedDuration = result.value; 

      // 1) subir media si el usuario escogió nuevos archivos
      let mediaIdToUse = courseData.mediaId
      if (cover || video) {
        console.log('onSubmit: new cover/video detected, calling uploadMediaIfNeeded')
        const newMediaId = await uploadMediaIfNeeded()
        console.log('onSubmit: uploadMediaIfNeeded returned:', newMediaId)
        if (!newMediaId) {
          console.error('onSubmit: upload returned no id', newMediaId)
          throw setError('No se recibió id del media subido')
        }
        mediaIdToUse = newMediaId
      } else {
        console.log('onSubmit: no new media, using existing mediaId:', mediaIdToUse)
      }

      // 2) construir payload y asegurarse de incluir media id si existe
      const priceNum = Number(courseData.price)
      const categoryNum = Number(courseData.category)
      const userNum = Number(courseData.user)
      const recipeVal = courseData.recipe

      console.log('Converted numeric values:', { priceNum, categoryNum, userNum })

      if (isNaN(priceNum) || isNaN(categoryNum) || isNaN(userNum)) {
        console.error('Numeric conversion failed', { priceNum, categoryNum, userNum })
        throw setError('Campos numéricos inválidos')
      }

      const payload: any = {
        title: courseData.title.trim(),
        description: courseData.description.trim(),
        duration: normalizedDuration, // uso la versión normalizada
        price: priceNum,
        category: categoryNum,
        user: userNum,
      }

      if (recipeVal) {
        payload.recipe = isNaN(Number(recipeVal)) ? recipeVal : Number(recipeVal)
      }

      if (mediaIdToUse) {
        payload.media = Number(mediaIdToUse)
      }

      console.log('PUT payload (edit):', payload, 'to', `${BACKEND_ROUTES.courses}/${courseId}`)

      const respRaw = await Api.put(`${BACKEND_ROUTES.courses}/${courseId}`, payload)
      console.log('Response: ', respRaw)

      // Si la respuesta es un objeto de errores de validación (p.ej. { duration: [...] })
      if (respRaw && typeof respRaw === 'object' && !('id' in respRaw) && !('course' in respRaw) && !('data' in respRaw)) {
        const entries = Object.entries(respRaw)
        if (entries.length > 0 && Array.isArray(entries[0][1])) {
          const firstField = entries[0][0]
          const firstMsgs = entries[0][1] as string[]
          const composed = `${firstField}: ${firstMsgs.join(' ')}`
          console.error('Validation error from server:', respRaw)
          throw setError(composed)
        }
      }

      const updatedCourse = extractCourseFromResponse(respRaw)
      console.log('Course update response (edit):', respRaw)

      if (!updatedCourse) {
        console.error('Response missing course property', respRaw)
        throw setError('No se devolvió el curso actualizado')
      }

      console.log('Course updated successfully:', updatedCourse)

      // éxito: limpiar estado y notificar
      setCover(null)
      setVideo(null)
      setCourseData({
        title: '',
        description: '',
        duration: '00:00:00',
        price: '',
        category: '',
        user: '',
        recipe: '',
        mediaId: null,
      })

      // Llamadas seguras a onClose y onSuccess (cambio solicitado)
      onClose() // <-- AQUI: llamada segura a onClose
      onSuccess?.() // <-- AQUI: llamada segura a onSuccess

    } catch (e: any) {
      console.error('Submit error (edit)', e)
      setError(e?.message || 'Error actualizando curso')
    } finally {
      setUpdating(false)
    }
  }

 
  const formatDurationInputWithLimits = (input: string): string => {
  const d = input.replace(/\D/g, '').slice(0, 6); // hhmmss max
  if (!d) return '';

  // Horas (1..2 dígitos)
  if (d.length <= 2) {
    if (d.length === 2) {
      const hh = Number(d);
      // si >23, limitar a 23
      return String(Math.min(hh, 23)).padStart(2, '0');
    }
    return d; // 1 dígito, dejar tal cual para edición incremental
  }

  // d.length >= 3
  const hhRaw = d.slice(0, 2);
  const hhNum = Number(hhRaw);
  const hh = String(Math.min(hhNum, 23)).padStart(2, '0');

  // Resto mmss
  const rest = d.slice(2); // 1..4 dígitos
  if (rest.length <= 2) {
    // minutos (1..2 dígitos); si llegamos a 2 y >59 clamp a 59
    if (rest.length === 2) {
      const mmNum = Number(rest);
      const mm = String(Math.min(mmNum, 59)).padStart(2, '0');
      return `${hh}:${mm}`;
    }
    return `${hh}:${rest}`; // minuto parcial (1 dígito)
  }

  // rest.length 3..4 -> mmss
  const mmRaw = rest.slice(0, 2);
  const ssRaw = rest.slice(2); // 1..2 dígitos
  const mmNum = Number(mmRaw);
  const mm = String(Math.min(mmNum, 59)).padStart(2, '0');

  if (ssRaw.length === 1) {
    // segundo parcial
    return `${hh}:${mm}:${ssRaw}`;
  }
  // ssRaw.length === 2
  const ssNum = Number(ssRaw);
  const ss = String(Math.min(ssNum, 59)).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
};
  const validateAndNormalizeDuration = (input: string): DurationNorm => {
  const normalized = normalizeDuration(input);
  if (!normalized) {
    return {
      ok: false,
      errors: ['Formato inválido. Usa HH:MM o HH:MM:SS'],
    };
  }
  

  const [hh, mm, ss] = normalized.split(':').map(Number);
  const seconds = hh * 3600 + mm * 60 + ss;

  return {
    ok: true,
    value: normalized,
    seconds,
  };
};

  if (!visible) return null

  return (
    <Modal
      showModal={visible}
      setShowModal={(v: boolean) => {
        if (!v) onClose()
      }}
      onClose={onClose}
    >
      <Text style={styles.header}>Editar curso</Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : updating ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.statusText}>Actualizando curso...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.form}>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Text style={styles.tittle}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Título"
            placeholderTextColor={COLORS.primaryOpaque}
            value={courseData.title}
            onChangeText={t => setCourseData((d: any) => ({ ...d, title: t }))}
          />
                <Text style={styles.tittle}>description</Text>
          
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Descripción"
            placeholderTextColor={COLORS.primaryOpaque}
            multiline
            numberOfLines={4}
            value={courseData.description}
            onChangeText={t => setCourseData((d: any) => ({ ...d, description: t }))}
          />
          <Text style={styles.tittle}>Duración</Text>
          <TextInput
            style={styles.input}
            placeholder="Duración (HH:MM:SS)"
            placeholderTextColor={COLORS.primaryOpaque}
            value={courseData.duration}
            keyboardType="numeric"
            onChangeText={(t: string) =>
            setCourseData((d: any)=> ({ ...d, duration: formatDurationInputWithLimits(t) }))
            }
            maxLength={8}
          />
          <Text style={styles.tittle}>Precio</Text>
          <TextInput
            style={styles.input}
            placeholder="Precio ($)"
            placeholderTextColor={COLORS.primaryOpaque}
            keyboardType="numeric"
            value={courseData.price}
            onChangeText={t => setCourseData((d: any) => ({ ...d, price: t }))}
          />
          <Text style={styles.tittle}>Categoría</Text>
          <View style={styles.Viewpicker}>

          <Picker
            selectedValue={courseData.category}
            style={styles.picker}
            onValueChange={v => setCourseData((d: any) => ({ ...d, category: v }))}
            >
            <Picker.Item label="-- Categoría --" value="" />
            {categories.map(c => (
              <Picker.Item key={c.id} label={c.name} value={String(c.id)} />
            ))}
          </Picker>
          </View>
          <Text style={styles.tittle}>Autor</Text>
          <View style={styles.Viewpicker}>
          <Picker
            selectedValue={courseData.user}
            style={styles.picker}
            onValueChange={v => setCourseData((d: any) => ({ ...d, user: v }))}
            >
            <Picker.Item label="-- Autor --" value="" />
            {users.map(u => (
              <Picker.Item key={u.id} label={`${u.first_name} ${u.last_name}`} value={String(u.id)} />
            ))}
          </Picker>
          </View>
          <Text style={styles.tittle}>Receta</Text>
          <View style={styles.Viewpicker}>           
          <Picker
            selectedValue={courseData.recipe}
            style={styles.picker}
            onValueChange={v => setCourseData((d: any) => ({ ...d, recipe: v }))}
            >
            <Picker.Item label="-- Receta --" value="" />
            {recipes.map(r => (
              <Picker.Item key={r.id} label={r.name} value={String(r.id)} />
            ))}
          </Picker>
          </View>

          <VideoPickerPlayer onImageSelected={onImageSelected} onVideoSelected={onVideoSelected} disabled={updating} />

          <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={updating}>
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Modal>
  )
}
