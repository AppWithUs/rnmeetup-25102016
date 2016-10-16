import React, { Component } from 'react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Button from 'apsl-react-native-button';
import striptags from 'striptags';

import geolocation from './geolocation';
import meetups from './meetups';

import styles from './styles';

export default class RNMeetup25102016 extends Component {
  state = {
    region: {
      latitude: 53.5511228,
      longitude: 9.9335664,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    },
    markers: [],
    isLoading: false,
  }

  onRegionChange = (region) => {
    this.setState({ region });
  }

  handleCenterOnMe = () => {
    this.setState({
      isLoading: true,
    }, () => {
      geolocation
      .getLocation((region) => {
        this.setState({
          region,
          isLoading: false,
        })
      });
    });
  }

  handleLoadMeetups = () => {
    this.setState({
      isLoading: true,
    }, () => {
      meetups
      .findMeetups(this.state.region, 20, (err, resp) => {
        if (err) {
          return alert(err);
        }

        let meetups = [];
        let newRegion = this.state.region;
        try {
          resp
          .forEach((meetup, idx,) => {
            meetups.push({
              title: meetup.name,
              description: meetup.description,
              latitude: meetup.venue.lat,
              longitude: meetup.venue.lon,
              date: new Date(meetup.time),
            });
          });

          newRegion = geolocation.getRegionForCoordinates(meetups);
        } catch (e) {
          alert(e);
        }

        this.setState({
          markers: meetups,
          isLoading: false,
          region: newRegion,
        });
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>
          React Native Meetup 25.10.2016
        </Text>
        <View style={styles.mapContainer}>
          <MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange}
            style={styles.map}
          >
            {
              this.state.markers.map((marker, idx) => (
                <MapView.Marker
                  key={`Marker-${idx}`}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.title}
                  description={striptags(marker.description)}
                />
              ))
            }
          </MapView>
        </View>
        <View style={styles.actionButtonRow}>
          <Button
            style={[styles.button, styles.buttonPrimary]}
            textStyle={styles.buttonText}
            isDisabled={this.state.isLoading}
            onPress={this.handleCenterOnMe}
          >
            Center on me
          </Button>
          <Button
            style={[styles.button, styles.buttonSecondary]}
            textStyle={styles.buttonText}
            isDisabled={this.state.isLoading}
            onPress={this.handleLoadMeetups}
          >
            Nearby MeetUps
          </Button>
        </View>
      </View>
    );
  }
}