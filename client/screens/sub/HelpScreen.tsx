import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../../components/organism/EditScreenInfo';
import { Text, View } from '../../components/atoms/Themed';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';

export default function HelpScreen() {
  const [showAusgangslage, setShowAusgangslage] = useState(false);
  const [showProjektfindung, setShowProjektfindung] = useState(false);
  const [showZiele, setShowZiele] = useState(false);

  return (
    <View style={styles.container}>

        <Text style={styles.title}>Informationen</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        
        <ScrollView>
          <TouchableOpacity  onPress={() => setShowProjektfindung(!showProjektfindung)}>
            <Text style={styles.headline}>Projektfindung</Text>
          </TouchableOpacity>
          {showProjektfindung && (
            <View style={styles.textContainer}> 
              <Text style={styles.text}>
                Vor ein paar Jahren gab es die Idee die Informationstafeln an kulturell wichtigen Orten zu digitalisieren. Allerdings wurde dieses Konzept nie verwirklicht. Nun wollen wir mit einem neuen Ansatz dies in unserem Projekt umsetzten. 
              </Text>
              <Text style={styles.text}>
                Den Körper gesund zu halten, wird immer wichtiger, dabei sollten wir unseren Geist aber nicht vernachlässigen. Deshalb wollen wir durch unsere App den Zugang für Interessierte Menschen zu geschichtlichen und kulturellen Inhalten unserer Region vereinfachen.
              </Text>
              <Text style={styles.text}>
                Außerdem wollen wir motivierende Elemente einbauen, um sportliche Aktivitäten positiv zu verstärken.            
              </Text>
              <Text style={styles.text}>
                Mit unserer App werden analoge Karten überflüssig und das Finden neuer Wege erleichtert. 
              </Text>
              <Text style={styles.text}>
                Auch wenn alte Wege schon bekannt sind, ist es spannend diese, unter neuen Gesichtspunkten kennenzulernen. 
              </Text>
            </View>
          )}

          <TouchableOpacity  onPress={() => setShowAusgangslage(!showAusgangslage)}>
            <Text style={styles.headline}>Ausgangslage</Text>
          </TouchableOpacity>
          {showAusgangslage && (
            <View style={styles.textContainer}> 
              <Text style={styles.text}>
                Analoge Wanderkarten sind für viele mühsam zu lesen und beinhalten rein geografische Informationen.
              </Text>
              <Text style={styles.text}>
                Informationen über die Geschichte oder sonstige Details sind in analogen Karten nicht abrufbar. Außerdem erschwert schlechtes Wetter, wie Wind und Regen, die Handhabung dieser Karten.
              </Text>
              <Text style={styles.text}>
                Unsere App bietet eine digitale Alternative, welche dem Benutzer die Geschichte näherbringt. Zusätzlich fallen bei unserer App keine Kosten an, um Informationen zu aktualisieren, wie bei analogen Karten oder Tafeln.          
              </Text>
            </View>
          )}
          <TouchableOpacity  onPress={() => setShowZiele(!showZiele)}>
            <Text style={styles.headline}>Ziele</Text>
          </TouchableOpacity>
          {showZiele && (
            <View style={styles.textContainer}> 
              <Text style={styles.text}>
                Das Projektziel ist es, eine funktionsfähige App zu entwickeln und programmieren.               
              </Text>
              <Text style={styles.headline}>
                Verfügbarkeit
              </Text>
              <Text style={styles.text}>
                Unsere App bietet eine digitale Alternative, welche dem Benutzer die Geschichte näherbringt. Zusätzlich fallen bei unserer App keine Kosten an, um Informationen zu aktualisieren, wie bei analogen Karten oder Tafeln.          
              </Text>
              <Text style={styles.headline}>
                Skalierbarkeit
              </Text>
              <Text style={styles.text}>
                Die App wird so entwickelt, dass man sie leicht auf weitere Gemeinden ausweiten kann. Wir bieten grundsätzlich die Funktionen an, Routen hinzuzufügen. Das hinzufügen der Routen wird den Nutzern überlassen. Der Administratoren eines Gebiets fügt die Infos hinzu und bestätigt die Routen. Somit kann man in mehreren Gebieten gleichzeitig erweitern, ohne große Logistische aufwände auf unserer Seite zu haben.                
              </Text>
              <Text style={styles.headline}>
                Sicherheit
              </Text>
              <Text style={styles.text}>
                Vertrauliche Informationen, die nicht von jedermann einsehbar sein sollten werden in der Datenbank verschlüsselt hinterlegt und sind daher nur für den jeweiligen Benutzer zugänglich. Bereiche werden voneinander getrennt und können nur von Personen mit den nötigen Berechtigungen erreicht werden.               
              </Text>
            </View>
          )}            
        </ScrollView>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },
  textContainer: {
    backgroundColor: Colors.dark.secondaryDark,
    alignContent: "center",
    padding: 10,
  },
  text: {
    fontSize: 20,
  },
});
