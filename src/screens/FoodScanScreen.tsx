import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Image, Animated, Easing, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { LayeredBackground } from '../components/LayeredBackground';
import { AnimatedAppBar } from '../components/AnimatedAppBar';
import { GlassCard } from '../components/GlassCard';
import { WaterButton } from '../components/WaterButton';
import { SuccessCheck } from '../components/SuccessCheck';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { COLORS, SHADOWS } from '../theme/colors';
import { detectFood, API_BASE_URL } from '../services/api';
import { FoodItem } from '../data/mockData';

const Camera: React.ComponentType<any> | null = typeof navigator !== 'undefined' && navigator.userAgent?.includes('Web') ? null : require('expo-camera').Camera;
const useCameraPermissions: any = typeof navigator !== 'undefined' && navigator.userAgent?.includes('Web') ? () => [false, async () => ({ granted: false })] : require('expo-camera').useCameraPermissions;
const Platform = require('react-native').Platform;

declare const CameraConstants: { Type: { back: string; front: string }; FlashMode: { on: string; off: string; auto: string } };

interface FoodScanScreenProps {
  onBack: () => void;
  onScanComplete: (food?: FoodItem) => void;
  onVoiceScan: () => void;
}

interface DetectedFood {
  name: string;
  confidence: number;
  calories?: number;
  protein?: number;
  fat?: number;
  carbohydrates?: number;
  fiber?: number;
  category?: string;
  image_url?: string;
}

interface DetectionResponse {
  foods: DetectedFood[];
}

