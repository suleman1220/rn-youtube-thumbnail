import * as React from 'react';
import { Text, View, Image, Animated, StyleSheet } from 'react-native';
import { Menu, Divider, IconButton } from 'react-native-paper';
import { useHover } from 'react-native-web-hooks';
import { IMG_STYLES, AVATAR_STYLES, AVATAR_URL } from '../config/constants';

const Card = ({ cardStyles, video }: any) => {
  const [visible, setVisible] = React.useState(false);
  const cardRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const titleRef = React.useRef(null);

  const isCardHovered = useHover(cardRef);
  const isImgHovered = useHover(imgRef);
  const isTitleHovered = useHover(titleRef);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const {
    title,
    channelTitle,
    publishedAt,
    thumbnails: {
      medium: { url },
    },
  } = video;

  return (
    <View
      ref={cardRef}
      style={[cardStyles, isCardHovered ? { cursor: 'pointer' } : {}]}
    >
      <View ref={imgRef} style={{ position: 'relative' }}>
        <Image
          style={IMG_STYLES}
          source={{
            uri: url,
          }}
        />
        <Text
          style={[
            styles.imgText,
            isImgHovered
              ? {
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  fontWeight: 'normal',
                }
              : {
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  fontWeight: 'bold',
                },
          ]}
        >
          {isImgHovered ? 'Keep hovering to play' : '9:32'}
        </Text>
      </View>
      <View style={styles.cardData}>
        <View style={{ flex: 1 }}>
          <Image
            style={AVATAR_STYLES}
            source={{
              uri: AVATAR_URL,
            }}
          />
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          {isTitleHovered && (
            <Animated.Text style={styles.hoverText}>
              {channelTitle}
            </Animated.Text>
          )}
          <Text
            ref={titleRef}
            style={[
              styles.cardSubTitle,
              isTitleHovered ? { color: 'rgb(16,16,16)' } : {},
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {channelTitle}
          </Text>
          <Text style={styles.cardFooter}>{`— Views • ${new Date(
            publishedAt
          ).toLocaleDateString()}`}</Text>
        </View>
        <View style={styles.menu}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                icon="dots-vertical"
                color="#000"
                size={24}
                onPress={openMenu}
              />
            }
          >
            <Menu.Item
              icon="playlist-play"
              onPress={() => {}}
              title="Add to queue"
            />
            <Menu.Item
              icon="clock-outline"
              onPress={() => {}}
              title="Save to Watch later"
            />
            <Menu.Item
              icon="playlist-plus"
              onPress={() => {}}
              title="Save to Playlist"
            />
            <Menu.Item icon="share-outline" onPress={() => {}} title="Share" />
            <Divider />
            <Menu.Item
              icon="cancel"
              onPress={() => {}}
              title="Not interested"
            />
            <Menu.Item
              icon="do-not-disturb"
              onPress={() => {}}
              title="Don't recommend channel"
            />
            <Menu.Item icon="flag-outline" onPress={() => {}} title="Report" />
          </Menu>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'rgb(3, 3, 3)',
  },
  cardSubTitle: {
    fontSize: 12,
    marginTop: 10,
    color: 'rgb(96, 96, 96)',
  },
  cardFooter: {
    fontSize: 12,
    marginTop: 6,
    color: 'rgb(96, 96, 96)',
  },
  cardData: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardTextContainer: { flex: 3, flexWrap: 'wrap', position: 'relative' },
  hoverText: {
    position: 'absolute',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 6,
    backgroundColor: 'rgba(60,60,60,0.8)',
    color: '#fff',
    borderRadius: 2,
  },
  imgText: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    color: '#fff',

    marginRight: 6,
    marginBottom: 6,
    borderRadius: 2,
    fontSize: 12,
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});
