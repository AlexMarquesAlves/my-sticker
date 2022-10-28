import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, TextInput, View } from "react-native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { PositionChoice } from "../components/PositionChoice";

import { PositionProps, POSITIONS } from "../utils/positions";
import { styles } from "./styles";

export function Home() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [positionSelected, setPositionSelected] = useState<PositionProps>(
    POSITIONS[0]
  );

  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then((response) =>
      setHasCameraPermission(response.granted)
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Header position={positionSelected} />

          <View style={styles.picture}>
            {hasCameraPermission ? (
              <Camera style={styles.camera} />
            ) : (
              <Image
                source={{
                  uri: "https://images.gutefrage.net/media/fragen/bilder/meine-kamera-auf-windows-10-funktioniert-nicht-was-tun/0_big.jpg?v=1584606917000",
                }}
                style={styles.camera}
              />
            )}

            <View style={styles.player}>
              <TextInput
                placeholder="Digite seu nome aqui"
                style={styles.name}
              />
            </View>
          </View>
        </View>

        <PositionChoice
          onChangePosition={setPositionSelected}
          positionSelected={positionSelected}
        />

        <Button title="Compartilhar" />
      </ScrollView>
    </SafeAreaView>
  );
}
