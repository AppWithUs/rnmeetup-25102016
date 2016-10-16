import {
  StyleSheet,
  Platform,
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 25,
  },
  h1: {
    color: '#444',
    fontSize: 20,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  actionButtonRow: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingHorizontal: 10,
  },
  buttonPrimary: {
    borderColor: '#f39c12',
    backgroundColor: '#f1c40f'
  },
  buttonSecondary: {
    borderColor: '#16a085',
    backgroundColor: '#1abc9c'
  },
  buttonText: {
    fontWeight: '500',
    color: '#FFF',
  },
});