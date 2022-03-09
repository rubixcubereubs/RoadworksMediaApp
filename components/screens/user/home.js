import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Surface,
  ActivityIndicator,
} from 'react-native-paper';
import {ListItem} from 'react-native-elements';

function UserHome() {
  const pic = 'https://picsum.photos/100';

  /** <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                borderBottomLeftRadius: 20,
              }}>
              <ListItem
                containerStyle={{
                  backgroundColor: 'grey',
                  borderBottomLeftRadius: 20,
                  //opacity: 0.7,
                  //height: '50%',

                  //justifyContent: 'flex-end',
                }}>
                <ListItem.Content>
                  <ListItem.Title style={{color: 'black', left: 80}}>
                    abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
                  </ListItem.Title>
                  <ListItem.Subtitle style={{color: 'black', left: 80}}>
                    Subtitle
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </View> */
  return (
    <View style={styles.container}>
      <View>
        <Surface style={styles.surface}>
          <Text>Ad banner</Text>
        </Surface>
      </View>
      <View
        style={{
          //borderColor: 'blue',
          //borderBottomWidth: 4,
          //borderTopWidth: 4,
          //position: 'absolute',
          //bottom: 0,
          flex: 1,
        }}>
        <View
          style={{
            //borderColor: 'green',
            //borderBottomWidth: 4,
            //borderTopWidth: 4,
            //borderBottomLeftRadius: 50,
            //position: 'absolute',
            //bottom: 0,
            //flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            direction: 'inherit',
            flexWrap: 'nowrap',
          }}>
          <ImageBackground
            //source={{uri: pic}}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'grey',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
            PlaceholderContent={<ActivityIndicator />}>
            <View
              style={{
                //borderColor: 'green',
                //borderBottomWidth: 4,
                //borderTopWidth: 4,
                //borderBottomLeftRadius: 50,
                //position: 'absolute',
                //bottom: 0,
                //flex: 1,
                //flexDirection: 'column',
                //justifyContent: 'flex-start',
                //alignItems: 'center',
                //direction: 'inherit',
                //flexWrap: 'wrap',
                paddingTop: 20,
                paddingBottom: 20,
              }}>
              <View>
                <Image
                  source={{uri: pic}}
                  style={{
                    //height: '100%',
                    width: 105,
                    aspectRatio: 1,
                    //bottom: 120,
                    zIndex: 1,
                    elevation: 1,
                    //left: 10,
                    borderWidth: 2,
                    borderRadius: 60,
                    marginBottom: 5,
                  }}
                />
              </View>

              <View>
                <ListItem
                  containerStyle={{
                    backgroundColor: 'black',
                    //borderBottomLeftRadius: 20,
                    //opacity: 0.7,
                    //height: '50%',
                    //justifyContent: 'flex-end',
                  }}>
                  <ListItem.Content>
                    <ListItem.Title style={{color: 'red'}}>
                      FirstName LastName
                    </ListItem.Title>
                    <ListItem.Subtitle style={{color: 'red'}}>
                      Profession
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View
        style={{
          /*borderColor: 'red',
          borderBottomWidth: 1,
          borderTopWidth: 4,*/
          flex: 2,
        }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
  },
  subContainer: {
    flex: 1,
    marginTop: 30,
  },
  featuredPodcast: {
    flex: 3,
    //marginTop: 30,
    height: 250,
  },
  item: {
    //padding: 20,
    marginVertical: 20,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  surface: {
    padding: 8,
    height: 50,
    //width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderBottomWidth: 1,
    //borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
  },
  surfaceBottom: {
    padding: 8,
    height: 100,
    //width: 80,
    //alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    //backgroundColor: 'black',
    overflow: 'hidden',
    flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // alignItems: 'flex-start',
  },
  surfaceText: {
    color: 'red',
    width: '33%',
  },
  albumList: {
    marginTop: 10,
    marginBottom: 10,
  },
  albumListTitle: {
    color: 'white',
  },
  lists: {
    margin: 10,
    color: 'red',
  },
});

export default UserHome;