export const FoodScanScreen: React.FC<FoodScanScreenProps> = ({ onBack, onScanComplete, onVoiceScan }) => {
  const { foodHistory, addFoodScan } = useApp();
  const scanLine = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [permission, requestPermission] = useCameraPermissions ? useCameraPermissions() : [false, async () => ({ granted: false })];
  const [cameraRef, setCameraRef] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedFood, setScannedFood] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, { toValue: 1, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(scanLine, { toValue: 0, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 1600, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1600, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    ).start();
  }, [scanLine, pulseAnim]);

  const scanY = scanLine.interpolate({ inputRange: [0, 1], outputRange: [10, 230] });

  const handleTakePicture = async () => {
    if (!cameraRef) return;

    setIsScanning(true);
    try {
      const photo = await cameraRef.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      if (photo) {
        await processImage(photo);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to capture image');
    } finally {
      setIsScanning(false);
    }
  };

  const processImage = async (photo: any) => {
    try {
      const response = await fetch(photo.uri);
      const blob = await response.blob();
      const file = new File([blob], 'food_scan.jpg', { type: 'image/jpeg' });

      const detection: DetectionResponse = await detectFood(file);

      if (detection.foods && detection.foods.length > 0) {
        const detectedFood = detection.foods[0];
        setScannedFood(detectedFood.name);
        setConfidence(detectedFood.confidence * 100);
        setCalories(detectedFood.calories || 0);

        const foodItem: FoodItem = {
          id: `scan_${Date.now()}`,
          name: detectedFood.name,
          category: detectedFood.category || 'Detected Food',
          confidence: detectedFood.confidence * 100,
          confidenceInterval: '±5%',
          healthScore: 75,
          calories: detectedFood.calories || 200,
          proteinGrams: detectedFood.protein || 10,
          fatGrams: detectedFood.fat || 5,
          carbsGrams: detectedFood.carbohydrates || 30,
          sugarGrams: 5,
          sodiumMg: 300,
          ingredients: ['Detected by AI'],
          diseaseWarnings: [],
          imageUrl: photo.uri,
          scannedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        addFoodScan(foodItem);
        onScanComplete(foodItem);
      } else {
        setScannedFood('Unknown Food');
        setConfidence(0);
        setCalories(0);
        Alert.alert('No Food Detected', 'Could not identify any food. Please try again.');
      }
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert('Processing Error', 'Failed to analyze food. Please check your connection.');
    }
  };

  const handleRequestPermission = async () => {
    if (permission && !permission.granted) {
      const response = await requestPermission();
      if (!response.granted) {
        Alert.alert('Permission Required', 'Camera permission is needed to scan food.');
      }
    }
  };

  useEffect(() => {
    if (permission && !permission.granted) {
      handleRequestPermission();
    }
  }, [permission]);

  if (!permission || !permission.granted) {
    return (
      <LayeredBackground>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <AnimatedAppBar
            title="Food Scanner"
            subtitle="Camera Access Required"
            showBack
            onBack={onBack}
          />
          <View style={[styles.viewfinder, SHADOWS.lg]}>
            <View style={styles.cameraPlaceholder}>
              <Ionicons name="camera" size={64} color={COLORS.textSecondary} />
              <Text style={styles.permissionText}>Camera permission is required</Text>
              <WaterButton
                onPress={handleRequestPermission}
                variant="cyan"
                size="lg"
                style={{ marginTop: 20 }}
              >
                Grant Permission
              </WaterButton>
            </View>
          </View>
        </ScrollView>
      </LayeredBackground>
    );
  }

  const isWeb = Platform.OS === 'web';
  
  if (isWeb) {
    return (
      <LayeredBackground>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <AnimatedAppBar
            title="Food Scanner"
            subtitle="Use Mobile App for Camera Scanning"
            showBack
            onBack={onBack}
          />
          <View style={[styles.viewfinder, SHADOWS.lg]}>
            <View style={styles.cameraPlaceholder}>
              <Ionicons name="scan" size={64} color={COLORS.textSecondary} />
              <Text style={styles.permissionText}>Camera scanning is only available on mobile devices</Text>
              <Text style={styles.helpText}>Use the Expo Go app on your phone to access camera scanning</Text>
            </View>
          </View>
          
          <WaterButton
            title="View Recent Scans"
            icon="restaurant"
            variant="cyan"
            size="lg"
            onPress={() => onScanComplete()}
          />
        </ScrollView>
      </LayeredBackground>
    );
  }

  return (
    <LayeredBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AnimatedAppBar
          title="Food Scanner"
          subtitle="Neural Vision · AI Detection"
          showBack
          onBack={onBack}
          rightActionIcon="mic"
          onRightAction={onVoiceScan}
        />

        {/* Camera Viewfinder Card */}
        <View style={[styles.viewfinder, SHADOWS.lg]}>
          {Camera ? (
            <Camera
              ref={(ref: any) => setCameraRef(ref)}
              style={StyleSheet.absoluteFill}
              type="back"
              flashMode="on"
            >
              <View style={styles.dimOverlay} />

              {/* Corner Brackets */}
              {(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map((pos) => (
                <View key={pos} style={[styles.corner, styles[pos]]} />
              ))}

              {/* Animated Laser Line */}
              <Animated.View style={[styles.laserLine, { transform: [{ translateY: scanY }] }]} />

              {/* AI Detection Badge */}
              {scannedFood && (
                <View style={styles.detectionBadge}>
                  <View style={styles.detBadgeDot} />
                  <Text style={styles.detBadgeText}>
                    AI DETECTION · {scannedFood} · {confidence.toFixed(0)}%
                  </Text>
                </View>
              )}

              {/* Capture FAB */}
              <Animated.View style={[styles.fabWrap, { transform: [{ scale: pulseAnim }] }]}>
                <WaterButton
                  onPress={handleTakePicture}
                  disabled={isScanning}
                  variant="cyan"
                  size="lg"
                  style={{ width: 68, height: 68, borderRadius: 34 }}
                >
                  {isScanning ? (
                    <ActivityIndicator color={COLORS.white} size={28} />
                  ) : (
                    <Ionicons name="camera" size={28} color={COLORS.white} />
                  )}
                </WaterButton>
              </Animated.View>
            </Camera>
          ) : (
            <View style={styles.cameraPlaceholder}>
              <Ionicons name="scan" size={64} color={COLORS.textSecondary} />
            </View>
          )}

          {/*Scanning indicator overlay */}
          {isScanning && (
            <View style={styles.scanningOverlay}>
              <ActivityIndicator size="large" color={COLORS.white} />
              <Text style={styles.scanningText}>Analyzing...</Text>
            </View>
          )}
        </View>

        {/* Neural Status Card */}
        <GlassCard variant="outline">
          <View style={styles.statusRow}>
            <SuccessCheck size={22} color={COLORS.secondary} strokeWidth={3.5} />
            <View style={styles.statusText}>
              <Text style={styles.statusTitle}>Neural Vision v2.4 · Active</Text>
              <Text style={styles.statusSub}>Multi-ingredient segmentation · Precision Mode</Text>
            </View>
            <View style={styles.confPill}>
              <Text style={styles.confText}>{confidence.toFixed(1)}%</Text>
            </View>
          </View>
        </GlassCard>

        <WaterButton
          title="Scan Food"
          icon="restaurant"
          variant="cyan"
          size="lg"
          onPress={handleTakePicture}
          disabled={isScanning}
        />

        {/* Recent Scans */}
        <Text style={styles.sectionTitle}>Recent Scans</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {foodHistory.map((item) => (
            <AnimatedPressable key={item.id} style={[styles.scanCard, SHADOWS.sm]} onPress={() => {}} scaleTo={0.96}>
              <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }} style={styles.scanImg} />
              <View style={styles.scanMeta}>
                <Text style={styles.scanName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.scanCal}>{item.calories} kcal</Text>
                <View style={[styles.scanScore, { backgroundColor: item.healthScore > 70 ? COLORS.secondarySubtle : COLORS.warningSubtle }]}>
                  <Text style={[styles.scanScoreText, { color: item.healthScore > 70 ? COLORS.secondary : COLORS.warningDark }]}>
                    {item.healthScore}/100
                  </Text>
                </View>
              </View>
            </AnimatedPressable>
          ))}
        </ScrollView>

        {/* Tips */}
        <GlassCard icon="bulb-outline" iconColor={COLORS.warning} iconBg={COLORS.warningSubtle} title="Scanning Tips" subtitle="For maximum AI accuracy">
          {[
            'Hold camera 20cm above the food plate',
            'Ensure sauces and toppings are fully visible',
            'Use Voice Mode for multi-course meal logging',
          ].map((tip, i) => (
            <Text key={i} style={styles.tipText}>• {tip}</Text>
          ))}
        </GlassCard>

        <View style={{ height: 30 }} />
      </ScrollView>
    </LayeredBackground>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 20 },
  viewfinder: {
    height: 300,
    borderRadius: 26,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(79, 110, 247, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 12,
    textAlign: 'center',
  },
  helpText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 8,
    textAlign: 'center',
  },
  dimOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(13, 14, 26, 0.3)',
  },
  corner: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderColor: COLORS.primary,
    borderWidth: 3.5,
  },
  topLeft: { top: 18, left: 18, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 8 },
  topRight: { top: 18, right: 18, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 8 },
  bottomLeft: { bottom: 18, left: 18, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 8 },
  bottomRight: { bottom: 18, right: 18, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 8 },
  laserLine: {
    position: 'absolute',
    left: 22,
    right: 22,
    height: 2.5,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    shadowColor: COLORS.primary,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  detectionBadge: {
    position: 'absolute',
    top: 18,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13,14,26,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 99,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  detBadgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.secondary },
  detBadgeText: { fontSize: 10, fontWeight: '800', color: COLORS.white, letterSpacing: 0.5 },
  fabWrap: {
    position: 'absolute',
    bottom: 20,
  },
  captureFab: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3.5,
    borderColor: COLORS.white,
  },
  scanningOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
  },
  scanningText: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 10,
    fontWeight: '600',
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statusDot: { width: 9, height: 9, borderRadius: 4.5 },
  statusText: { flex: 1 },
  statusTitle: { fontSize: 13, fontWeight: '800', color: COLORS.textPrimary },
  statusSub: { fontSize: 11, color: COLORS.textSecondary, marginTop: 1 },
  confPill: { backgroundColor: COLORS.secondarySubtle, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(0,196,140,0.2)' },
  confText: { fontSize: 12, fontWeight: '900', color: COLORS.secondary },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary, letterSpacing: -0.3, marginTop: 14, marginBottom: 10 },
  scanCard: {
    width: 136,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(200,207,228,0.55)',
    marginBottom: 8,
  },
  scanImg: { width: '100%', height: 88 },
  scanMeta: { padding: 10 },
  scanName: { fontSize: 12, fontWeight: '800', color: COLORS.textPrimary },
  scanCal: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  scanScore: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6, alignSelf: 'flex-start', marginTop: 5 },
  scanScoreText: { fontSize: 10, fontWeight: '800' },
  tipText: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20, marginTop: 4 },
});