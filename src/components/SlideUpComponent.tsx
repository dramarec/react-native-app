import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, Image, Animated, TouchableOpacity, FlatList } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel';

import { Community } from '../graphql/queries/User/types';
import config from '../../config'
import icons from '../constants/icons';
import { SIZES } from '../constants/Layout';

const iconUrl = config.ICON_URL

interface Prop {
    getCommunitiesList: Community[] | undefined
    setCommunity: (communities: Community | undefined) => void
}

export const SlideUpComponent = ({ setCommunity, getCommunitiesList }: Prop) => {
    const _draggedValue = useRef(new Animated.Value(0)).current
    let _panel: any = useRef(null)
    const [allowDragging, setAllowDragging] = useState(true)

    const onCommunityId = (id: string) => {
        const handleCommunity = getCommunitiesList?.find(el => {
            return el.id === id
        })
        setCommunity(handleCommunity)
        _panel.hide()
    }

    return (
        <SlidingUpPanel
            ref={c => (_panel = c)}
            allowDragging={allowDragging}
            draggableRange={{
                top: SIZES.height + 120,
                bottom: 120,
            }}
            backdropOpacity={1}
            animatedValue={_draggedValue}
            snappingPoints={[SIZES.height + 120]}
            height={SIZES.height + 120}
            friction={0.8}
            onBottomReached={() => {
                setAllowDragging(true);
            }}
        >
            <View style={styles.wrapper}>
                <View style={{
                    height: 120,
                    justifyContent: 'flex-end',
                }}>
                    <Text style={styles.title}>My communities</Text>
                    <View>
                        <FlatList
                            data={getCommunitiesList}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={({ item }) => {
                                const { id } = item
                                return (
                                    <TouchableOpacity
                                        onPress={() => onCommunityId(id)}>
                                        <Image
                                            source={{
                                                uri: `${iconUrl}${id}`
                                            }}
                                            style={{
                                                width: 56,
                                                height: 56,
                                                borderColor: 'white',
                                                borderRadius: 50,
                                                borderWidth: 1,
                                                margin: 16
                                            }}
                                        />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                        <Image
                            source={icons.plus}
                            style={{
                                width: 56,
                                height: 56,
                                borderColor: 'white',
                                borderRadius: 50,
                                borderWidth: 1,
                                margin: 16

                            }}
                        />
                    </View>
                </View>
            </View>
        </SlidingUpPanel>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 20,
        backgroundColor: 'transparent',
        paddingTop: 621,
    },
    title: {
        fontSize: 24,
        lineHeight: 28,
        color: 'white'
    }
})