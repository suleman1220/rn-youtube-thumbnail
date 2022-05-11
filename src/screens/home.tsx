import * as React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Provider } from 'react-native-paper';
import Constants from 'expo-constants';
// @ts-ignore
import Card from '../components/card';
import { BASE_URL } from '@env';
import { CARD_STYLES } from '../config/constants';
import { getParams } from '../utils/utils';

const getCardStyles = (width: any) => {
  if (width > 1140) return styles.cardLg;
  if (width > 888) return styles.cardMd;
  if (width > 512) return styles.cardSm;
  return styles.cardXs;
};

const Home = () => {
  const [videos, setVideos] = React.useState([]);
  const [nextPageToken, setNextPageToken] = React.useState('');
  const { width } = useWindowDimensions();

  const cardStyles = getCardStyles(width);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch(`${BASE_URL}?${getParams(nextPageToken)}`);
      const data = await res.json();
      const vids = data.items.map((item: any) => item.snippet);
      // @ts-ignore
      setVideos([...videos, ...vids]);
      setNextPageToken(data.nextPageToken);
    } catch (e: any) {
      console.log('error', e.message);
    }
  };

  const checkScroll = (e: any) => {
    console.log(e);
    // getData()
  };

  return (
    <SafeAreaView>
      <ScrollView onScroll={checkScroll}>
        <Provider>
          <View style={styles.container}>
            {videos.map((video, i) => (
              <Card key={i} cardStyles={cardStyles} video={video} />
            ))}
          </View>
        </Provider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 6,
    marginTop: 18,
  },
  cardLg: {
    ...CARD_STYLES,
    width: '20%',
    marginHorizontal: 8,
  },
  cardMd: {
    ...CARD_STYLES,
    width: '28%',
    marginHorizontal: 8,
  },
  cardSm: {
    ...CARD_STYLES,
    width: '45%',
    marginHorizontal: 8,
  },
  cardXs: {
    ...CARD_STYLES,
    width: '100%',
  },
});
