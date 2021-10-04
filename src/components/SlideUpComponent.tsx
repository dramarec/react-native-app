import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, Image, Animated, TouchableOpacity, FlatList } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel';

import config from '../../config'
import icons from '../constants/icons';
import { SIZES } from '../constants/Layout';
import { Background, Community } from '../graphql/queries/User/types';

const iconUrl = config.ICON_URL

interface Prop {
    getCommunitiesList: Community[] | undefined
    setColor: (color: string | Background) => void
    setCommunityId: (id: string | undefined) => void
}

export const SlideUpComponent = ({
    setColor, getCommunitiesList, setCommunityId
}: Prop) => {
    const _draggedValue = useRef(new Animated.Value(0)).current
    let _panel: any = useRef(null)
    const [allowDragging, setAllowDragging] = useState(true)

    const getCommunity = (objName: Community) => {
        const obj = getCommunitiesList?.find(el => el.name === objName.name)
        const getId = obj?.id
        setCommunityId(getId)

        if (obj?.styleOverride) {
            if (Array.isArray(obj.styleOverride?.background?.value)) {
                const colors = obj.styleOverride?.background?.value
                const max = colors.length - 1
                const min = 0
                const index = Math.round(Math.random() * (max - min) + min)
                const color = colors[index]
                _panel.hide()
                return setColor(color)
            } else {
                let color = obj.styleOverride?.background?.value
                    || obj.styleOverride?.moduleShadowColor
                _panel.hide()
                return setColor(color)
            }
        }
        _panel.hide()
        return setColor('#7b5ee6aa')
    };

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
                                        onPress={() => getCommunity(item)}>
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